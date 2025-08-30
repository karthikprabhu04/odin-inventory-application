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
    "SELECT item FROM items WHERE category_id = $1",
    [categoryID]
  );
  console.log(rows);
  return rows;
}

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

module.exports = {
  getAllCategories,
  getItems,
  createCategory,
  updateCategory,
  deleteCategory,
};
