import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
    },
    description: {
      type: String,
    },
    group: {
      type: String,
      required: [true, "Please provide a group"],
    },
    status: {
      type: String,
      required: [true, "Please provide a status"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const TaskModel =
  mongoose.models.Task || mongoose.model("Task", TaskSchema);

export const getTasks = () => TaskModel.find();
export const getTasksByGroup = (id: String) => TaskModel.find({ group: id });
export const getTaskById = (id: String) => TaskModel.findById(id);

export const createTask = (values: Record<string, any>) =>
  new TaskModel(values).save().then((Task: any) => Task.toObject());

export const deleteTaskById = (id: String) => TaskModel.findByIdAndDelete(id);
export const updateTaskById = (id: String, values: Record<string, any>) =>
  TaskModel.findByIdAndUpdate(id, values);
