const db = require("../db/queries");

exports.homePage = async (req, res) => {
  const categoriesArray = await db.getAllCategories();
  // console.log(categoriesArray);
  res.render("index", { categoriesArray });
};

exports.Items = async (req, res) => {
  console.log("controller")
  const itemsArray = await db.getItems(req.params.category)
  res.render("items", { itemsArray })
};

exports.createCategory = async (req, res) => {
  console.log("Creating category...")
  db.createCategory(req.body.category);
  res.redirect("/")
}

exports.updateCategory = async (req, res) => {
  console.log("Updating category...")
  db.updateCategory(req.body.category)
  res.redirect("/")
}