import usersRepo from './user.memory.repository';
import taskRepo from '../tasks/task.memory.repository';

import { UserInterface, UserProperties } from './user.model';

/**
 * The function to request to db to get all users
 * @returns The promise with array of the users
 */
function getAll() {
  return usersRepo.getAll();
}

/**
 * The function to request to db to create user
 * @param param0 The user data
 * @param param0.name The name of the user
 * @param param0.login The login of the user
 * @param param0.password The password of the user
 * @returns The promise with created user data in the response format
 */
function create({ name, login, password }: UserProperties) {
  return usersRepo.create({ name, login, password });
}

/**
 * The function to request to db to find user by id
 * @param param0 The object which contain user id
 * @param param0.id The id of the user
 * @returns The promise with founded User or empty object
 */
function getById({ id }: { id: string }) {
  return usersRepo.getById({ id });
}

/**
 * The function to request to db to update the user
 * @param param0 The object which contains user id and properties
 * @param param0.id The id of the user to update
 * @param param0.name The name of a user
 * @param param0.login The login of a user
 * @param param0.password The passoword of a user
 * @returns The promise with updated User in the respose format
 */
function update({ id, name, login, password }: UserInterface) {
  return usersRepo.update({ id, props: { name, login, password } });
}

/**
 * The function to request to db to delete user
 * @param param0 The object which contains user id
 * @param param0.id The if of the user to be deleted
 * @returns The promise with true if the user deleted false otherwise
 */
function deleteUser({ id }: { id: string }) {
  taskRepo.resetUserId({ userId: id });
  return usersRepo.deleteUser({ id });
}

export { getAll, getById, create, update, deleteUser };

export default {
  getAll,
  getById,
  create,
  update,
  deleteUser,
};
