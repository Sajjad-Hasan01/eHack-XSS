const jwt = require('jsonwebtoken');
const path = require('path');

exports.cookieJwtAuth = async (req, res, next) => {
    const accessToken = await req.cookies["access-token"];
    try {
        const {id} = jwt.verify(accessToken, process.env.SECRET);
        req.id = id;
        return next(req, res);
    } catch(error) {
        return res.clearCookie("access-token").redirect('/login');
    }
};