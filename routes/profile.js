const UserModel = require('../models/Users.model');

exports.profileRoute = async (req, res) => {
    const id = req?.id;
    UserModel.findById(id)
    .then(user => res.status(200).send({ username : user.username }))
    .catch(error => res.status(500).send(error.message))
};