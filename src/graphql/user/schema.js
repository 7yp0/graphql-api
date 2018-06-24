// @flow
import Base from '../base';
import Todo from '../todo/schema';

const UserSchema = `
  extend type Mutation {
    signUp(email: Email!, password: String!): String!
    signIn(email: Email!, password: String!): String!
  }
  type User {
    id: String!
    email: Email!
    todos: [Todo]!
  }
`;

export default () => [Base, UserSchema, Todo];
