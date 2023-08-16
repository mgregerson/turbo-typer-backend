import mongoose from "mongoose";
import { userModel } from "./users";

export interface Score {
  user: string;
  typingTest: string;
  wordsPerMinute: number;
  time: number;
  mistakes: number;
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
});

export const scoreModel = mongoose.model("Score", scoreSchema);

export const getScores = mongoose.model("Score", scoreSchema).find();
export const getScoreById = (id: string) => scoreModel.findById(id);
export const getScoresByUser = (user: string) => scoreModel.find({ user });
export const getScoresByTypingTest = (typingTest: string) =>
  scoreModel.find({ typingTest });
export const getScoresByUserAndTypingTest = (
  user: string,
  typingTest: string
) => scoreModel.find({ user, typingTest });

export const getScoresByUserAndTypingTestAndDate = (
  user: string,
  typingTest: string,
  date: Date
) => scoreModel.find({ user, typingTest, date });

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
    });

    return newScore.save().then((savedScore) => savedScore.toObject());
  } catch (error) {
    throw new Error("Failed to create a new score");
  }
};
