import { gql } from 'apollo-server-express';

export default gql`
type Answer {
  _id: ID
  answer: String
  created_by: String
  customer_id: Customer
  form_id: Form
  form_with_answer: String
  staff_id: Staff
  site_id: Site
  workspace_ids: [Workspace]
}

input answerInput {
  answer: String
  created_by: String
  customer_id: [ID]
  form_id: ID
  form_with_answer: String
  staff_id: ID
  site_id: ID
  workspace_ids: [ID]
}
extend type Query {
  getAnswer: [Answer]
}
`