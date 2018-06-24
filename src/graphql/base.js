// @flow
const Base = `
  type Query {
      dummy: Boolean
  }
  type Mutation {
      dummy: Boolean
  }
  scalar Email
`;

export default () => [Base];
