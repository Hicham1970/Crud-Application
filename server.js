const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: `config.env` });
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan("dev"));
//MongoDB connection:
connectDB();

//parse request to body-parser:
app.use(bodyParser.urlencoded({ extended: true }));

//set the view engine
app.set("view engine", "ejs");
// in case when we use a folder ejs inside the views
// app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// Load routers:
app.use("/", require("./server/routes/router"));
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
