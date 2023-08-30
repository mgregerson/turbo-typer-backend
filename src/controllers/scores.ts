import express from "express";
import {
  getScoreById,
  getScoresByUser,
  getScoresByTypingTest,
  getScoresByUserAndTypingTest,
  getScoresByUserAndTypingTestAndDate,
  getPastScoresByUserAndDifficulty,
  getTopFiveScoresByDifficulty,
  createNewScore,
} from "../db/scores";

export const retrieveScoreById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const score = await getScoreById(req.params.id);
    return res.status(200).json(score);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const retrieveScoresByUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const scores = await getScoresByUser(req.params.id);
    return res.status(200).json(scores);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const retrieveScoresByTypingTest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const scores = await getScoresByTypingTest(req.params.id);
    return res.status(200).json(scores);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const retrieveScoresByUserAndTypingTest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const scores = await getScoresByUserAndTypingTest(
      req.params.userId,
      req.params.typingTestId
    );
    return res.status(200).json(scores);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const retrieveScoresByUserAndTypingTestAndDate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentDate = new Date();
    const scores = await getScoresByUserAndTypingTestAndDate(
      req.params.userId,
      req.params.typingTestId,
      currentDate
    );
    return res.status(200).json(scores);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const retrieveScoresByUserAndDifficulty = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const scores = await getPastScoresByUserAndDifficulty(
      req.params.username,
      req.params.difficulty
    );
    return res.status(200).json(scores);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const retrieveTopFiveScoresByDifficulty = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("i got to controllers");
    const scores = await getTopFiveScoresByDifficulty();
    return res.status(200).json(scores);
  } catch (error) {
    console.log("i got here");
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createScore = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const score = await createNewScore(req.body);
    return res.status(200).json(score);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
