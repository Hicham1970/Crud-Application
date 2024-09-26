const VesselDb = require("../models/model");

//Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //New user
  const vessel = new VesselDb({
    name: req.body.name,
    nationality: req.body.nationality,
    reg_port: req.body.reg_port,
    imo: req.body.imo,
    cargo: req.body.cargo,
    client: req.body.client,
    arrival: req.body.arrival,
    departure: req.body.departure,
  });
  // Save vessel in the database
  vessel
    .save(vessel)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-vessel");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

//retrieve and return all vessels / retrieve and return a single vessel
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    VesselDb.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Navire non trouvé avec l'id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Erreur lors de la récupération du navire avec l'id " + id,
        });
      });
  } else {
    VesselDb.find()
      .then((vessels) => {
        res.send(vessels);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Une erreur s'est produite lors de la récupération des informations des navires",
        });
      });
  }
};

// update a new identified user bu Id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  const vesselId = req.params.id;
  VesselDb.findByIdAndUpdate(vesselId, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update the vessel with ${vesselId}.Maybe vessel not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error Update vessels informations" });
    });
};

// Delete a ship with specified vessel id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  VesselDb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}, maybe id is wrong` });
      } else {
        res.send({ message: "Vessel was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete the Ship with id ${id}`,
      });
    });
};
