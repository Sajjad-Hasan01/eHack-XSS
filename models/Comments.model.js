const {Schema, model} = require('mongoose');
const CommentSchema = new Schema({
    comment:{type:String}
});
const CommentModel = model('comments', CommentSchema);
module.exports = CommentModel;