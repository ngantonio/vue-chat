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
