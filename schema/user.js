import { gql } from 'apollo-server-express';

export default gql`
type User {
  _id: ID
  is_owener: Boolean,
  workspace_ids: [Workspace],
  active: Boolean,
  delete: Boolean,
  site_id: Site,
  role_ids: [User],
  paccess: String
}

input userInput {
  is_owener: Boolean,
  workspace_ids: [ID],
  active: Boolean,
  delete: Boolean,
  site_id: ID,
  role_ids: [ID],
  paccess: String
}

extend type Query {
  getUsers: [User]
}

extend type Mutation {
    addUser(input: userInput): User
    updateUser(userID: ID!, input: userInput): User
    deleteUser(userID: ID!): User
}
`