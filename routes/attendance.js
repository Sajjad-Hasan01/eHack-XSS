const StudentModel = require('../models/Students.model');
const LectureModel = require('../models/Lectures.model');
const { attendCalc } = require('../middleware/attendCalc');

exports.attendanceRoute = async (req, res) => {
    const attendCheckList = req.body.attendCheckList;
    
    attendCheckList.forEach(({id, attendance}) => {
        StudentModel.findById(id)
        .then(student => {
            if (student) {
                LectureModel.create({student: id, attendance})
                .then(async lecture => {
                    student.lectures.push(lecture); 
                    await student.save();
                }).catch(() => res.status(400).send("There is error, resend the list"));
            } else res.status(400).send("There is error, resend the list");
        }).catch(e => res.status(400).send(e.message));
    });
    
    let isUpdated = await attendCalc();

    if ( isUpdated ) return res.status(200).send("The attend list of students is saved")
    else return res.status(500).send("Students status not udated")
};
