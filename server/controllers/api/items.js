const Item = require("../../models/item");

async function index(req, res) {
	try {
		const items = await Item.find({})
			.sort("name")
			.populate("category")
			.exec();
		// re-sort based upon the sortOrder of the categories
		items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
		const modifiedItems = items.map((item) => ({
			...item.toObject(),
			sides: ["rice", "pasta", "garden salad", "rice and beans"],
		}));
		res.status(200).json(modifiedItems);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
}

async function show(req, res) {
	try {
		const item = await Item.findById(req.params.id);
		const modifiedItem = {
			...item.toObject(),
			sides: ["rice", "pasta", "garden salad", "rice and beans"],
		};
		res.status(200).json(modifiedItem);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
}

module.exports = {
	index,
	show,
};
