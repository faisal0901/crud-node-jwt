const router = require("express").Router();
const auth = require("./auth");

router.post("/api/register", auth.registrasi);
router.post("/api/login", auth.login);

module.exports = router;
