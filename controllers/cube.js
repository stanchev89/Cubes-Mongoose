const cubeModel = require("../models/cube");
module.exports = {
	getCubes(req, res, next) {
		const { from, search, to } = req.query;
		const queryParams = {};
		if (search) {
			queryParams.name = new RegExp(search, "i");
		}
		if (from) {
			queryParams.difficultyLevel = { $gte: Number(from) };
		}
		if (to) {
			queryParams.difficultyLevel = queryParams.difficultyLevel || {};
			queryParams.difficultyLevel.$lte = Number(to);
		}
		cubeModel
			.find(queryParams)
			.populate("accessories")
			//.lean()
			.then((cubes) => {
				res.render("index", { cubes, from, search, to });
			})
			.catch(next);
	},
	getCube(req, res, next) {
		const id = req.params.id;
		cubeModel
			.findById(id)
			.populate("accessories")
			.lean()
			.then((cube) => {
				res.render("details", { cube });
			})
			.catch(next);
	},
	postCreateCube(req, res, next) {
		const { name, difficultyLevel, description, imageUrl } = req.body;
		cubeModel
			.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel) })
			.then(() => [ res.redirect("/") ])
			.catch(next);
	},
	getCreateCube(_, res) {
		res.render("create");
	}
};
