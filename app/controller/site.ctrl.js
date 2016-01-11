'use strict';

var logger = require('../util/logger');
var siteServices = require('../services/site.service');
var errorMessage = require('../../config/errorMessages').errorMessages;

var site = {

    getSiteChoices: function(req, resp){
        logger.info("get site choices");

        var tenantId = req.param('tenantId');
        if (tenantId === undefined){
            var errorMsg = errorMessage.UNPARSABLE_REQUEST;
            logger.error(errorMsg.message);
            resp.status(errorMsg.httpCode).json(errorMsg.message);
            return;
        }
        siteServices.retrieve(tenantId).then(function(sites){

            var defaultReport = "No store data available";
            if (sites.length){
                defaultReport = sites[0];
            }
            var result = {
                "current": req.param('current'),
                "default": defaultReport,
                "values": sites
            };
            resp.status(200).send(result);
        }).catch(function(e){
            logger.error('server error', e.message);
            var errorMsg = errorMessage.SERVER_ERROR;
            resp.status(errorMsg.httpCode).json(errorMsg.message);
        });
    }
};

module.exports = site;