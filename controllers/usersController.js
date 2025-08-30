const db = require("../db/queries");

// List of categories
exports.homePage = async (req, res) => {
  const categoriesList = await db.getAllCategories();
  // console.log(categoriesArray);
  res.render("index", { categoriesList });
};

// List of items in a category
exports.Items = async (req, res) => {
  // console.log("controller")
  const itemsList = await db.getItems(req.params.categoryID)
  res.render("items", { itemsList })
};

// Creating category
exports.createCategory = async (req, res) => {
  console.log("Creating category...")
  db.createCategory(req.body.category);
  res.redirect("/")
}

// Updating category
exports.updateCategory = async (req, res) => {
  console.log("Updating category...")
  db.updateCategory(req.params.categoryID, req.body.newName)
  res.redirect("/")
}

// Delete category
exports.deleteCategory = async (req, res) => {
  console.log("Deleting category...")
  db.deleteCategory(req.params.categoryID)
  res.redirect("/")
}