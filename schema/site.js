import { gql } from 'apollo-server-express';

export default gql`

type Site {
    _id: ID
    name: String,
    workspace_ids: [Workspace]
}
extend type Query {
    getSite: [Site]    
}

`


