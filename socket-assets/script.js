const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
const screenShare = document.querySelector("#screenShare");
var onlineDiv = document.getElementById('online-users');
myVideo.muted = true;
var MyuserId = '';
var roomUsers = [];


// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
// screenShare.addEventListener("click", () => {
//   alert("Screen Share feature coming soon!");
// });


backBtn.addEventListener("click", () => {
  document.querySelector(".main__left").style.display = "flex";
  document.querySelector(".main__left").style.flex = "1";
  document.querySelector(".main__right").style.display = "none";
  // document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  // document.querySelector(".header__back").style.display = "block";
});

let user
if (userName) {
  user = userName;
  console.log("userName", user);
} else {
  user = prompt("Enter your name");
  profile = 'assets/img/brand/avatar.png'
}
var peer = new Peer({
  // host: '127.0.0.1',
  host: "/",
  // port: 3000, //it will be used for local
  path: "/peerjs",
  config: {
    iceServers: [
      { url: "stun:stun01.sipphone.com" },
      { url: "stun:stun.ekiga.net" },
      { url: "stun:stunserver.org" },
      { url: "stun:stun.softjoys.com" },
      { url: "stun:stun.voiparound.com" },
      { url: "stun:stun.voipbuster.com" },
      { url: "stun:stun.voipstunt.com" },
      { url: "stun:stun.voxgratia.org" },
      { url: "stun:stun.xten.com" },
      {
        url: "turn:192.158.29.39:3478?transport=udp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
      {
        url: "turn:192.158.29.39:3478?transport=tcp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
    ],
  },

  debug: 3,
});



let myVideoStream;
peer.on("open", (id) => {
  MyuserId = id;
  socket.emit("join-room", ROOM_ID, id, user, profile); // here is join room with peer user id


  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      // console.log("get stream", stream);
      myVideoStream = stream;

      myVideo.setAttribute("id", MyuserId);
      myVideo.onclick = checkScreenShare;

      myVideo.setAttribute("amw-zoom", 'video_share###' + MyuserId);
      $("#be-loading").hide();
      addVideoStream(myVideo, myVideoStream);

      peer.on("call", async (call) => {
        $("#be-loading").show();
        console.warn(call.metadata.type, 'someone call me=', call)
        // console.error('someone call me===========', )
        var screen_title = call.metadata.type;
        call.answer(myVideoStream);
        var element = document.getElementById(call.peer);
        // console.error("get alreaady element", element)
        if (element) {
          element.setAttribute("amw-zoom", screen_title + '###' + call.peer);
        } else {
          element = document.createElement("video");
          element.setAttribute("id", call.peer);
          element.setAttribute("amw-zoom", screen_title + '###' + call.peer);
        }
        element.onclick = checkScreenShare;

        call.on("stream", (userVideoStream) => {
          addVideoStream(element, userVideoStream);
        });
        setTimeout(() => {
          showHideBehlfScreenType(element, call, screen_title)
        }, 2000);
      });
      socket.on("user-connected", (userId, userName, profile) => {
        connectToNewUser(userId, myVideoStream, userName, profile);
      });
    });
});

async function showHideBehlfScreenType(element, call, screen_title) {
  var nodes = videoGrid.getElementsByTagName("video");
  // console.log(screen_title, "nodes", nodes);
  for await (var node of nodes) {
    var userLabel = document.getElementById('user-video-img_' + node.id);
    if (screen_title !== 'video_share') {
      if (node.id !== call.peer) {
        node.style.cssText = 'display:none';
        if (userLabel) {
          userLabel.style.cssText = 'display:none';
        }
      } else {
        element.style.cssText = 'width:100% !important;height: 100% !important; padding: 1px !important'
      }
    } else {
      node.style = 'display:block !important'
      if (userLabel) {
        userLabel.style.cssText = 'display:block !important';
      }
    }
  }
  $("#be-loading").hide();
}

function checkScreenShare() {
  var screen_title = this.getAttribute("amw-zoom");
  if (screen_title) {
    screen_title = screen_title.split("###")
    screen_title = screen_title[0];
    if (screen_title === 'screen_share') {
      showHideBehlfScreenType(this, { peer: this.id }, screen_title);
    }
  }
}

var customData = {
  type: 'video_share',
  userId: MyuserId,
};



const connectToNewUser = (userId, stream, userName, profile) => {
  console.warn("I call someone" + userId);
  customData.userId = userId;
  const call = peer.call(userId, stream, { metadata: customData });
  const video = document.createElement("video");
  video.setAttribute("id", userId);
  video.setAttribute("amw-zoom", 'video_share###' + userId);
  video.onclick = checkScreenShare;

  // video.setAttribute("title", userName);
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

let captureStream
screenShare.addEventListener('click', async () => {
  // console.log('scree share stated by user_id' + user_id)
  captureStream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: { mediaSource: "screen" }
  });
  //Instead of adminId, pass peerId who will taking captureStream in call
  captureStream.getVideoTracks()[0].onended = function () {
    stopSharingFunction();
  };
  myVideoStream = captureStream;
  if (roomUsers.length) {
    customData.type = 'screen_share';
    roomUsers.forEach(element => {
      if (MyuserId !== element.userId) {
        peer.call(element.userId, captureStream, { metadata: customData });
      }
    });
  }
})


