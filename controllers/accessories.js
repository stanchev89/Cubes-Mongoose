const cubeModel = require("../models/cube");
const accessoryModel = require("../models/accessory");
module.exports = {
	postCreateAccessory(req, res, next) {
		const { name, description, imageUrl } = req.body;
		accessoryModel
			.create({ name, description, imageUrl })
			.then(() => {
				res.redirect("/");
			})
			.catch(next);
	},
	getCreateAccessory(_, res) {
		res.render("create-accessory");
	},
	postAttachAccessory(req, res, next) {
		const cubeId = req.params.id;
		const accessoryID = req.body.accessory;
		Promise.all([
			accessoryModel.update({ _id: accessoryID }, { $push: { cubes: cubeId } }).lean(),
			cubeModel.update({ _id: cubeId }, { $push: { accessories: accessoryID } }).lean()
		])
			.then(() => {
				res.redirect("/details/" + cubeId);
			})
			.catch(next);
	},
	getAttachAccessory(req, res, next) {
		const cubeId = req.params.id;
		Promise.all([ cubeModel.findById(cubeId).lean(), accessoryModel.find({ cubes: { $nin: cubeId } }).lean() ])
			.then(([ cube, accessories ]) => {
				res.render("attach-accessory", {
					cube,
					accessories,
					noAvailableAccessories: accessories.length === 0
				});
			})
			.catch(next);
	}
};
