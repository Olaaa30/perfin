const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcryptjs = require("bcryptjs");

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;

  const options = {
    expiresIn: "3h",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const checkTokenValidity = (value, otherValue) => {
  return bcryptjs.compareSync(value, otherValue);
};

const generateSecurePassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);

  return bcryptjs.hashSync(password, salt);
};

module.exports = { 
    generateToken, 
    verifyToken, 
    checkTokenValidity,
    generateSecurePassword
};
