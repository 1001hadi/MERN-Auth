import express from "express";
import bcryt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "Existed User!" });
  }
  const hashPass = await bcryt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPass,
  });

  await newUser.save();
  return res.json({ status: true, message: "User has been rejistred." });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "No matched Account found!" });
  }

  const validPass = await bcryt.compare(password, user.password);
  if (!validPass) {
    return res.json({ message: "Incurrect Password!" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  return res.json({ status: true, message: "Login was successfull" });
});

export { router as UserRouter };
