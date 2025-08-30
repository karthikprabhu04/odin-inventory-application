const pool = require("./pool");

// Get all categories
async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT id, category FROM categories ORDER BY id ASC"
  );
  console.log(rows);
  return rows;
}

// Get all items from a category
async function getItems(categoryID) {
  const { rows } = await pool.query(
    "SELECT id, item FROM items WHERE category_id = $1 ORDER BY id ASC",
    [categoryID]
  );
  console.log(rows);
  return rows;
}

// CATEGORY CRUD ACTIONS
// Create new category
async function createCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

// Update category
async function updateCategory(categoryID, newName) {
  await pool.query("UPDATE categories SET category = $1 WHERE id = $2", [
    newName,
    categoryID,
  ]);
}

// Delete category
async function deleteCategory(categoryID) {
  await pool.query("DELETE FROM items WHERE category_id = $1", [categoryID]);
  await pool.query("DELETE FROM categories WHERE id = $1", [categoryID]);
}

// ITEM CRUD ACTIONS
// Create new item
async function createItem(item, categoryID) {
  // console.log(categoryID)
  await pool.query("INSERT INTO items (item, category_id) VALUES ($1, $2)", [item, categoryID]);
}

// Update item
async function updateItem(itemID, newItemName) {
  await pool.query("UPDATE items SET item = $1 WHERE id = $2", [
    newItemName,
    itemID,
  ]);
}

// Delete item
async function deleteItem(itemID) {
  await pool.query("DELETE FROM items WHERE id = $1", [itemID]);
}


module.exports = {
  getAllCategories,
  getItems,
  // Categories CRUD
  createCategory,
  updateCategory,
  deleteCategory,
  // Items CRUD
  createItem,
  updateItem,
  deleteItem,
};
