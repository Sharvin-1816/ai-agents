const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { bookDemo } = require("../controllers/demoController");

router.post("/book", authenticate, bookDemo);

module.exports = router;
