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
  const categoryID = req.params.categoryID;
  const itemsList = await db.getItems(categoryID);
  const category = await db.getCategoryFromID(categoryID)
  console.log(categoryID);
  console.log(itemsList);
  res.render("items", { itemsList, categoryID, category });
};

// CATEGORY CRUD ACTIONS
// Creating category
exports.createCategory = async (req, res) => {
  console.log("Creating category...");
  db.createCategory(req.body.category);
  res.redirect("/");
};

// Updating category
exports.updateCategory = async (req, res) => {
  if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send("Invalid admin password")
  }
  
  console.log("Updating category...");
  await db.updateCategory(req.params.categoryID, req.body.newName);
  res.redirect("/");
};

// Delete category
exports.deleteCategory = async (req, res) => {
  if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send("Invalid admin password")
  }
  
  console.log("Deleting category...");
  await db.deleteCategory(req.params.categoryID);
  res.redirect("/");
};

// ITEM CRUD ACTIONS
// Creating item
exports.createItem = async (req, res) => {
  console.log("Creating item...");
  db.createItem(req.body.item, Number(req.params.categoryID));
  res.redirect(`/${req.params.categoryID}`)
};

// Updating item
exports.updateItem = async (req, res) => {
  console.log("Updating item...");
  db.updateItem(req.params.itemID, req.body.newItemName);
  res.redirect(`/${req.params.categoryID}`);
};

// Delete item
exports.deleteItem = async (req, res) => {
  console.log("Deleting item...");
  db.deleteItem(req.params.itemID);
  res.redirect(`/${req.params.categoryID}`);
};
