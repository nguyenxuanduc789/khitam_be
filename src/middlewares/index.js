'use strict'
const Logger = require('../loggers/discord.log.v2')

const pushToLogDiscord = async (req, res, next) => {
    try {
        //Logger.sendToMessage(`this is :: ${req.get('host')}`)

        Logger.sendToFormatCode({
            title: `Method : ${req.method}`,
            code: req.method === 'GET' ? req.query : req.body,
            message: `${req.get('host')} ${req.originalUrl}`
        })
        return next()
    } catch (error) {

    }
}
const pushToLogError =async(paramError)=>{
    try {
        //Logger.sendToMessage(`this is :: ${req.get('host')}`)

        Logger.sendToFormatCode({
            title: `ERRORRRRRR.............`,
            code: paramError,
          
        })
        return next()
    } catch (error) {

    }
}
const pushToLogPerformance =async(message)=>{
    try {
        //Logger.sendToMessage(`this is :: ${req.get('host')}`)

        Logger.sendToMessage(message)
        return next()
    } catch (error) {

    }
}
module.exports = {
    pushToLogDiscord,
    pushToLogError,
    pushToLogPerformance
}