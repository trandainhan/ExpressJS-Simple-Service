'use strict';

var mysql = require('mysql');
var config = require('../../config/config');
var logger = require('../util/logger');
var promise = require('promise');

// initialize database connection
var pool = mysql.createPool(config.dbConnectionPool);

module.exports.executeStatement = function(statement, params) {
    return new promise(function(resolved, rejected) {
        pool.getConnection(function(e, connection) {
            if(e)
            {
                rejected(e);
            }
            else
            {
                // Tries its best to prepare this in a safe manner.
                statement = mysql.format(statement, params);
                logger.debug(statement);
                connection.query(statement, function(e, results, fields) {
                    connection.release();
                    if(e)
                    {
                        rejected(e);
                    }
                    else
                    {
                        resolved({results:results, fields:fields});
                    }
                });
            }
        });
    });
};

module.exports.executeStatementWithTransaction = function(statement, transaction, params) {
    return new promise(function(resolved, rejected) {
        // Tries its best to prepare this in a safe manner.
        statement = mysql.format(statement, params);
        logger.debug(statement);
        transaction.connection.query(statement, function(e, results, fields) {
            if(e)
            {
                logger.error(e);
                rejected(e);
            }
            else
            {
                resolved(results, fields);
            }
        });
    });
};

module.exports.beginTransaction = function() {
    return new promise(function(resolved, rejected) {
        pool.getConnection(function(e, connection) {
            if(e)
            {
                logger.error(e);
                rejected(e);
            }
            else
            {
                resolved({connection:connection});
            }
        });
    });
};

module.exports.commit = function(transaction) {
    return new promise(function(resolved, rejected) {
        transaction.connection.commit(function(e)
        {
            if (e) {
                transaction.connection.rollback(function() {
                    transaction.connection.release();
                    rejected(e);
                    return;
                });
            }
            transaction.connection.release();
            resolved();
        });
    });
};

module.exports.rollback = function(transaction) {
    return new promise(function(resolved, rejected) {
        transaction.connection.rollback(function() {
            transaction.connection.release();
            resolved();
        });
    });
};
