const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const members = require("../Members");

// Gets all members
router.get("/", (req, res) => {
  res.status(200).json(members);
});

module.exports = router;
