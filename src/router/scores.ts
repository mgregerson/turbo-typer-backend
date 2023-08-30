import express from "express";

import {
  retrieveScoreById,
  createScore,
  retrieveTopFiveScoresByDifficulty,
} from "../controllers/scores";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/scores/:id", isAuthenticated, retrieveScoreById);
  router.get("/leaderboard", retrieveTopFiveScoresByDifficulty);
  router.post("/scores", isAuthenticated, createScore);
};
