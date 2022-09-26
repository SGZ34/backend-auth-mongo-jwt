import { Schema, model } from "mongoose";
import bcrpyt from "bcrypt";

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return re.test(email);
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [validateEmail, "please type a valid email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.hashPassword = async (password) => {
  return bcrpyt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
  return bcrpyt.compare(password, this.password);
};

export default model("User", userSchema);
