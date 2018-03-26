var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = require('url');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var urlDB = "mongodb://cred:Mon_lock@ds115219.mlab.com:15219/clock";

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.all('/', function(req,res,next) {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/register/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var data = pathname.substr(10, pathname.length - 1);

    MongoClient.connect(urlDB, function(err, client) {
        var db = client.db('clock');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        findUserwithMobile(db, data, function() {
            console.log("Successfully selected");
            client.close();
        });
    });
});

app.post('/login/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var userStart = pathname.indexOf("u=");
    var userEnd = pathname.indexOf("&p=");
    var user = pathname.substr(userStart+2, pathname - userEnd);
    var password = pathname.substr(userEnd+3, pathname.length - 1);

    console.log(user);
    console.log(password);

    /*MongoClient.connect(urlDB, function(err, client) {
        var db = client.db('clock');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        findUserwithMobile(db, data, function() {
            console.log("Successfully selected");
            client.close();
        });
    });*/
});

var findUserwithMobile = function(db,data,callback) {
    var cursor = db.collection('users').find(data);
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("ID: " + doc.UserID);
            console.log("First Name: " + doc.FirstName);
            console.log("Last Name: " + doc.LastName);
            console.log("City: " + doc.City);
        }
    });
};

var insertDocument = function(db, callback) {
    db.collection('users').insertOne( {
        "UserID": 17,
        "FirstName" : "Cameron",
        "LastName" : "LEcuyer",
        "Mobile": "913-555-5555",
        "City":"Shawnee"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into users");
        callback();
    });
};

app.listen(port, function() {
    console.log('app running')
});
console.log('Client Server running at http://127.0.0.1:8080/');