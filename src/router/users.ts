import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserUsingId,
  updateUser,
} from "../controllers/usersController";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.get("/users/:id", isAuthenticated, getUserUsingId);
  router.put("/users/:id", isAuthenticated, isOwner, updateUser);
};
