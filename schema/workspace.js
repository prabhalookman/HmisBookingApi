import { gql } from 'apollo-server-express';

export default gql`

type Workspace {
    _id: ID
    name: String
    type: String
    new_business: Boolean
    color_code: String
    display_name: String
    display_order: Int
    time_zone: String
    default_language: String
    calendar_view_settings : String
    active: Boolean
    deleted: Boolean
    accessible: Boolean
    site_id: Site
    created_by: ID
    created_at: String
    updated_at: String
    deleted_at: String
    is_owner: Boolean
}

input workspaceInput {
    name: String
    type: String
    new_business: Boolean
    color_code: String
    display_name: String
    display_order: Int
    time_zone: String
    default_language: String
    calendar_view_settings : String
    active: Boolean
    deleted: Boolean
    accessible: Boolean
    site_id: SiteInsertInput
    created_by: ID
    created_at: String
    updated_at: String
    deleted_at: String
    is_owner: Boolean
}

extend type Query {
    getWorkspace: [Workspace]
}

extend type Mutation {
    addWorkspace(input: workspaceInput): Workspace
    updateWorkspace(workspaceID: ID!, input: workspaceInput): Workspace
    deleteWorkspace(workspaceID: ID!): Workspace
}
`
