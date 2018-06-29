// @flow
import Base from '../base';
import User from '../user/schema';

const TodoSchema = `
  extend type Query {
    todos: [Todo]!
  }
  extend type Mutation {
    createTodo(title: String!): Todo!
    checkTodo(id: String!): Todo!
    unCheckTodo(id: String!): Todo!
    editTodo(id: String!, title: String!): Todo!
    deleteTodos(ids: [String!]!): Boolean!
  }
  type Todo {
    id: String!
    title: String
    checked: Boolean!
    user: User!
  }
`;

export default () => [Base, TodoSchema, User];
