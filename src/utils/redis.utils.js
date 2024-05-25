// lay ip user

const clientRedis = require("./../../src/dbs/init.redis");
//const client = require('../configs/config.redis');

const get = async (key) => {
    return new Promise((resolve, reject) => {
        clientRedis.client.get(key).then(data => resolve(data)).catch(err => reject(err))
    })
}

// co the set nhieu lan
const set = async (key, value,option) => {
    return new Promise((resolve, reject) => {
        clientRedis.client.set(key, value,option).then(data => resolve(data)).catch(err => reject(err))
    });
}

// set 1 lan duy nhat
const setnx = async (key, value) => {
    return new Promise((resolve, reject) => {
        clientRedis.client.setnx(key, value).then(data => resolve(data)).catch(err => reject(err))
    })
}

// cache tu dong tang with redis
const incr = key => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        clientRedis.client.incr(key).then(data => resolve(data)).catch(err => reject(err))
    });
}

const decrby = async (key, count) => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        clientRedis.client.decrby(key, count).then(data => resolve(data)).catch(err => reject(err))
    });
}

// expire key redis
const expire = (key, ttl) => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        clientRedis.client.expire(key, ttl).then(data => resolve(data)).catch(err => reject(err))
    });
}

// get ttl thoi gian het han con lai
const ttl = (key) => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        clientRedis.client.ttl(key).then(data => resolve(data)).catch(err => reject(err))
    });
}

const exists = async (key) => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        clientRedis.client.exists(key).then(data => resolve(data)).catch(err => reject(err))
    });
}

module.exports = {
    get,
    set,
    setnx,
    incr,
    decrby,
    expire,
    exists,
    ttl,
}