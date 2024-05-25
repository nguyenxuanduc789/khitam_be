'use strict'
const mongoose = require('mongoose');
// const { countConnect } = require('../helpers/check.connect');


// mongoose.connect(connectString).then(_ => console.log('Connect')).catch(err => console.log('Error  Connect'));
const { db: { host, name, port, hostname, password } } = require('../configs/config.mongdb')
//const connectString = `mongodb://${hostname}:${password}@${host}:${port}/${name}`;
const connectString = process.env.URL_CLOUD_MONGO;
console.log(process.env.URL_CLOUD_MONGO )
class Database {
    constructor() {
        this.connect()
    }

    async connect(type = 'mongodb') {
        const port = 27017;
        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then(_ => {
            console.log('Connected Mongodb Success')
        })
        .catch(err => console.log(err))
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}
const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb;