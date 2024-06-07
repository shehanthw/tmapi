import express from "express";
import {
  deleteUserById,
  getUsers,
  UserModel,
  getUserById,
} from "../models/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    return res.status(200).json(deletedUser);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();
    return res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const getUserUsingId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};
