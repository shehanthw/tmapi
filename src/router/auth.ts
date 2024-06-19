import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/authController";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);
  router.get("/auth/check-auth", checkAuth);
};
