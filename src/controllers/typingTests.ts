import express from "express";
import {
  deleteTypingTestById,
  getTypingTestById,
  getTypingTestByTitle,
  getTypingTests,
  createTypingTest,
  getTypingTestsByDifficulty,
} from "../db/typingTests";

export const getAllTypingTests = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const typingTests = await getTypingTests();
    return res.status(200).json(typingTests);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllTypingTestsByDifficulty = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { difficulty } = req.params;
    const typingTests = await getTypingTestsByDifficulty(difficulty);
    return res.status(200).json(typingTests);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const retrieveTypingTestById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const typingTest = await getTypingTestById(id);
    return res.status(200).json(typingTest);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const retrieveTypingTestByTitle = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title } = req.params;
    const typingTest = await getTypingTestByTitle(title);
    return res.status(200).json(typingTest);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createNewTypingTest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, text, difficulty, id } = req.body;
    if (!title || !text || !difficulty) {
      return res.sendStatus(400);
    }
    const existingTypingTest = await getTypingTestByTitle(title);
    if (existingTypingTest) {
      return res
        .status(409)
        .json({ error: "Typing test with this title already exists" });
    }

    const typingTest = await createTypingTest({
      title,
      text,
      difficulty,
      createdBy: id,
    });
    const testData = {
      title: typingTest.title,
      text: typingTest.text,
      difficulty: typingTest.difficulty,
    };

    return res.status(201).json(testData).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteTypingTest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedTypingTest = await deleteTypingTestById(id);

    return res.json(deletedTypingTest);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTypingTest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, text, difficulty } = req.body;
    if (!title && !text && !difficulty) {
      return res.sendStatus(400);
    }

    const typingTest = await getTypingTestById(id);

    if (title) {
      typingTest.title = title;
    }
    if (text) {
      typingTest.text = text;
    }
    if (difficulty) {
      typingTest.difficulty = difficulty;
    }

    await typingTest.save();
    return res.status(200).json(typingTest).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
