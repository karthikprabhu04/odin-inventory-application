const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/", usersController.homePage)


module.exports = usersRouter;