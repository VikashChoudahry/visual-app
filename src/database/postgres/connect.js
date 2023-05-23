const { Pool } = require('pg');

const { APP_STORE } = require('../../configs');
const { errorLog, databaseLog } = require('../../../logs');

let pool = new Pool();

pool.on('error', (error, client) => {
	errorLog('Error occurred on idle database pooling client');
	errorLog(error);
});

/**
 * 
 * @returns {Promise<object>} - Returns a promise with success and host as keys
 */
const establishConnection = async () => {
	try {
		pool = new Pool(APP_STORE.get('dbConfig'));
		return { success: true, host: APP_STORE.get('dbConfig').host };
	} catch (error) {
		errorLog('Initial database connection error');
		errorLog(error);
		throw error;
	}
};

/**
 * 
 * @param {*} query 
 * @param {*} targetClient 
 * @returns {Promise<object>} - Returns a promise with execution result of the query
 */
const exec = async (query, targetClient) => {
	const client = targetClient || (await pool.connect());
	try {
		const result = await client.query(query);
		return result;
	} catch (error) {
		databaseLog({ message: 'Unexpected error', query, error });
		errorLog(error);
		throw error;
	} finally {
		if (!targetClient) client.release();
	}
};

/**
 * 
 * @returns {Promise<object>} - Returns a promise with the client from the pool
 */
const getClientFromPool = async () => {
	try {
		const client = await pool.connect();
		return client;
	} catch (error) {
		errorLog('Failed to get client from pool');
		errorLog(error);
		throw error;
	}
};

module.exports = {
	exec,
	getClientFromPool,
	establishConnection,
};
