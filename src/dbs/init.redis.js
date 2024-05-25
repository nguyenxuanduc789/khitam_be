'use strict'
const { createClient } = require('redis');
class Redis {
    constructor() {
        this.client = null
        this.connect()
    }

    async connect() {
        createClient({
            url: "redis://default:WF4Mk5a6BAd65qJaPMJhlwU0drAuWvtx@redis-15475.c321.us-east-1-2.ec2.cloud.redislabs.com:15475"
        }).connect().then(async _ => {
            console.log('Redis client connected with URI')
            this.client = _;
           
        }).catch((err) => {
            console.log('err happened' + err);
        });
        
    }
    static getInstance() {
        if (!Redis.instance) {
            Redis.instance = new Redis()
        }
        return Redis.instance
    }
}
const clientRedis = Redis.getInstance()
module.exports = clientRedis;