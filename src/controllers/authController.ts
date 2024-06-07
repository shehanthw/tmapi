import express from "express";
import { getUserByEmail, createUser } from "../models/users";
import { authentication, random } from "../helpers";
import envConfigs from "../config/envConfig";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email & password required!" })
        .end();
    }

    const user: any = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (user.length <= 0) {
      return res.status(400).json({ error: "User is not registered" }).end();
    }

    const expectedHash = authentication(user[0].authentication.salt, password);

    if (user[0].authentication.password != expectedHash) {
      return res.status(403).json({ error: "Incorrect password" }).end();
    }

    const salt = random();
    user[0].authentication.sessionToken = authentication(
      salt,
      user[0]._id.toString()
    );

    await user[0].save();

    res.cookie(envConfigs.SECRET_TOKEN, user[0].authentication.sessionToken, {
      domain:
        envConfigs.NODE_ENV === "production"
          ? "tmapi-blue.vercel.app"
          : "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json(user).end();
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ error: "Email, Password, Username required" })
        .end();
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists!" }).end();
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};
