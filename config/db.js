const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(logger.info(`Connected to Database`))
    .catch((error) => {
      logger.error(`Failed to connect to Database`);
    });
};

module.exports = connectDB;
