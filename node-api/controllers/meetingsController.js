const { Meetings, MeetingUsers } = require("../models/meetingsModel.js");
const globalService = require("../core/globalService");
var jwt = require('jsonwebtoken');
require("dotenv").config();
const asyncHandle = require("async");


exports.saveMeetings = async (req, res) => {
  const postData = req.body;
  var meetingPost = postData;
  meetingPost.totalUsers = postData.userIds.length;
  console.log("postData")
  try {
    var userResp = await Meetings.create(meetingPost);
    if (userResp) {
      await Promise.all(postData.userIds.map(async (ele) => {
        let postMeetingUser = {
          userid: ele._id,
          meetingId: userResp._id
        }
        var MeetinUserRes = await MeetingUsers.create(postMeetingUser);
        if (MeetinUserRes) {
          var prepareEmailConfig = {
            email: user.email,
            firstName: globalService.capitalize(ele.userName),
            markerData: {
              name: globalService.capitalize(ele.userName),
              websiteUrl: process.env.WEBSITE_URL,
              recoverPasswordLink: linkParam,
              userName: ele.userName,
            },
            templatePath: "public/assets/emailtemplates/amw-zoom-invitation.html",
            subject: "AMW Zoom meeting for " + userResp.title,
            html: "",
            templateName: "amw-zoom-invitation", // NEW
          };
          await globalService.prepareEmailData(prepareEmailConfig, (err, resp) => { });
        }
      }));
      console.log('final Res====');
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