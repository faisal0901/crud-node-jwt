const connection = require("../koneksi");
const mysql = require("mysql");
const md5 = require("md5");
const respon = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/sectret");
var ip = require("ip");

//controler register
exports.registrasi = function (req, res) {
  const { username, email, password, role } = req.body;

  const encrypt = md5(password);
  var post = {
    username: username,
    email: email,
    password: encrypt,
    role: role,
    tanggal_daftar: new Date(),
  };
  connection.query(
    "SELECT email from user where email =?",
    [email],
    function (err, result, field) {
      if (err) {
        console.log(err);
      } else {
        if (result.length == 0) {
          connection.query(
            "INSERT INTO user SET ?",
            post,
            function (err, result, field) {
              if (err) {
                console.log(err);
              } else {
                res
                  .status(200)
                  .json({ massage: "email berhasil di daftarkan" });
              }
            }
          );
        } else {
          res.status(501).json({ massage: "sudah terdaftar" });
        }
      }
    }
  );
};

exports.login = function (req, res) {
  const { email, password } = req.body;
  let user = {
    email,
    password,
  };
  connection.query(
    "SELECT * FROM ?? WHERE password=? AND email=?",
    ["user", md5(password), email],
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        if (result.length == 1) {
          let token = jwt.sign({ result }, config.secret, {
            expiresIn: 1440,
          });
          let id = result[0].id;
          let data = {
            id,
            acces_token: token,
            ip_addres: ip.address(),
          };
          connection.query(
            "INSERT INTO acces_token SET ?",
            data,
            function (err, result, fields) {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json({
                  massage: "token tergenerate",
                  token: token,
                  currentUser: data.id,
                });
              }
            }
          );
        } else {
          res.status(500).json({ massage: "email atau password salah" });
        }
      }
    }
  );
};
