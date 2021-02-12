"use strict";
var response = require("./res");
var connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("aplikasi rest api ", res);
};
//menampilkan semua data
exports.tampilSemua = function (req, res) {
  connection.query("SELECT * FROM siswa", function (err, rows, fields) {
    if (err) {
      connection.log();
    } else {
      response.ok(rows, res);
    }
    console.log(rows.Nama + fields);
  });
};

exports.tampilbyId = function (req, res) {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM siswa where id=?`,
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

exports.addSiswa = function (req, res) {
  const { nim, Nama, jurusan } = req.body;
  console.log(req.body);
  connection.query(
    `INSERT INTO siswa (nim,Nama,jurusan)VALUES(?,?,?)`,
    [nim, Nama, jurusan],

    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("berhasil memasukan data", res);
      }
    }
  );
};
exports.deleteSiswa = function (req, res) {
  const { id } = req.params;
  connection.query(
    `DELETE FROM siswa WHERE id =?;`,
    [id],

    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("berhasil delete data", res);
      }
    }
  );
};

exports.updateSiswa = function (req, res) {
  const { id } = req.params;
  connection.query(
    `DELETE FROM siswa WHERE id =?;`,
    [id],

    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("berhasil delete data", res);
      }
    }
  );
};