const connection = require("../koneksi");
const mysql = require("mysql");
const md5 = require("md5");
const respon = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/sectret");
var ip = require("ip");
const nodemailer = require("nodemailer");

let smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "exmuhammadfaisal0402@gmail.com",
    pass: "faisalf0901",
  },
});
let rand, mailOptions, host, link;
exports.verifikasi = function (req, res) {
  console.log(req.protocol);
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    if (req.query.id == rand) {
      connection.query(
        "UPDATE set isverified=? WHERE email=?",
        [1, mailOptions.to],
        function (err, rows, fiels) {
          if (err) {
            console.log(err);
          } else {
            res.json({ massage: "berhasil merubah data" });
          }
        }
      );
      res.end("<h1>email </h1>" + mailOptions.to + "telah telah terverifikasi");
    } else {
      res.end("<h1>email </h1>" + mailOptions.to + "belum  terverifikasi");
    }
  }
};
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
    isverified: 0,
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
                rand = Math.floor(Math.random() * 100 + 54);
                host = "localhost:3030";
                link = "http://" + host + "/auth.verify?id=" + rand;
                mailOptions = {
                  to: post.email,
                  subject: "silakan konfirmasi email anda",
                  html:
                    "halo <br> please klik link berikut <br>" +
                    "<a href=" +
                    link +
                    ">click disini untuk verifikasi </a>",
                };
                smtpTransport.sendMail(mailOptions, function (err, respone) {
                  if (err) {
                    console.log(err);
                  } else {
                    res
                      .status(200)
                      .json({ massage: "email berhasil di daftarkan" });
                  }
                  res.end("end");
                });
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
          let role = result[0].role;
          let username = result[0].username;
          let data = {
            id_user: id,
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
                  succes: true,
                  token: token,
                  currentUser: data.id,
                  username: username,
                  role: role,
                });
              }
            }
          );
        } else {
          res.json({ massage: "email atau password salah" });
        }
      }
    }
  );
};
exports.halamanRahasia = function (req, res) {
  res.status(200).json("halaaman untuk role 2");
};
