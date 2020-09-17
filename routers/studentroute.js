const { mongoose } = require('mongoose');
const Student = require('../models/student');
module.exports={
    getAllStudents: (req,res)=>{
        Student.find({},'fullName',(err,obj)=>{
            res.json(data);
        });
    },

    getStudentById: (req,res)=>{
        Student.find({
            _id: mongoose.Types.ObjectId(req.params.id)
        },(err,obj)=>{
            res.json(obj);
        });
    },

    insertStudent: (req,res)=>{
        let student = new Student({
            _id: new mongoose.Types.ObjectId(),
            fullName: req.body.fullName,
            age: req.body.age
        });

        student.save((err)=>{
            if(!err) res.json('Done');
        });
    },
    
    deleteStudent: (req,res)=>{
        Student.findByIdAndDelete({_id:req.query.id},(err,result)=>{
            if(!err) res.json('Done');
            else res.json(err);
        });
    },

    updateStudent:(req,res)=>{
        Student.findByIdAndUpdate({id_:req.params.id},
            {$set:{"school":req.body.school}},{upsert:false},(err,obj)=>{
            if(!err) res.json(obj);
        });
    }
};
