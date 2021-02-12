var mysql = require("mysql");
//koneksi
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DB_restApi",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("mysl terkoneksi");
});
module.exports = conn;
