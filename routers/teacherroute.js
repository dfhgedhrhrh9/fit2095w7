let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const Teacher = require('../models/teacher');

router.get('/',(req,res)=>{
    res.send('Connected /');
});

router.get('/:id',(req,res)=>{
    Teacher.find({_id: mongoose.Types.ObjectId(req.params.id)},'fullName',(err,data)=>{
        res.json(data);
    });
});

router.post('/',(req,res)=>{
    let teacher = new Teacher({
        _id:new mongoose.Types.ObjectId(),
        fullName:req.body.fullName,
        school:req.body.school
    });
    teacher.save((err)=>{
        if(!err){
            res.json('Done');
        } else {
            res.json(err);
        }
    });
});

router.delete('/',(req,res)=>{
    Teacher.findByIdAndDelete({_id:req.query.id},(err,result)=>{
        if(!err) res.json('Done');
        else res.json(err);
    });
});

router.put('/:id',(req,res)=>{
    Teacher.findByIdAndUpdate({id_:req.params.id},{$set:{"school":req.body.school}},{upsert:false},(err,obj)=>{
        if(!err) res.json(obj);
    });
});

module.exports=router;