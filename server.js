const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var routes = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3030, () => {
  console.log(`Server started on port 3030`);
});
routes(app);
//routes
