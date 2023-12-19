const jwt = require("jsonwebtoken");
const hash = require('md5');
const UserModel = require("../models/Users.model");

exports.loginRoute = async (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username })
    .then( user => {
      if (!user) return res.status(404).send({msg: `username dosen't exist, check it again or sign up`});
      const hashedPassword = hash(password);
      if (hashedPassword !== user.password) return res.status(401).send({msg: "wrong password!"});
      else {
        const period = 86400;
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: period });
        res.cookie("access-token", accessToken, {maxAge: 1000 * period}).status(202).send({msg: "login successed"});
      } 
    }).catch(() => res.status(500).send({msg: "there is error, please try again later"}));
};
