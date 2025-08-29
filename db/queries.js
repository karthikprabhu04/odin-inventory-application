const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT category FROM categories");
  categoriesArray = rows.map(row => row.category);
  return categoriesArray;
}

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM packinglist");
  return rows;
}

module.exports = {
  getAllCategories,
  getAllItems,
};
