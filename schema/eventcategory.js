import { gql } from 'apollo-server-express';

export default gql`
type EventCategory {
  _id: ID
  category_name: String,
  parant_category_id: String,
  icon: String,
  icon_path: String,
  event_category_type: String,
  active: Boolean,
  deleted: Boolean,
  accessible: Boolean,
  site_id: String,
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  workspace_id: String,
  color_code: String
}

input eventCategoryInput {
  category_name: String,
  parant_category_id: String,
  icon: String,
  icon_path: String,
  event_category_type: String,
  active: Boolean,
  deleted: Boolean,
  accessible: Boolean,
  site_id: String,
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  workspace_id: String,
  color_code: String
}

extend type Query {
  getEventCategory: [EventCategory]
}

extend type Mutation {
    addEventCategory(input: eventCategoryInput): EventCategory
    updateEventCategory(eventCategoryID: ID!, input: eventCategoryInput): EventCategory
    deleteEventCategory(eventCategoryID: ID!): EventCategory
}
`