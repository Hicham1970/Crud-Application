const mongoose = require("mongoose");

const vesselSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    reg_port: {
      type: String,
      required: true,
    },
    imo: {
      type: Number,
      required: true,
      unique: true,
    },
    cargo: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    arrival: {
      type: Date,
      required: true,
    },
    departure: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const VesselDb = mongoose.model("vesseldb", vesselSchema);

module.exports = VesselDb;
