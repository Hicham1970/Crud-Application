const UserDb = require("../models/model");

//Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //New user
  const user = new UserDb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  // Save user in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

//retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    UserDb.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Utilisateur non trouvé avec l'id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            "Erreur lors de la récupération de l'utilisateur avec l'id " + id,
        });
      });
  } else {
    UserDb.find()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Une erreur s'est produite lors de la récupération des informations des utilisateurs",
        });
      });
  }
};

// update a new identified user bu Id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  const userId = req.params.id;
  UserDb.findByIdAndUpdate(userId, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${userId}.Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error Update users informations" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  UserDb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}, maybe id is wrong` });
      } else {
        res.send({ message: "User was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete User with id ${id}`,
      });
    });
};
