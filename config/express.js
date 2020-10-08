const express = require("express");
const handlebars = require("express-handlebars");

module.exports = (app) => {
	//TODO: Setup the view engine
	app.set("view engine", ".hbs");
	app.engine(
		".hbs",
		handlebars({
			extname: ".hbs"
		})
	);
	app.set("views", __pathDir + "/views");

	//TODO: Setup the body parser
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	//TODO: Setup the static files
	app.use(express.static(__pathDir + "/static"));
};
