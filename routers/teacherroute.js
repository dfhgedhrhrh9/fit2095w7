let express = require('express');

let router = express.Router();
let Teacher = require('../models/teacher');
let mongoose = require('mongoose');

// get all teachers
router.get('/', (req, res) => {
    Teacher.find({}, 'fullName', function (err, data) {
        res.send(data);
    });

});

// get Teacher's details by ID
// localhost:8080/teachers/132465798
router.get('/:id', (req, res) => {
    Teacher.find({
        _id: mongoose.Types.ObjectId(req.params.id)
    }).populate('students').exec(function (err, data) {
        res.json(data);
    });
})

// insert new Teacher
router.post('/', (req, res) => {
    let teacherDetails = req.body;
    let teacher = new Teacher({
        _id: new mongoose.Types.ObjectId(),
        fullName: teacherDetails.fullName,
        school: teacherDetails.school
    });

    teacher.save(function (err) {
        if (!err) {
            res.json('Done');
        } else {
            res.json(err);
        }
    });

});


// delete a teacher by id

router.delete('/', (req, res) => {
    let teacherId = req.query.id;
    Teacher.findByIdAndDelete({
        _id: teacherId
    }, function (err, result) {
        if (!err)
            res.json(result);
        else res.json(err);
    })
});

router.put('/:id', (req, res) => {
    let newSchool = req.body.school;
    Teacher.findByIdAndUpdate({
        _id: req.params.id
    }, {
        $set: {
            "school": newSchool
        }
    }, {
        upsert: false
    }, function (err, data) {
        if (err) {
            res.json(err);
        } else res.json(data);
    })
});

router.put('/:tId/students/:sId', (req, res) => {
    let newStudentId = req.params.sId;
    let teacherId = req.params.tId;
    Teacher.findByIdAndUpdate({
        _id: teacherId
    }, {
        $push: {
            "students": mongoose.Types.ObjectId(newStudentId)
        }
    }, {
        upsert: false
    }, function (err, data) {
        if (err) {
            res.json(err);
        } else res.json(data);
    })


})

module.exports = router;