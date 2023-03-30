const generateJwt = require("../services/generateJWT");
const User = require("../models/user");
const generateHash = require("../services/generateHashedPassword");
const sendOtp = require("../services/sendOtp");
const bcrypt = require("bcrypt");

exports.postUserDetails = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck && userCheck.isVerified) {
      return res.json({
        status: false,
        msg: "User Already exists please try to login",
      });
    } else if (userCheck && !userCheck.isVerfied) {
      const hash = await generateHash(password);
      await User.deleteOne({ email });
      const user = new User({
        email,
        password: hash,
      });
      user.otp = await sendOtp(email);
      user.save().then(() => {
        return res.status(200).json({ status: true, user });
      });
    } else {
      await User.deleteOne({ email });
      const hash = await generateHash(password);
      const user = new User({
        email,
        password: hash,
      });
      user.otp = await sendOtp(email);
      user.save().then(() => {
        return res.status(200).json({ status: true, user });
      });
    }
  } catch (err) {
    return res.json({ status: false, message: "please try again later" });
  }
};

exports.verifyUser = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email: email });
  if (user.otp !== otp) {
    return res.json({ status: false, msg: "Please enter valid OTP" });
  } else {
    user.isVerified = true;
    user.save().then(() => {
      return res.json({ status: true, user });
    });
  }
};

exports.postLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: false,
        msg: "User not found Please try to sign Up",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({ status: false, msg: "Incorrect email or password" });
    } else {
      const token = await generateJwt(email);
      return res.json({ status: true, token });
    }
  } catch (err) {
    console.log(err);
  }
};
