const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/", usersController.homePage);
usersRouter.get("/:categoryID", usersController.Items);
// Category CRUD
usersRouter.post("/createCategory", usersController.createCategory);
usersRouter.post("/update/:categoryID", usersController.updateCategory);
usersRouter.post("/delete/:categoryID", usersController.deleteCategory);
// Item CRUD
usersRouter.post("/:categoryID/createItem", usersController.createItem);
usersRouter.post("/:categoryID/update/:itemID", usersController.updateItem);
usersRouter.post("/:categoryID/delete/:itemID", usersController.deleteItem);

module.exports = usersRouter;
