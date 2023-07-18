const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGO_URL);
};

const disconnectDB = (done) => {
  return mongoose.disconnect(done);
};

module.exports = { connectDB, disconnectDB };
