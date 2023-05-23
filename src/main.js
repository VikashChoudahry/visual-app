const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

// Custom DI
const { initDbConnection } = require("./database/postgres");
const { stackTrace, errorLog } = require("../logs");
const { handle404Error, handleDevErrors } = require("../helpers/error-handler");
const routes = require("./app/controllers");

const app = express();
// view layer setup
const expressHbs = require("express-handlebars");
app.set("views", path.join(__dirname, "..", "public/views"));
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: "public/views",
  })
);
app.set("view engine", "hbs");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/", routes);

// Error event handlers
app.use(handle404Error);
app.use(handleDevErrors);

/**
 * Initialize application
 */
const initApp = async () => {
	try {
    	stackTrace(`server is in ${APP_ENV} environment`);
    	const db = await initDbConnection();
    	stackTrace(`database connection established with ${db.host}`);
  	} catch (error) {
		errorLog(error);
	}
};

module.exports = { app, initApp };
