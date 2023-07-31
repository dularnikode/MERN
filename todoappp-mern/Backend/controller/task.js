import ErrorHandler from "../middleware/error.js";
import Task from "../models/task.js";

const createNewTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task Added Successfully.",
      task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return next(new ErrorHandler("Task Not Found", 404));
    }
    await task.deleteOne();
    res.status(204).json({
      success: true,
      message: "Task Deleted Successfully.",
    });
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return next(new ErrorHandler("Task Not Found", 404));
    }
    task.isCompleted = !task.isCompleted;

    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getAllTaskOfUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    if (tasks.length) {
      return res.status(200).json({
        success: true,
        tasks,
      });
    }
    return res.status(404).json({
      success: false,
      tasks: [],
      message: "No tasks found for user",
    });
  } catch (error) {
    next(error);
  }
};

export { createNewTask, deleteTask, updateTask, getAllTaskOfUser };
