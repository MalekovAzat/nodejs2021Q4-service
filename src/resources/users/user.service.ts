import { hash } from 'bcrypt';
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

  user.password = await hash(password, 10);

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
 * The function searchs user by provided login
 * @param param0 - Object which contain user login
 * @returns founded user or undefined
 */
async function findUserByLogin({ login }: { login: string | undefined }) {
  const userRepo = getRepository(User);

  const user = (await userRepo.findOne({ login })) as User;

  return user;
}

/**
 * The function to request to db to update the user
 * @param param0 - The object which contains user id and properties
 * @returns The promise with updated User in the respose format
 */
async function update({
  id, name, login, password,
}: UserInterface) {
  const userRepo = getRepository(User);

  const user = (await userRepo.findOne({ id })) as User;
  user.name = name;
  user.login = login;
  user.password = await hash(password, 10);

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

/**
 * The function create test user login: admin password: admin and add it to db.
 */
async function putTestUserToDb() {
  await create({ name: 'Admin', login: 'admin', password: 'admin' });
}

export {
  getAll,
  getById,
  findById,
  findUserByLogin,
  create,
  update,
  deleteUser,
  putTestUserToDb,
};

export default {
  getAll,
  getById,
  findById,
  findUserByLogin,
  create,
  update,
  deleteUser,
  putTestUserToDb,
};
