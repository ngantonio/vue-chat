
let socket = null;

function setInstance(io) {
  socket = io;
  
}

function getInstance() {
  return socket
}

export {
  setInstance,
  getInstance
}

/*function emmitMessage(io, payload) {
    io.to("liveroom").emit('message', { username: payload.username, text: payload.text, createdAt: payload.createdAt  });
    // io.to("liveroom").emit('roomData', { room: "", users: getUsersInRoom(user.room) })
}

// this.io.to("liveroom").emit('message', { username: payload.username, text: payload.text, createdAt: payload.createdAt  });
module.exports = emmitMessage;*/