const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
var routes = require("./router");
const morgan = require("morgan");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3030, () => {
  console.log(`Server started on port 3030`);
});
app.use(cors());
routes(app);
//routes
app.use(morgan("dev"));
app.use("/auth", require("./middleware"));
