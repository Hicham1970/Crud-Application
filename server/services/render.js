const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Make a get request to the api/users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      // console.log(response.data);
      res.render("index", { users: response.data });
    })
    .catch(function (error) {
      console.error(error);
      res.render("index", { users: "New Data" });
    });
};

exports.addUser = (req, res) => {
  res.render("add-user");
};

exports.updateUser = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userData) {
      res.render("update-user", { user: userData.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
