const jwt = require("jsonwebtoken");

const generateJWT = (email) => {
  const token = jwt.sign(email, "secret");
  return token;
};

module.exports = generateJWT;
