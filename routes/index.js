var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile("views/index.html");
});

router.get('/test', function(req, res) {
    res.sendfile("views/test.html");
});

module.exports = router;
