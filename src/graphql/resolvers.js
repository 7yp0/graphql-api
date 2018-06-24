// @flow
import { GraphQLEmail } from 'graphql-custom-types';

import userResolvers from './user/resolvers';
import todoResolvers from './todo/resolvers';

export default {
  ...userResolvers,
  ...todoResolvers,
  Query: {
    ...userResolvers.Query,
    ...todoResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...todoResolvers.Mutation,
  },
  Email: GraphQLEmail,
};
