// @flow
import userResolvers from './user/resolvers';

export default {
  ...userResolvers,
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  // TODO: add custom email type https://www.apollographql.com/docs/graphql-tools/scalars.html + https://github.com/stylesuxx/graphql-custom-types/blob/master/src/scalars.js
};
