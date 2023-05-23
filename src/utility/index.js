/**
 * 
 * @param {*} dealsRecords  - Array of objects of all the details of deals
 * @returns {array} - Array of objects of all the details of deals with transformed keys
 */
const transformDealsRecords = (dealsRecords) => {
  return dealsRecords.map((dealsRecord) => {
    return {
      listingId: dealsRecord.listing_id,
      listingMonth: dealsRecord.listing_month,
      listingDate: dealsRecord.listing_date.toISOString().slice(0, 10),
      broker: dealsRecord.broker,
      revenue: dealsRecord.revenue,
    };
  });
};

module.exports = {
  transformDealsRecords,
};
