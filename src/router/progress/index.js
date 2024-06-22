const express = require("express");
const router = express.Router();
const ProgressController = require("../../controllers/progress.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");

router.post(
  "/progress/update",
  asyncHandler(ProgressController.updateProgress)
);
router.get("/progress/get", asyncHandler(ProgressController.getProgress));
router.post(
  "/progress/update-progress",
  asyncHandler(ProgressController.updateProgress)
);
module.exports = router;
