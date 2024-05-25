'use strict'
const UserService = require('../services/user.service')

const { OK, CREATED, SuccessResponse } = require('../core/success.response')
class UserController {
    view = async (req, res, next) => {
        
        new SuccessResponse({
            message: "View success",
            metadata: await UserService.view()
        }).send(res)
    }
    create = async (req, res, next) => {
        new SuccessResponse({
            message: "Create success",
            metadata: await UserService.create({body : req.body})
        }).send(res)
    }
    update = async (req, res, next) => {
        new SuccessResponse({
            message: "Update success",
            metadata: await UserService.update({body : req.body})
        }).send(res)
    }
    delete = async (req, res, next) => {
        new SuccessResponse({
            message: "Delete success",
            metadata: await UserService.delete({body : req.body})
        }).send(res)
    }
    test_proceduce = async (req, res, next) => {
        new SuccessResponse({
            message: "test_proceduce success",
            metadata: await UserService.test_proceduce({body : req.body})
        }).send(res)
    }
    test_consume = async (req, res, next) => {
        
        new SuccessResponse({
            message: "test_consume success",
            metadata: await UserService.test_consume({body : req.body})
        }).send(res)
    }


}
module.exports = new UserController();