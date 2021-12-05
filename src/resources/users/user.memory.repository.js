const usersCollections = [];
const User = require('./user.model');

const getAll = async () =>
  usersCollections.map((user) => User.toResponse(user));

const create = async ({ name, login, password }) => {
  const user = new User({ name, login, password });

  usersCollections.push(user);

  return User.toResponse(user);
};

const getById = async ({ id }) => {
  const foundedUser = usersCollections.find((user) => user.id === id);

  return foundedUser === undefined ? foundedUser : User.toResponse(foundedUser);
};

const update = async ({ id, ...props }) => {
  const foundedUser = usersCollections.find((user) => user.id === id);
  if (foundedUser !== undefined) {
    foundedUser.update(props);
  } else {
    return foundedUser;
  }

  return User.toResponse(foundedUser);
};

const deleteUser = async ({ id }) => {
  const userIndex = usersCollections.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return false;
  }

  return Boolean(usersCollections.splice(userIndex, 1));
};

module.exports = { getAll, getById, create, update, deleteUser };
