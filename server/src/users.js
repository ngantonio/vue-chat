/** Handler of users connected to the socket */

const users = [];

const addUser = ({ id, username, room }) => {

  username = username.trim().toLowerCase();
  const existingUser = users.find((user) => user.room === room && user.username === username);
  if (existingUser) return { error: 'This user is already connected' };

  const user = { id, username, room };
  users.push(user)
  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}