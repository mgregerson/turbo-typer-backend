import express from "express";

import { updateUser, getAllUsers, deleteUser } from "../controllers/users";
import {
  retrieveScoresByUser,
  retrieveScoresByUserAndTypingTest,
  retrieveScoresByUserAndTypingTestAndDate,
} from "../controllers/scores";
import { isAuthenticated, isOwner } from "../middleware";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
  router.get(
    "/users/:id/scores",
    isAuthenticated,
    isOwner,
    retrieveScoresByUser
  );
  router.get(
    "/users/:userId/typingtests/:typingTestId/scores",
    isAuthenticated,
    retrieveScoresByUserAndTypingTest
  );
  router.get(
    "/users/:userId/typingtests/:typingTestId/scores/:date",
    isAuthenticated,
    retrieveScoresByUserAndTypingTestAndDate
  );
};
