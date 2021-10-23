const express = require("express");
const queryController = require("../controller/queryController");

const router = express.Router({ mergeParams: true }); // what is mergeParams? https://expressjs.com/zh-tw/api.html

// router.use(authController.protect);

router
  .route("/")
  .post(
    queryController.updateQuery,
    queryController.answerInsertAllowed,
    queryController.updateAnswer
  );

router.route("/answer").get(queryController.getAnswer);

module.exports = router;
