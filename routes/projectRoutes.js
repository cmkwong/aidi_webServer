const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router({ mergeParams: true }); // what is mergeParams? https://expressjs.com/zh-tw/api.html

// router.use(authController.protect);

router.route("/status").post(projectController.updateProjectStatus);
router
  .route("/qa")
  .post(projectController.updateQuery, projectController.updateAnswer);
router.route("/list").get(projectController.getProjectList);
module.exports = router;
