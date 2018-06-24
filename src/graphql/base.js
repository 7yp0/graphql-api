// @flow
const Base = `
  type Query {
      empty: String
  }
  type Mutation {
      empty: String
  }
  scalar Email
`;

export default () => [Base];
