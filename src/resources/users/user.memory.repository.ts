import { User, UserProperties } from './user.model';

const usersCollections: Array<User> = [];

async function getAll() {
  return usersCollections.map((user: User) => User.toResponse(user));
}

async function create({ name, login, password }: UserProperties) {
  const user = new User({ name, login, password });

  usersCollections.push(user);

  return User.toResponse(user);
}

async function getById({ id }: { id: string }) {
  const foundedUser = usersCollections.find((user) => user.id === id);

  return foundedUser === undefined ? foundedUser : User.toResponse(foundedUser);
}

async function update({ id, props }: { id: string; props: UserProperties }) {
  const foundedUser = usersCollections.find((user) => user.id === id);
  if (foundedUser !== undefined) {
    foundedUser.update(props);
  } else {
    return foundedUser;
  }

  return User.toResponse(foundedUser);
}

async function deleteUser({ id }: { id: string }) {
  const userIndex = usersCollections.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return false;
  }

  return Boolean(usersCollections.splice(userIndex, 1));
}

export { getAll, create, getById, update, deleteUser };
export default {
  getAll,
  create,
  getById,
  update,
  deleteUser,
};
