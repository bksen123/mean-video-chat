const Meeting = require("../models/meetingsModel.js");
const globalService = require("../core/globalService");
var jwt = require('jsonwebtoken');

require("dotenv").config();

exports.saveMeetings = async (req, res) => {
  const postData = req.body;
  var meetingPost = postData;
  meetingPost.totalUsers = postData.userIds.length;
  console.log("meetingPost", meetingPost);
  return;
  try {
    var userResp = await Meeting.create();
    if (userResp) {
      return res.json({
        message: "Meeting Created Successfuly.",
        status: 200,
        data: userResp,
      });
    } else {
      return res.json({
        message: "Failed to create account.",
        status: 500,
        error: "Getting issue while creating user account.",
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