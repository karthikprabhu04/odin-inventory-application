const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/", usersController.homePage);
usersRouter.get("/:categoryID", usersController.Items);
usersRouter.post("/createCategory", usersController.createCategory);
usersRouter.post("/update/:categoryID", usersController.updateCategory);
usersRouter.post("/delete/:categoryID", usersController.deleteCategory);

module.exports = usersRouter;
