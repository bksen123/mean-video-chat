const { Meetings, MeetingUsers } = require("../models/meetingsModel.js");
const User = require("../models/usersModel.js");
const globalService = require("../core/globalService");
var jwt = require("jsonwebtoken");
var moment = require("moment");
require("dotenv").config();
const asyncHandle = require("async");
const { v4: uuidv4 } = require("uuid");

exports.saveMeetings = async (req, res) => {
  const postData = req.body;
  var meetingPost = postData;
  postData.userIds.push(req.session.currentUser);
  meetingPost.totalUsers = postData.userIds.length;
  meetingPost.uuZoomId = uuidv4();
  // console.log("meetingPost=====", meetingPost)
  try {
    var userResp = await Meetings.create(meetingPost);
    // console.log("userResp====", userResp)
    if (userResp) {
      await Promise.all(
        postData.userIds.map(async (ele) => {
          let userDetails = await User.findOne({ _id: ele._id });
          let postMeetingUser = {
            userId: ele._id,
            meetingId: userResp._id,
            uuZoomId: userResp.uuZoomId,
            userAck: req.session.currentUser._id === ele._id ? true : false,
          };
          var MeetinUserRes = await MeetingUsers.create(postMeetingUser);
          // console.log("userDetails======", userDetails);
          if (MeetinUserRes && req.session.currentUser._id !== ele._id) {
            var prepareEmailConfig = {
              email: userDetails.email,
              userName: globalService.capitalize(ele.userName),
              markerData: {
                meeting_date: moment(userResp.meetingDate).format("MMM Do YYYY"),
                website: process.env.WEBSITE_URL + "login",
                meeting_title: globalService.capitalize(userResp.title),
                name: globalService.capitalize(ele.userName),
                AMW_LOGO:
                  "https://amw-meet.onrender.com/assets/img/brand/AMW_Logo-2.png",
                websiteUrl: process.env.WEBSITE_URL,
                acknowledgement_link:
                  process.env.WEBSITE_URL +
                  "acknowledgement/" +
                  MeetinUserRes.uuZoomId +
                  "/" +
                  userDetails._id,
                amw_zoom_meeting:
                  process.env.WEBSITE_URL +
                  "login/" +
                  userResp.uuZoomId +
                  "amw-meet" +
                  ele._id,
                userName: globalService.capitalize(ele.userName),
              },
              templatePath:
                "node-api/public/assets/emailtemplates/amw-meet-invitation.html",
              subject: "AMW MEETING FOR " + userResp.title.toUpperCase(),
              html: "",
              templateName: "amw-meet-invitation", // NEW
            };
            console.log("prepareEmailConfig", prepareEmailConfig);
            return;
            globalService.prepareEmailData(prepareEmailConfig);
          }
          // console.log('userDetails========', userDetails);
        })
      );
      return res.json({
        message: "Meeting Created Successfully.",
        status: 200,
        data: userResp,
      });
    } else {
      return res.json({
        message: "Failed to create an user account.",
        status: 500,
        error: "There are some error while creating meetin...",
      });
    }
  } catch (error) {
    return res.json({
      message: "Failed to create an user account.",
      status: 500,
      error: error.message,
    });
  }
};

