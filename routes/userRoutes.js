const express = require("express");
const userController = require("../controller/userController");

const router = express.Router({ mergeParams: true }); // what is mergeParams? https://expressjs.com/zh-tw/api.html

// router.use(authController.protect);

router.route("/").get(userController.getUser);
router.route("/expired").get(userController.getExpiredDate);
module.exports = router;
