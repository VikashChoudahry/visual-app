// Custom DI
const queryManager = require('../models');
const { START_DATE, END_DATE } = require("../../constants");

/**
 * 
 * @param {*} query - Any query params. Default values are set for startDate and endDate
 * @returns query object - Query params with default values set for startDate and endDate
 */
const setDateRange = (query) => {
    query.startDate = query.startDate || START_DATE;
    query.endDate = query.endDate || END_DATE;
    return query;
};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns {Promise<array>} - Array of objects of all the details of deals
 */

const getDeals = async (request, response) => {
    let query = { ...request.query };
    setDateRange(query);
    return await queryManager.getDeals(query);
};

/**
 * 
 * @param {*} request
 * @param {*} response
 * @returns {Promise<array>} - Array of objects of the average revenue by sites
 *  
*/
const getAverageRevenueBySites = async (request, response) => {
    let query = { ...request.query };
    setDateRange(query);

    return await queryManager.getAverageRevenueBySites(query);
};

module.exports = {
	getDeals,
    getAverageRevenueBySites
};