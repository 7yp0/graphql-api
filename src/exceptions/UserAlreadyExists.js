// @flow
import Es6Error from 'es6-error';

class UserAlreadyExists extends Es6Error {
  type = 'UserAlreadyExists';
  status = 403;
  code = '002';

  constructor(email: string, payload?: ?Object = null) {
    super(`User with email '${email}' already exists`);

    this.payload = payload;
  }
}

export default UserAlreadyExists;
