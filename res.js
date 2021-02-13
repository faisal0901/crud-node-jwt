"use strict";

exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  };
  res.json(data);
  res.end();
};

exports.oknested = function (values, res) {
  //lakukan akumulasi
  const hasil = values.reduce((akumulasikan, item) => {
    //tentukan key group

    if (akumulasikan[item.nama]) {
      //buat variabel group nama mahasiswa
      const group = akumulasikan[item.nama];
      //cek jika isi array adalah mata_pelajaran
      if (Array.isArray(group.mata_pelajaran)) {
        //tambahkan value ke dalam group mata_pelajaran
        group.mata_pelajaran.push(item.mata_pelajaran);
      } else {
        group.mata_pelajaran = [group.mata_pelajaran, item.mata_pelajaran];
      }
    } else {
      akumulasikan[item.nama] = item;
    }
    return akumulasikan;
  }, {});

  var data = {
    status: 200,
    values: hasil,
  };

  res.json(data);
  res.end();
};
