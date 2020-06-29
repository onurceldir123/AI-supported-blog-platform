const express = require('express');

const dataController = require("../controllers/data");

const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get('', dataController.getData);
router.get('/failed', dataController.getFailData);

module.exports = router;
