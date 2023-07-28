import mongoose from "mongoose";

const typingTestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const typingTestModel = mongoose.model("TypingTest", typingTestSchema);

export const getTypingTests = () => typingTestModel.find();
export const getTypingTestById = (id: string) => typingTestModel.findById(id);
export const getTypingTestsByDifficulty = (difficulty: string) =>
  typingTestModel.find({ difficulty });
export const getTypingTestByTitle = (title: string) =>
  typingTestModel.findOne({ title });
export const createTypingTest = (values: Record<string, any>) =>
  new typingTestModel(values)
    .save()
    .then((typingTest) => typingTest.toObject());
export const deleteTypingTestById = (id: string) =>
  typingTestModel.findByIdAndDelete({ _id: id });
export const updateTypingTestById = (
  id: string,
  values: Record<string, any>
) => {
  return typingTestModel.findByIdAndUpdate(id, values);
};
