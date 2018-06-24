// @flow
import Base from '../base';

const UserSchema = `
  extend type Mutation {
    signUp(email: String!, password: String!): String!
    signIn(email: String!, password: String!): String!
  }
  type User {
    id: String!
    email: String!
    password: String!
  }
`;

export const Schema = () => [Base, UserSchema];
