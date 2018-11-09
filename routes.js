var express = require('express');
var router = express.Router();
var db = require('./mongoconnect.js');


router.get('/', function(req, res){
    //console.log(db.toDo);
    db.find()
    .catch(function (err) {
        res.send(err);
    })
    .then(function (todos) {
        res.json(todos);
    });
});
router.post('/', function(req,res){
    db.create(req.body)
    .then(function(newtodo){
        res.json(newtodo);
    })
    .catch(function(err){
        res.send(err);
    })
});
router.get('./:todoId', function(req, res){
    db.findById(req.params.todoId)
    .then(function(foundtodo){
        res.json(foundtodo);
    })
    .catch(function(err){
        res.send(err);
    })
});
router.put('/:todoId', function(req, res){
    db.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err)
    })
});
router.delete('/:todoId', function(req, res){
    db.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'Just deleted it!'});
    })
    .catch(function(err){
        res.send(err);
    })
});

module.exports = router;