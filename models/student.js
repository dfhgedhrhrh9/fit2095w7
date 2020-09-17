let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    fullName:{
        type:String,
        validate:{
            validator:function(newName){
                return (newName.length > 3);
            },
            message:'Name should be at least 4 characters long'
        }
    },
    age:{
        type:Number,
        required:true
    },
    teacher:[{
        type:mongoose.Types.ObjectId,
        ref:'Teacher'
    }]

});

module.exports = mongoose.model('Student',studentSchema);