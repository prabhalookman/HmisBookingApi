import { gql } from 'apollo-server-express';

import addOnSchema  from './addons'
import addressSchema  from './address'
import bookingSchema  from './booking'
import businessSchema  from './business'
import businessinfoSchema  from './businessinfo'
import customerSchema  from './customer'
import eventsSchema  from './events'
import locationSchema  from './location'
import loationSettingSchema  from './locationsetting'
import siteSchema from './site'
import staffSchema  from './staff'
import staffDetailsSchema  from './staffdetails'
import timingsSchema  from './timings'
import workspaceSchema from './workspace'
import settingSchema from './setting'
import appintegrationSchema from './appintegration'
import appSchema from './app'
import formSchema from './form'
import answerSchema from './answer'

// import businessInfoSchema  from './businessinfo'
// import eventCategorySchema  from './eventcategory'
// import roleSchema  from './role'
// import userSchema  from './user'
// import timeformatSchema  from './timeformat'


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
  addOnSchema,
addressSchema,
bookingSchema,
businessSchema,
businessinfoSchema,
customerSchema,
eventsSchema,
locationSchema,
loationSettingSchema,
siteSchema,
staffSchema,
staffDetailsSchema,
timingsSchema,
workspaceSchema,
settingSchema,
appintegrationSchema,
appSchema,
formSchema,
answerSchema
]