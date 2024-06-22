"use strict";
const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");
// const { otpLimiter } = require("src/library/Mail/init.rateLimit");

//Sign Up

router.post("/auth/register", asyncHandler(authController.register));
router.post("/auth/login", asyncHandler(authController.login));
router.post("/auth/send_code", asyncHandler(authController.sendCodeEmail));
// router.post("/auth/send_code",otpLimiter, asyncHandler(authController.sendCodeEmail));
router.post("/auth/verify_code", asyncHandler(authController.verifyEmail));
//authentication

//router.use(authenticationV2);
router.post(
  "/auth/handleRefreshToken",
  asyncHandler(authController.refreshToken)
);

router.get("/auth/me", asyncHandler(authController.me));
router.post("/auth/logout", asyncHandler(authController.logout));

/////////////////////////////

module.exports = router;
