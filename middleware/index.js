const router = require("express").Router();
const auth = require("./auth");
const verfikasi = require("./verifikasi");
const controler = require("../controller");
router.post("/api/register", auth.registrasi);
router.post("/api/login", auth.login);

router.get("/api/halaman", verfikasi(2), auth.halamanRahasia);
router.get("/api", verfikasi(2), controler.tampilSemua);
router.get("/verify", auth.verifikasi);

module.exports = router;
