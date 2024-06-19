import express from "express";
import {
  deleteTask,
  getAllTasks,
  getTaskUsingId,
  updateTask,
  getTaskUsingGroup,
  storeTask,
} from "../controllers/taskController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/tasks", isAuthenticated, getAllTasks);
  router.delete("/tasks/:id", isAuthenticated, deleteTask);
  router.get("/tasks/:id", isAuthenticated, getTaskUsingId);
  router.get("/tasks/filter/:email", isAuthenticated, getTaskUsingGroup);
  router.put("/tasks/:id", isAuthenticated, updateTask);
  router.post("/tasks", isAuthenticated, storeTask);
};
