// crypto module
const async = require("async");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
var moment = require("moment");
var jwt = require('jsonwebtoken');

exports.authenticationFalsePage = () => {
  return ['emailAlreadyExists', 'doSignIn', 'logout', 'searchUserData', 'forgotPassword', 'getUserInfo', 'saveUserInfo', 'doSignup', 'swagger-yaml-api']
};

exports.prepareEmailData = (EmailConfig, callBack) => {
  async.waterfall(
    [
      (cb) => {
        /** Get email messages template by template path*/
        exports.getEmailMessages(EmailConfig.templatePath, (err, html) => {
          if (err) {
            cb(true, null);
          } else {
            cb(null, html);
          }
        });
      },
      (messages, cb) => {
        if (messages) {
          /**this function call for replace marker under email messages*/
          exports.replaceMarker(
            EmailConfig.markerData,
            messages,
            (err, html) => {
              if (err) {
                cb(true, null);
              } else {
                EmailConfig.html = html;
                cb(null, html);
              }
            }
          );
        } else {
          cb(null, true);
        }
      },
      (messages, cb) => {
        if (messages) {
          /** finally call send email service for send email */
          exports.emailSend(EmailConfig, function () {
            cb(null, true);
          });
        } else {
          cb(null, true);
        }
        cb(null, true);
      },
    ],
    (error, finalResp) => {
      if (callBack) {
        callBack();
      }
    }
  );
};

exports.getEmailMessages = (templatePath, callback) => {
  fs.readFile(
    templatePath, {
    encoding: "utf-8",
  },
    function (err, html) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, html);
      }
    }
  );
};

exports.replaceMarker = (markerData, messages, callBack) => {
  var keys = Object.keys(markerData);
  async.forEach(
    keys,
    (key, cb) => {
      var marker = "##" + key.toUpperCase() + "##";
      messages = messages.replace(new RegExp(marker, "g"), markerData[key]);
      cb();
    },
    () => {
      callBack(null, messages);
    }
  );
};

exports.emailSend = async (emailData, mainCb) => {
  /* 	sgMail.setApiKey(process.env.SEND_GRID_API);
      const msg = {
        from: process.env.SEND_GRID_FROM_EMAIL,
        to: emailData.email,
        subject: emailData.subject,
        html: emailData.html
      };
      var sendEamilResponse = await sgMail.send(msg);
      console.log("Message sent: %s", JSON.stringify(sendEamilResponse));
      mainCb(); */

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_API,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailDetails = {
    from: "noreply@gmail.com",
    to: emailData.email,
    subject: emailData.subject,
    html: emailData.html,
    /* attachments: [{
            filename: 'file.pdf',
            path: 'public/assets/test.pdf',
            contentType: 'application/pdf'
        }, {
            filename: 'logo1.png',
            path: 'public/assets/img/brand/avatar.png',
            cid: 'logo1'
        }], */
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
      mainCb();
    } else {
      console.log("Email sent successfully");
      mainCb();
    }
  });
};

exports.encryptString = (text) => {
  let encryptedData = crypto.createHash("md5").update(text).digest("hex");
  return encryptedData;
};

exports.generateString = () => {
  let length = 246;
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

exports.verifyToken = (authorization, callBack) => {
  // console.log("authorization===========", authorization)
  jwt.verify(authorization, process.env.JWT_SECRETKEY, function (err, payload) {
    // console.log("payload ====== ", payload);
    if (payload) {
      /* user.findById(payload._id).then(
        (doc)=>{
          req.user=doc;
          next()
        }
        ) */
      callBack({
        verify: true
      })
    } else {
      callBack({
        verify: false
      })
    }
  })
};

exports.capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

exports.removeFile = async (imagePath, mainCb) => {
  imagePath = imagePath.split(process.env.HOST_NAME);
  imagePath = process.env.DELETE_PHOTOS + imagePath[1];
  try {
    fs.unlinkSync(imagePath);
    mainCb();
  } catch (err) {
    mainCb();
  }
};

exports.linkExpiryTimeCheck = (UpdatedAT) => {
  // process.env.linkExpireTimeInSecond 30 minutes
  let currentTime = moment().format("DD/MM/YYYY hh:mm");
  let getMinute = moment(UpdatedAT, "DD/MM/YYYY hh:mm:ss").get("seconds");
  let linkExpireTime = moment(UpdatedAT, "DD/MM/YYYY hh:mm:ss")
    .set("seconds", getMinute + Number(process.env.linkExpireTimeInSecond))
    .format("DD/MM/YYYY hh:mm");
  // console.log(linkExpireTime, "linkExpireTime");
  // console.log(currentTime, "currentTime");
  if (currentTime <= linkExpireTime) {
    return true;
  } else {
    return false;
  }
};

exports.linkExpiryError = () => {
  return {
    status: 500,
    message: "Forgot Password Link has been expired. Please check link or again you can request for forgot password!.",
    data: "Forgot Password Link has been expired. Please check link or again you can request for forgot password!.",
  };
};
exports.compareDate = (reqDetais) => {
  var meetingDate = moment(reqDetais.meetingId.meetingDate).format("DD/MM/YYYY")
  var now = moment().format("DD/MM/YYYY");
  // console.log("meetingDate============", meetingDate);
  // console.log("now============", now);
  if (now > meetingDate) {
    return false;
  } else {
    return true;
  }

};