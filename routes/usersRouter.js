const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/", usersController.homePage);
usersRouter.get("/:category", usersController.Items);
usersRouter.post("/createCategory", usersController.createCategory);
usersRouter.post("/updateCategory", usersController.updateCategory);

module.exports = usersRouter;
