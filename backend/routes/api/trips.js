const express = require("express");
const app = require("../../../backend/app");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({
    message: "GET /api/trips",
  });
});

module.exports = router;
