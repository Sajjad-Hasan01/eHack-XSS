const CommentModel = require('../models/Comments.model');

exports.addCommentRoute = async (req, res) => {
    const {comment} = req.body;

    CommentModel.create({comment: comment})
    .then(() => res.status(200).redirect('/'))
    .catch(error => res.status(500).send(error.message))
};