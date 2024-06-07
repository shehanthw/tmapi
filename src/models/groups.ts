import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    authentication: {
      password: {
        type: String,
        required: [true, "Please provide a password"],
        select: false,
      },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: String) => UserModel.find({ email });
export const getUserBySessionToken = (token: String) =>
  UserModel.find({ "authentication.sessionToken": token });
export const getUserById = (id: String) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user: any) => user.toObject());
export const deleteUserById = (id: String) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: String, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
