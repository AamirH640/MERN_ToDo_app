export {}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
let ToDo = require('./todo.model');
const todoRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function (){
    console.log("MongoDB connection established successfully")
});

todoRoutes.route('/').get(function (req:any, res:any){
    ToDo.find(function (err:any, todos:any){
        if (err){
            console.log(err);
        }else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function (req:any, res:any){
   let id = req.params.id;
   ToDo.findById(id, function (err:any, todo:any){
       if (err){
           console.log(err);
       }else{
           res.json(todo);
       }
   });
});

todoRoutes.route('/add').post(function (req:any, res:any){
   let todo = new ToDo(req.body);
   todo.save()
       .then((response:any) => {
           res.status(200).json({'todo':'todo added successfully'});
       })
       .catch((response:any) => {
           res.status(400).send('adding new todo failed');
       });
});

todoRoutes.route('/update/:id').post(function (req:any, res:any){
    ToDo.findById(req.params.id, function (err:any, todo:any){
        if(!todo){
            console.log(err);
            res.status(404).send('data is not found');
        }
        else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then((response:any) => {
                res.json('todo updated');
            })
                .catch((response:any) => {
                    res.status(400).send('Update not possible');
                });

        }

    });
});
app.use('/todos', todoRoutes);

app.listen(PORT, function(){
    console.log("Server is running on PORT: " + PORT);
});