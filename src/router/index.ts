import express from "express";

import authentication from "./authentication";
import users from "./users";
import typingTests from "./typingTests";
import scores from "./scores";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  typingTests(router);
  scores(router);
  return router;
};
