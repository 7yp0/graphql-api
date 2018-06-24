// @flow
import { GraphQLEmail } from 'graphql-custom-types';

import userResolvers from './user/resolvers';

export default {
  ...userResolvers,
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  Email: GraphQLEmail,
};
