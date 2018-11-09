var express = require('express');
    app = express();
var bodyParser = require("body-parser");
var todoRoutes = require('./routes');    

app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + '/views')); //Path to index.html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile("index.html");
});


app.use('/api/todo', todoRoutes);

app.listen(3000);