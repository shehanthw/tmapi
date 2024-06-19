import express from "express";
import {
  deleteGroup,
  getAllGroups,
  getGroupUsingId,
  updateGroup,
  getGroupsUsingMember,
  storeGroup,
} from "../controllers/groupController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/groups", isAuthenticated, getAllGroups);
  router.delete("/groups/:id", isAuthenticated, deleteGroup);
  router.get("/groups/:id", isAuthenticated, getGroupUsingId);
  router.get("/groups/filter/:email", isAuthenticated, getGroupsUsingMember);
  router.put("/groups/:id", isAuthenticated, updateGroup);
  router.post("/groups", isAuthenticated, storeGroup);
};
