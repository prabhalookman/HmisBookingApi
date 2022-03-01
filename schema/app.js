import { gql } from 'apollo-server-express';

export default gql`
type App {
  _id: ID
  active: Boolean,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  category: String,
  color_code: String,
  deleted: Boolean,
  name: String,
  visible_page: String
}

`
// extend type Query {
//     getAddOns: [App]
// }