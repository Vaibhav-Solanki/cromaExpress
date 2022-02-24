const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    body: { type: String, required: false },
    likes: { type: String, required: false, default: 0 },
    image: { type: String, required: false },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);
module.exports = mongoose.model("post", postSchema);
