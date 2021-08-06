import { gql } from 'apollo-server-express';

export default gql`
type Role {
  _id: ID
  name: String,
  active: Boolean,
  delete: Boolean,
  is_system_role: Boolean,
  system_name: String,
  site_id: Site,
  workspace_id: Workspace,
  createdOn_utc: String,
  permission_ids: [ID]
  
}

input roleInput {
    name: String,
    active: Boolean,
    delete: Boolean,
    is_system_role: Boolean,
    system_name: String,
    site_id: ID,
    workspace_id: ID,
    createdOn_utc: String,
    permission_ids: [ID]
}

extend type Query {
  getRoles: [Role]
}

extend type Mutation {
    addRole(input: roleInput): Role
    updateRole(roleID: ID!, input: roleInput): Role
    deleteRole(roleID: ID!): Role
}
`