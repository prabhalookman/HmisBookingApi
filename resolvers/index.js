import addonsResolver from './addons'
import addressResolver  from './address'
import bookingResolver  from './booking'
import customerResolver  from './customer'
import businessResolver from './business'
import eventsResolver from './events'
import locationResolver from './location'
import locationSettingResolver from './locationsetting'
import siteResolver from './site'
import staffResolver  from './staff'
import staffDetailsResolver  from './staffdetails'
import timingsResolver  from './timings'
import workspaceResolver from './workspace'

import datescalar  from '../resolvers/datescalar'

// import eventCategoryResolver from './eventcategory'
// import roleResolver  from './role'
// import userResolver  from './user'
// import timeformatResolver  from './timeformat'


//const { GraphQLDateTime } = require('graphql-iso-date')

// const customScalarResolver = {
//     DateTime : GraphQLDateTime
// };
//customScalarResolver


export default [
  addonsResolver,
  addressResolver,
  bookingResolver,
  customerResolver,
  businessResolver,  
  eventsResolver,
  locationResolver,
  locationSettingResolver,
  siteResolver,
  staffResolver,
  staffDetailsResolver,
  timingsResolver,
  workspaceResolver,
  datescalar
]