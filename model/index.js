const mongoose = require('mongoose');
import AddOn from "./addons"
import Address from "./address"
import Booking  from './booking'
import Business from './business';
import Customer from './customer';
import Event  from "./events"
import Location from './location';
import LocationSetting from './locationsetting';
import Site from './site';
import Staff from "./staff"
import StaffDetails from "./staffdetails"
import Timing  from './timings'
import Workspace from './workspace';
import Setting from './settings';

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
  Booking,
  Business,
  Customer,
  Event,
  Location,
  LocationSetting,
  Site,
  Staff,
  StaffDetails,
  Timing,
  Workspace,
  Setting
}

export {connectMongo};
export default models;