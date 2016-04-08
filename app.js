"use strict";
var express = require('express');
var loader = require('./src/bin/loader.js')
var path = require('path');
var routes = require('./routes/index');
var users = require('./routes/users');
global.config=require('./config.js')

console.log(config);

//var app = express();
loader.ini(express(), function(app) {

    console.log(path.join(__dirname, 'public'));
    /*app.use(express.static(path.join(__dirname, 'public')));*/
    // 静态资源
    
    app.use('/', routes);
    app.use('/users', users);


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        console.log('404')
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    loader.run(app);
})
