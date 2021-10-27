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
  )
  .get(queryController.getQuries);

router
  .route("/manyAnswer")
  .get(
    queryController.getOneQueryId,
    queryController.getManyAnswerByOneQueryId
  );

router
  .route("/oneAnswer")
  .get(queryController.getOneQueryId, queryController.getOneAnswerByOneQueryId);

router
  .route("/manyAnswerManyQueryId")
  .get(queryController.getManyAnswerByManyQueryId);
module.exports = router;
