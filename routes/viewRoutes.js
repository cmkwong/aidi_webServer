const express = require("express");
const viewController = require("../controller/viewsController");
const authController = require("../controller/authController");
const router = express.Router();

router.route("/").get(viewController.viewLogin);
router
  .route("/projectStatus")
  .get(authController.protect, viewController.viewProjectStatus);

module.exports = router;
