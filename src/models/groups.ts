import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: [true, "Please provide the creators email"],
    },
    members: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
  },
  { timestamps: true }
);

export const GroupModel =
  mongoose.models.Group || mongoose.model("Group", GroupSchema);

export const getGroups = () => GroupModel.find();
export const getGroupByCreator = (creator: String) =>
  GroupModel.find({ creator });
export const getGroupById = (id: String) => GroupModel.findById(id);
export const getGroupByMember = (email: String) =>
  GroupModel.find({
    $or: [{ creator: email }, { members: email }],
  });
export const createGroup = (values: Record<string, any>) =>
  new GroupModel(values).save().then((Group: any) => Group.toObject());
export const deleteGroupById = (id: String) => GroupModel.findByIdAndDelete(id);
export const updateGroupById = (id: String, values: Record<string, any>) =>
  GroupModel.findByIdAndUpdate(id, values);
