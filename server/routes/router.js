const express = require("express");
const route = express.Router();

const services = require("../services/render");
const userController = require("../controllers/usersController");
/**
 * @description Root Route
 * @method GET /
 */

route.get("/", services.homeRoutes);
/**
 * @description add user
 * @method GET /add-user
 */

route.get("/add-user", services.addUser);
/**
 * @description update user
 * @method GET / update-user
 */

route.get("/update-user", services.updateUser);

// Api Routes
route.post("/api/users", userController.create);
route.get("/api/users", userController.find);
route.put("/api/users/:id", userController.update);
route.delete("/api/users/:id", userController.delete);

module.exports = route;
