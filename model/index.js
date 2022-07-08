const mongoose = require('mongoose');
import AddOn from "./addons"
import Address from "./address"
import Booking  from './booking'
import Business from './business';
import BusinessInfo from './businessinfo';
import Customer from './customer';
import Events  from "./events"
import Location from './location';
import LocationSetting from './locationsetting';
import Site from './site';
import Staff from "./staff"
import StaffDetails from "./staffdetails"
import Timing  from './timings'
import Workspace from './workspace';
import Setting from './settings';
import appintegration from './appintegration';
import app from './app';
import form from './form';
import Answer from './answer';
import Guest from './guest';

// import BusinessInfo from './businessInfo';
// import EventCategory  from "./eventcategory"
// import Role  from './role'
// import User  from './user'
// import TimeFormat  from './timeformat'
//mongodb+srv://ananduse:3CTLbbttBT7wTZw@cluster0.zt0q7.mongodb.net/hmis?retryWrites=true&w=majority

const connectMongo = () => {
  return mongoose.connect("mongodb+srv://ananduse:3CTLbbttBT7wTZw@cluster1.zt0q7.mongodb.net/hmis?connectTimeoutMS=300000&retryWrites=true&w=majority", {useNewUrlParser : true, useFindAndModify: false, useUnifiedTopology: true})
}

const models = {
  AddOn,
  Address,
  Booking,
  Business,
  Customer,
  Events,
  Location,
  LocationSetting,
  Site,
  Staff,
  StaffDetails,
  Timing,
  Workspace,
  Setting,
  BusinessInfo,
  appintegration,
  app,
  form,
  Answer,
  Guest
}

export {connectMongo};
export default models;