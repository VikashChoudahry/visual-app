const forEach = require('lodash/forEach');
const pg = require('./connect');

/**
 * 
 * @param {*} query
 * @param {*} client 
 * @returns {Promise<object>} - Returns a promise with the execution result of the query
 */
const run = async (query, client) => {
  const { text, values } = query;
  if (!text) {
    throw new Error('Query text is missing');
  } else if (!values) {
    throw new Error('Query value(s) are missing');
  } else {
    return await pg.exec(query, client);
  }
};

const extract = (params, conditions) => {
  const pKeys = Object.getOwnPropertyNames(params);
  const cKeys = Object.getOwnPropertyNames(conditions);
  const pl = pKeys.length;
  const values = [];
  const paramsArr = [];
  const condArr = [];

  forEach(pKeys, (val, key) => {
    paramsArr.push(`${val} = $${key + 1}`);
    values[key] = params[val];
  });

  forEach(cKeys, (val, key) => {
    condArr.push(`${val} = $${pl + key + 1}`);
    values[pl + key] = conditions[val];
  });

  return { pa: paramsArr, ca: condArr, values };
};

const update = async p => {
  const { table, params, conditions } = p;
  const { ca, pa, values } = extract(params, conditions);
  const q0 = pa.join(',');
  const q1 = ca.join(' and ');
  const q2 = `update ${table} set ${q0} where ${q1}`;

  const query = {
    text: q2,
    values
  };
  const result = await pg.exec(query);
  return result;
};

module.exports = {
  getClientFromPool: pg.getClientFromPool,
  run,
  update
};
