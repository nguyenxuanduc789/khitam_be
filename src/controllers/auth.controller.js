const AuthService = require("../services/auth.service");

const { OK, CREATED, SuccessResponse } = require("../core/success.response");
class AuthController {
  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await AuthService.logout(req.keyStore._id),
    }).send(res);
  };
  login = async (req, res, next) => {
    new SuccessResponse({
      status_code: 200,
      message: "Login successfully",
      data: await AuthService.login(req.body),
    }).send(res);
  };
  register = async (req, res, next) => {
    try {
      new CREATED({
        status_code: 200,
        message: "SignUp successfully",
        data: await AuthService.signUp(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  forgotPassword  = async (req, res, next) => {
    try {
      new SuccessResponse({
        status_code: 200,
        message: "forgotPassword_otp successfully",
        data: await AuthService.forgotPassword(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  sendCodeEmail = async (req, res, next) => {
    try {
      new SuccessResponse({
        status_code: 200,
        message: "Send code with email successfully",
        data: await AuthService.sendCodeEmail(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  verifyEmail = async (req, res, next) => {
    try {
      new SuccessResponse({
        status_code: 200,
        message: "Verify code",
        data: await AuthService.verifyEmail(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  
  // me = async (req, res, next) => {
  //     try {
  //         new CREATED({
  //             message: "Registered",
  //             metadata: await AuthService.me(req),
  //             options: {
  //                 limit: 10
  //             }
  //         }).send(res);
  //         //return res.status(201).json(await AccessService.signUp(req.body))
  //     } catch (error) {
  //         next(error)
  //     }
  // }
}
module.exports = new AuthController();
