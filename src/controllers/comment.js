const express = require("express");
const res = require("express/lib/response");
const postModel = require("../models/Comment");
const { body, validationResult } = require("express-validator");
const authenticate = require("../mid/auth");
const router = express.Router();

router.post(
  "/",
  authenticate,
  body("body").notEmpty().isString(),
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newPost = await postModel.create(req.body);
      res.status(200).send(newPost);
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const allpost = await postModel
      .find()
      .populate("postId")
      .populate("userId")
      .lean()
      .exec();
    res.status(200).send(allpost);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});
module.exports = router;
