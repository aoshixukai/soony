var express = require('express');
var router = express.Router();
var codejshint = require("../src/jshint/codejshint.js");

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('afasfasdf');
    try {
        var data = codejshint.codejshint('D:\\NodeJS\\express\\soony-core\\public\\plug\\test\\continuous.js', function (report) {
            console.log('=============as==============');
            console.log(report);
            res.render('index', { title: 'Express',data: report});
        });
        console.log ('======================1==================');
    } catch (ex) {
        console.log("====================sdfsfd======================");
        console.log(ex);
    }
   // res.render('index', { title: 'Express'});
});

module.exports = router;