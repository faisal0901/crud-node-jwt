module.exports = function (app) {
  var json = require("./controller");
  app.route("/").get(json.index);
  app.route("/api").get(json.tampilSemua);
  app.route("/api/:id").get(json.tampilbyId);
  app.route("/api/add/").post(json.addSiswa);
  app.route("/api/delete/:id").delete(json.deleteSiswa);
};
