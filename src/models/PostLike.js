const mongoose = require("mongoose");
const postLikeSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Types.ObjectId, required: true, ref: "post" },
    userId: [{ type: mongoose.Types.ObjectId, required: true, ref: "user" }],
  },
  { versionKey: false, timestamps: false }
);
module.exports = mongoose.model("postLike", postLikeSchema);
