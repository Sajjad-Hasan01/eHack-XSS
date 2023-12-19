const UserModel = require('../models/Users.model');
const StudentModel = require('../models/Students.model');

exports.updateStudentRoute = async (req, res) => {
    const id = req.id, {name, group} = req.body, photo = req.file?.filename || null;

    if (req.file) {
        UserModel.findOneAndUpdate({ _id : id }, { name, photo })
        .then(() => {
            StudentModel.findOneAndUpdate({ user: id }, { group })
            .then(() => res.status(200).send('your update succeed'))
            .catch(() => res.status(404).send("student not found"));
        }).catch(() => res.status(404).send("user not found"));
    } else {
        UserModel.findOneAndUpdate({ _id : id }, { name })
        .then(() => {
            StudentModel.findOneAndUpdate({ user: id }, { group })
            .then(() => res.status(200).send('your update succeed'))
            .catch(() => res.status(404).send("student not found"));
        }).catch(() => res.status(404).send("user not found"));
    }
};