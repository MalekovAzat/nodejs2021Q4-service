import { UserInterface } from './user.interfaces';

import { getRepository } from '../../common/postgresProvider';
import { User } from '../../entity/User';

/**
 * The function to request to db to get all users
 * @returns The promise with array of the users
 */
async function getAll() {
  const userRepo = getRepository(User);

  const allUsers = await userRepo.find({ select: ['id', 'name', 'login'] });

  return allUsers;
}

/**
 * The function to request to db to create user
 * @param param0 - The user data
 * @returns The promise with created user data in the response format
 */
async function create({ name, login, password }: UserInterface) {
  const user = new User();

  user.name = name;
  user.login = login;
  user.password = password;

  const userRepo = getRepository(User);
  await userRepo.save(user);

  return user.toResponse();
}

/**
 * The function to request to db to find user by id
 * @param param0 - The object which contain user id
 * @returns The promise with founded User or empty object
 */
async function getById({ id }: { id: string }) {
  const userRepo = getRepository(User);

  const user = await userRepo.findOne({ id });

  return (user as User).toResponse();
}

/**
 * The function to request to db to find user by id
 * @param param0 - The object which contain user id
 * @returns The promise with founded UserEntity or empty object
 */
async function findById({ id }: { id: string }) {
  const userRepo = getRepository(User);

  const user = await userRepo.findOne({ id });

  return user;
}

/**
 * The function to request to db to update the user
 * @param param0 - The object which contains user id and properties
 * @returns The promise with updated User in the respose format
 */
async function update({ id, name, login, password }: UserInterface) {
  const userRepo = getRepository(User);

  const user = (await userRepo.findOne({ id })) as User;
  user.name = name;
  user.login = login;
  user.password = password;

  await userRepo.save(user);

  return user.toResponse();
}

/**
 * The function to request to db to delete user
 * @param param0 - The object which contains user id
 * @returns The promise with true if the user deleted false otherwise
 */
async function deleteUser({ id }: { id: string }) {
  const userRepo = getRepository(User);

  const deleteResult = await userRepo.delete(id);
  return (deleteResult.affected as number) > 0;
}

export { getAll, getById, findById, create, update, deleteUser };

export default {
  getAll,
  getById,
  findById,
  create,
  update,
  deleteUser,
};
