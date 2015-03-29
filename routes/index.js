var express = require('express');
var router = express.Router();
var fs = require('fs');

var list = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile("views/index.html");
});

router.post('/setList', function(req, res) {
    list = req.body["data"];
});

router.post('/addToList', function(req, res) {
    console.log(list);
    list.push(req.body["data"]);
    console.log(list.length);
});

router.get('/test', function(req, res) {
    res.sendfile("views/test.html");
});

router.get('/upload', function(req, res) {
    res.sendfile("views/upload.html");
});

router.get('/record', function(req, res) {
    res.sendfile("views/record.html");
});

router.post('/json', function(req, res) {
    var body = '';
    filePath = 'public/data/hard.json';
    console.log(req.body["data"]);
    fs.appendFile(filePath, req.body["data"], function (err) {
        console.log(err);
    });
    console.log(req.body);
});

module.exports = router;
