const router = require("express").Router();
const userController = require("../controller/user");

router.post("/user_signup", userController.postUserDetails);

module.exports = router;
