import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginCredentials, UserPayload } from './login.interfaces';

import { JWT_SECRET_KEY } from '../../common/config';
import { findUserByLogin } from '../users/user.service';

/**
 * The function check password
 * @param param0 -  The object which contain password and hash to check
 * @returns True if the password is correct
 */
async function checkPassword({
  passwordToCheck,
  validationHash,
}: {
  passwordToCheck: string;
  validationHash: string;
}) {
  const result = await compare(passwordToCheck, validationHash);

  return result;
}

/**
 * The function returns founded user if login and passowrd are correct
 * @param param0 - Object which contain password and login
 * @returns Object which contain founded userId and login
 */
async function validateUser({
  login,
  password,
}: LoginCredentials): Promise<undefined | { userId: string; login: string }> {
  if (typeof login !== 'string' || typeof password !== 'string') {
    return undefined;
  }

  const user = await findUserByLogin({ login });

  if (user === undefined) {
    return undefined;
  }

  const passwordCheckResult = await checkPassword({
    passwordToCheck: password,
    validationHash: user.password,
  });
  if (!passwordCheckResult) {
    return undefined;
  }
  return {
    userId: user.id,
    login: user.login,
  };
}

/**
 * The function create jwt token
 * @param payload - The object which contain user payload
 * @returns jwt Token
 */
function jwtToken(payload: UserPayload) {
  return jwt.sign(
    { ...payload, iat: Math.floor(Date.now() / 1000) - 30 },
    JWT_SECRET_KEY as string,
    { expiresIn: '1hr' },
  );
}

/**
 * The function handles login request with provided login
 * and password and return jwt token if success
 * @param param0 - Contain login add password for login in the system
 * @returns Undefined or jwt token
 */
export async function handleLoginRequest({
  login,
  password,
}: LoginCredentials): Promise<string | undefined> {
  const user = await validateUser({ login, password });
  if (user === undefined) {
    // add code here
    return undefined;
  }

  return jwtToken(user);
}
/**
 * The function check is the login exist in the system
 * @param param0 - Object which contain login name
 * @returns True if the login exist
 */
export async function isLoginExist({ login }: { login: string | undefined }) {
  if (typeof login === 'undefined') {
    return false;
  }
  const user = await findUserByLogin({ login });
  return user !== undefined;
}

export default {
  handleLoginRequest,
  isLoginExist,
};
