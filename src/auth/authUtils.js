
const JWT = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const HEADERS = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'x-client-id',
    REFRESHTOKEN: 'x-rtoken-id'
}
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days',
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        });
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify::`, err)
            } else {
                console.log(`decode verify::`, decode)
            }

        })
        return { accessToken, refreshToken }
    } catch (error) {
        return {
            code: 'xxx5',
            message: error.message,
            status: 'error'
        }
    }
}
const authenticationV2 = asyncHandler(async (req, res, next) => {

    const accessToken = req.headers[HEADERS.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError('Not found keyStore')
    try {
        const token = accessToken.split(" ");
        const controller = req._parsedUrl.pathname.split('/')[1]
        const action = req._parsedUrl.pathname.split('/')[2]
        const decodeUser = JWT.verify(token[1], process.env.PUBLIC_KEY)
        if(!permissionAccess(decodeUser.level,controller,action)){
            throw new AuthFailureError('User Not Permission')
        }
        req.user = decodeUser,
        next();
    } catch (error) {
        throw error
    }
})

const verifyJWT = async (token, keySerect) => {
    return await JWT.verify(token, keySerect)
}
module.exports = {
    createTokenPair,
    authenticationV2,
    verifyJWT
}