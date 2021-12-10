import { v4 as uuidv4 } from 'uuid';

export interface UserProperties {
  name: string;
  login: string;
  password: string;
}

export interface UserInterface extends UserProperties {
  id: string;
}

class User implements UserInterface {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  update(properties: UserProperties): void {
    Object.entries(properties).forEach(([name, value]: [string, string]) => {
      if (
        ['name', 'login', 'password'].indexOf(name) >= 0 &&
        value !== undefined
      ) {
        Object.assign(this, { [name]: value });
      }
    });
  }
}

export { User };
