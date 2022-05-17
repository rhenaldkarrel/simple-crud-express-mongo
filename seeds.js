const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
	.connect("mongodb://localhost:27017/farmStand")
	.then(() => {
		console.log("Connected to mongodb");
	})
	.catch((err) => {
		console.log(err);
	});

const seedProducts = [
	{
		name: "Organic Celery",
		price: 1.5,
		category: "vegetable",
	},
	{
		name: "Chocolate Whole Milk",
		price: 2.69,
		category: "dairy",
	},
	{
		name: "Organic Mini Seedless Grapes",
		price: 3.99,
		category: "fruit",
	},
	{
		name: "Organic Goddess Melon",
		price: 4.99,
		category: "fruit",
	},
	{
		name: "Fairy Eggplant",
		price: 2.99,
		category: "vegetable",
	},
];

Product.insertMany(seedProducts)
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});
