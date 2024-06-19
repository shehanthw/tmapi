import express from "express";
import mongoose from "mongoose";
import {
  deleteTaskById,
  getTasks,
  getTasksByGroup,
  getTaskById,
  createTask,
  updateTaskById,
} from "../models/tasks";
import { get } from "lodash";
import { getGroupById } from "../models/groups";

export const getAllTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tasks = await getTasks();
    return res.status(200).json(tasks);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedtask = await deleteTaskById(id);
    return res.status(200).json(deletedtask);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const updateTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await getTaskById(id);

    task.title = title;
    task.status = status;
    task.description = description;

    await task.save();
    return res.status(200).json(task);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const getTaskUsingId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);
    return res.status(200).json(task);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const getTaskUsingGroup = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const tasks = await getTasksByGroup(id);
    return res.status(200).json(tasks);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const storeTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = req.body;
    const { group } = req.body;

    if (!mongoose.Types.ObjectId.isValid(group)) {
      return res.status(400).json({ error: "Invalid Group ID format" });
    }

    const isGroup = await getGroupById(group);
    console.log(res);

    if (!isGroup) {
      return res.status(400).json({ error: "Invalid Group" });
    }

    const task = await createTask(data);
    return res.status(200).json(task);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};
