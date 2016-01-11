'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(app){
    var helloCtrl = require('../controller/site.ctrl');
    router.route('/sites').get(helloCtrl.getSiteChoices);
    app.use('/api/report', router);
};
