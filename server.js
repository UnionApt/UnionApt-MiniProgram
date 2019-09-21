const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://root:root@localhost/";
const img_dir = "http://192.168.0.21:8000/public/images/";
var ObjectId = require('mongodb').ObjectId;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.use('/public', express.static('public'));

app.get('/getRoomListByRegion', function(req, res) {
    var query_region = req.query.region;


    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("aptInfo");
        var whereStr = {"region":query_region};  // 查询条件
        dbo.collection("aptInfo").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            result.forEach(function (entry) {
                // entry.image = img_dir.concat(entry.image)
                entry.image = img_dir + entry.image;
                console.log(entry.image);
            })
            console.log(result);
            res.status(200).send(result);
            console.log(result);
            res.end();
            db.close();
        });
    });
});

app.get('/getRoomDetailsById', function(req, res) {
    var query_id = req.query._id;

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("aptInfo");
        var o_id = new ObjectId(query_id);
        var whereStr = {"_id":o_id};  // 查询条件
        dbo.collection("aptInfo").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            result.forEach(function (entry) {
                // entry.image = img_dir.concat(entry.image)
                entry.image = img_dir + entry.image;
                console.log(entry.image);
            });
            console.log(result);
            res.status(200).send(result);
            console.log(result);
            res.end();
            db.close();
        });
    });
});



const port = process.env.PORT || 8000;

const server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("new instance launch at: http://%s:%s", host, port)

});