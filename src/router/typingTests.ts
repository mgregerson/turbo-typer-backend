import express from "express";

import {
  getAllTypingTests,
  createNewTypingTest,
  deleteTypingTest,
  updateTypingTest,
  getAllTypingTestsByDifficulty,
  retrieveTypingTestById,
  retrieveTypingTestByTitle,
} from "../controllers/typingTests";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/typingtests", isAuthenticated, getAllTypingTests);
  router.get(
    "/typingtests/difficulty/:difficulty",
    isAuthenticated,
    getAllTypingTestsByDifficulty
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
};
