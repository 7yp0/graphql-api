// @flow
import Es6Error from 'es6-error';

class UnauthorizedException extends Es6Error {
  type = 'UnauthorizedException';
  status = 401;
  code = '003';

  constructor(payload?: ?Object = null) {
    super('You need permission ot access this data');

    this.payload = payload;
  }
}

export default UnauthorizedException;
