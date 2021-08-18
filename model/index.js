const mongoose = require('mongoose');
import AddOn from "./addons"
import Address from "./address"
import Appointment  from './appointment'
import Business from './business';
import Customer from './customer';
import Event  from "./events"
import Location from './location';
import LocationSetting from './locationsetting';
import Site from './site';
import Staff from "./staff"
import StaffDetails from "./staffdetails"
import Timings  from './timings'
import Workspace from './workspace';

// import BusinessInfo from './businessInfo';
// import EventCategory  from "./eventcategory"
// import Role  from './role'
// import User  from './user'
// import TimeFormat  from './timeformat'

const connectMongo = () => {
  return mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true, useFindAndModify: false, useUnifiedTopology: true})
}

const models = {
  AddOn,
  Address,
  Appointment,
  Business,
  Customer,
  Event,
  Location,
  LocationSetting,
  Site,
  Staff,
  StaffDetails,
  Timings,
  Workspace
}

export {connectMongo};
export default models;