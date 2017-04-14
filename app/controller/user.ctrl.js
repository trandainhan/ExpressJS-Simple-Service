'use strict';

var logger = require('../util/logger');
var User = require('../models/user');

var hello = {

    createUser: function(req, resp) {
    	logger.info("Create User");
    	var randUser = new User({
	        name: 'Nick Cerminara', 
	        password: 'password',
	        admin: true 
	    });
	    randUser.save(function (err) {
	        if (err) {
	            logger.error("Can't create user " + err.message);
	            resp.status(400).json({success: false, message: "There're errors in the system, please contact administration"});
	            return;
	        }
	        logger.info("Create user successfully");
	        resp.status(200).json({success: true});
	    })
    },

    getUsers: function (req, resp) {
    	logger.info("Get all user");
		User.find({}, function(err, users) {
			resp.json(users);
		});
    }
};

module.exports = hello;