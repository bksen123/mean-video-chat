const express = require("express");
const router = express.Router();
const Meetings = require("../controllers/meetingsController");
router.post("/saveMeetings", Meetings.saveMeetings);
router.post("/acknowledgement", Meetings.acknowledgement);
router.post("/getMeetingsList", Meetings.getMeetingsList);
router.post("/getMeetingsUser", Meetings.getMeetingsUser);
router.post("/deleteMeeting", Meetings.deleteMeeting);
module.exports = router;
