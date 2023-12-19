const {Schema, model} = require('mongoose');
const TokenSchema = new Schema({
    token:{type:String}
});
const TokenModel = model('tokens', TokenSchema);
module.exports = TokenModel;
