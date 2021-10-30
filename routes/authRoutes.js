const express = require("express");
const authController = require("../controller/authController");

const router = express.Router({ mergeParams: true }); // what is mergeParams? https://expressjs.com/zh-tw/api.html

// router.use(authController.protect);

router.route("/token").post(authController.getToken);
router.route("/user/login").post(authController.login);
router.route("/user/logout").post(authController.login); // not completed
module.exports = router;
