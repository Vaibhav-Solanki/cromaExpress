require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.jwt_secret);
};

const register = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // res.status(400).send({ body: req.body });
  req.body.profileImages = req.files.map(({ path }) => path);
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user)
      return res.status(400).send({ message: "Please try another email" });
    user = await User.create(req.body);
    const token = newToken(user);
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: "email not registered" });
    const match = user.passwordMatch(req.body.password);

    if (!match)
      return res.status(400).send({ message: "password is not correct" });
    const token = newToken(user);
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { register, login };