function stopSharingFunction() {
  // Call your function or perform necessary actions to handle the "stop sharing" event
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      myVideoStream = stream;

      // console.log('screen share stoped by user_id' + user_id)
      if (roomUsers.length) {
        customData.type = 'video_share';
        roomUsers.forEach(element => {
          if (MyuserId !== element.userId) {
            peer.call(element.userId, stream, { metadata: customData });
          }
        });
      }
    });
}


const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
  if (text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});



// const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

// inviteButton.addEventListener("click", (e) => {
//   prompt(
//     "Copy this link and send it to people you want to meet with",
//     window.location.href
//   );
// });

socket.on('clear-grid', (roomId, userId) => {
  var element = document.getElementById(userId);
  var onlineUser = document.getElementById('online_user_' + userId);
  // console.log(element, "amw-zoom")
  if (element) {
    videoGrid.removeChild(element);
    // LOGIC FOR REMOVED SHARE USER THEN SO ALL USERS WITH VIDEO
    var screen_title = element.getAttribute("amw-zoom");
    screen_title = screen_title.split("###")
    screen_title = screen_title[0];
    if (screen_title === 'screen_share') {
      showHideBehlfScreenType(element, null, 'video_share')
    }
  }
  if (onlineUser) {
    // REMOVED ONLINE USER FROM LIST when unjoin roome
    onlineDiv.removeChild(onlineUser);
  }
});


socket.on("createMessage", (message, userName, profile) => {
  // console.log('test========', message, userName, profile)
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><img src="${profile}" class="profile-img cursor-pointer"> <span> ${userName === user ? "me" : userName
    }</span> </b>
    <span>${message}</span>
    </div>`;
});

socket.on("set_profile", async (roomsUsers) => {
  roomUsers = roomsUsers[ROOM_ID]
  var nodes = videoGrid.getElementsByTagName("video");
  // console.log("nodes=========", nodes.length);
  // console.log("roomUsers=========", nodes.length);

  // onlineDiv.innerHTML = '';
  // for await (var node of nodes) {
  //   const foundUser = roomUsers.find((ele) => ele.userId === node.id);
  //   if (foundUser) {
  //     console.log("foundUser", foundUser);
  //     onlineDiv.innerHTML = onlineDiv.innerHTML + `<div id="online_user_${foundUser.userId}" title="${foundUser.userName}" class="message "> <b><img src="${foundUser.profile}" class="profile-img cursor-pointer online-user"></b>
  //   </div>`;
  //   }
  // }
  onlineDiv.innerHTML = '';
  for await (var foundUser of roomUsers) {
    console.log("foundUser", foundUser);
    onlineDiv.innerHTML = onlineDiv.innerHTML + `<div id="online_user_${foundUser.userId}" title="${foundUser.userName}" class="message "> <b><img src="${foundUser.profile}" class="profile-img cursor-pointer online-user"></b>
    </div>`;
  }
  // for await (const element of roomUsers) {
  //   // createUseName(element)
  // }
});


function createUseName(element) {
  var setTitle = document.getElementById(element.userId);
  // console.log("setTitle========", setTitle);
  var alreadyUser = document.getElementById('user-video-img_' + element.userId);
  if (setTitle) {
    // console.log("alreadyUser=====", alreadyUser)
    if (!alreadyUser) {
      // console.log('coming---------')
      setTitle.setAttribute("title", element.userName);
      const spanElement = document.createElement('span');
      spanElement.setAttribute("id", 'user-video-img_' + element.userId);
      spanElement.setAttribute("class", 'user-video-img');
      spanElement.innerHTML = element.userName;
      setTitle.insertAdjacentElement('afterend', spanElement);
    }
  } else {
    if (alreadyUser) {
      videoGrid.removeChild(alreadyUser);
    }
  }
}
// let scroller = document.querySelector("#scroller");
// let anchor = document.querySelector("#anchor");

// function randomMessage() {
//   return messages[(Math.random() * messages.length) | 0];
// }

// function appendChild() {
//   let msg = document.createElement("div");
//   msg.className = "message";
//   msg.innerText = randomMessage();
//   scroller.insertBefore(msg, anchor);
// }
// setInterval(appendChild, 1000);

// const targetNode = document.getElementById("scroller");

// const config = { childList: true };

// const callback = function (mutationsList, observer) {
//   for (let mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       window.scrollTo(0, document.body.scrollHeight);
//     }
//   }
// };

// const observer = new MutationObserver(callback);
// observer.observe(targetNode, config);

// function getMessages() {
//   shouldScroll =
//     messages.scrollTop + messages.clientHeight === messages.scrollHeight;
//   if (!shouldScroll) {
//     scrollToBottom();
//   }
// }

// function scrollToBottom() {
//   messages.scrollTop = messages.scrollHeight;
// }

// scrollToBottom();
