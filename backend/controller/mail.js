const Mail = require("../models/mail");
const mongoose = require("mongoose");

exports.sendMail = async (req, res) => {
  try {
    const { to, cc, bcc, subject, message } = req.body;
    console.log(req.body);

    const mail = new Mail({
      userId: req.user._id,
      from: req.user.email,
      to,
      cc,
      bcc,
      subject,
      message,
    });

    mail.save().then(() => {
      return res
        .status(200)
        .json({ status: true, msg: "mail send successfully" });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllMails = async (req, res) => {
  try {
    const to = req.user.email;
    const mails = await Mail.find({ to });
    if (!mails) {
      return res.json({ status: false, msg: "No Mails Present" });
    } else {
      return res.json({ status: true, mails });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getUnreadMailsCount = async (req, res) => {
  try {
    const to = req.user.email;
    const mails = await Mail.find({ to });
    let count = 0;
    mails.map((mail) => {
      if (!mail.isRead) {
        count++;
      }
    });
    res.json({ status: true, count });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteMail = async (req, res) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.body);
    const response = await Mail.deleteOne({ _id });
    console.log(response);
    if (response) {
      return res.json({
        status: true,
        msg: "mail deleted successfully",
        response,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getMailDetails = async (req, res) => {
  try {
    const { id } = req.body;
    const mail = await Mail.findById(id);
    res.json({ status: true, mail });
  } catch (err) {
    console.log(err);
  }
};

exports.postReadMail = async (req, res) => {
  try {
    const { id } = req.body;
    const mail = await Mail.findById(id);
    mail.isRead = true;
    mail.save().then(() => {
      return res.json({ status: true, mail });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getSendMails = async (req, res) => {
  try {
    const { email } = req.user;
    const mails = await Mail.find({ from: email });
    return res.json({ status: true, mails });
  } catch (err) {
    console.log(err);
  }
};
