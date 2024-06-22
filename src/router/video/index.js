const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload");
const VideoController = require("../../controllers/video.controller");

// Endpoint for uploading video
router.post("/video/upload", upload, VideoController.uploadVideo);

module.exports = router;
