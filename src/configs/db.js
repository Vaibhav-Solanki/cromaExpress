require("dotenv").config();
const mongoose = require("mongoose");
module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://VaibhavDasss:${process.env.link}@onenetwork.ozbbj.mongodb.net/croma?authSource=admin&replicaSet=atlas-41l93k-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`
  );
};
