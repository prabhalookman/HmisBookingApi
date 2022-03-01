import { gql } from 'apollo-server-express';

export default gql`
type Appintegration {
    _id: ID
    app_id: App,
    chat_id_or_no: String,
    deleted: Boolean,
    is_installed: Boolean,
    key: String,
    location_setting_id: LocationSetting,
    secret: String,
    site_id: Site,
    workspace_id: Workspace
}
`

// extend type Query {  
//     getAppintegration: [Appintegration]
// }