'use strict';

module.exports =  {
    port: process.env.PORT || 5003,
    log: {
        //morgan options: 'combined', 'common', 'dev', 'short', 'tiny'
        format: 'combined',
        //winston config
        transports: {
            file: {
                level: 'error',
                filename: './logs/applog.log',
                handleExceptions: true,
                json: false,
                maxsize: 5242880, //5MB
                colorize: false
            },
            console: {
                level: 'debug',
                handleExceptions: false,
                json: false,
                colorize: true
            }
        }
    }
};