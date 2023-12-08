const express = require("express");
const router = express.Router();
const { postUser, loginUser } = require("../controller/register")


router.post("/register", postUser);
router.post("/login", loginUser);

module.exports = router;