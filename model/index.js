const mongoose = require('mongoose');
import AddOn from "./addons"
import Address from "./address"
import Booking  from './booking'
import Business from './business';
import BusinessInfo from './businessinfo';
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
//mongodb+srv://ananduse:3CTLbbttBT7wTZw@cluster0.zt0q7.mongodb.net/hmis?retryWrites=true&w=majority

const connectMongo = () => {
  return mongoose.connect("mongodb+srv://ananduse:3CTLbbttBT7wTZw@cluster1.zt0q7.mongodb.net/hmis?retryWrites=true&w=majority", {useNewUrlParser : true, useFindAndModify: false, useUnifiedTopology: true})
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
  Setting,
  BusinessInfo
}

export {connectMongo};
export default models;