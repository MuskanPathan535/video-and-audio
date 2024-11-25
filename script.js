// const socket = io();
// let localStream;
// let remoteStream;
// let peerConnection;

// const servers = {
//   iceServers: [
//     {
//       urls: "stun:stun.l.google.com:19302",
//     },
//   ],
// };

// const startVideoCall = async () => {
//   localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//   document.getElementById("localVideo").srcObject = localStream;

//   peerConnection = new RTCPeerConnection(servers);
//   remoteStream = new MediaStream();

//   document.getElementById("remoteVideo").srcObject = remoteStream;

//   localStream.getTracks().forEach((track) => {
//     peerConnection.addTrack(track, localStream);
//   });

//   peerConnection.ontrack = (event) => {
//     event.streams[0].getTracks().forEach((track) => {
//       remoteStream.addTrack(track);
//     });
//   };

//   peerConnection.onicecandidate = (event) => {
//     if (event.candidate) {
//       socket.emit("ice-candidate", event.candidate);
//     }
//   };

//   const offer = await peerConnection.createOffer();
//   await peerConnection.setLocalDescription(offer);
//   socket.emit("offer", offer);
// };

// socket.on("offer", async (offer) => {
//   peerConnection = new RTCPeerConnection(servers);
//   remoteStream = new MediaStream();

//   document.getElementById("remoteVideo").srcObject = remoteStream;

//   peerConnection.ontrack = (event) => {
//     event.streams[0].getTracks().forEach((track) => {
//       remoteStream.addTrack(track);
//     });
//   };

//   peerConnection.onicecandidate = (event) => {
//     if (event.candidate) {
//       socket.emit("ice-candidate", event.candidate);
//     }
//   };

//   await peerConnection.setRemoteDescription(offer);
//   const answer = await peerConnection.createAnswer();
//   await peerConnection.setLocalDescription(answer);
//   socket.emit("answer", answer);
// });

// socket.on("answer", async (answer) => {
//   await peerConnection.setRemoteDescription(answer);
// });

// socket.on("ice-candidate", async (candidate) => {
//   try {
//     await peerConnection.addIceCandidate(candidate);
//   } catch (error) {
//     console.error("Error adding received ice candidate", error);
//   }
// });

// document.getElementById("startVideoCall").addEventListener("click", startVideoCall);

// document.getElementById("sendButton").addEventListener("click", () => {
//   const message = document.getElementById("chatInput").value;
//   socket.emit("chat-message", message);
//   document.getElementById("messages").innerHTML += `<div>You: ${message}</div>`;
//   document.getElementById("chatInput").value = "";
// });

// socket.on("chat-message", (message) => {
//   document.getElementById("messages").innerHTML += `<div>Peer: ${message}</div>`;
// });




const socket = io();
let localStream;
let remoteStream;
let peerConnection;
const servers = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const startVideoCall = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById("localVideo").srcObject = localStream;

  peerConnection = new RTCPeerConnection(servers);
  remoteStream = new MediaStream();
  document.getElementById("remoteVideo").srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", event.candidate);
    }
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("offer", offer);
};

const startAudioCall = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  document.getElementById("localVideo").srcObject = localStream;

  peerConnection = new RTCPeerConnection(servers);
  remoteStream = new MediaStream();
  document.getElementById("remoteVideo").srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", event.candidate);
    }
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("offer", offer);
};

socket.on("offer", async (offer) => {
  peerConnection = new RTCPeerConnection(servers);
  remoteStream = new MediaStream();
  document.getElementById("remoteVideo").srcObject = remoteStream;

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", event.candidate);
    }
  };

  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("answer", answer);
});

socket.on("answer", async (answer) => {
  await peerConnection.setRemoteDescription(answer);
});

socket.on("ice-candidate", async (candidate) => {
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (error) {
    console.error("Error adding received ice candidate", error);
  }
});

document.getElementById("startVideoCall").addEventListener("click", startVideoCall);
document.getElementById("startAudioCall").addEventListener("click", startAudioCall);

document.getElementById("sendButton").addEventListener("click", () => {
  const message = document.getElementById("chatInput").value;
  socket.emit("chat-message", message);
  document.getElementById("messages").innerHTML += `<div>You: ${message}</div>`;
  document.getElementById("chatInput").value = "";
});

socket.on("chat-message", (message) => {
  document.getElementById("messages").innerHTML += `<div>Peer: ${message}</div>`;
});
