const jwt = require("jsonwebtoken");
const connection = require("../koneksi");

const config = require("../config/sectret");

function verifikasi(roles) {
  return function (req, rest, next) {
    //cek token header

    const tokenWithBarier = req.headers.authorization;
    console.log("token with barrie=>", tokenWithBarier);
    if (tokenWithBarier) {
      let token = tokenWithBarier.split(" ")[1];
      console.log("token split =>", token);
      jwt.verify(token, config.secret, function (err, decode) {
        if (err) {
          return rest
            .status(401)
            .send({ auth: false, massage: "token tidak terdaftar" });
        } else {
          if (roles == 2) {
            req.auth = decode;
            next();
          } else {
            return rest.status(401).send({
              auth: false,
              massage: "gagal memauhorization role anda",
            });
          }
        }
      });
    } else {
      return rest.status(401).send({
        auth: false,
        massage: "token tidak tersedia",
      });
    }
  };
}
module.exports = verifikasi;
