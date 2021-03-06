const express = require("express");
const systemController = require("../controller/systemController");

const router = express.Router({ mergeParams: true }); // what is mergeParams? https://expressjs.com/zh-tw/api.html

// router.use(authController.protect);

router.route("/version").get(systemController.getVersion);
router
  .route("/clientsHealthStatus")
  .post(systemController.getClientsHealthStatus);

router
  .route("/checkersHealthStatus")
  .post(systemController.getCheckersHealthStatus);
module.exports = router;
