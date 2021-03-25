const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const httpCodes = require('http-codes');

exports.authToken = (req, res, next) => {
    let token = req.header('x-auth-token');
    if (!token) {
        return res.status(httpCodes.UNAUTHORIZED).json({ message: 'you need to send a token' });
    };

    try {
        const decodeToken = jwt.verify(token, config.jwt.JWTSecretKey);
        req.userContext = { _id: decodeToken._id };
        next();
    }
    catch(err) {
        return res.status(httpCodes.UNAUTHORIZED).json({ message: 'invalid token or expired token, try login again' });
    };
};