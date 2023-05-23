const query = require('./postgres');
const { establishConnection, getClientFromPool } = require('./connect');

module.exports = {
  getClientFromPool,
  query,
  initDbConnection: establishConnection
};
