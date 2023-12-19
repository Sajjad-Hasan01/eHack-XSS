const TokenModal = require('../models/Tokens.model.js');

exports.addTokenRoute = async (req, res) => {
    const {token} = req.body;
    TokenModal.create({token}).then(res.send())
};