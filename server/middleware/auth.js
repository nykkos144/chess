require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const jwtToken = req.headers.token;

    if (!jwtToken) {
        console.log('auth fail');
        return { error: 'noAuth' }
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();

}

const decodeToken = (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
}

module.exports = { auth, decodeToken };