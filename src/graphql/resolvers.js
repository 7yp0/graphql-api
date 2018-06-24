// @flow
import userResolvers from './user/resolvers';

export default {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  // TODO: add custom email type https://www.apollographql.com/docs/graphql-tools/scalars.html
};
