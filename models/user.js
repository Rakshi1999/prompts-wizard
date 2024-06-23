import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: "string",
    unique: [true, "Email Already Exists"],
    required: [true, "Email Is Required"],
  },
  username: {
    type: "string",
    required: [true, "Username Is Required"],
  },
  image: {
    type: "string",
  },
});

const User = models.User || model("User", userSchema);

export default User;
