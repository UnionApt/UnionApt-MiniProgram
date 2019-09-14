const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World');
})

var port = process.env.PORT || 8000

var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("new instance launch at: http://%s:%s", host, port)

})