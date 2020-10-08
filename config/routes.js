// TODO: Require Controllers...
const cubeController = require("../controllers/cube");
const accessoryController = require("../controllers/accessories");
const cube = require("../models/cube");
module.exports = (app) => {
	app.get("/", cubeController.getCubes);
	app.get("/details/:id", cubeController.getCube);
	//app.get("/edit/:id", cubeController.getCubeById);
	//app.get("/delete/:id", cubeController.deleteCube);
	app.get("/create", cubeController.getCreateCube);
	//app.post("/edit/:id", cubeController.editCube);
	app.post("/create", cubeController.postCreateCube);
	//app.post("/sort", cubeController.sortCubes);

	app.get("/create/accessory", accessoryController.getCreateAccessory);
	app.post("/create/accessory", accessoryController.postCreateAccessory);

	app.get("/attach/accessory/:id", accessoryController.getAttachAccessory);
	app.post("/attach/accessory/:id", accessoryController.postAttachAccessory);

	app.get("/about", function(_, res) {
		res.render("about");
	});

	app.get("/*", function(_, res) {
		res.render("404");
	});
};
