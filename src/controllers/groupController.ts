import express from "express";
import {
  deleteGroupById,
  getGroups,
  getGroupById,
  getGroupByMember,
  createGroup,
} from "../models/groups";
import { get } from "lodash";
import { getUserById } from "../models/users";

export const getAllGroups = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const groups = await getGroups();
    return res.status(200).json(groups);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const deleteGroup = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const userId: any = get(req, "identity[0]._id");
    const currentUserId = userId?.toString();
    const user = await getUserById(currentUserId);
    const group = await getGroupById(id);

    if (user.email != group.creator) {
      return res
        .status(403)
        .json({ error: "Only creator can delete the group" })
        .end();
    }

    const deletedGroup = await deleteGroupById(id);
    return res.status(200).json(deletedGroup);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const updateGroup = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { members, title, description } = req.body;
    const userId: any = get(req, "identity[0]._id");
    const currentUserId = userId?.toString();

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const user = await getUserById(currentUserId);
    const group = await getGroupById(id);

    if (user.email != group.creator) {
      return res
        .status(403)
        .json({ error: "Only creator can update the group" })
        .end();
    }

    group.title = title;
    group.members = members;
    group.description = description;

    await group.save();
    return res.status(200).json(group);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const getGroupUsingId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const group = await getGroupById(id);
    return res.status(200).json(group);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const getGroupsUsingMember = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.params;
    const groups = await getGroupByMember(email);
    return res.status(200).json(groups);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};

export const storeGroup = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title } = req.body;
    const data = req.body;
    const userId: any = get(req, "identity[0]._id");
    const currentUserId = userId?.toString();

    const user = await getUserById(currentUserId);

    data.creator = user.email;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const group = await createGroup(data);
    return res.status(200).json(group);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message }).end();
  }
};
