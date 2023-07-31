import express from "express";
import {
  createNewTask,
  deleteTask,
  getAllTaskOfUser,
  updateTask,
} from "../controller/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const taskRoutes = express.Router();

taskRoutes.post("/new", isAuthenticated, createNewTask);

taskRoutes.get("/all", isAuthenticated, getAllTaskOfUser);

taskRoutes
  .route("/:taskId")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default taskRoutes;
