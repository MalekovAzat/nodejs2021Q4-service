export interface LoginCredentials {
  login: string | undefined;
  password: string | undefined;
}

export interface UserPayload {
  login: string;
  userId: string;
}
