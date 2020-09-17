let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let express = require('express');

let app = express();
let teacherRouter= require ('./routers/teacherroute.js');
let studentRouter = require('./routers/studentroute');

app.listen(8080);

app.use(bodyparser.json());

app.use('/teachers',teacherRouter);

app.post('/students',(req,res)=>{
    res.send(req.body);
});

app.get('/students',studentRouter.getAllStudents);
app.get('/students:id',studentRouter.getStudentById);
app.post('/students',studentRouter.insertStudent);
app.delete('/students',studentRouter.deleteStudent);
app.put('/students',studentRouter.updateStudent);

mongoose.connect('mongodb://localhost:27017/week7db',{useNewUrlParser: true},function (err){
    if (err) console.log(err);
    else console.log('successful');
});