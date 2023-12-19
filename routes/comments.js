const CommentModel = require('../models/Comments.model');

exports.commentsRoute = async (req, res) => {
    CommentModel.find()
    .then(comments => res.status(200).send({ comments }))
    .catch(error => res.status(500).send(error.message))
};