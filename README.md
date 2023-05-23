## Introduction
To find how many new listings per month are created for each of the websites (or "brokers") that we crawl and what is the average revenue per listing.

## Node Runtime
- Version = `v18.12.1`

## Steps to setup
1. Clone/Unzip the source.
2. Switch to the project directory.
3. Copy env.example .env. Run: `cp env.example .env`
4. Required environment variables need to be set.
5. Run: `npm install`
6. Serve the application:
   1. without watch mode: `npm start`
   2. with watch mode: `npm run start:watch`

## How to access the app
**Prerequisite**: Node app service should be up and running

Once service is up and running, the same can be accessed via, `http://localhost:3050/listings`

## Important points to know
1. If we don't pass offset and limit and it fetches all the records with the default date range from "2020-11-01" to "2021-11-30".
2. In order to view the charts and listing data table, navigate to the browser (preferably chrome) and consume `http://localhost:3050/listings`
   1. Want to limit the data? Set the "offset" and "limit" in the query parameter. For e.g. `http://localhost:3050/listings?limit=10&offset=0`
   2. Select the start date and end date to get the limit set of the listing data.
3. In order to connect to the database, needed to disable the `NODE_TLS_REJECT_UNAUTHORIZED`.