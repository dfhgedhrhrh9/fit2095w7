let mongoose = require ('mongoose');
let teacherSchema = new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    fullName:{
        type:String,
        validate:{
            validator:function(newName){
                if(newName.length>3) return true;
                else return false;
            }
        }
    },
    school:{
        type:String,
        required:true},

    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }]
});

module.exports = mongoose.model('Teacher',teacherSchema);