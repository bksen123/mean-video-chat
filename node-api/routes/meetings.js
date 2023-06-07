const express = require("express");
const router = express.Router();
const Meetings = require("../controllers/meetingsController");
router.post("/saveMeetings", Meetings.saveMeetings);
router.post("/acknowledgement", Meetings.acknowledgement);
router.get("/getMeetingsList", Meetings.getMeetingsList);
router.get("/getMeetingUsersList", Meetings.getMeetingUsersList);
module.exports = router;
