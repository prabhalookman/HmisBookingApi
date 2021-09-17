import { ApolloError } from 'apollo-server-errors';

const returnOnError = (operation, alternative) => {
  try {
    return operation();
  } catch (e) {
    return alternative;
  }
};

class MyError extends ApolloError {
  constructor(message) {
    super(message, 'MY_ERROR_CODE');

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }
}

export {
  returnOnError,
  MyError
}

