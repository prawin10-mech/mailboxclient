const router = require("express").Router();

const mailController = require("../controller/mail");
const middleware = require("../middleware/auth");

router.post("/send_mail", middleware.auth, mailController.sendMail);

module.exports = router;
