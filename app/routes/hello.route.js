'use strict';

var express = require('express');
var router = express.Router();


module.exports = function(app){
    var helloCtrl = require('../controller/hello.ctrl');
    router.route('/').get(helloCtrl.sayHello);
    app.use('/', router);
};
