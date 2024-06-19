// middleware/authenticate.js
import express from "express";
import { getUserBySessionToken } from "../models/users";
import envConfigs from "../config/envConfig";

export const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[envConfigs.SECRET_TOKEN];

    if (!sessionToken) {
      return res.status(401).json({ error: "Not authenticated" }).end();
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(401).json({ error: "Invalid session token" }).end();
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "An error occurred" }).end();
  }
};
