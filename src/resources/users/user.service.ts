import usersRepo from './user.memory.repository';
import taskRepo from '../tasks/task.memory.repository';

import { UserInterface, UserProperties } from './user.model';

function getAll() {
  return usersRepo.getAll();
}

function create({ name, login, password }: UserProperties) {
  return usersRepo.create({ name, login, password });
}

function getById({ id }: { id: string }) {
  return usersRepo.getById({ id });
}

function update({
  id, name, login, password,
}: UserInterface) {
  return usersRepo.update({ id, props: { name, login, password } });
}

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
