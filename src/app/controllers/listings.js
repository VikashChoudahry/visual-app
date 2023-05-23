const express = require("express");
const router = express.Router();

// Custom DI
const listingService = require("../services/listing");
const { START_DATE, END_DATE, DATA_TABLE_COLS } = require("../../constants");
const { transformDealsRecords } = require("../../utility");

router.get("/", async (req, res, next) => {
    const startDate = req.query.startDate || START_DATE;
    const endDate = req.query.endDate || END_DATE;

    // Get required datasets
    const dealsRecords = await listingService.getDeals(req, res);
    const averageRevenueBySitesData = await listingService.getAverageRevenueBySites(req, res);

    // Format the datasets
    const transformedDealRecords = transformDealsRecords(dealsRecords);

    // Render the view layer
    res.render("listing/index", {
        averageRevenueBySitesData: JSON.stringify(averageRevenueBySitesData),
        tableColumns: [...DATA_TABLE_COLS],
        tableRows: transformedDealRecords,
        startDate,
        endDate,
        transformedDealRecords,
    });
});

module.exports = router;
