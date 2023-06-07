const express = require("express");
const app = express();
const server = require("http").Server(app);
// const { v4: uuidv4 } = require("uuid");
const cors = require("cors")
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const opinions = {
  debug: true,
}

var createError = require("http-errors");
const session = require('express-session');
var path = require("path");
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cookieParser = require("cookie-parser");
const logger = require('morgan');
// const globalService = require("./node-api/core/globalService");
mongoose.Promise = global.Promise;

// connect to db
var DB = require("./node-api/core/db");
var DBConnection = DB.createDBConnection();
DBConnection.then(
  () => {
    console.log("DB connection done");
  },
  (err) => {
    console.log("connection failed ", err);
  }
);
var userRouter = require("./node-api/routes/users");
var meetingRouter = require("./node-api/routes/meetings");

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }


app.use(session({
  secret: process.env.SESSION_SECRETKEY,
  proxy: true,
  resave: true,
  saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(express.static('node-api/public'));
app.use(express.static('node-api/photos'));
app.use(logger('dev'));
app.use(express.json()); //Used to parse JSON bodies
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* app.use(async (req, res) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const authorization = req.headers.authorization.split(" ")[1]
    globalService.verifyToken(authorization, (verifyResp) => {
      if (verifyResp.verify) {
        return req.next();
      } else {
        return res.json({
          status: 401,
          error: "You are unauthorized users.",
        });
      }
    });
  } else {
    let UnauthenticationPages = globalService.authenticationFalsePage();
    let pageSegment = req.url.split('/');
    const foundPages = UnauthenticationPages.find((page) => page === pageSegment[2])
    console.log("foundPages", foundPages)
    if (foundPages) {
      return req.next();
    } else {
      return res.json({
        status: 401,
        error: "You are unauthorized users.",
      });
    }
  }
})
 */

app.use(express.static("socket-assets"));
app.use(express.static("views"));

// app.get("/", (req, res) => {
//   res.redirect(`/${uuidv4()}`);
// });
const MeetingCtl = require("./node-api/controllers/meetingsController");

app.use("/peerjs", ExpressPeerServer(server, opinions));
app.get("/:room", (req, res) => {
  console.log("req.params", req.params);
  let room = req.params.room;
  var meetingDetails = room.split("amw-zoom");
  if (meetingDetails.length > 1) {
    MeetingCtl.getUsersByMeeting({
      uuZoomId: meetingDetails[0],
      userId: meetingDetails[1]
    }, (error, resp) => {
      console.log("req.session.currentUser====", req.session.currentUser);
      if (!req.session.currentUser) {
        res.redirect('/#/login/' + room);
      } else {
        if (error) {
          res.send('You need to acknowledgement via email before join meeting So firstly do acknowledgement.');
        } else {
          // console.log("resp====", resp.data.userId);
          var userDetails = resp.data.userId
          userDetails.roomId = meetingDetails[0]
          res.render("room", { userDetails: userDetails });
        }
      }
    })
  } else {
    return res.send({
      status: 401,
      error: "You are unauthorized users.",
    });
  }
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName, profile) => {
    console.log("roomId=========", roomId);
    socket.join(roomId);
    setTimeout(() => {
      socket.to(roomId).broadcast.emit("user-connected", userId);
    }, 1000)
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName, profile);
    });
  });
});

app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/users", userRouter);
app.use("/meetings", meetingRouter);

server.listen(process.env.PORT || 3000);
