const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/justanothertodo');

mongoose.connection.once('open', function(){
    console.log('Connected to MongoDB');
}).on('error', function(error){
    console.log('Connection error: ',error);
});

mongoose.Promise = Promise;

//SCHEMA
var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name Cannot be blank'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_Date: {
        type: Date,
        default: Date.now
    }
});

var toDo = mongoose.model('toDo', todoSchema);

module.exports = toDo;
//console.log(toDo);
//console.log(todoSchema);
//module.exports.toDo = require("./todo") -->For example in file with seperate connection and model