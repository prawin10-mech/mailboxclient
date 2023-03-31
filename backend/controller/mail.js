const Mail = require("../models/mail");

exports.sendMail = async (req, res) => {
  try {
    const { to, cc, bcc, subject, message } = req.body;
    console.log(req.body);

    const mail = new Mail({
      userId: req.user._id,
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
    console.log("failed");
    console.log(err);
  }
};
