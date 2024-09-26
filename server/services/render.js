const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Make a get request to the api/vessels
  axios
    .get("http://localhost:3000/api/vessels")
    .then(function (response) {
      // console.log(response.data);
      res.render("index", { vessels: response.data });
    })
    .catch(function (error) {
      console.error(error);
      res.render("index", { vessels: "New Data" });
    });
};
2;
exports.addVessel = (req, res) => {
  res.render("add-vessel", { vessel: {} });
};

exports.updateVessel = (req, res) => {
  axios
    .get("http://localhost:3000/api/vessels", {
      params: { id: req.query.id },
    })
    .then(function (vesselData) {
      res.render("update-vessel", { vessel: vesselData.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
