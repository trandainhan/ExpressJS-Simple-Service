'use strict';

var promise = require('promise');
var database = require('../storage/database');
var logger = require('../util/logger');

/**
 * Retrieve the configuration.
 */
exports.retrieve = function(tenantId)
{
    return new promise(function(resolved, rejected) {
        var tableName = tenantId + "_a_event";
        database.executeStatement(
            "SELECT SITE FROM " + tableName + " GROUP BY SITE ORDER BY SITE ASC;"
        ).then(function(ret) {

            logger.debug(ret.results);
            var sites = [];
            for (var i = 0; i < ret.results.length; i++){
                sites.push(ret.results[i].SITE);
            }
            resolved(sites);
        }).catch(function(e) {
            logger.error(e.message);
            rejected(e);
        });
    });
};