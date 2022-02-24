const express = require("express");
const res = require("express/lib/response");
const postModel = require("../models/post");
const upload = require("../configs/multer");
const { body, validationResult } = require("express-validator");
const authenticate = require("../mid/auth");
const router = express.Router();

router.post(
  "/",
  authenticate,
  body("body").isString(),
  body("image").isString(),
  body("likes").isNumeric(),
  upload.single("image"),
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.image = req.file.path;
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
      .limit(10)
      .populate("userId")
      .lean()
      .exec();
    res.status(200).send(allpost);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const allpost = await postModel
      .findById(req.params.id)
      .limit(10)
      .populate("userId")
      .lean()
      .exec();
    if (allpost.userId != req.user._id)
      return res.status(200).send("User not aorthorised");
    await postModel.findByIdAndDelete(req.params.id);
    return res.status(200).send("post deletted");
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

module.exports = router;
