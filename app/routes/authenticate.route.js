'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(app) {
	var authenticateCtrl = require('../controller/authenticate.ctrl');
	router.route('/authenticate').post(authenticateCtrl.verify);
  router.use(authenticateCtrl.authenMiddleware);
  app.use('/api', router);
};
