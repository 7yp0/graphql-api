// @flow
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import BaseSchema from './base';
import UserSchema from './user/schema';
import TodoSchema from './todo/schema';

export default makeExecutableSchema({
  typeDefs: [BaseSchema, UserSchema, TodoSchema],
  resolvers,
});
