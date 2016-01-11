var init = require("./config/init")();
var logger = require("./app/util/logger");
var config = require("./config/config");

// Init the express application
var serverApp = require('./config/express')();

// Start the app by listening on <port>
serverApp.listener.listen(config.port);

// Expose app
exports = module.exports = serverApp.app;

// Logging initialization
logger.info('application started on port ' + config.port);