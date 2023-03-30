const jwt = require("jsonwebtoken");

exports.generateJWT = (email) => {
  const token = jwt.sign(email, "secret");
  return token;
};
