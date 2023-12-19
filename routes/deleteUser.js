const UserModel = require('../models/Users.model');
const StudentModel = require('../models/Students.model');
const LectureModel = require('../models/Lectures.model');

exports.deleteUserRoute = async (req, res) => {
    const id = req.id;
    UserModel.deleteOne({ _id: id })
    .then(()=>{
        StudentModel.findOne({ user: id })
        .then(student => {
            StudentModel.deleteOne({ _id: student._id })
            .then(()=>{
                LectureModel.deleteMany({ student: student._id })
                .then(() => res.status(200).send("account deleted"))
                .catch(() => res.status(400).send("there is error, try again"));
            }).catch(()=>res.status(400).send("there is error, try again"));
        }).catch(()=>res.status(404).send("student not found"));
    }).catch(()=>res.status(404).send("user not found"));
}