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
 * @param param0 - The user data
 * @returns The promise with created user data in the response format
 */
function create({ name, login, password }: UserProperties) {
  return usersRepo.create({ name, login, password });
}

/**
 * The function to request to db to find user by id
 * @param param0 - The object which contain user id
 * @returns The promise with founded User or empty object
 */
function getById({ id }: { id: string }) {
  return usersRepo.getById({ id });
}

/**
 * The function to request to db to update the user
 * @param param0 - The object which contains user id and properties
 * @returns The promise with updated User in the respose format
 */
function update({
  id, name, login, password,
}: UserInterface) {
  return usersRepo.update({ id, props: { name, login, password } });
}

/**
 * The function to request to db to delete user
 * @param param0 - The object which contains user id
 * @returns The promise with true if the user deleted false otherwise
 */
function deleteUser({ id }: { id: string }) {
  taskRepo.resetUserId({ userId: id });
  return usersRepo.deleteUser({ id });
}

export {
  getAll, getById, create, update, deleteUser,
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteUser,
};
