import { gql } from 'apollo-server-express';
import siteSchema from './site'
import workspaceSchema from './workspace'
import locationSchema  from './location'
import loationSettingSchema  from './locationsetting'
import businessSchema  from './business'
import businessInfoSchema  from './businessinfo'
import eventCategorySchema  from './eventcategory'
import eventsSchema  from './events'
import addOnSchema  from './addons'
import roleSchema  from './role'
import userSchema  from './user'
import timeformatSchema  from './timeformat'
import timingsSchema  from './timings'
import staffSchema  from './staff'
import staffDetailsSchema  from './staffdetails'
import addressSchema  from './address'
import appointmentSchema  from './appointment'

const baseSchema = gql`
type Query {
  _: String
}
type Mutation {
  _: String
}
type Subscription {
  _: String
}
`;
// scalar Date
export default [baseSchema, 
  siteSchema, 
  workspaceSchema, 
  locationSchema, 
  loationSettingSchema, 
  businessSchema, 
  businessInfoSchema, 
  eventCategorySchema, 
  eventsSchema, 
  addOnSchema, 
  roleSchema, 
  userSchema, 
  timeformatSchema, 
  timingsSchema, 
  staffSchema, 
  staffDetailsSchema,
  addressSchema,
  appointmentSchema
]