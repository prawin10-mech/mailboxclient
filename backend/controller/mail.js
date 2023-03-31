const Mail = require("../models/mail");

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
    const mails = await Mail.find({ to: "prawin10@outlook.com" });
    if (!mails) {
      return res.json({ status: false, msg: "No Mails Present" });
    } else {
      return res.json({ status: true, mails });
    }
  } catch (err) {
    console.log(err);
  }
};
