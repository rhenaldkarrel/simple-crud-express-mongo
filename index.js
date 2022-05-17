const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

/* Models */
const Product = require("./models/product");

mongoose
	.connect("mongodb://localhost:27017/farmStand")
	.then(() => {
		console.log("Connected to mongodb");
	})
	.catch((err) => {
		console.log(err);
	});

/* Config */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* Routes */
app.get("/products", async (req, res) => {
	const { category } = req.query;
	if (category) {
		const products = await Product.find({ category });
		res.render("products/index", { products, category });
	} else {
		const products = await Product.find({});
		res.render("products/index", { products, category: "All" });
	}
});

app.get("/products/new", (req, res) => {
	res.render("products/new");
});

app.post("/products", async (req, res) => {
	const { name, price, category } = req.body;
	const product = new Product({ name, price, category });
	await product.save();
	res.redirect("/products");
});

app.get("/products/:id", async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render("products/detail", { product });
});

app.get("/products/:id/edit", async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	console.log(product);
	res.render("products/edit", { product });
});

app.delete("/products/:id", async (req, res) => {
	const { id } = req.params;
	await Product.findByIdAndDelete(id);
	res.redirect("/products");
});

app.patch("/products/:id", async (req, res) => {
	const { id } = req.params;
	const { name, price, category } = req.body;
	await Product.findByIdAndUpdate(
		id,
		{ name, price, category },
		{ runValidators: true, new: true }
	);
	res.redirect("/products");
});

/* Server */
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
