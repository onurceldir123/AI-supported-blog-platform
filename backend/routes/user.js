const express = require('express');
const UserController = require("../controllers/user");
const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.delete("/remove", UserController.removeUsers);

module.exports = router;

