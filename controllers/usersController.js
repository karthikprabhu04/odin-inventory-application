const db = require("../db/queries");

exports.homePage = async (req, res) => {
  const categoriesArray = await db.getAllCategories();
  console.log(categoriesArray);
  res.render("index", { categoriesArray });
};
