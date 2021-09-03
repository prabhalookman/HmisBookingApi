import addonsResolver from './addons'
import addressResolver  from './address'
import bookingResolver  from './booking'
import customerResolver  from './customer'
import businessResolver from './business'
import eventResolver from './events'
import locationResolver from './location'
import locationSettingResolver from './locationsetting'
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
  eventResolver,
  locationResolver,
  locationSettingResolver,
  staffResolver,
  staffDetailsResolver,
  timingsResolver,
  workspaceResolver,
  datescalar
]