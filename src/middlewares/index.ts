import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../models/users";
import envConfigs from "../config/envConfig";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const userId: any = get(req, "identity[0]._id");
    const currentUserId = userId?.toString();
    if (!currentUserId) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    if (currentUserId !== id) {
      return res
        .status(403)
        .json({ error: "User is not the owner of this resource" });
    }

    res.cookie(envConfigs.SECRET_TOKEN, "", { expires: new Date(0) });

    next();
  } catch (error: any) {
    console.error(error.message);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessiontoken = req.cookies[envConfigs.SECRET_TOKEN];

    if (!sessiontoken) {
      return res.status(400).json({ error: "Not Authenticated" }).end();
    }

    const existingUser = await getUserBySessionToken(sessiontoken);

    if (!existingUser) {
      return res.status(403).json({ error: "Not Authenticated" }).end();
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message }).end();
  }
};
