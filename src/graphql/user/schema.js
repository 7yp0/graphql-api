// @flow
import Base from '../base';

const UserSchema = `
  extend type Mutation {
    signUp(email: Email!, password: String!): String!
    signIn(email: Email!, password: String!): String!
  }
  type User {
    id: String!
    email: Email!
    password: String!
  }
`;

export const Schema = () => [Base, UserSchema];
