// @flow
import Es6Error from 'es6-error';

class UnknwonException extends Es6Error {
  type = 'UnknwonException';
  status = 500;

  constructor() {
    super('An Unknown Error occured');
  }
}

export default UnknwonException;
