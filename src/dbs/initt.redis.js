const redis = require('redis');
const { RedisRequestError } = require('./../core/error.response');

let client ={}, statusConnectRedis={
    CONNECT:"connect",
    END:'end',
    RECONNECT:'reconnecting',
    ERROR:'error'
},connectTimeout
const REDIS_CONNECT_TIMEOUT = 10000, REDIS_CONNECT_MESSAGE={
    code: -99,
    message:{
        vn:'Redis loi',
        en:"Redis Error"
    }
}
const handleTimeoutError = ()=>{
    connectTimeout = setTimeout(()=>{
        throw new RedisRequestError({
            message:REDIS_CONNECT_MESSAGE.message.vn,
            code: REDIS_CONNECT_MESSAGE.code
        })
    },REDIS_CONNECT_TIMEOUT)
}
const handleEventConnect = ({connectionRedis})=>{
    
    //check if connection is null
    connectionRedis.on(statusConnectRedis.CONNECT,()=>{
        console.log('connectionRedis - Connection status: connected')
        clearTimeout(connectTimeout);
    })
    connectionRedis.on(statusConnectRedis.END,()=>{
        console.log('connectionRedis - Connection status: disconnected')
        handleTimeoutError()
    })
    connectionRedis.on(statusConnectRedis.RECONNECT,()=>{
        console.log('connectionRedis - Connection status: reconnecting')
        clearTimeout(connectTimeout)
    })
    connectionRedis.on(statusConnectRedis.ERROR,(err)=>{
        console.log(`connectionRedis - Connection status: error ${err}`)
        handleTimeoutError();
    })
}
const initRedis = ()=>{

    const instanceRedis = redis.createClient({
        url: "redis://default:WF4Mk5a6BAd65qJaPMJhlwU0drAuWvtx@redis-15475.c321.us-east-1-2.ec2.cloud.redislabs.com:15475"
    });
    client.instanceConnect = instanceRedis;
    handleEventConnect({
        connectionRedis: instanceRedis
    })
    instanceRedis.connect();
}
const getRedis = ()=>client.instanceConnect
setRedis = ()=>{

}
module.exports= {
    getRedis,
    initRedis,
    
}