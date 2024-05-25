"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");
router.post(
  "/user/test_proceduce",
  asyncHandler(userController.test_proceduce)
);
router.post("/user/test_consume", asyncHandler(userController.test_consume));
//router.use(authenticationV2)
router.post("/user/view", asyncHandler(userController.view));
router.post("/user/create", asyncHandler(userController.create));
router.post("/user/update", asyncHandler(userController.update));
router.post("/user/delete", asyncHandler(userController.delete));

/////////////////////////////

module.exports = router;
