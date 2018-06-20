// @flow
import Es6Error from 'es6-error';

class UnknwonException extends Es6Error {
  type = 'UnknwonException';
  status = 500;
  code = '000';

  constructor(payload?: ?Object = null) {
    super('An Unknown Error occured');

    this.payload = payload;
  }
}

export default UnknwonException;
