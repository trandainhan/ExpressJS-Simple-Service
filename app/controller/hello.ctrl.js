'use strict';

var logger = require('../util/logger');

var hello = {

    sayHello: function(req, resp) {
    	logger.info({req: req});
        // resp.status(200).json({message: "Hello world"});
        resp.send("Let her go");
    }
};

module.exports = hello;