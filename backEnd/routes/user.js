import express from "express";
import bcryt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv, { decrypt } from "dotenv";
import nodemailer from "nodemailer";

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

router.post("/password-recovery", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Enter valid email!" });
    }
    const token = jwt.sign({ id: user.id }, process.env.KEY, {
      expiresIn: "5m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hadi88jaf@gmail.com",
        pass: "wabj sqsd vsxf xbco",
      },
    });

    const mailOptions = {
      from: "hadi88jaf@gmail.com",
      to: email,
      subject: "Password Recovery",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        return res.json({ message: "Error, can't send email!" });
      } else {
        return res.json({
          status: true,
          message: "Email sent, check your inbox.",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decodedPass = await jwt.verify(token, process.env.KEY);
    const id = decodedPass.id;
    const hassPass = await bcryt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hassPass });
    return res.json({ status: true, message: "Password Updated" });
  } catch (err) {
    return res.json("invalid Token!");
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "invalid Token!" });
    }
    const decoded = await jwt.verify(token, process.env.key);
    next();
  } catch (err) {
    return res.json(err);
  }
};

router.get("/verify", (req, res) => {
  return res.json({ status: true, message: "You are athorized" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});

export { router as UserRouter };
