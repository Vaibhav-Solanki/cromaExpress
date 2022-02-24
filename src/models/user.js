const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    profileImages: [{ type: String, required: true }],
    password: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", function (next) {
  let tmp = bcrypt.hashSync(this.password, 8);
  this.password = tmp;
  return next();
});
userSchema.methods.passwordMatch = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
