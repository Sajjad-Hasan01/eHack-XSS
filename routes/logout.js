const path = require('path');

exports.logoutRoute = async (req, res) => {
    return res.clearCookie("access-token").redirect('/login');
};