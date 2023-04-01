const router = require("express").Router();

const mailController = require("../controller/mail");
const middleware = require("../middleware/auth");

router.post("/send_mail", middleware.auth, mailController.sendMail);

router.get("/getAllMails", middleware.auth, mailController.getAllMails);

router.get(
  "/getUnreadMailsCount",
  middleware.auth,
  mailController.getUnreadMailsCount
);

router.post("/deleteMail", mailController.deleteMail);

router.post("/getMail", middleware.auth, mailController.getMailDetails);

router.post("/mail/readed", middleware.auth, mailController.postReadMail);

router.get("/getSendMails", middleware.auth, mailController.getSendMails);

module.exports = router;