exports.acknowledgement = async (req, res) => {
  var postData = req.body;
  try {
    var userResp = await MeetingUsers.updateOne(
      { uuZoomId: postData.uuZoomId, userId: postData.userId },
      postData
    );
    if (userResp) {
      return res.json({
        status: 200,
        message:
          "Meeting Acknowledge has been Successfully. Please login to join meeting",
        data: userResp,
      });
    } else {
      return res.json({
        status: 500,
        message: "There are some while acknowledgement.",
        data: emailExitResp,
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "There are some while acknowledgement.",
      data: error,
    });
  }
};

exports.getUsersList = async (req, res) => {
  try {
    const data = await User.find();
    return res.json({
      status: 200,
      message: "Get the user list successfully.",
      data: data,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Some error occrred.",
      data: error,
    });
  }
};

exports.emailAlreadyExists = async (req, res) => {
  var postData = req.body;
  try {
    const emailExitResp = await User.findOne({
      email: postData.email,
    });
    if (emailExitResp) {
      return res.json({
        status: 200,
        message: "This Email Already Exists, please try another one.",
        data: emailExitResp,
      });
    } else {
      return res.json({
        status: 500,
        message: "No Email Found.",
        data: emailExitResp,
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "No Email Found.",
      data: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  var postData = req.body;
  let resp = await User.findOneAndDelete({ _id: postData._id });
  if (resp) {
    return res.json({
      status: 200,
      message: "User Deleted successfully.",
      data: resp,
    });
  } else {
    return res.json({
      status: 400,
      message: "There are some error while Deleting User.",
      data: err,
    });
  }
};

exports.getMeetingsList = async (req, res) => {
  var currentUser = req.session.currentUser;
  var postData = req.body;
  let whereObj = {};

  let todayDate = new Date();
  let date = todayDate.getDate();
  let month = todayDate.getMonth();
  let year = todayDate.getFullYear();

  if (postData.tab === "coming") {
    whereObj = {
      meetingDate: {
        $gte: new Date(year, month, date),
        // $lt: new Date(year, month, date + 1),
      },
    };
  } else if (postData.tab === "previous") {
    whereObj = {
      meetingDate: {
        $lt: new Date(year, month, date),
      },
    };
  }
  let UserMeetings = [];
  if (currentUser && currentUser.role !== "admin") {
    let userMeeting = await MeetingUsers.find({
      userId: currentUser._id,
    }).select("meetingId -_id");
    if (userMeeting.length) {
      UserMeetings = userMeeting.map((ele) => ele.meetingId);
      if (UserMeetings.length) {
        whereObj._id = {
          $in: UserMeetings,
        };
      }
    }
  }
  try {
    const data = await Meetings.find(whereObj).sort({ createdAt: "-1" });
    return res.json({
      status: 200,
      message: "Get the Meeting list Successfully.",
      data: data,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Some error occrred.",
      data: error,
    });
  }
};

exports.getMeetingsUser = async (req, res) => {
  try {
    const data = await MeetingUsers.find({
      meetingId: req.body.meetingId,
    }).populate("userId");
    // console.log("MeetingUser list Data into controller", data);
    return res.json({
      status: 200,
      message: "Get the MeetingUser list Successfully.",
      data: data,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Some error occrred.",
      data: error,
    });
  }
};

exports.getUsersByMeeting = async (whereObj, req, next) => {
  try {
    var userResp = await MeetingUsers.findOne(whereObj)
      .populate("userId")
      .populate("meetingId");
    var meetSchRes = globalService.compareDate(userResp);
    if (userResp && userResp.userAck && meetSchRes.status === 200) {
      return next(null, {
        status: 200,
        message: "Meeting verify has been Successfully.",
        data: userResp,
      });
    } else {
      let msg = "";
      if (userResp && !userResp.userAck) {
        msg =
          "You need to acknowledgement via email before join meeting So firstly do acknowledgement then you can join meeting. without acknowledgement you can't join this meeting.";
      } else if (userResp && userResp.userAck && meetSchRes.status === 500) {
        msg = meetSchRes.message;
      } else {
        msg = "There are some while meeting verify with user...";
      }
      return next(true, {
        status: 500,
        message: msg,
        data: userResp
      });
    }
  } catch (error) {
    return next(error, {
      status: 500,
      message: "There are some error while verifying Meeting. Please check your meeting url ",
      data: {
        userId: req.session.currentUser
      }
    });
  }
};

exports.deleteMeeting = async (req, res) => {
  var postData = req.body;
  let redponceMeeting = await Meetings.findOneAndDelete({ _id: postData._id });
  let redponceMeetingUsers = await MeetingUsers.deleteMany({
    meetingId: postData._id,
  });
  let redponce = { redponceMeeting, redponceMeetingUsers };
  if (redponce) {
    return res.json({
      status: 200,
      message: "Meeting Deleted successfully.",
      data: redponce,
    });
  } else {
    return res.json({
      status: 400,
      message: "There are some error while Deleting Meeting.",
      data: redponce,
    });
  }
};
