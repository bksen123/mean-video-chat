const { Meetings, MeetingUsers } = require("../models/meetingsModel.js");
const User = require("../models/usersModel.js");

const globalService = require("../core/globalService");
var jwt = require('jsonwebtoken');
require("dotenv").config();
const asyncHandle = require("async");
const { v4: uuidv4 } = require("uuid");



exports.saveMeetings = async (req, res) => {
  const postData = req.body;
  var meetingPost = postData;
  meetingPost.totalUsers = postData.userIds.length;
  meetingPost.uuZoomId = uuidv4();
  // console.log("meetingPost=====", meetingPost)
  try {
    var userResp = await Meetings.create(meetingPost);
    // console.log("userResp====", userResp)
    if (userResp) {
      await Promise.all(postData.userIds.map(async (ele) => {
        let userDetails = await User.findOne({ _id: ele._id });
        // console.log("userDetails======", userDetails);
        let postMeetingUser = {
          userid: ele._id,
          meetingId: userResp._id,
          uuZoomId: userResp.uuZoomId
        }
        var MeetinUserRes = await MeetingUsers.create(postMeetingUser);
        if (MeetinUserRes) {
          var prepareEmailConfig = {
            email: userDetails.email,
            userName: globalService.capitalize(ele.userName),
            markerData: {
              meeting_title: globalService.capitalize(userResp.title),
              name: globalService.capitalize(ele.userName),
              AMW_LOGO: 'https://amw-zoom.onrender.com/assets/img/brand/AMW_Logo-2.png',
              websiteUrl: process.env.WEBSITE_URL,
              acknowledgement_link: process.env.WEBSITE_URL + 'acknowledgement/' + MeetinUserRes._id + '/' + userDetails._id,
              amw_zoom_meeting: process.env.WEBSITE_URL + 'login/' + userResp.uuZoomId + 'amw-zoom' + ele._id,
              userName: globalService.capitalize(ele.userName),
            },
            templatePath: "node-api/public/assets/emailtemplates/amw-zoom-invitation.html",
            subject: "AMW ZOOM MEETING FOR " + userResp.title.toUpperCase(),
            html: "",
            templateName: "amw-zoom-invitation", // NEW
          };
          console.log("prepareEmailConfig", prepareEmailConfig);
          return;
          globalService.prepareEmailData(prepareEmailConfig);
        }
      }));
      return res.json({
        message: "Meeting Created Successfuly.",
        status: 200,
        data: userResp,
      });
      /*  asyncHandle.forEachSeries(postData.userIds, async (ele, cb) => {
         console.log("ele=======", ele);
         let postMeetingUser = {
           userid: ele._id,
           meetingId: userResp._id
         }
         console.log("postMeetingUser", postMeetingUser);
         var MeetinUserRes = MeetingUsers.create(postMeetingUser);
         if (MeetinUserRes) {
           console.log("MeetinUserRes======", MeetinUserRes);
           cb()
         } else {
           cb()
         }
         // cb()
       }, () => {
         console.log('final Res====');
         return res.json({
           message: "Meeting Created Successfuly.",
           status: 200,
           data: userResp,
         });
       }) */
    } else {
      return res.json({
        message: "Failed to create an user account.",
        status: 500,
        error: 'There are some error while creating meetin...',
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
      message: 'User Deleted successfully.',
      data: resp
    });
  } else {
    return res.json({
      status: 400,
      message: 'There are some error while Deleting User.',
      data: err
    });
  }
};