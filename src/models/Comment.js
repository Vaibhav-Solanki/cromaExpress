const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "post",
    },
  },
  { versionKey: false, timestamps: true }
);
module.exports = mongoose.model("Comment", CommentSchema);
