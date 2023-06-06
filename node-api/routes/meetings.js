const express = require("express");
const router = express.Router();
const Meetings = require("../controllers/meetingsController");
router.post("/saveMeetings", Meetings.saveMeetings);
module.exports = router;