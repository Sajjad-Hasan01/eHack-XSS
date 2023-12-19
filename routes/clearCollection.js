const UserModel = require('../models/Users.model');
const StudentModel = require('../models/Students.model');
const LectureModel = require('../models/Lectures.model');

exports.clearCollectionRoute = async (req, res) => {
    const collection = req.body.collection;
    if (collection === "users") {        
        UserModel.deleteMany({})
        .then(r => res.send('done!'));
    } else if (collection === "students") {        
        StudentModel.deleteMany({})
        .then(r => res.send('done!'));
    } else if (collection === "lectures") {        
        LectureModel.deleteMany({})
        .then(r => res.send('done!'));
    }
}