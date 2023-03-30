const router = require("express").Router();
const userController = require("../controller/user");

router.post("/user_signup", userController.postUserDetails);

router.post("/verify_otp", userController.verifyUser);

router.post("/user_login", userController.postLoginUser);

module.exports = router;
