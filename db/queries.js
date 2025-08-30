const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT id, category FROM categories");
  console.log(rows)
  // categoriesIDs = rows.map((row) => row.id)
  // categoriesArray = rows.map((row) => row.category);
  
  return categoriesArray;
}

async function getItems(category) {
  // Get category ID
  const categoryResult = await pool.query(
    "SELECT id FROM categories WHERE category = $1",
    [category]
  );
  const categoryId = categoryResult.rows[0].id;

  // Get items for that category
  const itemsResult = await pool.query(
    "SELECT item FROM items WHERE category_id = $1",
    [categoryId]
  );
  const itemsArray = itemsResult.rows.map((row) => row.item);
  return itemsArray;
}

async function createCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

async function updateCategory(category, categoryID) {
  await pool.query("UPDATE categories SET category = $1 WHERE id = $2", [category, categoryID]);
}

module.exports = {
  getAllCategories,
  getItems,
  createCategory,
};
