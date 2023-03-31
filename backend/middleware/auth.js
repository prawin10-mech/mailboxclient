const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.auth = async (req, res, next) => {
  const token = req.headers.authorization;
  const email = jwt.verify(token, "secret");
  const user = await User.findOne({ email });
  req.user = user;
  next();
};
