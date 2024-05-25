
const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();
// const { pushToLogDiscord } = require('../middlewares/');

// router.use('/v1/api/webhook', require('./webhook'))
// router.use(pushToLogDiscord)

//check API key
//router.use(apiKey);

//check permission
// router.use(permission('0000'));
router.use("/api/v1", require("./user"));
router.use("/api/v1", require("./auth"));
// router.get('', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Welcome Fantips'
//     })
// })
module.exports = router;
