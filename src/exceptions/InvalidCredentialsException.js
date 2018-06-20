// @flow
import Es6Error from 'es6-error';

class InvalidCredentialsException extends Es6Error {
  type = 'InvalidCredentialsException';
  status = 403;
  code = '004';

  constructor(payload?: ?Object = null) {
    super('Username or password is incorrect');

    this.payload = payload;
  }
}

export default InvalidCredentialsException;
