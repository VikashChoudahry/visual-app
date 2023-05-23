// Custom DI
const queries = require('./queries');
const db = require('../../database/postgres');

/**
 * @param {object} params - Query params
 * @param {string} params.startDate
 * @param {string} params.endDate
 * @param {number} params.limit
 * @param {number} params.offset
 * @returns	{Promise<array>} - Array of objects of all the details of deals
 */

const getDeals = async (params) => {
	const query = {
		text: queries.select.all,
		values: [params.startDate, params.endDate, params.limit || null, params.offset || null],
	};

	const result = await db.query.run(query);
	return result.rows;
};

/**
 * @param {object} params - Query params
 * @param {string} params.startDate
 * @param {string} params.endDate
 * @param {number} params.limit
 * @param {number} params.offset
 * @returns	{Promise<array>} - Array of objects of the average revenue by sites
 */

const getAverageRevenueBySites = async (params) => {
	const query = {
		text: queries.select.averageRevenueBySites,
		values: [params.startDate, params.endDate, params.limit || null, params.offset || null],
	};
	
	const result = await db.query.run(query);
	return result.rows;
};

module.exports = {
	getDeals,
	getAverageRevenueBySites
};
