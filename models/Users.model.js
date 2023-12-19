const {Schema, model} = require('mongoose');
const UserSchema = new Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
});
const UserModel = model('users', UserSchema);
module.exports = UserModel;