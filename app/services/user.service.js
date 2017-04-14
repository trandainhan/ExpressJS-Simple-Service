'use strict';

var logger = require('../util/logger');
var User = require('../models/user');

/**
 * Retrieve the configuration.
 */
exports.createUser = function() {

    var randUser = new User({
        name: 'Nick Cerminara', 
        password: 'password',
        admin: true 
    });

    randUser.save(function (err) {
        if (err) {
            logger.error("Can't create user " + err.message);
            throw err;
        }

        logger.info("Create user successfully");

    })
};