import express from "express";
import auth from "./auth";
import users from "./users";
import groups from "./groups";
import tasks from "./tasks";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  users(router);
  groups(router);
  tasks(router);
  return router;
};
