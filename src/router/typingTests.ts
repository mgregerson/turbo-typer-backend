import express from "express";

import {
  getAllTypingTests,
  createNewTypingTest,
  deleteTypingTest,
  updateTypingTest,
  getAllTypingTestsByDifficulty,
  retrieveRandomTypingTestByDifficulty,
  retrieveTypingTestById,
  retrieveTypingTestByTitle,
} from "../controllers/typingTests";
import { retrieveScoresByTypingTest } from "../controllers/scores";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/typingtests", isAuthenticated, getAllTypingTests);
  router.get(
    "/typingtests/:difficulty",
    isAuthenticated,
    getAllTypingTestsByDifficulty
  );
  router.get(
    "/typingtests/:difficulty/random",
    isAuthenticated,
    retrieveRandomTypingTestByDifficulty
  );
  router.get("/typingtests/id/:id", isAuthenticated, retrieveTypingTestById);
  router.get(
    "/typingtests/title/:title",
    isAuthenticated,
    retrieveTypingTestByTitle
  );
  router.post("/typingtests/add", isAuthenticated, createNewTypingTest);
  router.patch("/typingtests/:id", isAuthenticated, updateTypingTest);
  router.delete("/typingtests/:id", isAuthenticated, deleteTypingTest);
  router.get(
    "/typingtests/:id/scores",
    isAuthenticated,
    retrieveScoresByTypingTest
  );
};
