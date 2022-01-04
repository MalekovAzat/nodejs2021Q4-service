import { User, UserProperties } from './user.model';

const usersCollections: Array<User> = [];

/**
 * The function returns users in resonse format
 * @returns The promise with array of the users
 */
async function getAll() {
  return usersCollections.map((user: User) => User.toResponse(user));
}

/**
 * The function creates user and returns user response data
 * @param param0 - The user data
 * @returns The promise with created user data in the response format
 */
async function create({ name, login, password }: UserProperties) {
  const user = new User({ name, login, password });

  usersCollections.push(user);

  return User.toResponse(user);
}

/**
 * The function returns founded by id user if exist othervice returns empty object
 * @param param0 - The object which contain user id
 * @returns The promise with founded User or empty object
 */
async function getById({ id }: { id: string }) {
  const foundedUser = usersCollections.find((user) => user.id === id);

  return foundedUser === undefined ? foundedUser : User.toResponse(foundedUser);
}

/**
 * The function updates user data by user id
 * @param param0 - The object which contains user id and properties
 * @returns The promise with updated User in the respose format
 */
async function update({ id, props }: { id: string; props: UserProperties }) {
  const foundedUser = usersCollections.find((user) => user.id === id);
  if (foundedUser !== undefined) {
    foundedUser.update(props);
  } else {
    return foundedUser;
  }

  return User.toResponse(foundedUser);
}

/**
 * The function delete user by id
 * @param param0 - The object which contains user id
 * @returns The promise with true if the user deleted false otherwise
 */
async function deleteUser({ id }: { id: string }) {
  const userIndex = usersCollections.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return false;
  }

  return Boolean(usersCollections.splice(userIndex, 1));
}

export {
  getAll, create, getById, update, deleteUser,
};
export default {
  getAll,
  create,
  getById,
  update,
  deleteUser,
};
