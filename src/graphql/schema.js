// @flow
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import BaseSchema from './base';
import { Schema as UserSchema } from './user/schema';

export default makeExecutableSchema({
  typeDefs: [BaseSchema, UserSchema],
  resolvers,
});
