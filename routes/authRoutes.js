const express = require("express");
const authController = require("../controller/authController");

const router = express.Router({ mergeParams: true }); // what is mergeParams? https://expressjs.com/zh-tw/api.html

// router.use(authController.protect);

router.route("/token").post(authController.getToken);
module.exports = router;
