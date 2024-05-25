'use strict'

const { findByEmail } = require("../models/repositories/user.repository")
const { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenRequestError } = require('../core/error.response')
const userModel = require("../models/user.model")
const { createTokenPair, verifyJWT } = require("../auth/authUtils")
const { getInfoData, convertToObjectIdMongodb } = require("../utils")
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const { ObjectId } = require("mongodb")
class UserService {

    static view = async () => {
        const users = await userModel.find({}).lean()
        return {
            code: 201,
            metadata: {
                data: users
            }
        }
    }
    static create = async ({ body }) => {
        const users = await userModel.find({}).lean()
        return {
            code: 201,
            metadata: {
                data: users
            }
        }
    }
    static update = async ({ body }) => {
        const { user_id, name, email } = body;
        const query = {
            //email:email,
            _id: convertToObjectIdMongodb(user_id),
        }, updateSet = {
            name: name
        }, options = { upsert: true, new: true }
        return await userModel.findOneAndUpdate(query, updateSet, options)
    }
    static delete = async ({ body }) => {
        const { user_id } = body;
        const deleted = await userModel.deleteOne({
            _id: convertToObjectIdMongodb(user_id),
        })
       
        return {
            code: 201,
            metadata: {
                data: deleted
            }
        }
    }
    static test_proceduce = async ({ body }) => {
        const rabbitMQ = global._rabbitmq;
        const test = await rabbitMQ.producerMessage("ok","ok");
       
        const sql = global._sql;
        const result = sql.query("select * from test").execute();
        return {
            code: 201,
            metadata: {
                data: "`deleted`"
            }
        }
    }
    static test_consume = async ({ body }) => {
        const rabbitMQ = global._rabbitmq;
        const test_resume= await rabbitMQ.consumerMessage("ok");
        
        return {
            code: 201,  
            metadata: {
                data: "`deleted`"
            }
        }
    }
}
module.exports = UserService