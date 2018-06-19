// @flow
import Es6Error from 'es6-error';

class UserAlreadyExists extends Es6Error {
  type = 'UserAlreadyExists';
  status = 403;

  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}

export default UserAlreadyExists;
