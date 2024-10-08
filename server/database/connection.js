const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb connection
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
