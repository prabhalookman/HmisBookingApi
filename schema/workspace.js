import { gql } from 'apollo-server-express';

export default gql`

type Workspace {
    _id: ID
    name: String,    
    site_id: Site
}

extend type Query {
    getWorkspace: [Workspace]
}
`
