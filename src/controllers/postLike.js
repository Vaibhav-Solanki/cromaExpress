const express = require("express");
const res = require("express/lib/response");
const postModel = require("../models/PostLike");
const upload = require("../configs/multer");
const { body, validationResult } = require("express-validator");
const authenticate = require("../mid/auth");
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  req.userId = req.user._id;
  try {
    const newPost = await postModel.create(req.body);
    res.status(200).send(newPost);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allpost = await postModel
      .find()
      .populate("userId")
      .populate("postId")
      .lean()
      .exec();
    res.status(200).send(allpost);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

module.exports = router;
