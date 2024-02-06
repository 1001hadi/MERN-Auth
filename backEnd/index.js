import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use("/auth", UserRouter);
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.COMPASS_URI);
    console.log("conected to compass");
  } catch (error) {
    throw error;
  }
};

app.listen(process.env.PORT, () => {
  connect();
  console.log("Connected to Server");
});
