const StudentModel = require('../models/Students.model');

exports.studentsRoute = async (req, res) => {
    // const options = {
    //     // sort returned documents in ascending order by title (A->Z)
    //     sort: { user: {name : 1} },
    //     // Include only the `title` and `imdb` fields in each returned document
    //     projection: { _id: 1, user: {name : 1, email: 1, photo: 1}, group: 1, status:1, lectures:1 },
    // };
    StudentModel.find().populate('user').populate('lectures')
    .then(students => res.status(200).json(students))
    .catch(() => res.status(400).send('there is error, please try again later'));
};
