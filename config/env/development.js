'use strict';

module.exports = {
    dbConnectionPool: {
		database: 'ecxanalytics',
		user: 'ecxanalytics',
		password: 'CXTech123',
		host: 'localhost',
		port: 33061,
		acquireTimeout: 10000,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
        multipleStatements: true
	}
};
