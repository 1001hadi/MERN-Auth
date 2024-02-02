import express from "express";
import bcryt from "bcrypt";

const router = express.Router();

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
});
