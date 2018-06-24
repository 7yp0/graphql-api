// @flow
import Base from '../base';
import User from '../user/schema';

const TodoSchema = `
  extend type Query {
    todos: [Todo]!
  }
  type Todo {
    id: String!
    title: String
    checked: Boolean!
    user: User!
  }
`;

export default () => [Base, TodoSchema, User];
