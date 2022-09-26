import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { JWT_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userValidate = await User.findOne({ email });
    if (userValidate) {
      return res
        .status(400)
        .json({ errorMessage: "User already exists with that email" });
    }
    const user = new User({ name, email, password });
    user.password = await user.hashPassword(password);
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        name,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).json({ name: user.name, token });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: "The credentials are not correct" });
    }

    const validPassword = await user.validatePassword(password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ errorMessage: "The password is not correct" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).json({ name: user.name, token });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

export const revalidateToken = (req, res) => {
  const { id, name } = req;

  const token = jwt.sign(
    {
      id,
      name,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return res.status(200).json({ name, token });
};
