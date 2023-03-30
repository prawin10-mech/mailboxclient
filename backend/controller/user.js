const User = require("../models/user");
const generateHash = require("../services/generateHashedPassword");

exports.postUserDetails = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res.json({
        status: false,
        msg: "User Already exists please try to login",
      });
    } else {
      const hash = await generateHash(password);
      const user = new User({
        email,
        password: hash,
      });
      user.save().then(() => {
        return res.status(200).json({ status: true, user });
      });
    }
  } catch (err) {
    return res.json({ status: false, message: "please try again later" });
  }
};
