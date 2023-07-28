import express from "express";

import authentication from "./authentication";
import users from "./users";
import typingTests from "./typingTests";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  typingTests(router);

  return router;
};
