// @flow
import Base from '../base';

const TodoSchema = `
  extend type Query {
    todos: [Todo]!
  }
  type Todo {
    id: String!
    title: String
    checked: Boolean!
  }
`;

export default () => [Base, TodoSchema];
