const mongoose = require('mongoose');
import Site from './site';
import Workspace from './workspace';
import Location from './location';
import LocationSetting from './locationsetting';
import Business from './business';
import BusinessInfo from './businessInfo';
import EventCategory  from "./eventcategory"
import Event  from "./events"
import AddOn from "./addons"
import Staff from "./staff"
import StaffDetails from "./staffdetails"
import Address from "./address"

import Role  from './role'
import User  from './user'
import TimeFormat  from './timeformat'
import Timings  from './timings'
import Appointment  from './appointment'

const connectMongo = () => {
  return mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true, useFindAndModify: false, useUnifiedTopology: true})
}

const models = {
  Site,
  Workspace,
  Location,
  LocationSetting,
  Business,
  BusinessInfo,
  EventCategory,
  Event,
  AddOn,
  Role,
  User,
  TimeFormat,
  Timings,
  Staff,
  StaffDetails,
  Address,
  Appointment
}

export {connectMongo};
export default models;