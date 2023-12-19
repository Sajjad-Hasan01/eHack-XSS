const jwt = require('jsonwebtoken');
const hash = require('md5');
const UserModel = require('../models/Users.model');

exports.signupRoute = async (req, res) => {
    const {username, password} = req.body;

    UserModel.findOne({username}).then(user =>{
        if (user) return res.status(404).send('username already exist, change it or login');
        const hashedPassword = hash(password);

        UserModel.create({username, password: hashedPassword})
        .then( user => {
            const period = 86400;
            const accessToken = jwt.sign({id: user._id}, process.env.SECRET, { expiresIn: period });
            res.status(201).cookie("access-token", accessToken,
            {maxAge: 1000 * period}).send({msg:'Registration succeed'});
        }).catch(() => res.status(501).send({msg:'there is error, please try again later'}));
    }).catch(() => res.status(500).send({msg:'there is error, please try again later'}));
};