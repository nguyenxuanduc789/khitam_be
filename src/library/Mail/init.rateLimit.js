
const rateLimit = require('express-rate-limit');
const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many requests, please try again later.'
});

module.exports = { otpLimiter };
