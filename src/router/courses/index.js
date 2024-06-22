const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");

const coursesController = require("../../controllers/courses.controller");

// Define routes
router.post("/courses/", asyncHandler(coursesController.create));
router.get("/courses/", coursesController.viewAll);
router.get("/courses/:id", asyncHandler(coursesController.getVideoToCourse));
router.get(
  "/courses/video/:videoId",
  asyncHandler(coursesController.streamVideo)
);
module.exports = router;
