'use strict';

var express = require('express');
var router = express.Router();


module.exports = function(app){
    var userCtrl = require('../controller/user.ctrl');
    router.route('/createuser').get(userCtrl.createUser);
    router.route('/').get(userCtrl.getUsers);
    app.use('/api/user', router);
};
