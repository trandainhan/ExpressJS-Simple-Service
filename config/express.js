'use strict';

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    helmet = require('helmet'),
    config = require('./config'),
    logger = require('../app/util/logger'),
    fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose');

var baseRgx = /(.*).(js|coffee)$/;

module.exports = function() {
    // Initialize express app
    var app = express();
    var server = app;

    app.use(morgan(config.log.format, {stream: logger.stream}));
    // Showing stack errors
    app.set('showStackError', true);

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    var restreamer = function (){
        return function (req, res, next) { //restreame
            req.removeAllListeners('data');
            req.removeAllListeners('end');
            if(req.headers['content-length'] !== undefined){
                req.headers['content-length'] = JSON.stringify(req.body).length;
            }
            next();
        };
    };
    app.use(restreamer());

    mongoose.connect(config.dbConnectionPool.database);

    function bootstrapRoutes() {
        // Skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a
        // route by itself
        var appPath = process.cwd();
        walk(appPath + '/app', 'route', 'middlewares', function(path) {
            logger.info('loading route ', path);
            require(path)(app);
        });
    }

    //NOTE: routes config should be defined after all configurations
    bootstrapRoutes();

    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) {return next();}
        //check if error thrown by the bodyParser middleware due to invalid json
        if(err.status === 400 && err.message === 'invalid json') {
            res.status(400).json(config.errorMessages.UNPARSABLE_REQUEST);
            return;
        }

        // Log it
        logger.error(err.stack);

        // Error page
        res.status(500).send(config.errorMessages.SERVER_ERROR);
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        logger.error('request ' + req.path + ' not found');
        res.status(404).send(config.errorMessages.NOT_FOUND);
    });

    return {
        app: app,
        listener: server
    };
};

// recursively walk modules path and callback for each file
function walk(wpath, type, excludeDir, callback) {
    // slice type
    var stype = type.slice(-1) === 's' ? type.slice(0, -1) : type;
    var rgx = new RegExp('(.*)-' + stype + '.(js|coffee)$', 'i');
    if (!fs.existsSync(wpath)) return;
    fs.readdirSync(wpath).forEach(function(file) {
        var newPath = path.join(wpath, file);
        var stat = fs.statSync(newPath);
        if (stat.isFile() && (rgx.test(file) || (baseRgx.test(file)) && newPath.indexOf(type) >= 0)) {
            // if (!rgx.test(file)) console.log('  Consider updating filename:', newPath);
            callback(newPath);
        } else if (stat.isDirectory() && file !== excludeDir && ~newPath.indexOf(type)) {
            walk(newPath, type, excludeDir, callback);
        }
    });
}
