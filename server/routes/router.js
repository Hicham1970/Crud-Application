const express = require("express");
const route = express.Router();

const services = require("../services/render");
const vesselController = require("../controllers/vesselsController");
/**
 * @description Root Route
 * @method GET /
 */

route.get("/", services.homeRoutes);
/**
 * @description add user
 * @method GET /add-user
 */

route.get("/add-vessel", services.addVessel);
/**
 * @description update user
 * @method GET / update-user
 */

route.get("/update-vessel", services.updateVessel);

// Api Routes
route.post("/api/vessels", vesselController.create);
route.get("/api/vessels", vesselController.find);
route.put("/api/vessels/:id", vesselController.update);
route.delete("/api/vessels/:id", vesselController.delete);

module.exports = route;
