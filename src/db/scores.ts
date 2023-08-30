import mongoose from "mongoose";
import { userModel } from "./users";
import { typingTestModel } from "./typingTests";

export interface Score {
  user: string;
  typingTest: string;
  wordsPerMinute: number;
  time: number;
  mistakes: number;
  difficulty: string;
  words: number;
  accuracy: string;
  totalWordsTyped: number;
}

const scoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  typingTest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypingTest",
    required: true,
  },
  wordsPerMinute: { type: Number, required: true },
  mistakes: { type: Number, required: true },
  time: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  difficulty: { type: String, required: true },
  words: { type: Number, required: true },
  accuracy: { type: String, required: true },
  totalWordsTyped: { type: Number, required: true },
});

export const scoreModel = mongoose.model("Score", scoreSchema);

export const getScores = mongoose.model("Score", scoreSchema).find();
export const getScoreById = (id: string) => scoreModel.findById(id);
export const getScoresByUser = (user: string) => scoreModel.find({ user });
export const getScoresByTypingTest = (typingTest: string) =>
  scoreModel.find({ typingTest });

export const getTopFiveScoresByDifficulty = async () => {
  console.log("here in db");
  const difficultyScores: Record<string, any[]> = {}; // Add type annotation

  // Define the difficulty levels you want to query
  const difficulties = ["hard"];

  for (const difficulty of difficulties) {
    console.log(difficulty, "found difficulty");

    // Skip 'leaderboard' as a difficulty value
    if (difficulty === "leaderboard") {
      continue;
    }

    const scores = await mongoose
      .model("Score", scoreSchema)
      .find({ difficulty })
      .sort({ wordsPerMinute: -1 })
      .limit(5)
      .populate("typingTest")
      .populate("user");

    difficultyScores[difficulty] = scores;
  }

  return difficultyScores;
};

export const getScoresByUserAndTypingTest = async (
  user: string,
  typingTest: string
) => {
  try {
    const userId = await userModel.findOne({ username: user });

    if (!userId) {
      throw new Error("User not found");
    }

    const typingTestId = await typingTestModel.findOne({ title: typingTest });

    if (!typingTestId) {
      throw new Error("Typing Test not found");
    }

    const typingTestIdString = typingTestId._id.toString();

    const userIdString = userId._id.toString();

    return scoreModel.find({
      user: userIdString,
      typingTest: typingTestIdString,
    });
  } catch (error) {
    throw new Error("Failed to get scores");
  }
};

export const getScoresByUserAndTypingTestAndDate = (
  user: string,
  typingTest: string,
  date: Date
) => scoreModel.find({ user, typingTest, date });

export const getPastScoresByUserAndDifficulty = async (
  username: string,
  difficulty: string
) => {
  try {
    const userId = await userModel.findOne({ username });

    if (!userId) {
      throw new Error("User not found");
    }

    const userIdString = userId._id.toString();

    const scores = await scoreModel
      .find({
        user: userIdString,
        difficulty: difficulty,
      })
      .sort({ date: -1 })
      .populate("typingTest");

    if (scores.length > 0) {
      const pastScores = scores.slice(1);
      return pastScores;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Failed to get past scores");
  }
};

export const createNewScore = async (data: Score) => {
  try {
    const user = await userModel.findOne({ username: data.user });

    if (!user) {
      throw new Error("User not found");
    }

    const userIdString = user._id.toString();

    const newScore = new scoreModel({
      user: userIdString,
      typingTest: data.typingTest,
      wordsPerMinute: data.wordsPerMinute,
      time: data.time,
      mistakes: data.mistakes,
      difficulty: data.difficulty,
      words: data.words,
      accuracy: data.accuracy,
      totalWordsTyped: data.totalWordsTyped,
    });

    return newScore.save().then((savedScore) => savedScore.toObject());
  } catch (error) {
    throw new Error("Failed to create a new score");
  }
};
