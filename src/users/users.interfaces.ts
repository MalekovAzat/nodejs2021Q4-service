import { User } from '../entity/User';

export type UserWithoutPassword = Pick<User, 'id' | 'name' | 'login'>;
export type UserWithoutId = Pick<User, 'name' | 'login' | 'password'>;
