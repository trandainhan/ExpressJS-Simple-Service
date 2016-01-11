'use strict';

module.exports = {
	dbConnectionPool: {
		database: 'ecxadmin',
		user: 'root',
		password: 'admin',
		host: 'localhost',
		port: 3306,
		acquireTimeout: 10000,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
        multipleStatements: true
	}
};