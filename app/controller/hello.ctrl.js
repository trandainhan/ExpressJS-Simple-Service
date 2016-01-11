'use strict';

var logger = require('../util/logger');

var hello = {

    sayHello: function(req, resp){
        logger.info("Say greeting word");
        resp.status(200).send("This is report services");
    }
};

module.exports = hello;