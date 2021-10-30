const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router({ mergeParams: true }); // what is mergeParams? https://expressjs.com/zh-tw/api.html

// router.use(authController.protect);

router
  .route("/status")
  .post(projectController.updateProjectStatus, projectController.updatePeCount)
  .get(projectController.getProjectStatus);
router.route("/list").get(projectController.getProjectList);
router.route("/ghostList").get(projectController.getProjectGhostList);
module.exports = router;
