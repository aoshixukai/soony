"use strict";
exports.codejshint = function (filepath, callback) {
    var jshint = require("./cli.js");
    console.log(jshint);
     jshint.interpret(['', 'D:\\NodeJS\\express\\soony-core\\public\\plug\\test\\continuous.js'], callback);
}