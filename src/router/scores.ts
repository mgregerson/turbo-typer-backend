import express from "express";

import { retrieveScoreById, createScore } from "../controllers/scores";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/scores/:id", isAuthenticated, retrieveScoreById);
  router.post("/scores", isAuthenticated, createScore);
};
