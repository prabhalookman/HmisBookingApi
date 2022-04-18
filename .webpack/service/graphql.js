/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 343:
/***/ ((module) => {

module.exports = require("graphql");

/***/ }),

/***/ 548:
/***/ ((module) => {

module.exports = require("graphql/language");

/***/ }),

/***/ 185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "graphqlHandler": () => (/* binding */ graphqlHandler)
});

;// CONCATENATED MODULE: external "dotenv/config"
const config_namespaceObject = require("dotenv/config");
;// CONCATENATED MODULE: external "express"
const external_express_namespaceObject = require("express");
var external_express_default = /*#__PURE__*/__webpack_require__.n(external_express_namespaceObject);
;// CONCATENATED MODULE: external "apollo-server-lambda"
const external_apollo_server_lambda_namespaceObject = require("apollo-server-lambda");
;// CONCATENATED MODULE: external "cors"
const external_cors_namespaceObject = require("cors");
var external_cors_default = /*#__PURE__*/__webpack_require__.n(external_cors_namespaceObject);
;// CONCATENATED MODULE: external "path"
const external_path_namespaceObject = require("path");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_namespaceObject);
;// CONCATENATED MODULE: external "apollo-server-express"
const external_apollo_server_express_namespaceObject = require("apollo-server-express");
;// CONCATENATED MODULE: ./schema/addons.js

/* harmony default export */ const addons = (external_apollo_server_express_namespaceObject.gql`
type AddOn {
  _id: ID
  active: Boolean
  delete: Boolean
  event_ids: [Events]
  name: String
  once_per_order: Boolean
  price: Float
  show_multiple_time: Boolean,
  avatar_or_icon: String,
  color_code: String,
  duration_minutes: Float,
  site_id: Site
  variant: [AddonVariant]
  workspace_ids: [Workspace]
}

type AddonVariant {
    name: String
    price: Float
}

extend type Query {
  getAddOns: [AddOn]
}
`);
;// CONCATENATED MODULE: ./schema/address.js

/* harmony default export */ const address = (external_apollo_server_express_namespaceObject.gql`
type Address {
  _id: ID,
  address1: String, 
  address2: String, 
  city: String, 
  state: String, 
  country: String, 
  zipCode: String,
  business_branch: Boolean, 
  address_phone: [address_phones], 
  email: String, 
  customer_id: Customer,  
  workspace_ids: [Workspace],
  site_id:[Site]
}

type address_phones {
  name: String,
  phone_type: String,
  country_code: String,
  no: String, 
  Ext: String
}

extend type Query {
  getAddress: [Address]
}

`);
;// CONCATENATED MODULE: ./schema/booking.js

/* harmony default export */ const booking = (external_apollo_server_express_namespaceObject.gql`
scalar Date
type Booking {
  _id: ID
  add_on_ids: [AddOn]
  amount_paid: Int
  appointment_booking_time: Date
  appointment_end_time: Date
  appointment_start_time: Date
  appointment_time_before_reschedule: [Date]
  repeat_upto_date:Date
  repeat_on: String,
  booked_by: String,
  progress: [book_progress],
  answer_id:[Answer],

  cost: Int
  created_at: String
  created_by: Staff
  created_from: String
  customer_ids: [Customer]
  customer_mood: String
  customer_status: String
  Is_cancelled: Boolean
  deleted: Boolean
  deleted_at: String

  buffer_after_min: Int,
  buffer_before_min: Int,
  duration_hours: Int,
  duration_minutes: Int,
  event_id: Events

  is_recurring: Boolean
  is_rescheduled: Boolean
  is_review_given: Boolean
  location_link: String
  location_setting_id: LocationSetting
  note: String

  site_id: Site
  slot: Int
  staff_id: Staff
  timezone: String
  transfered_id: [Staff]
  type: String
  updated_at: String
  workspace_id: Workspace
  }

  type book_progress {
    date_time: Date,
    status: String
  }

  input bookingInput {  
  add_on_ids: [ID]
  amount_paid: Int
  appointment_booking_time: String
  appointment_end_time: String
  appointment_start_time: String
  appointment_time_before_reschedule: [Date]
  repeat_upto_date:Date
  repeat_on: String,
  booked_by: String,
  progress: [book_progress_input],
  answer_id: ID

  cost: Float
  created_at: String
  created_by: ID
  created_from: String
  customer_ids: [ID]
  customer_mood: String
  customer_status: String
  deleted: Boolean
  Is_cancelled: Boolean
  deleted_at: String

  buffer_after_min: Int,
  buffer_before_min: Int,
  duration_hours: Int,
  duration_minutes: Int,
  event_id: ID

  is_recurring: Boolean
  is_rescheduled: Boolean
  is_review_given: Boolean
  location_link: String
  location_setting_id: ID
  note: String

  site_id: ID
  slot: Int
  staff_id: ID
  timezone: String
  transfered_id: [ID]
  type: String
  updated_at: String
  workspace_id: ID
}

input bookingIn {  
  availablity:bookingInput
  customer:customerInput
}
input book_progress_input {
  date_time: Date,
  status: String
}

input booking_available_in {
  location_setting_id:ID
  timezone: String
  appointment_booking_time: String
  is_recurring: Boolean
  slot: Int
}

extend type Query {
getBooking(workspace_id: ID, site_id: ID): [Booking]
getBookingById(workspace_id: ID, site_id:ID, booking_id: ID ):[Booking]
getBookingByStaff(workspace_id: ID!, site_id:ID!, staff_id: ID! ):[Booking]
getBookingByEvent(workspace_id: ID!, site_id:ID!, event_id: ID! ):[Booking]
}

extend type Mutation {
addBooking(input: bookingIn): Booking  
rescheduleBooking(
  appointment_id: ID!,
  appointment_start_time: String!
  appointment_end_time: String!
  ): Booking
}
 `); // /*
// rescheduleBooking(
//   appointment_id: String!,
//   appointment_start_time: String!
//   booking_id: ID!
//   workspace_id: ID!, 
//   site_id: ID!, 
//   staff_ids: ID!, 
//   event: [ID!], 
//   date: String!, 
//   locationName: [String!],
//   locationSettingId: [ID]): Availablilities
// }
// arrival_status: String
// assignee_id: [Staff]
// booked_by: String
// booking_id: Int
// discount_amount: Int
// discount_applied: Boolean
// discount_available: Boolean
// discount_code: String
// discount_id: Discountcoupon
// extra_time_is_blocking: Boolean
// gift_card_amount: Int
// gift_card_applied: Boolean
// gift_card_available: Boolean
// gift_card_id: Giftcard
// guest_ids: [Customer]
// integration: String
// is_approved: Boolean
// is_asked_for_review: Boolean
// Is_cancelled: Boolean
// is_failed: Boolean
// is_multi_service: Boolean
// is_offer_applied: Boolean
// is_offer_available: Boolean
// is_paid: Boolean
// offer_amount: Int
// order_id: Order
// payment_mode_id: Int
// platform: String
// price_type: String
// progress: [BookingProgress]
// reference: String
// resource_id: Int
// room_id: String
// */
;// CONCATENATED MODULE: ./schema/business.js

/* harmony default export */ const business = (external_apollo_server_express_namespaceObject.gql`
type Business {
  _id: ID
  business_info_ids: [BusinessInfo],    
  display_name: String,    
  name: String,    
  site_id: Site,
  workspace_id: [Workspace]
}
extend type Query {
    getBusiness: [Business]
}
`);
/*

*/
;// CONCATENATED MODULE: ./schema/businessinfo.js

/* harmony default export */ const businessinfo = (external_apollo_server_express_namespaceObject.gql`
scalar Date
type BusinessInfo {
  _id: ID
  business_hour_end: Int,
  business_hour_start: Int,
  restrictedDays: [Date],
  time_zone: String,
  timing_ids: [Timing],  
  site_id: Site,
  workspace_id: [Workspace]
}

`);
/*

extend type Query {
    getBusiness: [Business]
}

*/
;// CONCATENATED MODULE: ./schema/customer.js

/* harmony default export */ const customer = (external_apollo_server_express_namespaceObject.gql`
type Customer {
  _id: ID  
  address_id: Address,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  booking_ids: [Booking],
  color_code: String,
  date_of_birth: String,
  description: String,

  display_name: String,
  email: String,
  email_verified_date_time: String,
  first_name: String,
  gender: String,
  
  is_email_verified: Boolean,
  last_name: String,
  name: String,
  
  registeredUsing: String,
  registration_date: String,
  slug: String,
  source: String,
  timezone: String

  phone: [CustomerPhone],  
}
type CustomerPhone {
    country_code: String
    is_verified: Boolean
    name: String
    no: String
    
  }

input customerInput {
  address_id: ID,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  booking_ids: [ID],
  color_code: String,
  date_of_birth: String,
  description: String,
  
  display_name: String,
  email: String,
  email_verified_date_time: String,
  first_name: String,
  gender: String,
  
  is_email_verified: Boolean,
  last_name: String,
  name: String,
  phone: [customerPhoneInput],  
  
  registeredUsing: String,
  registration_date: String,
  slug: String,
  source: String,
  timezone: String
}  

input customerPhoneInput {
  country_code: String
  is_verified: Boolean
  name: String
  no: String
  
}


extend type Query {
    getCustomer(workspace_ids: ID, site_id: ID, staff_id: ID): [Customer]
}

extend type Mutation {
  addCustomer(input: customerInput): Customer
}
`);
/*

type: String
*/
;// CONCATENATED MODULE: ./schema/events.js

/* harmony default export */ const events = (external_apollo_server_express_namespaceObject.gql`
type Events {
  _id: ID
  name: String,
  description: String,
  price: String,  
  special_price: String,
  retailPrice: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  duration_hours: Int,
  duration_minutes: Int,
  business_id: [Business],
  business_timings: Boolean,
  isformrequired: Boolean,
  isform: Boolean,
  form_id: Form,

  workspace_id: Workspace,
  site_id: Site,
  timing_ids: [Timing],
  location_setting_ids: [LocationSetting],
  staff: [Staff],
  add_on_ids: [AddOn]
}

type StaffEvents {
  _id: ID,
  events: Events,
  timings_day: String
}

type EventWithAvailDate {
  location_names: [String],
  available_dates: [String]
  timings_day: [String],
  events: [Events]
}

extend type Query {
  getEvents(workspace_id: ID, site_id: ID, staff_ids: ID ): [Events]
  getEventsDetailByStaff(workspace_id: ID, site_id: ID, staff_id: ID): [Events]
  getEnabledDate(workspace_id: ID, site_id: ID, staff_id: ID, event_id: ID, timings_day: [String] ) : [String]
  getStaffToTransfer(workspace_id: ID, site_id: ID, staff_id: ID, event_id: ID, appointment_date: String, booking_id: ID): [Staff]
  getLocationByServiceId(workspace_id: ID, site_id: ID,event_id: ID):[Events]
}
`);
/*
available_dates: [String],
 */
;// CONCATENATED MODULE: ./schema/location.js

/* harmony default export */ const schema_location = (external_apollo_server_express_namespaceObject.gql`
type Location {
  _id: ID
  active: Boolean,
  app_id: App,
  app_integration_need: Boolean,
  avatar_or_icon_path: String,  
  deleted: Boolean,  
  icon: String,
  name: String,
  type: String,
  type_param: Boolean
}

extend type Query {
  getLocation(workspace_id: ID, site_id: ID): [Location]
}

`);
;// CONCATENATED MODULE: ./schema/locationsetting.js

/* harmony default export */ const locationsetting = (external_apollo_server_express_namespaceObject.gql`
type LocationSetting {
  _id: ID
  workspace_id: Workspace
  site_id: Site
  location_id: Location  
  inperson: LocationSettingInperson
  oncall: LocationSettingOncall
  video: LocationSettingVideo  
}

type LocationSettingInperson {
  buinsess_address: Boolean
  buinsess_id: ID
  client_address: Boolean
}

type LocationSettingVideo {
  integration_id: String
  video_type: String
}

type LocationSettingOncall {
  client_will_call: Boolean,
  staff_will_call: Boolean
}

extend type Query {
  getLocationSetting(workspace_id: ID, site_id: ID): [LocationSetting]  
  getLocationSettingById(workspace_id: ID, site_id: ID, location_id: [ID]): [LocationSetting]  
  getStaffEventLocationSettings(workspace_id: ID!, site_id: ID!, event_id: ID!,staff_id: ID!, date: String!): [LocationSetting]
}
`);
;// CONCATENATED MODULE: ./schema/site.js

/* harmony default export */ const site = (external_apollo_server_express_namespaceObject.gql`

type Site {
    _id: ID
    name: String,
    workspace_ids: [Workspace]
}
extend type Query {
    getSite: [Site]    
}

`);
;// CONCATENATED MODULE: ./schema/staff.js

/* harmony default export */ const staff = (external_apollo_server_express_namespaceObject.gql`

type Staff {
  _id: ID,
  name: String,
  description: String,
  price: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  workspace_ids: [Workspace],
  site_id: [Site],  
  staff_detail_id: [StaffDetails]
}

extend type Query {
  getStaffs(workspace_ids: ID, site_id: ID): [Staff]
  getLocationByStaffId(workspace_ids: ID, site_id: ID, staff_id: ID):[Staff]  
}
`);
;// CONCATENATED MODULE: ./schema/staffdetails.js

/* harmony default export */ const staffdetails = (external_apollo_server_express_namespaceObject.gql`
scalar Date
type StaffDetails {
  _id: ID,  
  description: String,
  price: String,
  business_timings: Boolean,
  business_id: [Business],  
  workspace_id: [Workspace],
  site_id: String,
  address_ids: [Address],
  timing_ids: [Timing],
  sorting_id: Int,
  events_ids: [Events],
  location_setting_ids: [LocationSetting]
}

type Availablilities {
  start_date: String,
  end_date: String,
  pre_booking_day: Int,
  available_date: [String],
  disable_date: [String],
	availableTimes: [availTimes],
  locationAvailable: String
  selectedDate: String
  displaySettings:String
}

type availTimes {
  _id: String,
  slotStartTime: Date,
  slotEndTime: Date
  slot: Int
  isBooking: Boolean
  
}

type AvailLocations {
  start_date: String,
  end_date: String,
  pre_booking_day: Int,
  available_date: [String],
  disable_date: [String],
	locationAvailable: [location_locationsetting]
  selectedDate: String
  displaySettings:String,
  clientSlot: Int
}

type location_locationsetting {
  location: Location,
  locationsetting: LocationSetting
}

type Avail_Location_Settings {
  locationsetting_id: String,
  appintegration_id: String,
  is_installed: Boolean,
  app_name: String,
  location_id: String,
  location_type: String,
  location_name: String,
  location_app_integration_need: Boolean
  }
input getAvailInput {
  workspace_id: ID, 
  site_id: ID, 
  staff_ids: ID, 
  event: [ID], 
  date: String, 
  location: String,
  locationSettingId: ID
  }


extend type Query {
  getStaffDetails(workspace_id: ID!, site_id: ID!): [StaffDetails]

  getstaffdetailbyservice(workspace_id: ID!, site_id: ID!,event_id: ID!):[Staff]

  getAvailabilityByStaff(
  workspace_id: ID!, 
  site_id: ID!, 
  staff_ids: ID!, 
  event: [ID!], 
  date: String!, 
  locationName: [String!],
  locationSettingId: [ID]): Availablilities
  
  getEventLocationSettings(workspace_id: ID!, site_id: ID!, event_id: ID!, date: String!): AvailLocations
  
  
}

`);
;// CONCATENATED MODULE: ./schema/timings.js

/* harmony default export */ const timings = (external_apollo_server_express_namespaceObject.gql`
type Timing {
    _id: ID
    business_hour: Boolean
    business_location_setting_ids: [LocationSetting]    
    custom_hour: Boolean    
    include_weekends: Boolean
    location_setting_ids: [LocationSetting]
    time_zone: String
    timing_order: Int    
    timings: [TimingTiming]
    timing_type: String    
    site_id: Site
    workspace_ids: [Workspace]
}

type TimingTiming {
  breaktime: [TimingTimingBreaktime]
  end_time: String
  is_override_block: Boolean
  name: String
  recurringRule: TimingTimingRecurringRule
  service_ids: [ID]
  start_time: String
  work_day_duration: Int
  work_day_id: Int
  work_day_name: String
}

type TimingTimingBreaktime {
  end_time: String
  start_time: String
}

type TimingTimingRecurringRule {
  freq: String
  repeatEvery: Int
  until: Timing
}

extend type Query {
    getTimings: [Timing]
}

`);
;// CONCATENATED MODULE: ./schema/workspace.js

/* harmony default export */ const workspace = (external_apollo_server_express_namespaceObject.gql`

type Workspace {
    _id: ID
    name: String,    
    site_id: Site
}

extend type Query {
    getWorkspace: [Workspace]
}
`);
;// CONCATENATED MODULE: ./schema/setting.js

/* harmony default export */ const setting = (external_apollo_server_express_namespaceObject.gql`
type Setting {
  _id: ID
  advance_Booking_Period: Int,
  client_time_slot: Int,
  site_id: Site,
  workspace_id: Workspace
}

type SettingAdvance_Booking_Period {
    format: String
    value: Int
  }
extend type Query {
  getSetting: [Setting]    
}
`);
;// CONCATENATED MODULE: ./schema/appintegration.js

/* harmony default export */ const appintegration = (external_apollo_server_express_namespaceObject.gql`
type Appintegration {
    _id: ID
    app_id: App,
    chat_id_or_no: String,
    deleted: Boolean,
    is_installed: Boolean,
    key: String,
    location_setting_id: LocationSetting,
    secret: String,
    site_id: Site,
    workspace_id: Workspace
}
`); // extend type Query {  
//     getAppintegration: [Appintegration]
// }
;// CONCATENATED MODULE: ./schema/app.js

/* harmony default export */ const app = (external_apollo_server_express_namespaceObject.gql`
type App {
  _id: ID
  active: Boolean,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  category: String,
  color_code: String,
  deleted: Boolean,
  name: String,
  visible_page: String
}

`); // extend type Query {
//     getAddOns: [App]
// }
;// CONCATENATED MODULE: ./schema/form.js

/* harmony default export */ const schema_form = (external_apollo_server_express_namespaceObject.gql`
scalar Date
type Form {
  _id: ID
  active: Boolean,
  deleted: Boolean,
  expired_date: Date,
  form_data: String,
  form_type: String,
  name: String,
  slug: String,
  view_by: String,
  site_id: Site
  workspace_ids: [Workspace]
}

`); // extend type Query {
//   getForm: [Form]  
// }
;// CONCATENATED MODULE: ./schema/answer.js

/* harmony default export */ const answer = (external_apollo_server_express_namespaceObject.gql`
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
`);
;// CONCATENATED MODULE: ./schema/index.js



















 // import businessInfoSchema  from './businessinfo'
// import eventCategorySchema  from './eventcategory'
// import roleSchema  from './role'
// import userSchema  from './user'
// import timeformatSchema  from './timeformat'

const baseSchema = external_apollo_server_express_namespaceObject.gql`
type Query {
  _: String
}
type Mutation {
  _: String
}
type Subscription {
  _: String
}
`; // scalar Date

/* harmony default export */ const schema = ([baseSchema, addons, address, booking, business, businessinfo, customer, events, schema_location, locationsetting, site, staff, staffdetails, timings, workspace, setting, appintegration, app, schema_form, answer]);
;// CONCATENATED MODULE: ./resolvers/addons.js
/* harmony default export */ const resolvers_addons = ({
  Query: {
    getAddOns: async (parent, args, context, info) => {
      try {
        let addon = await context.models.AddOn.find({
          delete: false
        });
        return addon;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  AddOn: {
    event_ids: async addon => {
      let resultAddOn = await addon.populate('event_ids').execPopulate();
      return resultAddOn.event_ids;
    },
    workspace_ids: async addon => {
      let resultAddOn = await addon.populate('workspace_ids').execPopulate();
      return resultAddOn.workspace_ids;
    },
    site_id: async addon => {
      let resultAddOn = await addon.populate('site_id').execPopulate();
      return resultAddOn.site_id;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/address.js
/* harmony default export */ const resolvers_address = ({
  Query: {
    getAddress: async (parent, args, context, info) => {
      try {
        let adress = await context.models.Address.find({
          delete: false
        });
        return adress;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Address: {
    customer_id: async address => {
      let resultAddress = await address.populate('customer_id').execPopulate();
      return resultAddress.customer_id;
    },
    workspace_ids: async address => {
      let resultAddress = await address.populate('workspace_ids').execPopulate();
      return resultAddress.workspace_ids;
    },
    site_id: async address => {
      let resultAddress = await address.populate('site_id').execPopulate();
      return resultAddress.site_id;
    }
  }
});
;// CONCATENATED MODULE: external "apollo-server-errors"
const external_apollo_server_errors_namespaceObject = require("apollo-server-errors");
;// CONCATENATED MODULE: ./helpers/helper.js


const returnOnError = (operation, alternative) => {
  try {
    return operation();
  } catch (e) {
    return alternative;
  }
};

class MyError extends (/* unused pure expression or super */ null && (ApolloError)) {
  constructor(message) {
    super(message, 'MY_ERROR_CODE');
    Object.defineProperty(this, 'name', {
      value: 'MyError'
    });
  }

}


;// CONCATENATED MODULE: external "moment-timezone"
const external_moment_timezone_namespaceObject = require("moment-timezone");
var external_moment_timezone_default = /*#__PURE__*/__webpack_require__.n(external_moment_timezone_namespaceObject);
;// CONCATENATED MODULE: external "bson"
const external_bson_namespaceObject = require("bson");
;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = require("lodash");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_namespaceObject);
;// CONCATENATED MODULE: ./helpers/aggregateFunctions.js

function aggregate_bhf(_ids, root, bizhours, eventid) {
  let pipeline = [];

  if (root == 'event') {
    let match = {};
    match["events._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
    match['events.business_timings'] = false;
    const bhf = event_business_hours_false();
    pipeline = [...bhf];
    pipeline.push( // event_business_hours_false()
    {
      '$match': match
    }, {
      '$project': {
        "timings": "$timings",
        "locationsetting_id": "$locationsetting._id",
        "location_name": "$location.name",
        "events": "$events._id",
        "appintegration_id": "$locationsetting.integration_id",
        "is_installed": "$appintegration.is_installed",
        "app_name": "$app.name",
        "location_id": "$location._id",
        "location_type": "$location.type",
        "location_name": "$location.name",
        "location_app_integration_need": "$location.app_integration_need"
      }
    });
    console.log(`\n aggregate_bhf pipeline  EVENT ID ${_ids} :: ${JSON.stringify(pipeline)} `);
  } else {
    let match = {};
    match["staff._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
    const bhf = staff_business_hours_false();
    pipeline = [...bhf];
    pipeline.push({
      '$match': match
    }, {
      '$project': {
        "timings": "$timings",
        "locationsetting_id": "$locationsetting._id",
        "appintegration_id": "$locationsetting.integration_id",
        "is_installed": "$appintegration.is_installed",
        "app_name": "$app.name",
        "location_id": "$location._id",
        "location_type": "$location.type",
        "location_name": "$location.name",
        "location_app_integration_need": "$location.app_integration_need"
      }
    });
    console.log(`\n aggregate_bhf pipeline  STAFF ID ${_ids} :: ${JSON.stringify(pipeline)} `);
  }

  return pipeline;
}
function aggregate_bht(_ids, root, bizhours) {
  let pipeline = [];

  if (root == 'event') {
    let match = {};
    match["events._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
    const bht = event_business_hours_true();
    pipeline = [...bht];
    match['events.business_timings'] = true;
    pipeline.push({
      '$match': match
    }, {
      '$project': {
        "timings": "$timings",
        "locationsetting_id": "$locationsetting._id",
        "location_name": "$location.name",
        "events": "$events._id",
        "appintegration_id": "$locationsetting.integration_id",
        "is_installed": "$appintegration.is_installed",
        "app_name": "$app.name",
        "location_id": "$location._id",
        "location_type": "$location.type",
        "location_name": "$location.name",
        "location_app_integration_need": "$location.app_integration_need"
      }
    });
    console.log(`\n aggregate_bht pipeline EVENT ${_ids} : `, JSON.stringify(pipeline));
  } else {
    let match = {};
    match["staff._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
    const bht = staff_business_hours_true();
    pipeline = [...bht];
    pipeline.push({
      '$match': match
    }, {
      '$project': {
        "timings": "$timings",
        "locationsetting_id": "$locationsetting._id",
        "location_name": "$location.name",
        "events": "$events._id",
        "appintegration_id": "$locationsetting.integration_id",
        "is_installed": "$appintegration.is_installed",
        "app_name": "$app.name",
        "location_id": "$location._id",
        "location_type": "$location.type",
        "location_name": "$location.name",
        "location_app_integration_need": "$location.app_integration_need"
      }
    });
    console.log(`\n aggregate_bht pipeline  STAFF ID ${_ids} :: ${JSON.stringify(pipeline)} `);
  }

  return pipeline;
}
function get_staffdetail_agg(_ids, workspace_id, site_id) {
  let match = {};
  match["staff._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
  match["staff.workspace_ids"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
  match["staff.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
  let pipeline = [];
  pipeline.push({
    '$project': {
      staff: '$$ROOT'
    }
  }, {
    '$lookup': {
      localField: 'staff.staff_detail_id',
      from: 'staffdetails',
      foreignField: '_id',
      as: 'staffdetails'
    }
  }, {
    '$match': match
  }, {
    "$facet": {
      'staffDetails': [{
        '$unwind': {
          path: '$staffdetails',
          preserveNullAndEmptyArrays: false
        }
      }, {
        '$project': {
          'business_timings': '$staffdetails.business_timings'
        }
      }],
      'events': [{
        "$lookup": {
          "localField": "staff.staff_detail_id",
          "from": "staffdetails",
          "foreignField": "_id",
          "as": "staffdetails"
        }
      }, {
        '$unwind': {
          path: '$staffdetails',
          preserveNullAndEmptyArrays: false
        }
      }, {
        '$lookup': {
          localField: 'staffdetails.events_ids',
          from: 'events',
          foreignField: '_id',
          as: 'events'
        }
      }, {
        '$unwind': {
          path: '$events',
          preserveNullAndEmptyArrays: false
        }
      }, {
        '$project': {
          'events': '$events._id',
          'event_business_timings': '$events.business_timings'
        }
      }]
    }
  }, {
    '$project': {
      'staffDetails': '$staffDetails',
      'events': '$events'
    }
  });
  console.log('\n get_staffdetail_agg : ', JSON.stringify(pipeline));
  return pipeline;
}
function get_staff_locationsettings_agg_bht(_ids, workspace_id, site_id) {
  let match = {};
  match["staff._id"] = ObjectId(_ids);
  match["staff.workspace_ids"] = ObjectId(workspace_id);
  match["staff.site_id"] = ObjectId(site_id);
  let pipeline = [];
  const bht = staff_business_hours_true();
  pipeline = [...bht];
  pipeline.push({
    '$match': match
  }, {
    "$facet": {
      "locationSetting": [{
        "$project": {
          "locationsetting_id": "$locationsetting._id",
          "appintegration_id": "$locationsetting.integration_id",
          "is_installed": "$appintegration.is_installed",
          "app_name": "$app.name",
          "location_id": "$location._id",
          "location_type": "$location.type",
          "location_name": "$location.name",
          "location_app_integration_need": "$location.app_integration_need"
        }
      }],
      "location": [{
        "$unwind": {
          "path": "$location",
          "preserveNullAndEmptyArrays": false
        }
      }, {
        "$project": {
          "location_id": "$location._id",
          "location_type": "$location.type",
          "location_name": "$location.name"
        }
      }]
    }
  }, {
    "$project": {
      "locationsetting": "$locationSetting",
      "location_type": "$location"
    }
  });
  console.log('\n get_staff_locationsettings_agg_bht : ', JSON.stringify(pipeline));
  return pipeline;
}
function get_staff_locationsettings_agg_bhf(_ids, workspace_id, site_id) {
  let match = {};
  match["staff._id"] = ObjectId(_ids);
  match["staff.workspace_ids"] = ObjectId(workspace_id);
  match["staff.site_id"] = ObjectId(site_id);
  let pipeline = [];
  const bht = staff_business_hours_false();
  pipeline = [...bht];
  pipeline.push({
    '$match': match
  }, {
    "$facet": {
      "locationSetting": [{
        "$project": {
          "locationsetting_id": "$locationsetting._id",
          "appintegration_id": "$locationsetting.integration_id",
          "is_installed": "$appintegration.is_installed",
          "app_name": "$app.name",
          "location_id": "$location._id",
          "location_type": "$location.type",
          "location_name": "$location.name",
          "location_app_integration_need": "$location.app_integration_need"
        }
      }],
      "location": [{
        "$unwind": {
          "path": "$location",
          "preserveNullAndEmptyArrays": false
        }
      }, {
        "$project": {
          "location_id": "$location._id",
          "location_type": "$location.type",
          "location_name": "$location.name"
        }
      }]
    }
  }, {
    "$project": {
      "locationsetting": "$locationSetting",
      "location_type": "$location"
    }
  });
  console.log('\n get_staff_locationsettings_agg_bhf : ', JSON.stringify(pipeline));
  return pipeline;
}
function get_event_locationsettings_agg_bht(_ids, workspace_id, site_id) {
  let match = {};
  match["events._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
  match["events.workspace_id"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
  match["events.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
  let pipeline = [];
  const bht = event_business_hours_true();
  pipeline = [...bht];
  pipeline.push({
    '$match': match
  }, {
    "$facet": {
      "locationSetting": [{
        "$project": {
          "locationsetting_id": "$locationsetting._id",
          "appintegration_id": "$locationsetting.integration_id",
          "is_installed": "$appintegration.is_installed",
          "app_name": "$app.name",
          "location_id": "$location._id",
          "location_type": "$location.type",
          "location_name": "$location.name",
          "location_app_integration_need": "$location.app_integration_need"
        }
      }],
      "location": [{
        "$unwind": {
          "path": "$location",
          "preserveNullAndEmptyArrays": false
        }
      }, {
        "$project": {
          "location_id": "$location._id",
          "location_type": "$location.type",
          "location_name": "$location.name"
        }
      }]
    }
  }, {
    "$project": {
      "locationsetting": "$locationSetting",
      "location_type": "$location"
    }
  });
  console.log('\n get_event_locationsettings_agg_bht : ', JSON.stringify(pipeline));
  return pipeline;
}
function get_event_locationsettings_agg_bhf(_ids, workspace_id, site_id) {
  let match = {};
  match["events._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
  match["events.workspace_id"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
  match["events.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
  let pipeline = [];
  const bht = event_business_hours_false();
  pipeline = [...bht];
  pipeline.push({
    '$match': match
  }, {
    "$facet": {
      "locationSetting": [{
        "$project": {
          "locationsetting_id": "$locationsetting._id",
          "appintegration_id": "$locationsetting.integration_id",
          "is_installed": "$appintegration.is_installed",
          "app_name": "$app.name",
          "location_id": "$location._id",
          "location_type": "$location.type",
          "location_name": "$location.name",
          "location_app_integration_need": "$location.app_integration_need"
        }
      }],
      "location": [{
        "$unwind": {
          "path": "$location",
          "preserveNullAndEmptyArrays": false
        }
      }, {
        "$project": {
          "location_id": "$location._id",
          "location_type": "$location.type",
          "location_name": "$location.name"
        }
      }]
    }
  }, {
    "$project": {
      "locationsetting": "$locationSetting",
      "location_type": "$location"
    }
  });
  console.log('\n get_events_locationsettings_agg_bhf : ', JSON.stringify(pipeline));
  return pipeline;
}
function staff_business_hours_true() {
  let pipline = [];
  pipline.push({
    "$project": {
      "staff": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.business_id",
      "from": "business",
      "foreignField": "_id",
      "as": "business"
    }
  }, {
    "$lookup": {
      "localField": "business.business_info_ids",
      "from": "businessinfo",
      "foreignField": "_id",
      "as": "businessinfo"
    }
  }, {
    "$lookup": {
      "localField": "businessinfo.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.integration_id",
      "from": "appintegration",
      "foreignField": "_id",
      "as": "appintegration"
    }
  }, {
    "$lookup": {
      "localField": "appintegration.app_id",
      "from": "app",
      "foreignField": "_id",
      "as": "app"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  });
  return pipline; //console.log(`\n staff_business_hours_true : ${JSON.stringify(pipline) } `)
}
function staff_business_hours_false() {
  let pipline = [];
  pipline.push({
    "$project": {
      "staff": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$unwind": {
      "path": "$timings",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "timings.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.integration_id",
      "from": "appintegration",
      "foreignField": "_id",
      "as": "appintegration"
    }
  }, {
    "$lookup": {
      "localField": "appintegration.app_id",
      "from": "app",
      "foreignField": "_id",
      "as": "app"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  });
  return pipline; //console.log(`\n staff_business_hours_false : ${JSON.stringify(pipline) } `)
}
function event_business_hours_true() {
  let pipline = [];
  pipline.push({
    "$project": {
      "events": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "events.business_id",
      "from": "business",
      "foreignField": "_id",
      "as": "business"
    }
  }, {
    "$lookup": {
      "localField": "business.business_info_ids",
      "from": "businessinfo",
      "foreignField": "_id",
      "as": "businessinfo"
    }
  }, {
    "$lookup": {
      "localField": "businessinfo.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$lookup": {
      "localField": "events.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.integration_id",
      "from": "appintegration",
      "foreignField": "_id",
      "as": "appintegration"
    }
  }, {
    "$lookup": {
      "localField": "appintegration.app_id",
      "from": "app",
      "foreignField": "_id",
      "as": "app"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  });
  console.log(`\n event_business_hours_true : ${JSON.stringify(pipline)} `);
  return pipline;
}
function event_business_hours_false() {
  let pipline = [];
  pipline.push({
    "$project": {
      "events": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "events.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$unwind": {
      "path": "$timings",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "timings.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.integration_id",
      "from": "appintegration",
      "foreignField": "_id",
      "as": "appintegration"
    }
  }, {
    "$lookup": {
      "localField": "appintegration.app_id",
      "from": "app",
      "foreignField": "_id",
      "as": "app"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  });
  console.log(`\n event_business_hours_false : ${JSON.stringify(pipline)} `);
  return pipline;
} //To check staff_id is business_hours true or false

function bushiness_timings_agg(_id, workspace_id, site_id, type_o) {
  let pipline = [];
  let match = {};

  if (type_o == 'staff') {
    match["staff._id"] = (0,external_bson_namespaceObject.ObjectId)(_id);
    match["staff.workspace_ids"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
    match["staff.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
    pipline.push({
      "$project": {
        "staff": "$$ROOT"
      }
    }, {
      "$lookup": {
        "localField": "staff.staff_detail_id",
        "from": "staffdetails",
        "foreignField": "_id",
        "as": "staffdetails"
      }
    }, {
      "$unwind": {
        "path": "$staffdetails",
        "preserveNullAndEmptyArrays": false
      }
    }, {
      "$match": match
    }, {
      "$project": {
        "business_hours": "$staffdetails.business_timings"
      }
    });
  } else {
    match["events._id"] = (0,external_bson_namespaceObject.ObjectId)(_id);
    match["events.workspace_id"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
    match["events.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
    pipline.push({
      "$project": {
        "events": "$$ROOT"
      }
    }, {
      "$match": match
    }, {
      "$project": {
        "business_hours": "$events.business_timings"
      }
    });
  }

  console.log(`\n bushiness_timings_agg ${type_o} :  ${JSON.stringify(pipline)}`);
  return pipline;
}
function get_staff_dd_locationsettings_agg_bht(_ids, workspace_id, site_id) {
  let match = {};
  match["staff._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
  match["staff.workspace_ids"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
  match["staff.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
  let pipeline = [];
  pipeline.push({
    $project: {
      staff: "$$ROOT"
    }
  }, {
    $lookup: {
      localField: "staff.staff_detail_id",
      from: "staffdetails",
      foreignField: "_id",
      as: "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.events_ids",
      "from": "events",
      "foreignField": "_id",
      "as": "events"
    }
  }, {
    $lookup: {
      localField: "staffdetails.business_id",
      from: "business",
      foreignField: "_id",
      as: "business"
    }
  }, {
    $lookup: {
      localField: "business.business_info_ids",
      from: "businessinfo",
      foreignField: "_id",
      as: "businessinfo"
    }
  }, {
    $lookup: {
      localField: "businessinfo.timing_ids",
      from: "timings",
      foreignField: "_id",
      as: "timings"
    }
  }, {
    "$unwind": {
      "path": "$timings",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    $lookup: {
      localField: "staffdetails.location_setting_ids",
      from: "locationsetting",
      foreignField: "_id",
      as: "locationsetting"
    }
  }, {
    $lookup: {
      localField: "locationsetting.integration_id",
      from: "appintegration",
      foreignField: "_id",
      as: "appintegration"
    }
  }, {
    $lookup: {
      localField: "appintegration.app_id",
      from: "app",
      foreignField: "_id",
      as: "app"
    }
  }, {
    $lookup: {
      localField: "locationsetting.location_id",
      from: "location",
      foreignField: "_id",
      as: "location"
    }
  }, {
    $match: match
  }, {
    $facet: {
      locationSetting: [{
        $project: {
          locationsetting_id: "$locationsetting._id",
          location_name: "$location.name",
          timings_day: "$timings.timings.work_day_name",
          timings: "$timings",
          events: "$events.name",
          events_id: "$events._id",
          staff_id: "$staff._id",
          staff_name: "$staff.name"
        }
      }]
    }
  }, {
    $project: {
      locationsetting: "$locationSetting"
    }
  });
  console.log('\n get_staff_dd_locationsettings_agg_bht : ', JSON.stringify(pipeline));
  return pipeline;
}
function get_staff_dd_locationsettings_agg_bhf(_ids, workspace_id, site_id) {
  let match = {};
  match["staff._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
  match["staff.workspace_ids"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
  match["staff.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
  let pipeline = [];
  pipeline.push({
    "$project": {
      "staff": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.events_ids",
      "from": "events",
      "foreignField": "_id",
      "as": "events"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$unwind": {
      "path": "$timings",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "timings.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.integration_id",
      "from": "appintegration",
      "foreignField": "_id",
      "as": "appintegration"
    }
  }, {
    "$lookup": {
      "localField": "appintegration.app_id",
      "from": "app",
      "foreignField": "_id",
      "as": "app"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    '$match': match
  }, {
    "$facet": {
      "locationSetting": [{
        "$project": {
          "locationsetting_id": "$locationsetting._id",
          "location_name": "$location.name",
          "timings_day": "$timings.timings.work_day_name",
          "timings": "$timings",
          "events_id": "$events._id",
          "events_name": "$events.name",
          "staff_id": "$staff._id",
          "staff_name": "$staff.name"
        }
      }]
    }
  }, {
    "$project": {
      "locationsetting": "$locationSetting"
    }
  });
  console.log('\n get_staff_dd_locationsettings_agg_bhf : ', JSON.stringify(pipeline));
  return pipeline;
}
function get_event_dd_locationsettings_agg_bht(_ids, workspace_id, site_id) {
  let match = {};
  match["events._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
  match["events.workspace_id"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
  match["events.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
  let pipeline = [];
  pipeline.push({
    "$project": {
      "events": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "events.staff",
      "from": "staff",
      "foreignField": "_id",
      "as": "staff"
    }
  }, {
    "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "events.business_id",
      "from": "business",
      "foreignField": "_id",
      "as": "business"
    }
  }, {
    "$lookup": {
      "localField": "business.business_info_ids",
      "from": "businessinfo",
      "foreignField": "_id",
      "as": "businessinfo"
    }
  }, {
    "$lookup": {
      "localField": "businessinfo.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$unwind": {
      "path": "$timings",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "events.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.integration_id",
      "from": "appintegration",
      "foreignField": "_id",
      "as": "appintegration"
    }
  }, {
    "$lookup": {
      "localField": "appintegration.app_id",
      "from": "app",
      "foreignField": "_id",
      "as": "app"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    '$match': match
  }, {
    "$facet": {
      "locationSetting": [{
        "$project": {
          "locationsetting_id": "$locationsetting._id",
          "location_name": "$location.name",
          "timings_day": "$timings.timings.work_day_name",
          "timings": "$timings",
          "events": "$events",
          "events_id": "$events._id",
          "events_name": "$events.name",
          "staff_id": "$staff._id",
          "staff_name": "$staff.name"
        }
      }]
    }
  }, {
    "$project": {
      "locationsetting": "$locationSetting"
    }
  });
  console.log('\n get_event_dd_locationsettings_agg_bht : ', JSON.stringify(pipeline));
  return pipeline;
}
function get_event_dd_locationsettings_agg_bhf(_ids, workspace_id, site_id) {
  let match = {};
  match["events._id"] = (0,external_bson_namespaceObject.ObjectId)(_ids);
  match["events.workspace_id"] = (0,external_bson_namespaceObject.ObjectId)(workspace_id);
  match["events.site_id"] = (0,external_bson_namespaceObject.ObjectId)(site_id);
  let pipeline = [];
  pipeline.push({
    "$project": {
      "events": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "events.staff",
      "from": "staff",
      "foreignField": "_id",
      "as": "staff"
    }
  }, {
    "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "events.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$unwind": {
      "path": "$timings",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "timings.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.integration_id",
      "from": "appintegration",
      "foreignField": "_id",
      "as": "appintegration"
    }
  }, {
    "$lookup": {
      "localField": "appintegration.app_id",
      "from": "app",
      "foreignField": "_id",
      "as": "app"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    '$match': match
  }, {
    "$facet": {
      "locationSetting": [{
        "$project": {
          "locationsetting_id": "$locationsetting._id",
          "location_name": "$location.name",
          "timings_day": "$timings.timings.work_day_name",
          "timings": "$timings",
          "events_id": "$events._id",
          "events_name": "$events.name",
          "staff_id": "$staff._id",
          "staff_name": "$staff.name"
        }
      }]
    }
  }, {
    "$project": {
      "locationsetting": "$locationSetting"
    }
  });
  console.log('\n get_events_dd_locationsettings_agg_bhf : ', JSON.stringify(pipeline));
  return pipeline;
}
let get_staff_locationName_bht_agg = staff_id => {
  let match = {
    $and: [{
      "staff._id": {
        $in: staff_id
      }
    }, {
      "locationsetting.active": true
    }]
  };
  let pipeline = [];
  pipeline.push({
    "$project": {
      "staff": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    "$unwind": {
      "path": "$location",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$match": match
  }, {
    "$project": {
      "staff._id": "$staff._id",
      "staff.location_setting_ids": "$staff.location_setting_ids",
      "location.name": "$location.name",
      "location._id": "$location._id",
      "locationsetting._id": "$locationsetting._id"
    }
  });
  console.log('\n get_staff_locationName_bht_agg : ', JSON.stringify(pipeline));
  return pipeline;
};
let get_staff_locationName_bhf_agg = staff_id => {
  let match = {
    $and: [{
      "staff._id": {
        $in: staff_id
      }
    }, {
      "locationsetting.active": true
    }]
  };
  let pipeline = [];
  pipeline.push({
    "$project": {
      "staff": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$lookup": {
      "localField": "timings.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    "$unwind": {
      "path": "$location",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$match": match
  }, {
    "$project": {
      "staff._id": "$staff._id",
      "staff.location_setting_ids": "$staff.location_setting_ids",
      "location.name": "$location.name",
      "location._id": "$location._id",
      "locationsetting._id": "$locationsetting._id"
    }
  });
  console.log('\n get_staff_locationName_bhf_agg : ', JSON.stringify(pipeline));
  return pipeline;
};
let get_event_locationName_bht_agg = event_ids => {
  let match = {
    $and: [{
      "events._id": {
        $in: event_ids
      }
    }, {
      "locationsetting.active": true
    }]
  };
  let pipeline = [];
  pipeline.push({
    "$project": {
      "events": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "events.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    "$unwind": {
      "path": "$location",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$match": match
  }, {
    "$project": {
      "events._id": "$events._id",
      "events.location_setting_ids": "$events.location_setting_ids",
      "location.name": "$location.name",
      "location._id": "$location._id",
      "locationsetting._id": "$locationsetting._id"
    }
  });
  console.log('\n get_event_locationName_bht_agg : ', JSON.stringify(pipeline));
  return pipeline;
};
let get_event_locationName_bhf_agg = event_ids => {
  let match = {
    $and: [{
      "events._id": {
        $in: event_ids
      }
    }, {
      "locationsetting.active": true
    }]
  };
  let pipeline = [];
  pipeline.push({
    "$project": {
      "events": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "events.timing_ids",
      "from": "timings",
      "foreignField": "_id",
      "as": "timings"
    }
  }, {
    "$lookup": {
      "localField": "timings.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    "$unwind": {
      "path": "$location",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$match": match
  }, {
    "$project": {
      "events._id": "$events._id",
      "events.location_setting_ids": "$events.location_setting_ids",
      "location.name": "$location.name",
      "location._id": "$location._id",
      "locationsetting._id": "$locationsetting._id"
    }
  });
  console.log('\n get_event_locationName_bhf_agg : ', JSON.stringify(pipeline));
  return pipeline;
};
let get_staff_event_locationName_bhf_agg = locationsett_ids => {
  //let match = {}
  //match["staff._id"] = ObjectId(staff_id)
  let match = {
    "timings._id": {
      "$in": locationsett_ids
    }
  };
  let pipeline = [];
  pipeline.push({
    "$project": {
      "timings": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "timings.location_setting_ids",
      "from": "locationsetting",
      "foreignField": "_id",
      "as": "locationsetting"
    }
  }, {
    "$unwind": {
      "path": "$locationsetting",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    "$unwind": {
      "path": "$location",
      "preserveNullAndEmptyArrays": false
    }
  }, {
    "$match": match
  }, {
    "$project": {
      "timings._id": "$timings._id",
      "timings.location_setting_ids": "$timings.location_setting_ids",
      "location.name": "$location.name",
      "location._id": "$location._id",
      "locationsetting._id": "$locationsetting._id"
    }
  });
  console.log('\n get_staff_event_locationName_bhf_agg : ', JSON.stringify(pipeline));
  return pipeline;
};
let get_locationsettings_agg = _id => {
  let match = {};
  match["locationsetting._id"] = ObjectId(_id);
  let pipeline = [];
  pipeline.push({
    "$project": {
      "locationsetting": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "locationsetting.location_id",
      "from": "location",
      "foreignField": "_id",
      "as": "location"
    }
  }, {
    "$project": {
      "locationsetting": "$locationsetting",
      "location": "$location"
    }
  }, {
    '$match': match
  });
  console.log('\n get_locationsettings_agg : ', JSON.stringify(pipeline));
  return pipeline;
};
let get_staffdetails_agg = staff_id => {
  let match = {};
  match["staff._id"] = ObjectId(staff_id);
  let pipeline = [];
  pipeline.push({
    "$project": {
      "staff": "$$ROOT"
    }
  }, {
    "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
    }
  }, {
    "$lookup": {
      "localField": "staffdetails.events_ids",
      "from": "events",
      "foreignField": "_id",
      "as": "events"
    }
  }, {
    "$match": match
  });
  console.log('\n get_staffdetails_agg : ', JSON.stringify(pipeline));
  return pipeline;
};
;// CONCATENATED MODULE: external "webpack"
const external_webpack_namespaceObject = require("webpack");
;// CONCATENATED MODULE: external "moment"
const external_moment_namespaceObject = require("moment");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_namespaceObject);
;// CONCATENATED MODULE: ./resolvers/events.js



/* harmony default export */ const resolvers_events = ({
  Query: {
    getEvents: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id),
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id),
          staff: (0,external_bson_namespaceObject.ObjectId)(args.staff_ids)
        };
        console.log(findObj);
        let even = await context.models.Events.find(findObj);
        return even;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getEventsDetailByStaff: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id),
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id),
          staff: (0,external_bson_namespaceObject.ObjectId)(args.staff_ids)
        };
        let staffEvent = await context.models.Staff.find(findObj);
        console.log(`\n staffEvent Count : `, staffEvent.length);
        let result_events = await getServicesbyStaffId(args, context);
        const events_result = await context.models.Events.find({
          _id: result_events
        });
        return events_result;
      } catch (error) {
        console.error("Error getEventsDetailByStaff : ", error);
        throw new Error(error);
      }
    },
    getStaffToTransfer: async (parent, args, context, info) => {
      try {
        let result_staffs = [];
        let book_rec = await context.models.Booking.find({
          _id: (0,external_bson_namespaceObject.ObjectId)(args.booking_id)
        }).lean();
        args.staff_id = book_rec[0].staff_id;
        args.event_id = book_rec[0].event_id;
        let bookingDetails = [];
        let bookingExist = false;
        const bookingData = external_moment_default()(new Date(book_rec[0].appointment_start_time), "YYYY-MM-DDTHH:mm:ss").toISOString();
        let result = await getStaffbyServiceId(args, context);
        result_staffs.push(...result);
        console.log('result_staffs : ', result_staffs); // Remove source staff from result staffs

        const indx = result_staffs.indexOf(args.staff_id.toString());

        if (indx > -1) {
          result_staffs.splice(indx, 1); // 2nd parameter means remove one item only
        }

        let search_staffs = result_staffs.map(x => (0,external_bson_namespaceObject.ObjectId)(x));
        console.log('search_staffs : ', search_staffs);
        console.log('result_staffs : ', result_staffs); //
        //check each avilable staff have any bookins on same timings

        bookingDetails = await context.models.Booking.find({
          staff_id: {
            $in: search_staffs
          },
          Is_cancelled: false,
          deleted: false,
          appointment_start_time: new Date(bookingData)
        }); //

        console.log('bookingData : ', bookingData);
        bookingDetails.forEach(b_elem => {
          console.log(`appointment start time :  ${b_elem.appointment_start_time} - ${b_elem.staff_id.toString()}`);
          const indx = result_staffs.indexOf(b_elem.staff_id.toString());

          if (indx > -1) {
            result_staffs.splice(indx, 1); // 2nd parameter means remove one item only
          }
        });

        if (result_staffs.length == 0) {
          console.error("Matched staff is not avilable for transer");
          throw new Error("Matched staff is not avilable for transer");
        }

        const staff_result = await context.models.Staff.find({
          _id: result_staffs
        });
        return staff_result;
      } catch (error) {
        console.error("Error getStaffToTransfer : ", error);
        throw new Error(error);
      }
    },
    getEnabledDate: async (parent, args, context, info) => {
      try {
        let timings_day = [];
        let event_loc_ar = [];
        let staff_loc_ar = await getStaffLocations(args, context);

        if (staff_loc_ar.length > 0) {
          if (staff_loc_ar[0].locationsetting.length > 0) {
            if (staff_loc_ar[0].locationsetting[0].events_id.length > 0) {
              let event_ids = [];
              staff_loc_ar[0].locationsetting[0].events_id.forEach(el => {
                event_ids.push(el.toString());
              });
              console.log("getEnabledDate events_id Before loop : ", event_ids);

              if (event_ids.includes(args.event_id)) {
                let events = await getEventLocations(args, context); //getEventLocation group by timings

                console.log("events : ", events);
                event_loc_ar.push({
                  event_id: args.event_id,
                  data: events[0].locationsetting
                });
              }

              console.log(`getEnabledDate : , ${event_loc_ar}`);
            }
          }
        }

        timings_day = await getLocataion_workDay(args, context, staff_loc_ar[0].locationsetting, event_loc_ar, 'date_get');
        args.timings_day = timings_day; //console.log('rsp : '. rsp)

        let matched_loc = [];
        let result = await avail_date_filter(args, context);
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    getLocationByServiceId: async (parent, args, context, info) => {
      try {
        let locationEvents = await context.models.Events.find({
          workspace_id: args.workspace_id,
          site_id: args.site_id,
          _id: args.event_id
        });
        return locationEvents;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  //Query End
  Events: {
    timing_ids: async (evens, args, context) => {
      let resultEvent = await evens.populate('timing_ids').execPopulate();
      return resultEvent.timing_ids;
    },
    workspace_id: async (evens, args, context) => {
      let resultEvent = await evens.populate('workspace_id').execPopulate();
      return resultEvent.workspace_id;
    },
    site_id: async (evens, args, context) => {
      let resultEvent = await evens.populate('site_id').execPopulate();
      return resultEvent.site_id;
    },
    staff: async (evens, args, context) => {
      let resultEvent = await evens.populate('staff').execPopulate();
      return resultEvent.staff;
    },
    location_setting_ids: async (evens, args, context) => {
      let resultEvent = await evens.populate('location_setting_ids').execPopulate();
      return resultEvent.location_setting_ids;
    },
    add_on_ids: async (evens, args, context) => {
      let resultEvent = await evens.populate('add_on_ids').execPopulate();
      return resultEvent.add_on_ids;
    },
    form_id: async (evens, args, context) => {
      let resultEvent = await evens.populate('form_id').execPopulate();
      return resultEvent.form_id;
    }
  }
});
/*

      timing_ids: async (evens, args, context) => {
          let resultEvent = await evens.populate('timing_ids').execPopulate();
          return resultEvent.timing_ids
      },
      workspace_id: async (evens, args, context) => {
          let resultEvent = await evens.populate('workspace_id').execPopulate();
          return resultEvent.workspace_id
      },
      site_id: async (evens, args, context) => {
          let resultEvent = await evens.populate('site_id').execPopulate();
          return resultEvent.site_id
      },
      staff: async (evens, args, context) => {
        let resultEvent = await evens.populate('staff').execPopulate();
        return resultEvent.staff
      },
      location_setting_ids: async (evens, args, context) => {
        let resultEvent = await evens.populate('location_setting_ids').execPopulate();
        return resultEvent.location_setting_ids
    },
    add_on_ids: async (evens, args, context) => {
      let resultEvent = await evens.populate('add_on_ids').execPopulate();
      return resultEvent.add_on_ids
  }
  */

/*
function testDate(){
  var format = "HH:mm:ss";
var hourFormat = "HH:mm";
var maxStartHour = moment("07:00:00", format);
var minEndHour = moment("19:00:00", format);
console.log('maxStartHour : ', maxStartHour)
var arrayOfWorkDates = [

  {
    start: "2018-02-24T14:00:00",
    end: "2018-02-24T15:00:00"
  },
  {
    start: "2018-02-24T05:00:00",
    end: "2018-02-24T06:00:00"
  },
  {
    start: "2018-02-24T20:00:00",
    end: "2018-02-24T21:00:00"
  }
];


var filteredWokrHours = arrayOfWorkDates.filter(function(el) {

  var start = moment(el.start).format(hourFormat);
  var end = moment(el.end).format(hourFormat);

  var checkHourStart = moment(start, format);
  var checkHourEnd = moment(end, format);

  return checkHourStart.isBefore(maxStartHour) || checkHourEnd.isAfter(minEndHour);
});

if(filteredWokrHours.length > 0){console.log("success: " + filteredWokrHours.length);}else{console.log("fail");}
}*/
;// CONCATENATED MODULE: ./helpers/slotcreation.js






const getting_slots = async (fromObj, details, models, result, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, selected_date, dateFormat, pre_booking_day) => {
  try {
    let available_date = [];
    let disable_date = []; //if (details.business_timings == false || details.business_timings == true) {

    let bookStartDate = external_moment_timezone_default()(bookingStartDate, "YYYY-MM-DD HH:mm:ss");

    while (bookStartDate <= maxDate) {
      if (bookStartDate.isoWeekday() == 6 || bookStartDate.isoWeekday() == 7) {
        disable_date.push(new (external_moment_timezone_default())(bookStartDate).format("YYYY-MM-DD"));
      } else {
        available_date.push(new (external_moment_timezone_default())(bookStartDate).format("YYYY-MM-DD"));
      }

      bookStartDate.add(1, "days");
    }

    let locationAvailable = [];
    let timings_loop = [];

    if (details.timings.timings) {
      timings_loop = details.timings.timings;
    } else if (details.timings.timings == undefined && details.timings.length > 0) {
      timings_loop = details.timings[0].timings;
    }

    let is_matched = false;

    if (details.timings) {
      //details.timings.forEach((elem) => {
      timings_loop.forEach(e1 => {
        let selectedDayName = external_moment_timezone_default()(new Date(selected_date), "YYYY-MM-DDTHH:mm:ss").format("dddd");
        let timingsStartTimeDay = e1.work_day_name; //moment(new Date(start_time), "YYYY-MM-DDTHH:mm:ss").format('dddd')

        console.log(`Timings Day - ${timingsStartTimeDay}`);

        if (selectedDayName == timingsStartTimeDay) {
          let slotArguments = {
            result: {},
            _id: details._id,
            start_time: e1.start_time,
            end_time: e1.end_time,
            clientSlot: clientSlot,
            selectedDate: selectedDate,
            displaySettings: displaySettings,
            dateFormat: dateFormat
          };
          let tresult = slots(slotArguments);
          result.availableTimes.push(...tresult.availableTimes); //result.availableTimes = [result.availableTimes, ...tresult.availableTimes]
          //console.log('result.availableTimes : ', JSON.stringify(result.availableTimes))

          is_matched = true;
          console.log("Match");
        } else {
          console.log("NOT Match");
        }
      });
    }

    if (is_matched == false) {
      console.log(`${fromObj} not available on the selected day`);
      throw new Error(`${fromObj} not available on the selected day`);
    }

    result.start_date = minDate.format("YYYY-MM-DD");
    result.end_date = maxDate.format("YYYY-MM-DD");
    result.pre_booking_day = pre_booking_day;
    result.available_date = available_date;
    result.disable_date = disable_date;
    result.selectedDate = selectedDate.format("YYYY-MM-DD");
    result.displaySettings = displaySettings;
    return result; //}
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}; //result, _id, start_time, end_time, clientSlot, selectedDate, displaySettings, dateFormat

let slots = params => {
  try {
    let {
      result,
      _id,
      start_time,
      end_time,
      clientSlot,
      selectedDate,
      displaySettings,
      dateFormat
    } = params;
    let availTimes = [];
    let dayStartTime = "";
    let dayEndTime = "";
    let availLocations = [];
    let minutesFormat = "YYYY-MM-DDTHH:mm";
    let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
    dayStartTime = external_moment_timezone_default()(new Date(start_time), secondsFormat);
    dayEndTime = external_moment_timezone_default()(new Date(end_time), secondsFormat);
    const startSeconds = external_moment_timezone_default().duration(dayStartTime).asSeconds();
    const endSeconds = external_moment_timezone_default().duration(dayEndTime).asSeconds();
    const timingsStartTime = external_moment_timezone_default()(new Date(start_time), secondsFormat);
    const timingsEndTime = external_moment_timezone_default()(new Date(end_time), secondsFormat);
    const startDateStr = selectedDate.year() + "-" + (selectedDate.month() + 1) + "-" + selectedDate.date() + "T" + timingsStartTime.format("HH") + ":" + timingsStartTime.format("mm") + ":" + timingsStartTime.format("sss");
    const endDateStr = selectedDate.year() + "-" + (selectedDate.month() + 1) + "-" + selectedDate.date() + "T" + timingsEndTime.format("HH") + ":" + timingsEndTime.format("mm") + ":" + timingsEndTime.format("sss");
    const selectedStartTime = external_moment_timezone_default()(startDateStr, secondsFormat).format(secondsFormat);
    const selectedEndTime = external_moment_timezone_default()(endDateStr, secondsFormat).format(secondsFormat);
    let bookingStartTime = external_moment_timezone_default()(selectedStartTime);
    let bookingEndTime = external_moment_timezone_default()(selectedEndTime);
    let slotCount = 0;
    let slotStartTime = "";
    let slotEndTime = "";

    while (bookingStartTime < bookingEndTime) {
      slotCount++; //bookingStartTime = moment.tz(bookingStartTime, "Asia/Kolkata");
      //slotStartTime = moment.tz(bookingStartTime, "Asia/Kolkata").format();

      displaySettings == "12" ? slotStartTime = external_moment_timezone_default()(bookingStartTime, [secondsFormat]).format(secondsFormat) : slotStartTime = bookingStartTime.format(secondsFormat);
      bookingStartTime.add(clientSlot, "minutes"); //slotEndTime = moment.tz(bookingStartTime, "Asia/Kolkata").format();

      displaySettings == "12" ? slotEndTime = external_moment_timezone_default()(bookingStartTime, [secondsFormat]).format(secondsFormat) : slotEndTime = timingsStartTime.format(secondsFormat); //.format("hh:mm A")
      //console.log(`${slotStartTime} - ${slotEndTime}`)

      let current_time = external_moment_timezone_default()(new Date(), secondsFormat); //const cur_time_seconds = moment.duration(current_time).asSeconds()

      let _slotStartTime = external_moment_timezone_default()(new Date(slotStartTime), secondsFormat); //const slot_start_time_seconds = moment.duration(_slotStartTime).asSeconds()


      if (_slotStartTime < current_time) {
        availTimes.push({
          _id: _id,
          slotStartTime: slotStartTime,
          slotEndTime: slotEndTime,
          isBooking: true,
          slot: slotCount
        });
      } else {
        availTimes.push({
          _id: _id,
          slotStartTime: slotStartTime,
          slotEndTime: slotEndTime,
          isBooking: false,
          slot: slotCount
        });
      }
    } //availTimes = availTimes.splice(availTimes.lengh,1)


    result.locationAvailable = availLocations;
    result.availableTimes = availTimes;
    result.dayStartTime = dayStartTime.format(dateFormat);
    result.dayEndTime = dayEndTime.format(dateFormat);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

let compareTwoSlots = (list_one, list_two) => {
  try {
    let list_availTimes = [];
    let eventResultCount = 1;
    let events_ar = list_two[0].availableTimes;
    let staff_ar = list_one[0].availableTimes;
    console.log("Event AvailableTimes Count : ", events_ar.length);
    console.log("Staff AvailableTimes Count : ", staff_ar.length);
    let matched_slots = [];

    for (let q = 0; q < staff_ar.length; q++) {
      let s_start;
      let s_start_sec;
      let e_start;
      let e_start_sec;
      let e_end;
      let e_end_sec;
      let i = 0;
      let j = 0;
      i++;
      s_start = external_moment_timezone_default()(new Date(staff_ar[q].slotStartTime), "YYYY-MM-DDTHH:mm:ss");
      s_start_sec = external_moment_timezone_default().duration(s_start).asSeconds();
      j++;

      for (let l = 0; l < events_ar.length; l++) {
        e_start = external_moment_timezone_default()(new Date(events_ar[l].slotStartTime), "YYYY-MM-DDTHH:mm:ss");
        e_start_sec = external_moment_timezone_default().duration(e_start).asSeconds();
        e_end = external_moment_timezone_default()(new Date(events_ar[l].slotEndTime), "YYYY-MM-DDTHH:mm:ss");
        e_end_sec = external_moment_timezone_default().duration(e_end).asSeconds();
        let e_end_secTo_time = external_moment_timezone_default()(e_end_sec, "YYYY-MM-DDTHH:mm:ss");

        if (s_start >= e_start && s_start < e_end) {
          matched_slots.push(staff_ar[q]);
        }
      }

      eventResultCount++;
    }

    let matched_staff = []; //console.log("Matched Staff slots : ", matched_slots);
    // staff_ar = staff_ar.filter(function(st) {
    //   return matched_slots.some(
    //     function(ms) {
    //     return st.slot === ms;
    //   });
    // })

    list_availTimes = matched_slots;
    return list_availTimes;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let checkBooking = async (list_one, select_date, models, args_staff_ids, args_event_id) => {
  try {
    let selectedDate = external_moment_timezone_default()(new Date(select_date), "YYYY-MM-DDTHH:mm:ss").toISOString(); //moment.utc('2021-09-29T12:00:14.000+00:00') moment(new Date ('2021-09-29T12:00:00.000+00:00'), "YYYY-MM-DDTHH:mm:sss").toUTCString();

    let selectedDatePlus = external_moment_timezone_default()(new Date(select_date), "YYYY-MM-DDTHH:mm:ss").add(1, "days").toISOString();
    let findObj = {
      staff_id: (0,external_bson_namespaceObject.ObjectId)(args_staff_ids),
      event_id: (0,external_bson_namespaceObject.ObjectId)(args_event_id[0]),
      appointment_start_time: {
        $gte: new Date(selectedDate),
        $lte: new Date(selectedDatePlus)
      }
    }; //Is_cancelled:false, deleted:false,

    console.log(`booking find obj : ${JSON.stringify(findObj)}`);
    let bookingDetails = await models.Booking.find(findObj).lean(); //appointment_start_time: moment.utc('2021-10-29T01:00:00.000+00:00')  //site_id: args_site_id, workspace_ids: args_workspace_id,
    //Staff

    let list_availTimes = [];
    let staff_ar = list_one.availableTimes;
    console.log("staff_ar.length  : ", staff_ar.length);

    if (bookingDetails.length > 0) {
      for (let j = 0; j < bookingDetails.length; j++) {
        let du_result = await duration_calc(bookingDetails[j].event_id, models);
        let {
          buffer_after_min,
          buffer_before_min,
          duration_hours,
          duration_minutes
        } = du_result;
        let du_hours = duration_hours =  false ? 0 : duration_hours;
        let du_miniutes = buffer_after_min =  false ? 0 : buffer_after_min + (buffer_before_min =  false ? 0 : buffer_before_min) + (duration_minutes =  false ? 0 : duration_minutes);
        staff_ar = await is_bookingExist(staff_ar, bookingDetails[j], models, du_hours, du_miniutes, "slot");
      }
    } else {
      console.log("Booking Not available  : ", bookingDetails);
    } //   for (let q = 0; q < staff_ar.length; q++) {
    //     let s_start = moment(new Date(staff_ar[q].slotStartTime))
    //    let s_end = moment(new Date(staff_ar[q].slotEndTime))
    //     let s_start_sec = moment.duration(s_start).asSeconds()
    //     let s_end_sec = moment.duration(s_end).asSeconds()
    //     //Booking
    //     //bookingDetails.forEach((e1) => {
    //     for (let l = 0; l < bookingDetails.length; l++) {
    //       let dayStartTime = '';
    //       let dayEndTime = '';
    //       dayStartTime = moment(new Date(bookingDetails[l].appointment_start_time), "YYYY-MM-DDTHH:mm:ss") //moment.utc(bookingDetails[l].appointment_start_time).format()
    //       const b_start_sec = moment.duration(dayStartTime).asSeconds()
    //       const timingsStartTime = moment(new Date(bookingDetails[l].appointment_start_time), "YYYY-MM-DDTHH:mm:ss")
    //       if (b_start_sec == s_start_sec && b_start_sec <= s_end_sec) {
    //         staff_ar[q].isBooking = true
    //         const tindex = bookingDetails.map(e => e.appointment_start_time).indexOf(bookingDetails[l].appointment_start_time);
    //         bookingDetails.splice(tindex, 1)
    //         break;
    //       } else {
    //         //staff_ar[q].isBooking = false
    //       }
    //     }
    //   }


    return staff_ar;
  } catch (error) {
    console.error("Error : ", error);
    throw new Error(error);
  }
};
function result(start_date, end_date, pre_booking_day, available_date, disable_date, selectedDate, availableTimes, locationAvailable, dayStartTime, dayEndTime) {
  this.start_date = start_date;
  this.end_date = end_date;
  this.pre_booking_day = pre_booking_day;
  this.available_date = available_date;
  this.disable_date = disable_date;
  this.selectedDate = selectedDate;
  this.availableTimes = availableTimes;
  this.locationAvailable = locationAvailable;
  this.dayStartTime = dayStartTime;
  this.dayEndTime = dayEndTime;
}
let removeByAttr = function (arr, attr, value) {
  try {
    var i = arr.length;

    while (i--) {
      if (arr[i] && arr[i].hasOwnProperty(attr) && arguments.length > 2 && arr[i][attr] == value) {
        arr.splice(i, 1);
      }
    }

    return arr;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

function recur_ar(staff_ar, matched_slots) {
  //staff_ar.forEach((e)=>{
  if (matched_slots.includes(staff_ar[0].slot)) {
    console.log("Slot match  : ", staff_ar[0].slot);
    staff_ar = removeByAttr(staff_ar, "slot", staff_ar[0].slot); //matched_slots = arrayRemove(matched_slots, staff_ar[0].slot);
  } else {
    console.log("Slot not match  : ", staff_ar[0].slot); //staff_ar = removeByAttr(staff_ar, "slot", staff_ar[0].slot)
  } //})


  if (matched_slots.length == 0) {
    return staff_ar;
  }

  recur_ar(staff_ar, matched_slots);
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

let date_check = async (args, context) => {
  try {
    let displaySettings = "12";
    const secondsFormat = "YYYY-MM-DD HH:mm:ss";
    const dateFormat = "YYYY-MM-DD";
    let selectedDate = external_moment_timezone_default()(args.date, dateFormat);
    let Setting = await context.models.Setting.find({}).lean(); //await context.models.Setting.find({})

    const pre_booking_day = Setting[0].advance_Booking_Period;
    const clientSlot = Setting[0].client_time_slot;
    let minDate = external_moment_timezone_default()(new Date(), secondsFormat);
    let cr_date = external_moment_timezone_default()(new Date()).startOf("day");
    let maxDate = external_moment_timezone_default()(new Date(), secondsFormat).add(pre_booking_day - 1, "days");

    if (selectedDate < cr_date) {
      throw new Error("Selected date should be greater than current date");
    }

    let available_date = [];
    let disable_date = [];
    let bookStartDate = external_moment_timezone_default()(minDate, secondsFormat);

    while (bookStartDate <= maxDate) {
      if (bookStartDate.isoWeekday() == 6 || bookStartDate.isoWeekday() == 7) {
        disable_date.push(new (external_moment_timezone_default())(bookStartDate).format(dateFormat));
      } else {
        available_date.push(new (external_moment_timezone_default())(bookStartDate).format(dateFormat));
      }

      bookStartDate.add(1, "days");
    }

    let _resp = {
      displaySettings: displaySettings,
      selectedDate: selectedDate.format(dateFormat),
      start_date: minDate.format(dateFormat),
      end_date: maxDate.format(dateFormat),
      pre_booking_day: pre_booking_day,
      clientSlot: clientSlot,
      available_date: available_date,
      disable_date: disable_date
    };
    console.log("_resp : ", _resp);
    return _resp;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let locations_arr = loc_ar => {
  try {
    let location_setting = [],
        locations = [];
    location_setting = loc_ar[0].locationsetting;
    locations = loc_ar[0].location_type;
    let loc = [];
    location_setting.forEach(elem => {
      let ls_value = { ...elem
      };
      let rs = {
        locationsetting_id: ls_value.locationsetting_id,
        appintegration_id: ls_value.appintegration_id,
        is_installed: ls_value.is_installed ? ls_value.is_installed[0] : ls_value.is_installed,
        app_name: ls_value.app_name ? ls_value.app_name[0] : ls_value.app_name,
        location_id: ls_value.location_id ? ls_value.location_id[0] : ls_value.location_id,
        location_type: ls_value.location_type ? ls_value.location_type[0] : ls_value.location_type,
        location_name: ls_value.location_name ? ls_value.location_name[0] : ls_value.location_name,
        location_app_integration_need: ls_value.location_app_integration_need ? ls_value.location_app_integration_need[0] : ls_value.location_app_integration_need
      };
      loc.push(rs);
    });
    return loc;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let getAvailability = async (args, context) => {
  try {
    let displaySettings = "12";
    let minutesFormat = "HH:mm";
    const dateFormat = "YYYY-MM-DD HH:mm:ss";
    let selectedDate = external_moment_timezone_default()(args.date, "YYYY-MM-DD");
    console.log(`selectedDate.isValid() : ${selectedDate.isValid()} : ${selectedDate}`);
    let settings = await context.models.Setting.find({});
    const pre_booking_day = settings[0].advance_Booking_Period.value;
    const clientSlot = settings[0].client_time_slot;
    let minDate = external_moment_timezone_default()(new Date(), dateFormat);
    let cr_date = external_moment_timezone_default()(new Date()).startOf("day");
    let bookingStartDate = external_moment_timezone_default()(new Date(), dateFormat);
    let maxDate = external_moment_timezone_default()(new Date(), dateFormat).add(pre_booking_day - 1, "days");

    if (selectedDate < cr_date) {
      throw new Error("Selected date should be greater than current date");
    }

    console.log("minDate : ", minDate.format(dateFormat));
    console.log("maxDate : ", maxDate.format(dateFormat));
    let staffdetail_ag_rs;
    let staffDetail_ar = await context.models.Staff.aggregate(get_staffdetail_agg(args.staff_ids, args.workspace_id, args.site_id));
    let staffDetails = staffDetail_ar[0].staffDetails[0];

    if (staffDetails.business_timings) {
      let staff_pipeline = aggregate_bht(args.staff_ids, "staff", true);
      staffdetail_ag_rs = await context.models.Staff.aggregate(staff_pipeline);
    } else {
      let staff_pipeline = aggregate_bhf(args.staff_ids, "staff", false);
      staffdetail_ag_rs = await context.models.Staff.aggregate(staff_pipeline);
      console.log("staffdetail_ag_rs : ", staffdetail_ag_rs.length);
    }

    if (staffdetail_ag_rs.length == 0) {
      console.error("Staff is empty : ", error);
      throw new Error("Staff is empty");
    }

    let newStaffs = null;
    let staffList = [];
    let staffResult = [];

    if (staffdetail_ag_rs && staffdetail_ag_rs.length > 0) {
      for (let j = 0; j < staffdetail_ag_rs.length; j++) {
        staffdetail_ag_rs[j].locationsetting_id = staffdetail_ag_rs[j].locationsetting_id;
        staffdetail_ag_rs[j].appintegration_id = staffdetail_ag_rs[j].appintegration_id;
        staffdetail_ag_rs[j].is_installed = staffdetail_ag_rs[j].is_installed ? staffdetail_ag_rs[j].is_installed[0] : [];
        staffdetail_ag_rs[j].app_name = staffdetail_ag_rs[j].app_name ? staffdetail_ag_rs[j].app_name[0] : [];
        staffdetail_ag_rs[j].location_name = staffdetail_ag_rs[j].location_name ? staffdetail_ag_rs[j].location_name[0] : [];
        staffdetail_ag_rs[j].location_type = staffdetail_ag_rs[j].location_type ? staffdetail_ag_rs[j].location_type[0] : [];
        staffdetail_ag_rs[j].location_app_integration_need = staffdetail_ag_rs[j].location_app_integration_need ? staffdetail_ag_rs[j].location_app_integration_need[0] : [];
      }

      let k = staffdetail_ag_rs.length;
      console.log("staffdetail_ag_rs  count : ", k);

      while (k--) {
        //for (let k = 0; k < staffdetail_ag_rs.length; k++) {
        let newRes = new result("", "", 0, [], [], "", [], [], "", "");
        let location_flag = false; //staffdetail_ag_rs[k].location_name.forEach((stf)=>{

        args.locationName.forEach(loc => {
          if (loc == staffdetail_ag_rs[k].location_name) {
            location_flag = true;
          }
        }); //})

        if (location_flag) {
          newStaffs = await getting_slots("Staff", staffdetail_ag_rs[k], context, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day);
          newStaffs ? staffResult.push(newStaffs) : 0;
        } else {
          //staffdetail_ag_rs.splice(staffdetail_ag_rs.indexOf(staffdetail_ag_rs[k]._id),1)
          staffdetail_ag_rs = removeByAttr(staffdetail_ag_rs, "location_name", staffdetail_ag_rs[k].location_name.toString());
          console.error("location_flag not match "); //throw new Error ("Location Name  not match with staff location ")
        } //}

      }
    }

    if (staffdetail_ag_rs.length == 0) {
      console.error("Staff location does not match with selected location.");
      throw new Error("Staff location does not match with selected location.");
    }

    let newEvents = null;
    let eventList = [];
    let eventResult = [];
    let events_ag_rs = [];
    let events = [];

    for (let q = 0; q < args.event.length; q++) {
      events = await context.models.Events.find({
        _id: (0,external_bson_namespaceObject.ObjectId)(args.event[q])
      });

      if (events.length == 0) {
        console.error("Event id is not available");
        throw new Error("Event id is not available");
      }

      if (events[0].business_timings) {
        let event_pipeline = aggregate_bht(args.event[0], "event");
        events_ag_rs = await context.models.Events.aggregate(event_pipeline);
        console.log("events_ag_rs BHT : ", events_ag_rs.length);
      } else {
        let event_pipeline = aggregate_bhf(args.event[0], "event");
        events_ag_rs = await context.models.Events.aggregate(event_pipeline);
        console.log("events_ag_rs BHF : ", events_ag_rs.length);
      }
    }

    if (events_ag_rs.length == 0) {
      console.error("Event is empty");
      throw new Error("Event is empty");
    }

    if (events_ag_rs && events_ag_rs.length > 0) {
      for (let j = 0; j < events_ag_rs.length; j++) {
        events_ag_rs[j].locationsetting_id = events_ag_rs[j].locationsetting_id;
        events_ag_rs[j].appintegration_id = events_ag_rs[j].appintegration_id;
        events_ag_rs[j].is_installed = events_ag_rs[j].is_installed ? events_ag_rs[j].is_installed[0] : [];
        events_ag_rs[j].app_name = events_ag_rs[j].app_name ? events_ag_rs[j].app_name[0] : [];
        events_ag_rs[j].location_name = events_ag_rs[j].location_name ? events_ag_rs[j].location_name[0] : [];
        events_ag_rs[j].location_type = events_ag_rs[j].location_type ? events_ag_rs[j].location_type[0] : [];
        events_ag_rs[j].location_app_integration_need = events_ag_rs[j].location_app_integration_need ? events_ag_rs[j].location_app_integration_need[0] : [];
      }

      let k = events_ag_rs.length;
      console.log("events_ag_rs  count : ", k);

      while (k--) {
        //for (let k = 0; k < events_ag_rs.length; k++) {
        let newRes = new result("", "", 0, [], [], "", [], [], "", "");
        let location_flag = false; //events_ag_rs[k].location_name.forEach((stf)=>{

        args.locationName.forEach(loc => {
          console.log(`Events ${loc._id}location : ${events_ag_rs[k].location_name}`);

          if (loc == events_ag_rs[k].location_name) {
            location_flag = true;
          }
        }); //})

        if (location_flag) {
          newEvents = await getting_slots("Event", events_ag_rs[k], context, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day);
          newEvents ? eventResult.push(newEvents) : 0;
        } else {
          //events_ag_rs.splice(events_ag_rs.indexOf(events_ag_rs[k]._id),1)
          events_ag_rs = removeByAttr(events_ag_rs, "location_name", events_ag_rs[k].location_name.toString());
          console.error("location_flag not match "); //throw new Error ("Location Name  not match with staff location ")
        } //}

      }
    }

    if (events_ag_rs.length == 0) {
      console.error("Event location does not match with selected location.");
      throw new Error("Event location does not match with selected location.");
    }

    let resp_result = {};
    staffResult.availableTimes = await checkBooking(staffResult[0], args.date, context.models, args.staff_ids, args.event);
    let events_availableTimes = compareTwoSlots(staffResult, eventResult);
    resp_result.start_date = eventResult[0].start_date;
    resp_result.end_date = eventResult[0].end_date;
    resp_result.pre_booking_day = eventResult[0].pre_booking_day;
    resp_result.available_date = eventResult[0].available_date;
    resp_result.disable_date = eventResult[0].disable_date;
    resp_result.selectedDate = eventResult[0].selectedDate;
    resp_result.displaySettings = eventResult[0].displaySettings;
    resp_result.locationAvailable = args.location;
    resp_result.availableTimes = [];

    if (events_availableTimes.length > 0) {
      events_availableTimes.forEach(e => {
        resp_result.availableTimes.push(e);
      });
    }

    return resp_result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let is_bookingExist = async (staff_ar, bookingDetails, models, du_hours, du_miniutes, callfrom) => {
  try {
    //Booking Hours Calc
    let dayStartTime = "";
    let dayEndHours = "";
    let dayEndTime = "";
    dayStartTime = external_moment_timezone_default()(new Date(bookingDetails.appointment_start_time), "YYYY-MM-DDTHH:mm:ss"); //moment.utc(bookingDetails.appointment_start_time).format()

    dayEndHours = external_moment_timezone_default()(dayStartTime, "YYYY-MM-DDTHH:mm:ss").add(du_hours, "hours");
    console.log(`Booking Start Time - ${dayStartTime} : After Hours - ${dayEndHours}`);
    dayEndTime = external_moment_timezone_default()(dayEndHours, "YYYY-MM-DDTHH:mm:ss").add(du_miniutes, "minutes");
    console.log(`Booking Start Time - ${dayStartTime} : After Minutes - ${dayEndTime}`); //let resultduration = await duration_calc(bookingDetails.event_id, models);
    // const b_start_sec = moment.duration(dayStartTime).asSeconds()
    // const b_end_sec = moment.duration(dayEndTime).asSeconds()

    staff_ar = staff_ar.map(elem => {
      let s_start = external_moment_timezone_default()(elem.slotStartTime);
      let s_end = external_moment_timezone_default()(elem.slotEndTime);

      if (s_start >= dayStartTime && s_start <= dayEndTime) {
        if (callfrom == "slot") {
          console.log(`Booking Matched with Slot : ${elem.slotStartTime}`);
          elem.isBooking = true; // const tindex = bookingDetails.map(e => e.appointment_start_time).indexOf(bookingDetails[l].appointment_start_time);
          // bookingDetails.splice(tindex, 1)
          //break;
        } else {
          console.log(`Booking Matched with Reschedule : ${elem.slotStartTime}`);
          elem.isBooking = false;
        }
      } else {//elem.isBooking = false
      }

      return elem;
    });
    return staff_ar;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let duration_calc = async (event_id, models) => {
  try {
    let day_start_end = "";
    let event_data = await models.Events.find({
      _id: event_id
    }).lean();
    return event_data[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let getStaffLocations = async (args, context) => {
  try {
    let staff_loc_ar = [];
    let business_time = await context.models.Staff.aggregate(bushiness_timings_agg(args.staff_id, args.workspace_id, args.site_id, "staff"));

    if (business_time[0].business_hours) {
      staff_loc_ar = await context.models.Staff.aggregate(get_staff_dd_locationsettings_agg_bht(args.staff_id, args.workspace_id, args.site_id));
    } else {
      staff_loc_ar = await context.models.Staff.aggregate(get_staff_dd_locationsettings_agg_bhf(args.staff_id, args.workspace_id, args.site_id));
    }

    if (staff_loc_ar.length < 1) {
      throw new Error("Location setting not available in staff");
    }

    console.log(`\n getStaffLocations - id : ${args.staff_id} :  , ${staff_loc_ar}`);
    return staff_loc_ar;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let getStaffLocations_loc_day = async (args, context) => {
  try {
    let staff_loc_ar = [];
    let business_time = await context.models.Staff.aggregate(bushiness_timings_agg(args.staff_id, args.workspace_id, args.site_id, "staff"));

    if (business_time[0].business_hours) {
      staff_loc_ar = await context.models.Staff.aggregate(get_staff_locationName_bht_agg([(0,external_bson_namespaceObject.ObjectId)(args.staff_id)]));
    } else {
      staff_loc_ar = await context.models.Staff.aggregate(get_staff_locationName_bhf_agg([(0,external_bson_namespaceObject.ObjectId)(args.staff_id)]));
    }

    if (staff_loc_ar.length < 1) {
      throw new Error("Location setting not available in staff");
    }

    console.log(`\n getStaffLocations_loc_day - staff id : ${args.staff_id} :  , ${staff_loc_ar}`);
    return staff_loc_ar;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let getEventLocations_loc_day = async (args, context) => {
  try {
    let event_loc_ar = [];
    let business_time = await context.models.Events.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id, args.site_id, "event"));

    if (business_time[0].business_hours) {
      event_loc_ar = await context.models.Events.aggregate(get_event_locationName_bht_agg([(0,external_bson_namespaceObject.ObjectId)(args.event_id)]));
    } else {
      event_loc_ar = await context.models.Events.aggregate(get_event_locationName_bhf_agg([(0,external_bson_namespaceObject.ObjectId)(args.event_id)]));
    }

    if (event_loc_ar.length < 1) {
      throw new Error("Location setting not available in staff");
    }

    console.log(`\n getEventLocations_loc_day - event id : ${args.event_id} :  , ${event_loc_ar}`);
    return event_loc_ar;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let getEventLocations = async (args, context) => {
  try {
    let event_loc_ar = [];
    let ev_business_time = await context.models.Events.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id, args.site_id, "event"));

    if (ev_business_time[0] == undefined) {
      throw new Error('business time is not available');
    }

    if (ev_business_time[0].business_hours) {
      event_loc_ar = await context.models.Events.aggregate(get_event_dd_locationsettings_agg_bht(args.event_id, args.workspace_id, args.site_id));
    } else {
      event_loc_ar = await context.models.Events.aggregate(get_event_dd_locationsettings_agg_bhf(args.event_id, args.workspace_id, args.site_id));
    }

    if (event_loc_ar.length < 1) {
      throw new Error("Location setting not available in event");
    }

    console.log(`\n getEventLocations - id : ${args.event_id} :  , ${event_loc_ar}`);
    return event_loc_ar;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let getServicesbyStaffId = async (args, context, check) => {
  try {
    /**/
    let staff_loc_ar = await getStaffLocations(args, context);
    let event_loc_ar = [];

    if (staff_loc_ar.length > 0) {
      if (staff_loc_ar[0].locationsetting.length > 0) {
        if (staff_loc_ar[0].locationsetting[0].events_id.length > 0) {
          let event_ids = [];
          staff_loc_ar[0].locationsetting[0].events_id.forEach(el => {
            event_ids.push(el);
          });
          console.log("events_id Before loop : ", event_ids);

          for (let i = 0; i < event_ids.length; i++) {
            let event_id = event_ids[i].toString();
            console.log("\n event id : ", event_id);
            args = { ...args,
              event_id
            };
            let events = await getEventLocations(args, context); //getEventLocation group by timings

            console.log("events : ", events);
            event_loc_ar.push({
              event_id: event_id,
              data: events[0].locationsetting
            });
            console.log(`getServicesbyStaffId ${i} : , ${event_loc_ar}`);
          }

          console.log("event_loc_ar2 : ", event_loc_ar);
        }
      }
    }

    if (event_loc_ar.length == 0) {
      console.log('Event not available for the staff');
      throw new Error('Event not available for the staff');
    }

    let matched_events = [];
    matched_events = await location_day_check(args, context, staff_loc_ar[0].locationsetting, event_loc_ar, 'get_service');
    console.log("matched_events : ", matched_events);

    if (matched_events.length == 0) {
      console.log("Staff and Event location name does not match");
      throw new Error("Staff and Event location names does not match");
    } //console.log(matched_loc)


    return matched_events;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let location_day_check = async (args, context, loc_arr_left, loc_arr_right, process_for) => {
  try {
    let matched_days = [];
    let matched_right = [];
    let matched_ids;
    let matched_arr = [];

    if (loc_arr_left.length > 0 && loc_arr_right.length > 0) {
      for (let arr_left_elem of loc_arr_left) {
        // loc_arr_right will have data and its id by getStaff/eventLocations
        for (let el of loc_arr_right) {
          let loc_obj = [];

          for (let arr_right of el.data) {
            let ev_bht = arr_right.timings.constructor.name;
            /* Match Location */

            if (ev_bht == 'Object') {
              //BHF
              if (process_for == 'get_service' || process_for == 'get_service_date') {
                for (let right_elem of loc_arr_right) {
                  args.event_id = right_elem.event_id;
                  let loc_details = await getEventLocations_loc_day(args, context);

                  for (let item of loc_details) {
                    loc_obj.push({
                      loc_name: item.location.name,
                      locset_id: item.locationsetting._id.toString(),
                      event_id: item.events._id.toString()
                    });
                  }
                }
              } else if (process_for == 'get_staff') {
                // for(let right_elem of loc_arr_right){
                //   args.staff_id = right_elem.staff_id
                // let loc_details = await getStaffLocations_loc_day(args, context)
                // //let loc_details = await context.models.Staff.aggregate(get_staff_locationName_bht_agg([ObjectId(loc_arr_right[0].staff_id) ]))
                // for(let item of loc_details) {
                //   loc_obj.push({loc_name: item.location.name, locset_id: item.locationsetting._id.toString(), staff_id:  item.staff._id.toString()})
                // }
                // }
                //arr_right.staff_id.toString()
                args.staff_id = arr_right.staff_id;
                let loc_details = await getStaffLocations_loc_day(args, context); //let loc_details = await context.models.Staff.aggregate(get_staff_locationName_bht_agg([ObjectId(loc_arr_right[0].staff_id) ]))

                for (let item of loc_details) {
                  loc_obj.push({
                    loc_name: item.location.name,
                    locset_id: item.locationsetting._id.toString(),
                    staff_id: item.staff._id.toString()
                  });
                }
              }
            } else {
              let loc_details = await context.models.Timing.aggregate(get_staff_event_locationName_bhf_agg([arr_right.timings._id]));

              for (let item of loc_details) {
                loc_obj.push({
                  loc_name: item.location.name,
                  locset_id: item.locationsetting._id
                });
              }
            } //console.log('loc_obj : ', loc_obj)


            let matc_locat = [];
            arr_left_elem.location_name.forEach(se => {
              loc_obj.forEach(le => {
                if (le.loc_name == se) {
                  matc_locat.push(le);
                  console.log(`location_day_check le : ${le.locset_id.toString()} - ${le.loc_name} - Event : ${le.event_id} - Staff :  ${le.staff_id}`); //console.log('matc_locat : ', matc_locat)

                  /* Business Hours Classification  */

                  let left_timings = [];
                  left_timings = arr_left_elem.timings.timings;
                  let right_timings = [];
                  right_timings = arr_right.timings.timings;
                  /* Business Hours Classification End */

                  /* Day Check */

                  left_timings.forEach(lft_time => {
                    right_timings.forEach(rgt_time => {
                      if (lft_time.work_day_name == rgt_time.work_day_name) {
                        //console.log(`Matched Day  ${arr_left_elem.location_name} - ${ev_elem.location_name}= Staff : ${lft_time.work_day_name} - Event :  ${rgt_time.work_day_name}`)
                        const lft_startDate = external_moment_timezone_default().duration(string_to_date(lft_time.start_time)).asSeconds();
                        const lft_endDate = external_moment_timezone_default().duration(string_to_date(lft_time.end_time)).asSeconds(); // console.log('seconds to date : ', moment(lft_startDate).format("YYYY-MM-DDTHH:mm:ss"))

                        const rgt_startDate = external_moment_timezone_default().duration(string_to_date(rgt_time.start_time)).asSeconds();
                        const ev_endDate = external_moment_timezone_default().duration(string_to_date(rgt_time.end_time)).asSeconds();

                        if (lft_startDate >= rgt_startDate && lft_startDate <= ev_endDate || rgt_startDate >= lft_startDate && rgt_startDate <= lft_endDate) {
                          if (process_for == 'get_service') {
                            let index = matched_right.findIndex(x => x._id === arr_right._id);
                            console.log(`location_day_check get_service arr_right.event_id : ${arr_right._id} `);

                            if (index == -1) {
                              matched_days.push({
                                _id: arr_right._id,
                                day: rgt_time.work_day_name
                              });
                            }
                          } else if (process_for == 'get_staff') {
                            console.log(`location_day_check get_staff arr_left_elem._id : ${le.staff_id} `);
                            let index = matched_days.findIndex(x => x._id === le.staff_id);

                            if (index == -1) {
                              matched_days.push({
                                _id: le.staff_id,
                                day: rgt_time.work_day_name
                              });
                            }
                          } else if (process_for == 'get_service_date') {
                            console.log(`location_day_check get_service_date arr_right.event_id : ${el.event_id} `);
                            let bhrscheck = arr_right.timings.constructor.name;

                            if (bhrscheck == 'Object') {
                              matched_days.push({
                                _id: el.event_id,
                                day: rgt_time.work_day_name,
                                timings_id: el.data[0].timings._id,
                                //el["timings"]["_id"],
                                loc: matc_locat,
                                loc_id: el.data[0].locationsetting_id
                              });
                            }
                          }
                        }
                      } //work day

                    }); // right timings end
                  });
                  /* left timings end */
                } //if

              }); //loc_obj
            }); //arr_left_elem

            /* Match Location End */

            if (matc_locat.length > 0) {} // loc match end 

          }

          ; // right end
        }

        ;
      }

      ; // loc_arr_right end
    } //loc_arr_left end


    if (process_for == 'get_service_date') {
      console.log('get_service_date', matched_days);
      return matched_days;
    } //if(process_for == 'get_service'){


    let events_day = groupArray("_id", "timings_day", matched_days, "day");
    matched_ids = events_day.map(ev => {
      return ev._id;
    });
    console.log("matched_ids", matched_ids); //matched_arr.push(matched_ids)
    //}  

    return matched_ids;
  } catch (error) {
    console.log('location_day_check error : ', error);
    throw new Error('location_day_check error');
  }
}; //Get Staffs for service dropdown

let getStaffbyServiceId = async (args, context, check) => {
  try {
    let event_loc_ar = await getEventLocations(args, context);
    let staff_loc_ar = [];

    if (event_loc_ar.length > 0) {
      if (event_loc_ar[0].locationsetting.length > 0) {
        if (event_loc_ar[0].locationsetting[0].staff_id.length > 0) {
          let staff_ids = [];
          event_loc_ar[0].locationsetting[0].staff_id.forEach(el => {
            staff_ids.push(el);
          });
          console.log("staff_id Before loop : ", staff_ids);

          for (let i = 0; i < staff_ids.length; i++) {
            let staff_id = staff_ids[i].toString();
            console.log("\n staff id : ", staff_id);
            args = { ...args,
              staff_id
            };
            let staff = await getStaffLocations(args, context); //getEventLocation group by timings

            console.log("staff : ", staff);
            staff_loc_ar.push({
              staff_id: staff_id,
              data: staff[0].locationsetting
            });
            console.log(`staff_loc_ar ${i} : , ${staff_loc_ar}`);
          }

          console.log("staff_loc_ar2 : ", staff_loc_ar);
        }
      }
    }

    if (staff_loc_ar.length == 0) {
      console.log('Staff not available for the Event');
      throw new Error('Staff not available for the Event');
    }

    let matched_staff = [];
    matched_staff = await location_day_check(args, context, event_loc_ar[0].locationsetting, staff_loc_ar, 'get_staff');
    console.log("matched_staff : ", matched_staff);

    if (matched_staff.length == 0) {
      console.log("Staff and Event location name does not match");
      throw new Error("Staff and Event location names does not match");
    } //console.log(matched_loc)


    return matched_staff;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let getLocataion_workDay = async (args, context, loc_arr_left, loc_arr_right, process_for) => {
  try {
    let matched_events_day = [];
    let matched_events_location = [];
    let matched_events = {};
    let matched_days = [];
    let matched_right = [];
    let matched_ids;
    let matched_arr = [];

    if (loc_arr_left.length > 0 && loc_arr_right.length > 0) {
      for (let arr_left_elem of loc_arr_left) {
        for (let el of loc_arr_right) {
          for (let arr_right of el.data) {
            /* Match Location */
            let loc_obj = []; //if(ev_bht == 'Object'){ //BHF

            if (process_for == "get_service") {
              for (let right_elem of loc_arr_right) {
                args.event_id = right_elem.event_id;
                let loc_details = await getEventLocations_loc_day(args, context);

                for (let item of loc_details) {
                  // loc_obj.push({
                  //   loc_name: item.location.name,
                  //   locset_id: item.locationsetting._id,
                  // });
                  loc_obj.push({
                    loc_name: item.location.name,
                    locset_id: item.locationsetting._id.toString(),
                    event_id: item.events._id.toString()
                  });
                }
              }
            } else if (process_for == "get_staff") {
              //arr_right.staff_id.toString()
              args.staff_id = arr_right.staff_id;
              let loc_details = await getStaffLocations_loc_day(args, context);

              for (let item of loc_details) {
                loc_obj.push({
                  loc_name: item.location.name,
                  locset_id: item.locationsetting._id.toString(),
                  staff_id: item.staff._id.toString()
                });
              }
            } else {
              for (let left_elem of loc_arr_left) {
                args.staff_id = left_elem.staff_id;
                let loc_details = await getStaffLocations_loc_day(args, context);

                for (let item of loc_details) {
                  loc_obj.push({
                    loc_name: item.location.name,
                    locset_id: item.locationsetting._id,
                    staff_id: left_elem.staff_id
                  });
                }
              }

              for (let right_elem of loc_arr_right) {
                args.event_id = right_elem.event_id;
                let loc_details = await getEventLocations_loc_day(args, context);

                for (let item of loc_details) {
                  loc_obj.push({
                    loc_name: item.location.name,
                    locset_id: item.locationsetting._id,
                    event_id: right_elem.event_id
                  });
                }
              }
            } //}
            //console.log('loc_obj : ', loc_obj)


            let event_locations = [];
            let staff_locations = [];
            loc_obj.forEach(obj => {
              if ("staff_id" in obj) {
                staff_locations.push(obj);
              } else if ("event_id" in obj) {
                event_locations.push(obj);
              }
            });
            console.log('staff_locations : ', JSON.stringify(staff_locations));
            console.log('event_locations : ', JSON.stringify(event_locations));
            let matc_locat = [];
            staff_locations.forEach(se => {
              event_locations.forEach(le => {
                if (le.loc_name == se.loc_name) {
                  matc_locat.push(le);
                  console.log(`getLocataion_workDay ${le.locset_id.toString()} - ${le.loc_name} - ${le.event_id} - ${le.staff_id}`); //console.log('matc_locat : ', matc_locat)

                  /* Business Hours Classification  */

                  let left_timings = [];
                  left_timings = arr_left_elem.timings.timings;
                  let right_timings = [];
                  right_timings = arr_right.timings.timings;
                  /* Business Hours Classification End */

                  /* Day Check */

                  left_timings.forEach(lft_time => {
                    right_timings.forEach(rgt_time => {
                      if (lft_time.work_day_name == rgt_time.work_day_name) {
                        //console.log(`Matched Day  ${arr_left_elem.location_name} - ${ev_elem.location_name}= Staff : ${lft_time.work_day_name} - Event :  ${rgt_time.work_day_name}`)
                        const lft_startDate = external_moment_timezone_default().duration(string_to_date(lft_time.start_time)).asSeconds();
                        const lft_endDate = external_moment_timezone_default().duration(string_to_date(lft_time.end_time)).asSeconds(); // console.log('seconds to date : ', moment(lft_startDate).format("YYYY-MM-DDTHH:mm:ss"))

                        const rgt_startDate = external_moment_timezone_default().duration(string_to_date(rgt_time.start_time)).asSeconds();
                        const ev_endDate = external_moment_timezone_default().duration(string_to_date(rgt_time.end_time)).asSeconds();

                        if (lft_startDate >= rgt_startDate && lft_startDate <= ev_endDate || rgt_startDate >= lft_startDate && rgt_startDate <= lft_endDate) {
                          if (process_for == 'get_service') {
                            let index = matched_right.findIndex(x => x._id === arr_right._id);
                            console.log(`getLocataion_workDay get_service arr_right.event_id : ${arr_right._id} `);

                            if (index == -1) {
                              matched_days.push({
                                _id: arr_right._id,
                                day: rgt_time.work_day_name
                              });
                            }
                          } else if (process_for == 'get_staff') {
                            let index = matched_days.findIndex(x => x._id === le.staff_id);
                            console.log(`getLocataion_workDay get_staff arr_right.event_id : ${le.staff_id} `);

                            if (index == -1) {
                              matched_days.push({
                                _id: le.staff_id,
                                day: rgt_time.work_day_name
                              });
                            }
                          } else if (process_for == 'date_get' || process_for == 'location_get') {
                            // let s_index = matched_days.findIndex(x => ((x._id === le.event_id) && (x.loc_name === le.loc_name)));
                            // let l_index = matched_days.findIndex(x => x.loc_name === le.loc_name); && l_index == -1
                            //if(s_index == -1 ){
                            console.log(`getLocataion_workDay date_get location_get arr_right.event_id : ${le.event_id} `);
                            matched_days.push({
                              _id: le.event_id,
                              day: rgt_time.work_day_name,
                              loc_name: le.loc_name,
                              locset_id: le.locset_id.toString()
                            }); //}
                          }
                        }
                      } //work day

                    }); // right timings end
                  });
                  /* left timings end */
                } //if le.loc_name == se.loc_name

              }); //event_locations
            }); //staff_locations
          }

          ; // right end
        }

        ;
      }

      ; // loc_arr_right end
    } //loc_arr_left end


    console.log('matched_days : ', matched_days);
    let arr = [];

    function areDatumsEquivalent(datumA, datumB) {
      return datumA.day === datumB.day && datumA.loc_name === datumB.loc_name;
    }

    matched_days.forEach(datum => {
      if (!arr.find(arrDatum => areDatumsEquivalent(datum, arrDatum))) {
        arr.push(datum);
      }
    });
    console.log('arr : ', arr);

    let groupByDay = external_lodash_default().groupBy(arr, function (item) {
      return item.day;
    });

    let groupLocations = external_lodash_default().groupBy(arr, function (item) {
      return item.locset_id;
    });

    let matched_day = Object.keys(groupByDay);
    let matchd_locations = Object.keys(groupLocations);

    if (process_for == 'location_get') {
      return matchd_locations;
    } else {
      return matched_day;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
let string_to_date = start_time => {
  try {} catch (error) {
    console.log(error);
    throw new Error(error);
  }

  let date_format = "YYYY-MM-DDTHH:mm:ss";
  const timingsStartTime = external_moment_timezone_default()(new Date(start_time), date_format); //.format(hs_format)
  //console.log('timingsStartTime : ', timingsStartTime.format(hs_format))

  let default_date = external_moment_timezone_default()(new Date(0), date_format);
  const newDate = default_date.year() + "-" + (default_date.month() + 1) + "-" + default_date.date() + "T" + +timingsStartTime.format("HH") + ":" + timingsStartTime.format("mm") + ":" + timingsStartTime.format("ss"); //console.log('newDate : ', newDate)

  const strDate = external_moment_timezone_default()(newDate, date_format);
  return strDate;
};
let uniqueFromArr = (field, array) => {
  try {} catch (error) {
    console.log(error);
    throw new Error(error);
  }

  var flags = [],
      output = [],
      l = array.length,
      i;

  for (i = 0; i < l; i++) {
    if (flags[array[i][field]]) continue;
    flags[array[i][field]] = true;
    output.push(array[i][field]);
  }

  return output;
};
let avail_date_filter = async (args, context) => {
  try {} catch (error) {
    console.log(error);
    throw new Error(error);
  }

  const secondsFormat = "YYYY-MM-DDTHH:mm:ss";
  const dateFormat = "YYYY-MM-DD";
  let selectedDate = external_moment_timezone_default()(new Date(), dateFormat).startOf("day");
  let day_names = args.timings_day; //["Monday", "Tuesday"]

  let Setting = await context.models.Setting.find({}).lean(); //await context.models.Setting.find({})

  const pre_booking_day = Setting[0].advance_Booking_Period;
  let minDate = external_moment_timezone_default()(new Date(), secondsFormat).startOf("day");
  let cr_date = external_moment_timezone_default()(new Date()).startOf("day");
  let maxDate = external_moment_timezone_default()(new Date(), secondsFormat).add(pre_booking_day - 1, "days");

  if (selectedDate < cr_date) {
    throw new Error("Selected date should be greater than current date");
  }

  let available_date = [];
  let disable_date = [];
  let bookStartDate = external_moment_timezone_default()(minDate, secondsFormat);

  while (bookStartDate <= maxDate) {
    if (bookStartDate.isoWeekday() == 6 || bookStartDate.isoWeekday() == 7) {
      disable_date.push(new (external_moment_timezone_default())(bookStartDate).format(dateFormat));
    } else {
      if (day_names.includes(new (external_moment_timezone_default())(bookStartDate).format("dddd"))) {
        available_date.push(bookStartDate.format(dateFormat));
      }
    }

    bookStartDate.add(1, "days");
  }

  return available_date;
};
let groupArray = (field, content, myArray, elem) => {
  try {} catch (error) {
    console.log(error);
    throw new Error(error);
  }

  var groups = {};

  for (var i = 0; i < myArray.length; i++) {
    var groupName = myArray[i][field];

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    if (elem != undefined) {
      groups[groupName].push(myArray[i][elem]);
    } else {
      groups[groupName].push(myArray[i]);
    }
  }

  myArray = [];

  for (var groupName in groups) {
    let newObj = {};
    newObj[field] = groupName;
    newObj[content] = groups[groupName];
    myArray.push(newObj);
  }

  return myArray;
};
let uniqueObjDay = data => {
  try {} catch (error) {
    console.log(error);
    throw new Error(error);
  }

  var resArrDay = [];
  var resArrTimingsId = [];
  data.filter(function (item) {
    var i = resArr.findIndex(x => x.timings_id == item.timings_id && x.day == item.day && x.loc == item.loc);

    if (i <= -1) {
      resArrDay.push(item.day);
      resArrTimingsId.push(item.timings_id);
    }

    return null;
  });
  console.log("resArr : ", resArr);
  return resArr;
};
let uniqueObjFromArray = data => {
  try {} catch (error) {
    console.log(error);
    throw new Error(error);
  }

  var resArr = [];
  data.filter(function (item) {
    var i = resArr.findIndex(x => x.timings_id == item.timings_id && x.day == item.day && x.loc == item.loc);

    if (i <= -1) {
      resArr.push(item);
    }

    return null;
  });
  console.log("resArr : ", resArr);
  return resArr;
};
/* WorkDay logic */
//  let result = uniqueObjFromArray(matched_events_day)
//  console.log('result : ', result)
//  let events_locations = groupArray('_id','location',matched_events_location, 'locations')
//  console.log('events_day', events_locations)
//let events_locations = groupArray('locations','timings_day',matched_events_day,'day')
//let events_day = groupArray('_id','locations',matched_events_day, 'locations')
//var selected_ids = _.filter(matched_events_day, 'day');
//let withoutDupes = _.uniq(_.isEqual, matched_events_day);
//  let days = _.groupBy(matched_events_day, function(item) {
//   return item.day;
// });

/*
let uniqueDay = uniqueFromArr('day',matched_events_day)
let groups = []
uniqueDay.forEach((d)=>{
let obj1 = {}
let arr1 = []
let t_ids = matched_events_day.map((m)=>{
  if(d == m.day){
    arr1.includes(m.timings_id) ? arr1: arr1.push(m.timings_id)
  }
})
console.log('f_day : ', arr1)
groups.push({day: d, timings_id: arr1,  })
})
console.log('groups : ', groups)
let groupObj = []
tim_loc.forEach((d)=>{    
groups.forEach((m)=>{
  if(m.timings_id.includes(d.timings_id)){
    //arr2.includes(m.timings_id) ? arr1: arr1.push(m.timings_id)
    groupObj.push({timings_id: d.timings_id, loc: d.locat, day: m.day, event_id: d._id})
  }
})    
})
console.log("groupObj : ",groupObj)
let group_timings = 
_.chain(groupObj)
  // Group the elements of Array based on `color` property
  .groupBy("timings_id")
  // `key` is group's name (color), `value` is the array of objects
  .map((value, key) => ({ timings_id: key, data: value }))
  .value()
console.log('group_timings : ', group_timings)
*/

/*
let days = _.groupBy(matched_events_day, function(item) {
return item.day;
});
let selected_ids = _.forEach(days, function(value, key) {
days[key] = _.groupBy(days[key], function(item) {
  return item.timings_id;
});
});
let w_day = Object.keys(days)
let timings_ar = Object.values({...Object.values(days)})
let timing_det = []
//for(let i =0; i < w_day.length; i++){
w_day.forEach((w)=>{
  timings_ar.forEach((el)=>{
    let day = w
    timing_det.push({timings_id: Object.keys(el), timing_day: day})
  })
})

//}
console.log('timing_det : ', timing_det)
let result = [...tim_loc, ...timing_det]
*/
//console.log('groupObj ', groupObj)
//  console.log('selected_ids : ', selected_ids)
// let rs = _.forEach(selected_ids, function(value, key) {
//   selected_ids[key] = _.groupBy(selected_ids[key], function(item) {
//     return item.modelCode;
//   });
// });
//  matched_events = events_day.map((ev)=>{return ev._id})
//  console.log('matched_events', matched_events)

/*Booking Exist Logic */
// for (let q = 0; q < staff_ar.length; q++) {
//     let s_start = moment(staff_ar[q].slotStartTime)
//    let s_end = moment(staff_ar[q].slotEndTime)
//     let s_start_sec = moment.duration(s_start).asSeconds()
//     let s_end_sec = moment.duration(s_end).asSeconds()
//     //Booking
//     //bookingDetails.forEach((e1) => {
//     //for (let l = 0; l < bookingDetails.length; l++) {
//       const timingsStartTime = moment(new Date(bookingDetails.appointment_start_time), "YYYY-MM-DDTHH:mm:ss")
//       console.log(`\n ${moment(dayStartTime).format("YYYY-MM-DDTHH:mm:ss")} - ${moment(dayEndTime).format("YYYY-MM-DDTHH:mm:ss")}`)
//       //if (s_start_sec >= b_start_sec  && s_start_sec <= b_end_sec) {
//         if (s_start >= dayStartTime  && s_start <= dayEndTime) {
//           if(callfrom == 'slot'){
//             console.log(`Booking Matched with Slot : ${staff_ar[q].slotStartTime}`)
//             staff_ar[q].isBooking = true
//             // const tindex = bookingDetails.map(e => e.appointment_start_time).indexOf(bookingDetails[l].appointment_start_time);
//             // bookingDetails.splice(tindex, 1)
//             //break;
//           } else {
//             console.log(`Booking Matched with Reschedule : ${staff_ar[q].slotStartTime}`)
//             staff_ar[q].isBooking = false
//           }
//       } else {
//         //staff_ar[q].isBooking = false
//       }
//     //}
//   }

/*

// staff_loc_ar.forEach((stf_elem) => {
//   if (event_loc_ar[0].locationsetting) {
//     event_loc_ar[0]["data"] = event_loc_ar[0].locationsetting;
//   }
//   //console.log('event_loc_ar location issue : ', JSON.stringify(event_loc_ar))
//   let tim_loc = [];
//   event_loc_ar.forEach((el) => {
//     //elem.forEach((el)=>{
//     el.data.forEach((ev_data) => {
//       //  let matc_locat = ev_data.location_name.map((i) => {
//       //    if (stf_elem.location_name.includes(i)) {
//       //      return i;
//       //    }
//       //  });
//       //console.log('matc_locat : ', matc_locat)
//       //matched_events_location.push({_id: ev_data.events_id,  locations: matc_locat})
//       // if(check == 'date'){
//       //   if(ev_data.day.includes(selected_day)){
//       //     matc_locat.push(ev_data["locationsetting_id"])
//       //   }
//       // }
//       var matc_locat = _.intersectionWith(
//         ev_data.location_name,
//         stf_elem.location_name,
//         _.isEqual
//       );
        
//       let stf_arr_arr = stf_elem.timings_day.some(Array.isArray) 
//       if(stf_arr_arr){
//         stf_elem.timings_day = stf_elem.timings_day[0]
//       }
//       let ev_arr_arr = ev_data.timings_day.some(Array.isArray) 
//       if(ev_arr_arr){
//         ev_data.timings_day = ev_data.timings_day[0]
//       }
      
//       console.log('stf_arr_arr : ', stf_arr_arr)
//       console.log('ev_arr_arr : ', ev_arr_arr)
//       var matc_day = _.intersectionWith(
//         _.uniq(ev_data.timings_day),
//         _.uniq(stf_elem.timings_day),
//         _.isEqual
//       );
//       if (matc_locat.length > 0 && matc_day.length > 0) {
//         tim_loc.push({
//           timings_id: ev_data["timings"]["_id"],
//           _id: ev_data["_id"],
//           locat: ev_data["locationsetting_id"],
//         });
  //         let staff_timings = [];
//         if (stf_elem.timings.timings) {
//           staff_timings = stf_elem.timings.timings; //BH : False
//         } else if (
//           stf_elem.timings.timings == undefined &&
//           stf_elem.timings.length > 0
//         ) {
//           staff_timings = stf_elem.timings[0].timings; //BH : True
//         }
  //         staff_timings.forEach((stf_time) => {
//           ev_data.timings.timings.forEach((ev_time) => {
//             //console.log(`Matched Day  ${stf_elem.location_name} - ${ev_elem.location_name}= Staff : ${stf_time.work_day_name} - Event :  ${ev_time.work_day_name}`)
//             const stf_startDate = moment
//               .duration(string_to_date(stf_time.start_time))
//               .asSeconds();
//             // console.log('seconds to date : ', moment(stf_startDate).format("YYYY-MM-DDTHH:mm:ss"))
//             const ev_startDate = moment
//               .duration(string_to_date(ev_time.start_time))
//               .asSeconds();
//             const ev_endDate = moment
//               .duration(string_to_date(ev_time.end_time))
//               .asSeconds();
  //             if (
//               stf_startDate <= ev_startDate ||
//               stf_startDate <= ev_endDate
//             ) {
//               matched_events_day.push({
//                 _id: ev_data.events_id,
//                 day: ev_time.work_day_name,
//                 timings_id: ev_data["timings"]["_id"],
//                 loc: matc_locat,
//                 loc_id: ev_data["locationsetting_id"]
//               });
//             }
//           });
//         });
//       } else {
//         console.log('Staff and Service Location does not match')
//         throw new Error('Staff and Service Location does not match')
//       }
//     });
//     //})
//   });
//   //get_service_day
  //   //console.log('matched_events_day : ',JSON.stringify(matched_events_day) )
//   console.log("tim_loc : ", tim_loc);
  //   var resArr = [];
//   matched_events_day.filter(function (item) {
//     var i = resArr.findIndex(
//       (x) => x.timings_id == item.timings_id && x.day == item.day
//     );
//     if (i <= -1) {
//       resArr.push(item);
//     }
//     return null;
//   });
//   console.log(resArr);
//   let result;
//   result = resArr.reduce(function (r, a) {
//     r[a.timings_id] = r[a.timings_id] || [];
//     r[a.timings_id].push(a);
//     return r;
//   }, Object.create(null));
  //   let ids = Object.keys(result);
//   ids.forEach((id) => {
//     let valueArr = [];
//     valueArr = result[id].map(function (item) {
//       return item.day;
//     });
//     result[id].forEach((obj) => {
//       obj.day = valueArr;
//     });
//   });
//   let arrayOfObj = Object.entries(result).map((e) => ({ [e[0]]: e[1] }));
//   console.log("result : ", JSON.stringify(arrayOfObj));
//   let tims_ar = [];
//   tim_loc.forEach((t_id) => {
//     arrayOfObj = arrayOfObj.filter((x) => {
//       if (
//         x[t_id.timings_id] != undefined &&
//         x[t_id.timings_id].length > 1
//       ) {
//         let obj = x[t_id.timings_id].splice(1, x[t_id.timings_id].length);
//         console.log("obj  ", obj);
//         return obj;
//       }
//       return x;
//     });
//   });
//   console.log("arrayOfObj:  ", JSON.stringify(arrayOfObj));
//   let mergedDay = [];
//   let mergedLocation = [];
//   arrayOfObj.map((x) => {
//     mergedDay = [...Object.values(x)[0][0].day];
//     mergedLocation = [...Object.values(x)[0][0].loc_id];
//     return null;
//   });
//   console.log("mergedDay : ", mergedDay);
//   console.log("mergedLocation : ", mergedLocation);
//   matched_events.days =  mergedDay;
//   matched_events.locations =  mergedLocation;
// });
  //_id: ev_data.events_id,
//                 day: ev_time.work_day_name,
//                 timings_id: ev_data["timings"]["_id"],
//                 loc: matc_locat,
//                 loc_id: ev_data["locationsetting_id"]
   */
;// CONCATENATED MODULE: ./resolvers/booking.js




/* harmony default export */ const resolvers_booking = ({
  Query: {
    getBooking: async (parent, args, context, info) => {
      try {
        let Booking = await context.models.Booking.find({
          workspace_id: args.workspace_id,
          site_id: args.site_id
        }).lean();
        return Booking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getBookingById: async (parent, args, context, info) => {
      try {
        let Booking = await context.models.Booking.find({
          workspace_id: args.workspace_id,
          site_id: args.site_id,
          _id: args.booking_id
        });
        return Booking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getBookingByStaff: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id),
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id),
          staff_id: (0,external_bson_namespaceObject.ObjectId)(args.staff_id)
        };
        let Booking = await context.models.Booking.find(findObj);
        return Booking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getBookingByEvent: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id),
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id),
          event_id: (0,external_bson_namespaceObject.ObjectId)(args.event_id)
        };
        let Booking = await context.models.Booking.find(findObj);
        return Booking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    }
  },
  Mutation: {
    addBooking: async (parent, args, context, info) => {
      try {
        let newBooking = new context.models.Booking();
        let newCustomer = new context.models.Customer();
        let bookingInput = args.input.availablity;
        let bookingInputKeys = Object.keys(bookingInput);
        let arg_input = args.input["availablity"];
        let customer_ids = []; //Customer

        if (args.input.customer != undefined) {
          let customer = args.input.customer;
          let customerKeys = Object.keys(customer);
          if (!bookingInputKeys) console.log("Error Booking keys");
          let i = 0;

          while (i < customerKeys.length) {
            if (customerKeys[i] in newCustomer) {
              newCustomer[customerKeys[i]] = args.input["customer"][customerKeys[i]];
            }

            i++;
          }

          let customerResult = await context.models.Customer.find({
            email: customer.email
          });

          if (customerResult.length > 0 && customerResult[0].email) {
            console.log("Customer already exist");
            customer_ids.push(customerResult[0]._id); // try {
            //   let updateObj = { $set: {} };
            //   for (var param in bookingInput) {
            //     updateObj.$set[param] = bookingInput[param];
            //   }
            //   newBooking = await context.models.Booking.findOneAndUpdate({ customer_ids: customerResult[0]._id }, updateObj, { new: true });    
            //   console.log("Booking updated : ", newBooking)
            // } catch (error) {
            //   console.error("Error : ", error)
            // }
            //throw new Error("Customer already exist")          
          } else {
            newCustomer = await newCustomer.save();
            customer_ids.push(newCustomer._id);
          }
        } //Booking


        if (!bookingInputKeys) console.log("Error Booking keys");
        let j = 0;

        while (j < bookingInputKeys.length) {
          if (bookingInputKeys[j] in newBooking) {
            newBooking[bookingInputKeys[j]] = arg_input[bookingInputKeys[j]];
          }

          j++;
        }

        if (customer_ids.length > 0) {
          newBooking.customer_ids = customer_ids;
        }

        let secondsFormat = "YYYY-MM-DDTHH:mm:ss"; //let repeat_upto_date = moment(new Date(newBooking.repeat_upto_date), "YYYY-MM-DDTHH:mm:ss").toISOString()

        const timingsStartTime = external_moment_timezone_default()(new Date(arg_input.appointment_start_time), secondsFormat);
        const timingsEndTime = external_moment_timezone_default()(new Date(arg_input.appointment_end_time), secondsFormat); //arg_input.is_recurring == false ?  : moment(new Date(arg_input.repeat_upto_date), secondsFormat)

        const startDateStr = timingsStartTime.year() + '-' + (timingsStartTime.month() + 1) + '-' + timingsStartTime.date() + 'T' + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('sss');
        const endDateStr = timingsEndTime.year() + '-' + (timingsEndTime.month() + 1) + '-' + timingsEndTime.date() + 'T' + timingsEndTime.format('HH') + ':' + timingsEndTime.format('mm') + ':' + timingsEndTime.format('sss');
        const selectedStartTime = external_moment_timezone_default()(startDateStr, secondsFormat).format(secondsFormat);
        const selectedEndTime = external_moment_timezone_default()(endDateStr, secondsFormat).format(secondsFormat);
        const bookingStartTime = external_moment_timezone_default()(selectedStartTime, secondsFormat);
        const bookingEndTime = external_moment_timezone_default()(selectedEndTime, secondsFormat); //console.log('bookingStartTime : ', bookingStartTime)
        //console.log('bookingEndTime : ', bookingEndTime)

        const dateFormat = "YYYY-MM-DD HH:mm:ss";
        let available_date = [];
        let disable_date = []; // let b_start_sec = moment.duration(bookStartDate).asSeconds()
        // let max_date_sec = moment.duration(maxDate).asSeconds()

        if (bookingStartTime.isoWeekday() == 6 || bookingStartTime.isoWeekday() == 7) {
          disable_date.push(new (external_moment_timezone_default())(bookingStartTime).format('YYYY-MM-DD'));
        } else {
          available_date.push(new (external_moment_timezone_default())(bookingStartTime).format('YYYY-MM-DD'));
        }

        console.log('disable_date : ', disable_date);
        console.log('available_date : ', available_date);

        if (arg_input.is_recurring == true) {
          if (arg_input.repeat_on == 'Daily') {
            newBooking = createAppoint(bookingStartTime, bookingEndTime, newBooking, context, disable_date, arg_input, 1);
          } else if (arg_input.repeat_on == 'Weekly') {
            newBooking = createAppoint(bookingStartTime, bookingEndTime, newBooking, context, disable_date, arg_input, 7);
          } else if (arg_input.repeat_on == 'Monthly') {
            newBooking = createAppoint(bookingStartTime, bookingEndTime, newBooking, context, disable_date, arg_input, 30);
          }
        } else {
          const checkbook = await checkBook(context, arg_input.staff_id, arg_input.event_id, arg_input.appointment_start_time);

          if (checkbook) {
            throw new Error(`Booking not available in this slot ${arg_input.appointment_start_time}, please select another slot`);
          }

          if (disable_date.includes(external_moment_timezone_default()(arg_input.appointment_start_time).format('YYYY-MM-DD'))) {
            throw new Error(`Can not book in this disabled day ${arg_input.appointment_start_time}, please select another slot`);
          }

          newBooking.progress.push({
            status: 'Booked'
          });
          newBooking.created_by = arg_input.staff_id;
          newBooking = await newBooking.save();
        } //console.log('newBooking', newBooking)


        return newBooking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    rescheduleBooking: async (parent, args, context, info) => {
      try {
        let findObj = {
          _id: (0,external_bson_namespaceObject.ObjectId)(args.appointment_id),
          Is_cancelled: false,
          deleted: false
        }; //, workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , 

        console.log(`booking find obj : ${JSON.stringify(findObj)}`);
        let bookingDetails = await context.models.Booking.find(findObj).lean();

        if (bookingDetails.length == 0) {
          console.error("Error : appointment does not exist ");
          throw new Error("Appointment does not exist");
        }

        console.log('book start  : ', external_moment_timezone_default()(bookingDetails[0].appointment_start_time).format());
        let db_start_time = external_moment_timezone_default()(bookingDetails[0].appointment_start_time).format();
        let arg_start_time = external_moment_timezone_default()(args.appointment_start_time).format();

        if (db_start_time === arg_start_time) {
          console.error("Already appointment time and new time are same");
          throw new Error("Already appointment time and new time are same");
        }

        let updateObj = {
          $set: {}
        };

        for (var param in args) {
          if (param != 'appointment_id') {
            updateObj.$set[param] = args[param];
          }
        }

        updateObj.$set["appointment_time_before_reschedule"] = db_start_time;
        const resultBooking = await context.models.Booking.findOneAndUpdate({
          _id: (0,external_bson_namespaceObject.ObjectId)(args.appointment_id)
        }, updateObj, {
          new: true
        });
        console.log("resultBooking created : ", resultBooking);
        return resultBooking; // let available_result = await getAvailability(args, context)
        // let resp_result = await is_bookingExist(available_result.availableTimes, bookingDetails, 'reschedule')
        // available_result.availableTimes = resp_result
        // return available_result;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    }
  },
  Booking: {
    event_id: async booking => {
      let resultBooking = await booking.populate('event_id').execPopulate();
      return resultBooking.event_id;
    },
    customer_ids: async booking => {
      let resultBooking = await booking.populate('customer_ids').execPopulate();
      return resultBooking.customer_ids;
    },
    site_id: async booking => {
      let resultBooking = await booking.populate('site_id').execPopulate();
      return resultBooking.site_id;
    },
    add_on_ids: async booking => {
      let resultBooking = await booking.populate('add_on_ids').execPopulate();
      return resultBooking.add_on_ids;
    },
    staff_id: async booking => {
      let resultBooking = await booking.populate('staff_id').execPopulate();
      return resultBooking.staff_id;
    },
    workspace_id: async booking => {
      let resultBooking = await booking.populate('workspace_id').execPopulate();
      return resultBooking.workspace_id;
    },
    created_by: async booking => {
      let resultBooking = await booking.populate('created_by').execPopulate();
      return resultBooking.created_by;
    },
    location_setting_id: async booking => {
      let resultBooking = await booking.populate('location_setting_id').execPopulate();
      return resultBooking.location_setting_id;
    },
    answer_id: async booking => {
      let resultBooking = await booking.populate('answer_id').execPopulate();
      return resultBooking.answer_id;
    }
  }
});

let createAppoint = async (recurring_start_date, recurring_end_date, newBooking, context, disable_date, input, days_count) => {
  let i = 0;
  let res = {};
  let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
  let arg_appointment_start_time = external_moment_timezone_default()(input.appointment_start_time, secondsFormat).format(secondsFormat);
  let arg_appointment_end_time = external_moment_timezone_default()(input.appointment_end_time, secondsFormat).format(secondsFormat);
  let arg_appointment_booking_time = external_moment_timezone_default()(input.appointment_booking_time, secondsFormat).format(secondsFormat);

  while (recurring_start_date <= recurring_end_date) {
    if (i == 0) {
      res = dateCreate(input.appointment_start_time, input.appointment_end_time);
      newBooking.appointment_start_time = arg_appointment_start_time;
      newBooking.appointment_end_time = arg_appointment_end_time;
      newBooking.appointment_booking_time = arg_appointment_booking_time;
      newBooking.Is_cancelled = false;
      newBooking.deleted = false;
      const checkbook = await checkBook(context, input.staff_id, input.event_id, input.appointment_start_time);

      if (checkbook) {
        throw new Error(`Booking not available in this slot ${arg_appointment_start_time}, please select another slot`);
      }

      if (disable_date.includes(external_moment_timezone_default()(arg_appointment_start_time).format('YYYY-MM-DD'))) {
        throw new Error(`Can not book in this disabled day ${arg_appointment_start_time}, please select another slot`);
      }

      newBooking = await newBooking.save();
      console.log('i ' + i + ' - ' + newBooking._id);
    } else {
      res = dateCreate(res.bookingStartTime.add(days_count, 'days'), res.bookingEndTime.add(days_count, 'days'));
      const checkbook = await checkBook(context, input.staff_id, input.event_id, res.bookingStartTime);

      if (checkbook) {
        throw new Error(`Booking not available in this slot ${res.bookingStartTime}, please select another slot`);
      }

      if (disable_date.includes(external_moment_timezone_default()(arg_appointment_start_time).format('YYYY-MM-DD'))) {
        throw new Error(`Can not book in this disabled day ${arg_appointment_start_time}, please select another slot`);
      }

      newBooking = new context.models.Booking();
      newBooking.appointment_start_time = res.bookingStartTime;
      newBooking.appointment_end_time = res.bookingEndTime;
      newBooking.appointment_booking_time = arg_appointment_booking_time;
      newBooking.event_id = input.event_id;
      newBooking.staff_id = input.staff_id;
      newBooking.site_id = input.site_id;
      newBooking.workspace_id = input.workspace_id;
      newBooking.is_recurring = input.is_recurring;
      newBooking.Is_cancelled = false;
      newBooking.deleted = false;
      newBooking = await newBooking.save();
      console.log('i ' + i + ' - ' + newBooking._id);
    }

    recurring_start_date.add(days_count, 'days');
    i++;
  }

  return newBooking;
};

let dateCreate = (start_time, end_time) => {
  try {
    let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
    const timingsStartTime = external_moment_timezone_default()(new Date(start_time), secondsFormat);
    const timingsEndTime = external_moment_timezone_default()(new Date(end_time), secondsFormat); //selectedDate.year(), selectedDate.month(), selectedDate.date(), timingsEndTime.format('hh'), timingsEndTime.format('mm'), timingsEndTime.format('sss')

    const startDateStr = timingsStartTime.year() + '-' + (timingsStartTime.month() + 1) + '-' + timingsStartTime.date() + 'T' + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('sss');
    const endDateStr = timingsEndTime.year() + '-' + (timingsEndTime.month() + 1) + '-' + timingsEndTime.date() + 'T' + timingsEndTime.format('HH') + ':' + timingsEndTime.format('mm') + ':' + timingsEndTime.format('sss');
    const selectedStartTime = external_moment_timezone_default()(startDateStr, secondsFormat).format(secondsFormat);
    const selectedEndTime = external_moment_timezone_default()(endDateStr, secondsFormat).format(secondsFormat);
    const bookingStartTime = external_moment_timezone_default()(selectedStartTime);
    const bookingEndTime = external_moment_timezone_default()(selectedEndTime);
    return {
      bookingStartTime: bookingStartTime,
      bookingEndTime: bookingEndTime
    };
  } catch (error) {
    throw new Error(error);
  }
};

let checkBook = async (context, staffid, eventid, appointmentstarttime) => {
  try {
    let bookingDetails = [];
    const bookdate = external_moment_timezone_default()(new Date(appointmentstarttime), "YYYY-MM-DDTHH:mm:ss").toISOString();
    console.log('bookdate : ', bookdate);
    bookingDetails = await context.models.Booking.find({
      staff_id: staffid,
      event_id: eventid,
      Is_cancelled: false,
      deleted: false,
      appointment_start_time: new Date(bookdate)
    });
    console.log('bookingDetails length: ', bookingDetails.length);

    if (bookingDetails.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error);
  }
};
/*
guest_ids: async (booking) => {
      let resultBooking = await booking.populate('guest_ids').execPopulate();
      return resultBooking.guest_ids
    },
 */

/*
,
    updateBooking: async (parent, args, context, info) => {
      try {
        let updateObj = { $set: {} };
        for (var param in args.input) {
          updateObj.$set[param] = args.input[param];
        }
        const resultBooking = await context.models.Booking.findOneAndUpdate({ _id: args.bookingID }, updateObj, { new: true });

        console.log("resultBooking created : ", resultBooking)

        return resultBooking
      } catch (error) {
        console.error("Error : ", error)
      }

    },
    deleteBooking: async (parent, args, context, info) => {
      try {
        args = args.bookingID;
        const deleteStatus = true;
        let updateObj = { deleted: deleteStatus }

        let resultBooking = await context.models.Booking.findOneAndUpdate({ _id: args }, updateObj, { new: true });
        if (resultBooking) {
          return resultBooking;
        } else {
          console.log("Error Delet Booking")
        }
        return resultBooking
      } catch (error) {
        console.error("Error : ", error)
      }

    }
    */
//Test

/*
    db.AlertDump.find().forEach(function(doc){
      print(doc._id + " " + doc.VehicleNo.toUpperCase());
      print("-------------------------------------");
      db.Alarm.find({"LicensePlateNumber":doc.VehicleNo.toUpperCase(),Year:2021,Month:10}).forEach(function(doc1)
      {
            db.FinalResult.insertOne(
               { LicensePlateNumber : doc.VehicleNo.toUpperCase(), TimeStamp:doc1.TimeStamp,SourceLocation:doc1.SourceLocation ,CamName:doc1.CamName }
            )
            print(doc.VehicleNo.toUpperCase() + "," + doc1.TimeStamp +" inserted");
      })
    })
    */
;// CONCATENATED MODULE: ./resolvers/customer.js
/* harmony default export */ const resolvers_customer = ({
  Query: {
    getCustomer: async (parent, args, context, info) => {
      try {
        let Customer = await context.models.Customer.find({
          workspace_ids: args.workspace_ids,
          site_id: args.site_id,
          _id: args.staff_id
        }); //// workspace_ids: args.workspace_ids, site_id:args.site_id, _id:args.staff_id 

        return Customer;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Mutation: {
    addCustomer: async (parent, args, context, info) => {
      try {
        let newCustomer = new models.Customer();
        let clientKeys = Object.keys(args.input);
        if (!clientKeys) console.log("Error Customer keys");
        let i = 0;

        while (i < clientKeys.length && clientKeys[i] != 'phone') {
          if (clientKeys[i] in newCustomer) {
            newCustomer[clientKeys[i]] = args.input[clientKeys[i]];
          }

          i++;
        }

        newCustomer = await newCustomer.save();
        console.log("newCustomer Created : ", newCustomer);
        return newCustomer;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Customer: {
    address_id: async customer => {
      let resultAddress = await customer.populate('address_id').execPopulate();
      return resultAddress.address_id;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/business.js
/* harmony default export */ const resolvers_business = ({
  Query: {
    getBusiness: async (parent, args, context, info) => {
      try {
        let business = await context.models.Business.find({
          delete: false
        });
        return business;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Business: {
    workspace_id: async business => {
      let resultBusiness = await business.populate('workspace_id').execPopulate();
      return resultBusiness.workspace_id;
    },
    site_id: async business => {
      let resultBusiness = await business.populate('site_id').execPopulate();
      return resultBusiness.site_id;
    }
  }
});
/*
address_ids: async (business) => {
            let resultBusiness = await business.populate('address_ids').execPopulate();
            return resultBusiness.address_ids
        },
*/
;// CONCATENATED MODULE: ./resolvers/location.js

/* harmony default export */ const resolvers_location = ({
  Query: {
    getLocation: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id),
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id)
        };
        let location = await context.models.Location.find();
        return location;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Location: {
    app_id: async (locsetting, args, context) => {
      const resultData = await locsetting.populate({
        path: 'app_id'
      }).execPopulate();
      return resultData.app_id;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/locationsetting.js



/* harmony default export */ const resolvers_locationsetting = ({
  Query: {
    getLocationSetting: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id),
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id)
        };
        console.log(findObj);
        let loc_result = await context.models.LocationSetting.find(findObj).exec();
        return loc_result;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getLocationSettingById: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id),
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id),
          _id: args.location_id
        };
        console.log(findObj);
        let loc_result = await context.models.LocationSetting.find(findObj).exec();
        return loc_result;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getStaffEventLocationSettings: async (parent, args, context, info) => {
      try {
        const {
          displaySettings,
          selectedDate,
          start_date,
          end_date,
          available_date,
          disable_date,
          pre_booking_day,
          clientSlot
        } = await date_check(args, context);
        let staff_loc_ar = await getStaffLocations(args, context);
        let event_loc_ar = []; // let staff_loc_ar = await getStaffLocations(args, context)

        if (staff_loc_ar.length > 0) {
          if (staff_loc_ar[0].locationsetting.length > 0) {
            if (staff_loc_ar[0].locationsetting[0].events_id.length > 0) {
              let event_ids = [];
              staff_loc_ar[0].locationsetting[0].events_id.forEach(el => {
                event_ids.push(el.toString());
              });
              console.log("getEnabledDate events_id Before loop : ", event_ids);

              if (event_ids.includes(args.event_id)) {
                let events = await getEventLocations(args, context); //getEventLocation group by timings

                console.log("events : ", events);
                event_loc_ar.push({
                  event_id: args.event_id,
                  data: events[0].locationsetting
                });
              }

              console.log(`getEnabledDate : , ${event_loc_ar}`);
            }
          }
        }

        let rsp = await getLocataion_workDay(args, context, staff_loc_ar[0].locationsetting, event_loc_ar, 'location_get'); //console.log('rsp locations: ', JSON.stringify(rsp)  )
        //let loc_result = []
        // for(let i=0; i< rsp.length; i++){
        //   //let data =  await context.models.LocationSetting.aggregate(get_locationsettings_agg(rsp[i]))
        //   let obj = {_id: ObjectId(rsp[i]) }
        //   await context.models.LocationSetting.find(findObj)
        // }

        console.log('resp : ', rsp);
        let obj = {
          _id: rsp
        }; // let findObj = {workspace_id: ObjectId(args.workspace_id), site_id: ObjectId(args.site_id)}

        console.log('resp : ', obj);
        let loc_result = await context.models.LocationSetting.find(obj).exec();
        let matched_loc = [];

        if (loc_result == undefined) {
          console.log('getStaffEventLocationSettings : Staff and Event location name does not match');
          throw new Error('getStaffEventLocationSettings : Staff and Event location names does not match');
        } // let result = {
        //   displaySettings,
        //   selectedDate: selectedDate,
        //   start_date: start_date,
        //   end_date: end_date,
        //   pre_booking_day,
        //   clientSlot,
        //   available_date,
        //   disable_date,
        //   locationAvailable:rsp.locations
        // }


        return loc_result;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
      /*
            let staff_loc_ar = [];
            let business_time = await context.models.Staff.aggregate(bushiness_timings_agg(args.staff_id, args.workspace_id,args.site_id, 'staff'));
            if(business_time[0].business_hours){
              staff_loc_ar = await context.models.Staff.aggregate(get_staff_locationsettings_agg_bht(args.staff_id, args.workspace_id,args.site_id));
            } else {
              staff_loc_ar = await context.models.Staff.aggregate(get_staff_locationsettings_agg_bhf(args.staff_id, args.workspace_id,args.site_id));
            }
            if(staff_loc_ar.length<1){
              throw new Error('Location setting not available in staff')
            }
      
            let event_loc_ar = []; 
      
            let ev_business_time = await context.models.Events.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id,args.site_id, 'event'));
            if(ev_business_time[0].business_hours){
              event_loc_ar = await context.models.Events.aggregate(get_event_locationsettings_agg_bht(args.event_id, args.workspace_id,args.site_id));
            } else {
              event_loc_ar = await context.models.Events.aggregate(get_event_locationsettings_agg_bhf(args.event_id, args.workspace_id,args.site_id));
            }
            if(event_loc_ar.length<1){
              throw new Error('Location setting not available in event')
            }
            let stf_loc = locations_arr(staff_loc_ar)
            let ev_loc = locations_arr(event_loc_ar)
            
            if(stf_loc.length > 0 && ev_loc.length > 0){
              stf_loc.forEach((stf)=>{
                ev_loc.forEach((ev)=>{
                  if(stf.location_name && ev.location_name) {
                    if(stf.location_name.toLowerCase() == ev.location_name.toLowerCase()){
                      matched_loc.push(stf)
                    }
                  }
                  
                })
              })
            }
            */

    }
  },
  LocationSetting: {
    site_id: async (locsetting, args, context) => {
      const resultData = await locsetting.populate({
        path: 'site_id'
      }).execPopulate();
      return resultData.site_id;
    },
    workspace_id: async (locsetting, args, context) => {
      const resultData = await locsetting.populate({
        path: 'workspace_id'
      }).execPopulate();
      return resultData.workspace_id;
    },
    location_id: async (locsetting, args, context) => {
      const resultData = await locsetting.populate({
        path: 'location_id'
      }).execPopulate();
      return resultData.location_id;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/staff.js
/* harmony default export */ const resolvers_staff = ({
  Query: {
    getStaffs: async (parent, args, context, info) => {
      try {
        let staff = await context.models.Staff.find({
          workspace_ids: args.workspace_ids,
          site_id: args.site_id
        }); //workspace_ids: args.workspace_ids, site_id:args.site_id, _id:args.staff_id 

        return staff;
      } catch (error) {
        console.error("Error : ", error);
      }
    },
    getLocationByStaffId: async (parent, args, context, info) => {
      try {
        let resultStaff = await context.models.Staff.find({
          workspace_ids: args.workspace_ids,
          site_id: args.site_id,
          _id: args.staff_id
        });
        return resultStaff;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Staff: {
    workspace_ids: async staff => {
      let resultStaff = await staff.populate('workspace_ids').execPopulate();
      return resultStaff.workspace_ids;
    },
    site_id: async staff => {
      let resultStaff = await staff.populate('site_id').execPopulate();
      return resultStaff.site_id;
    },
    staff_detail_id: async staff => {
      let resultStaff = await staff.populate('staff_detail_id').execPopulate();
      return resultStaff.staff_detail_id;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/staffdetails.js




/* harmony default export */ const resolvers_staffdetails = ({
  Query: {
    getStaffDetails: async (parent, args, context, info) => {
      try {
        let findObj = {
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id),
          workspace_ids: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id)
        };
        let staffDetails = await context.models.StaffDetails.find(findObj);
        return staffDetails;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getAvailabilityByStaff: async (parent, args, context, info) => {
      try {
        let resp_result = getAvailability(args, context);
        return resp_result;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getEventLocationSettings: async (parent, args, context, info) => {
      try {
        let displaySettings = '12';
        let minutesFormat = "HH:mm";
        const secondsFormat = "YYYY-MM-DD HH:mm:ss";
        const dateFormat = "YYYY-MM-DD";
        let selectedDate = external_moment_timezone_default()(args.date, dateFormat); //console.log(`selectedDate.isValid() : ${selectedDate.isValid()} : ${selectedDate}`)

        let settings = await context.models.Setting.find({});
        const pre_booking_day = settings[0].advance_Booking_Period.value;
        const clientSlot = settings[0].client_time_slot;
        let minDate = external_moment_timezone_default()(new Date(), secondsFormat);
        let cr_date = external_moment_timezone_default()(new Date()).startOf('day');
        let maxDate = external_moment_timezone_default()(new Date(), secondsFormat).add(pre_booking_day - 1, 'days');

        if (selectedDate < cr_date) {
          throw new Error('Selected date should be greater than current date');
        }

        let available_date = [];
        let disable_date = [];
        let bookStartDate = external_moment_timezone_default()(minDate, secondsFormat);

        while (bookStartDate <= maxDate) {
          if (bookStartDate.isoWeekday() == 6 || bookStartDate.isoWeekday() == 7) {
            disable_date.push(new (external_moment_timezone_default())(bookStartDate).format(dateFormat));
          } else {
            available_date.push(new (external_moment_timezone_default())(bookStartDate).format(dateFormat));
          }

          bookStartDate.add(1, 'days');
        }

        let loc_ar = [];
        let location_setting = [],
            locations = [];
        let business_time = await context.models.Events.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id, args.site_id, 'event'));

        if (business_time[0].business_hours) {
          loc_ar = await context.models.Events.aggregate(get_event_locationsettings_agg_bht(args.event_id, args.workspace_id, args.site_id));
        } else {
          loc_ar = await context.models.Events.aggregate(get_event_locationsettings_agg_bhf(args.event_id, args.workspace_id, args.site_id));
        }

        if (loc_ar.length < 1) {
          throw new Error('Location setting not available');
        }

        location_setting = loc_ar[0].locationsetting;
        locations = loc_ar[0].location_type;
        let loc = [];
        location_setting.forEach(elem => {
          let ls_value = { ...elem
          };
          let rs = {
            locationsetting_id: ls_value.locationsetting_id,
            appintegration_id: ls_value.appintegration_id,
            is_installed: ls_value.is_installed ? ls_value.is_installed[0] : ls_value.is_installed,
            app_name: ls_value.app_name ? ls_value.app_name[0] : ls_value.app_name,
            location_id: ls_value.location_id ? ls_value.location_id[0] : ls_value.location_id,
            location_type: ls_value.location_type ? ls_value.location_type[0] : ls_value.location_type,
            location_name: ls_value.location_name ? ls_value.location_name[0] : ls_value.location_name,
            location_app_integration_need: ls_value.location_app_integration_need ? ls_value.location_app_integration_need[0] : ls_value.location_app_integration_need
          };
          loc.push(rs);
        });
        let result = {
          displaySettings,
          selectedDate: selectedDate.format(dateFormat),
          start_date: minDate.format(dateFormat),
          end_date: maxDate.format(dateFormat),
          pre_booking_day,
          clientSlot,
          available_date,
          disable_date,
          locationAvailable: loc
        };
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    //Get Staffs for service dropdown
    getstaffdetailbyservice: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: (0,external_bson_namespaceObject.ObjectId)(args.workspace_id),
          site_id: (0,external_bson_namespaceObject.ObjectId)(args.site_id),
          staff: (0,external_bson_namespaceObject.ObjectId)(args.event_ids)
        };
        let staffEvent = await context.models.Staff.find(findObj);
        console.log(`\n staffEvent Count : `, staffEvent.length);
        let result_staffs = await getStaffbyServiceId(args, context);
        const staff_result = await context.models.Staff.find({
          _id: result_staffs
        });
        return staff_result;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    }
  },
  StaffDetails: {
    site_id: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('site_id').execPopulate();
      return resultStaffDetails.site_id;
    },
    workspace_id: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('workspace_id').execPopulate();
      return resultStaffDetails.workspace_id;
    },
    business_id: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('business_id').execPopulate();
      return resultStaffDetails.business_id;
    },
    address_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('address_ids').execPopulate();
      return resultStaffDetails.address_ids;
    },
    timing_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('timing_ids').execPopulate();
      return resultStaffDetails.timing_ids;
    },
    sorting_id: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('sorting_id').execPopulate();
      return resultStaffDetails.sorting_id;
    },
    events_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('events_ids').execPopulate();
      return resultStaffDetails.events_ids;
    },
    location_setting_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('location_setting_ids').execPopulate();
      return resultStaffDetails.location_setting_ids;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/timings.js
/* harmony default export */ const resolvers_timings = ({
  Query: {
    getTimings: async (parent, args, context, info) => {
      try {
        let timings = await context.models.Timing.find({
          deleted: false
        });
        return timings;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Timing: {
    site_id: async (timings, args, context) => {
      const resultTimings = await timings.populate('site_id').execPopulate();
      return resultTimings.site_id;
    },
    // service_ids: async (timings, args, context) => {
    //     const resultTimings = await timings.populate('service_ids').execPopulate()
    //     return resultTimings.service_ids
    // },
    // created_by: async(timings, args, {models}) =>{
    //     const resultTimings = await timings.populate('created_by').execPopulate()
    //     return resultTimings.created_by
    // },
    workspace_ids: async (timings, args, context) => {
      const resultTimings = await timings.populate('workspace_ids').execPopulate();
      return resultTimings.workspace_ids;
    },
    location_setting_ids: async (timings, args, context) => {
      const resultTimings = await timings.populate('location_setting_ids').execPopulate();
      return resultTimings.location_setting_ids;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/workspace.js
/* harmony default export */ const resolvers_workspace = ({
  Query: {
    getWorkspace: async (parent, args, context, info) => {
      try {
        let workspace = await context.models.Workspace.find({});
        return workspace;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Workspace: {
    site_id: async (wrkspace, args, context) => {
      const resultworkspace = await wrkspace.populate('site_id').execPopulate();
      return resultworkspace.site_id;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/site.js
/* harmony default export */ const resolvers_site = ({
  Query: {
    getSite: async (parent, args, context, info) => {
      try {
        let Site = await context.models.Site.find({});
        return Site;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  }
}); //workspace_id: args.workspace_id, site_id:args.site_id, _id:args.event_id
;// CONCATENATED MODULE: ./resolvers/settings.js
/* harmony default export */ const settings = ({
  Query: {
    getSetting: async (parent, args, context, info) => {
      try {
        let Setting = await context.models.Setting.find({});
        return Setting;
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  },
  Setting: {
    workspace_id: async setting => {
      let resultsetting = await setting.populate('workspace_id').execPopulate();
      return resultsetting.workspace_id;
    },
    site_id: async setting => {
      let resultsetting = await setting.populate('site_id').execPopulate();
      return resultsetting.site_id;
    }
  }
});
;// CONCATENATED MODULE: ./resolvers/datescalar.js
const {
  GraphQLScalarType
} = __webpack_require__(343);

const {
  Kind
} = __webpack_require__(548);



/* harmony default export */ const datescalar = ({
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom date scalar',

    parseValue(value) {
      //returnOnError(() => value == null ? null : new Date(value), null)
      return value; // value from the client
    },

    serialize(value) {
      //let respo = moment.tz(value,"Asia/Kolkata").format(); //moment.tz(value,"YYYYMMDDHHmm","Asia/Kolkata");
      //let respo = moment.utc(value).format();
      return new Date(value); //moment(value, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss") //new Date(value); // value sent to the client
    },

    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }

      return null;
    }

  })
});
;// CONCATENATED MODULE: ./resolvers/index.js














 // import eventCategoryResolver from './eventcategory'
// import roleResolver  from './role'
// import userResolver  from './user'
// import timeformatResolver  from './timeformat'
//const { GraphQLDateTime } = require('graphql-iso-date')
// const customScalarResolver = {
//     DateTime : GraphQLDateTime
// };
//customScalarResolver

/* harmony default export */ const resolvers = ([resolvers_addons, resolvers_address, resolvers_booking, resolvers_customer, resolvers_business, resolvers_events, resolvers_location, resolvers_locationsetting, resolvers_staff, resolvers_staffdetails, resolvers_timings, resolvers_workspace, datescalar, resolvers_site, settings]);
;// CONCATENATED MODULE: external "@mongoosejs/double"
const double_namespaceObject = require("@mongoosejs/double");
var double_default = /*#__PURE__*/__webpack_require__.n(double_namespaceObject);
// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(185);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);
;// CONCATENATED MODULE: ./model/addons.js


const addonSchema = new (external_mongoose_default()).Schema({
  active: Boolean,
  delete: Boolean,
  event_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'events'
  }],
  name: String,
  once_per_order: Boolean,
  price: String,
  show_multiple_time: Boolean,
  avatar_or_icon: String,
  color_code: String,
  duration_minutes: (double_default()),
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  variant: [{
    name: String,
    price: String
  }],
  workspace_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }]
});
const AddOn = external_mongoose_default().model('addons', addonSchema, 'addons');
/* harmony default export */ const model_addons = (AddOn);
;// CONCATENATED MODULE: ./model/address.js

const addressSchema = new (external_mongoose_default()).Schema({
  address1: String,
  address2: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  business_branch: Boolean,
  address_phone: [{
    name: String,
    phone_type: String,
    country_code: String,
    no: String,
    Ext: String
  }],
  email: String,
  customer_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'customer'
  },
  workspace_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }],
  site_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  }]
});
const Address = external_mongoose_default().model('address', addressSchema, 'address');
/* harmony default export */ const model_address = (Address);
;// CONCATENATED MODULE: ./model/booking.js


var progressSchema = new (external_mongoose_default()).Schema({
  date_time: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Booked"
  }
});
const bookingSchema = new (external_mongoose_default()).Schema({
  add_on_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'addons'
  }],
  amount_paid: Number,
  appointment_booking_time: {
    type: Date,
    default: Date.now
  },
  appointment_end_time: Date,
  appointment_start_time: Date,
  appointment_time_before_reschedule: [Date],
  cost: (double_default()),
  created_at: Date,
  answer_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'answer'
  },
  created_by: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'staff'
  },
  created_from: String,
  customer_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'customer'
  }],
  customer_mood: String,
  customer_status: String,
  Is_cancelled: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleted_at: Date,
  booked_by: String,
  progress: [{
    date_time: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: "Booked"
    }
  }],
  buffer_after_min: Number,
  buffer_before_min: Number,
  duration_hours: Number,
  duration_minutes: Number,
  event_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'events'
  },
  is_recurring: Boolean,
  is_rescheduled: Boolean,
  is_review_given: Boolean,
  location_link: String,
  location_setting_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'locationsetting'
  },
  note: String,
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  slot: Number,
  staff_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'staff'
  },
  timezone: String,
  transfered_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'staff'
  }],
  type: String,
  updated_at: Date,
  workspace_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }
});
const Booking = external_mongoose_default().model('booking', bookingSchema, 'booking');
/* harmony default export */ const model_booking = (Booking); // arrival_status: String,
// assignee_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'staff'}],
// booked_by: String,
// booking_id: Number,
// discount_amount: Number,
// discount_applied: Boolean,
// discount_available: Boolean,
// discount_code: String,
// discount_id: { type: mongoose.Schema.Types.ObjectId, ref: 'discountcoupon'},
// extra_time_is_blocking: Boolean,
// gift_card_amount: Number,
// gift_card_applied: Boolean,
// gift_card_available: Boolean,
// gift_card_id: { type: mongoose.Schema.Types.ObjectId, ref: 'giftcard'},
// guest_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer'}],
// integration: String,
// is_approved: Boolean,
// is_asked_for_review: Boolean,
// Is_cancelled: Boolean,
// is_failed: Boolean,
// is_multi_service: Boolean,
// is_offer_applied: Boolean,
// is_offer_available: Boolean,
// is_paid: Boolean,
// offer_amount: Number,
// order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'order'},
// payment_mode_id: Number,
// platform: String,
// price_type: String,
// progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookingprogress'}],
// reference: String,
// resource_id: Number,
// room_id: String,
//  */
;// CONCATENATED MODULE: ./model/business.js

const businessSchema = new (external_mongoose_default()).Schema({
  business_info_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'businessinfo'
  }],
  display_name: String,
  name: String,
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  workspace_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }]
});
const Business = external_mongoose_default().model('business', businessSchema, 'business');
/* harmony default export */ const model_business = (Business);
/*
social_network: [BusinessSocial_network],
email_signature: String,
showSocialShare: Boolean,

staff_size: Int,
type: String,
updated_at: DateTime,
web_url: String,

accessible: Boolean,
active: Boolean,
avatar_or_icon: String,
avatar_or_icon_path: String,
business_branch: String,

color_code: String,
created_at: DateTime,
created_by: Staff,
delete: Boolean,
deleted_at: DateTime,
description: String,
*/
;// CONCATENATED MODULE: ./model/businessinfo.js

const businessInfoSchema = new (external_mongoose_default()).Schema({
  business_hour_end: Number,
  business_hour_start: Number,
  restrictedDays: [Date],
  time_zone: String,
  timing_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'timings'
  }],
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  workspace_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }]
});
const BusinessInfo = external_mongoose_default().model('businessinfo', businessInfoSchema, 'businessinfo');
/* harmony default export */ const model_businessinfo = (BusinessInfo);
/*
 accessible: Boolean,
  active: Boolean,
  
  bookingLinks: String,
  created_at: Date,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'staff' },
  date_format: String,
  delete: Boolean,
  deleted_at: Date,
  first_day: Number,
  is_tax: Boolean,
  updated_at: Date,
  
  tax_no: String,
  tax_percentage: Number,

business_sub_category: [Businesscategory],
business_category: [Businesscategory],
address_ids: [Address],
policy: BusinessinfoPolicy,
time_format_id: Timeformat,
*/
;// CONCATENATED MODULE: ./model/customer.js

const customerSchema = new (external_mongoose_default()).Schema({
  address_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'address'
  },
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  booking_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'booking'
  }],
  color_code: String,
  date_of_birth: String,
  description: String,
  phone: [{
    country_code: String,
    is_verified: Boolean,
    name: String,
    no: String
  }],
  display_name: String,
  email: String,
  email_verified_date_time: String,
  first_name: String,
  gender: String,
  is_email_verified: Boolean,
  last_name: String,
  name: String,
  registeredUsing: String,
  registration_date: String,
  slug: String,
  source: String,
  timezone: String
});
const Customer = external_mongoose_default().model('customer', customerSchema, 'customer');
/* harmony default export */ const model_customer = (Customer);
/*



discount_coupon_ids: [Discountcoupon],
gift_card_ids: [Giftcard],
order_ids: [Order],

profile: CustomerProfile,


phone - type: String
*/
;// CONCATENATED MODULE: ./model/events.js

const eventSchema = new (external_mongoose_default()).Schema({
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  duration_hours: Number,
  duration_minutes: Number,
  description: String,
  price: String,
  special_price: String,
  retailPrice: String,
  isformrequired: Boolean,
  isform: Boolean,
  form_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'form'
  },
  add_on_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'addons'
  }],
  business_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'business'
  }],
  business_timings: Boolean,
  workspace_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  },
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  timing_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'timings'
  }],
  location_setting_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'locationsetting'
  }],
  staff: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'staff'
  }]
});
const Event = external_mongoose_default().model('events', eventSchema, 'events');
/* harmony default export */ const model_events = (Event);
;// CONCATENATED MODULE: ./model/location.js

const locationSchema = new (external_mongoose_default()).Schema({
  active: Boolean,
  app_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'app'
  },
  app_integration_need: Boolean,
  avatar_or_icon_path: String,
  deleted: Boolean,
  icon: String,
  name: String,
  type: String,
  type_param: Boolean
});
const Location = external_mongoose_default().model('location', locationSchema, 'location');
/* harmony default export */ const model_location = (Location);
;// CONCATENATED MODULE: ./model/locationsetting.js

const locationsettingSchema = new (external_mongoose_default()).Schema({
  workspace_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  },
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  location_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'location'
  },
  inperson: {
    buinsess_address: Boolean,
    buinsess_id: {
      type: (external_mongoose_default()).Schema.Types.ObjectId,
      ref: 'business'
    },
    client_address: Boolean
  },
  oncall: {
    client_will_call: Boolean,
    staff_will_call: Boolean
  },
  video: {
    integration_id: String,
    video_type: String
  }
});
const LocationSetting = external_mongoose_default().model('locationsetting', locationsettingSchema, 'locationsetting');
/* harmony default export */ const model_locationsetting = (LocationSetting);
;// CONCATENATED MODULE: ./model/site.js

const siteSchema = new (external_mongoose_default()).Schema({
  name: String,
  workspace_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }]
});
const Site = external_mongoose_default().model('site', siteSchema, 'site');
/* harmony default export */ const model_site = (Site);
;// CONCATENATED MODULE: ./model/staff.js

const staffSchema = new (external_mongoose_default()).Schema({
  //name,color,logo,timing,and location
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  description: String,
  price: String,
  workspace_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }],
  site_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  }],
  staff_detail_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'staffdetails'
  }]
});
const Staff = external_mongoose_default().model('staff', staffSchema, 'staff');
/* harmony default export */ const model_staff = (Staff);
;// CONCATENATED MODULE: ./model/staffdetails.js

const staffDetailsSchema = new (external_mongoose_default()).Schema({
  business_timings: Boolean,
  sorting_id: Number,
  description: String,
  price: String,
  business_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'business'
  }],
  workspace_id: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }],
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  address_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'address'
  }],
  timing_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'timings'
  }],
  events_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'events'
  }],
  location_setting_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'locationsetting'
  }]
});
const StaffDetails = external_mongoose_default().model('staffdetails', staffDetailsSchema, 'staffdetails');
/* harmony default export */ const model_staffdetails = (StaffDetails);
;// CONCATENATED MODULE: ./model/timings.js

const timingtimingSchema = new (external_mongoose_default()).Schema({
  business_hour: Boolean,
  business_location_setting_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'locationsetting'
  }],
  custom_hour: Boolean,
  include_weekends: Boolean,
  location_setting_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'locationsetting'
  }],
  time_zone: String,
  timing_order: Number,
  timings: [{
    breaktime: [{
      end_time: String,
      start_time: String
    }],
    name: String,
    start_time: String,
    end_time: String,
    work_day_duration: Number,
    work_day_id: Number,
    work_day_name: String,
    is_override_block: Boolean,
    recurringRule: {
      freq: String,
      repeatEvery: Number,
      until: Date
    },
    service_ids: [(external_mongoose_default()).Schema.Types.ObjectId]
  }],
  timing_type: String,
  workspace_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }],
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  }
});
const Timing = external_mongoose_default().model('timings', timingtimingSchema, 'timings');
/* harmony default export */ const model_timings = (Timing);
;// CONCATENATED MODULE: ./model/workspace.js

const workspaceSchema = new (external_mongoose_default()).Schema({
  name: String,
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  }
});
const Workspace = external_mongoose_default().model('workspace', workspaceSchema, 'workspace');
/* harmony default export */ const model_workspace = (Workspace);
;// CONCATENATED MODULE: ./model/settings.js

const settingSchema = new (external_mongoose_default()).Schema({
  advance_Booking_Period: Number,
  client_time_slot: Number,
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  workspace_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }
});
const Setting = external_mongoose_default().model('settings', settingSchema, 'settings');
/* harmony default export */ const model_settings = (Setting);
;// CONCATENATED MODULE: ./model/appintegration.js


const appintegrationSchema = new (external_mongoose_default()).Schema({
  app_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'app'
  },
  chat_id_or_no: String,
  deleted: Boolean,
  is_installed: Boolean,
  key: String,
  location_setting_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'locationsetting'
  },
  secret: String,
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  workspace_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }
});
const Appintegration = external_mongoose_default().model('appintegration', appintegrationSchema, 'appintegration');
/* harmony default export */ const model_appintegration = (Appintegration);
;// CONCATENATED MODULE: ./model/app.js


const appSchema = new (external_mongoose_default()).Schema({
  active: Boolean,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  category: String,
  color_code: String,
  deleted: Boolean,
  name: String,
  visible_page: String
});
const App = external_mongoose_default().model('app', appSchema, 'app');
/* harmony default export */ const model_app = (App);
;// CONCATENATED MODULE: ./model/form.js


const formSchema = new (external_mongoose_default()).Schema({
  active: Boolean,
  deleted: Boolean,
  expired_date: Date,
  form_data: String,
  form_type: String,
  name: String,
  slug: String,
  view_by: String,
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  workspace_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }]
});
const Form = external_mongoose_default().model('form', formSchema, 'form');
/* harmony default export */ const model_form = (Form);
;// CONCATENATED MODULE: ./model/answer.js


const answerSchema = new (external_mongoose_default()).Schema({
  answer: String,
  created_by: String,
  customer_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'customer'
  },
  form_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'form'
  },
  form_with_answer: String,
  staff_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'staff'
  },
  site_id: {
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'site'
  },
  workspace_ids: [{
    type: (external_mongoose_default()).Schema.Types.ObjectId,
    ref: 'workspace'
  }]
});
const Answer = external_mongoose_default().model('answer', answerSchema, 'answer');
/* harmony default export */ const model_answer = (Answer);
;// CONCATENATED MODULE: ./model/index.js
const mongoose = __webpack_require__(185);



















 // import BusinessInfo from './businessInfo';
// import EventCategory  from "./eventcategory"
// import Role  from './role'
// import User  from './user'
// import TimeFormat  from './timeformat'
//mongodb+srv://ananduse:3CTLbbttBT7wTZw@cluster0.zt0q7.mongodb.net/hmis?retryWrites=true&w=majority

const connectMongo = () => {
  return mongoose.connect("mongodb+srv://ananduse:3CTLbbttBT7wTZw@cluster1.zt0q7.mongodb.net/hmis?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
};

const model_models = {
  AddOn: model_addons,
  Address: model_address,
  Booking: model_booking,
  Business: model_business,
  Customer: model_customer,
  Events: model_events,
  Location: model_location,
  LocationSetting: model_locationsetting,
  Site: model_site,
  Staff: model_staff,
  StaffDetails: model_staffdetails,
  Timing: model_timings,
  Workspace: model_workspace,
  Setting: model_settings,
  BusinessInfo: model_businessinfo,
  appintegration: model_appintegration,
  app: model_app,
  form: model_form,
  answer: model_answer
};

/* harmony default export */ const model = (model_models);
;// CONCATENATED MODULE: ./graphql.js

 // import { ApolloServer } from 'apollo-server-express';







const PORT = process.env.PORT;
console.log('models : ', JSON.stringify(model)); // (async()=>{

let _context = ({
  req,
  res,
  connection
}) => ({
  req,
  res,
  models: model
});

const server = new external_apollo_server_lambda_namespaceObject.ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: _context
}); // await server.start();
// server.applyMiddleware({ app });
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't Find URL${req.originalUrl} on the server`, 404));
// })

connectMongo().then(() => {
  console.log("Connected To The MongoDB."); // app.listen({ port: PORT }, () => {
  //   console.log(`Apollo Server on http://localhost:${process.env.PORT}${server.graphqlPath}`);
  // })
}).catch(err => {
  console.log("DB Connection Server Error : ", err);
});
const graphqlHandler = server.createHandler({
  expressAppFromMiddleware(middleware) {
    const app = external_express_default()();
    app.use(external_cors_default()());
    app.use(middleware);
    app.use("/ApiSample", external_express_default()["static"](external_path_default().join(__dirname, './ApiSample')));
    console.log('I am from middleware');
    return app;
  }

}); // })()
// import { graphqlLambda } from 'apollo-server-lambda';
// //import { lambdaPlayground } from 'graphql-playground-middleware';
// import { makeExecutableSchema } from 'graphql-tools';
// //import { schema } from './schema';
// //import { resolvers } from './resolvers';
// let context =  async ({ req, connection, res }) => {
//   if (connection) {
//     return {
//       models
//     }
//   }
//   if (req) {
//     return {
//       models,
//       me: req.me,
//       res,
//       req
//     }
//   }
//   // return models
// }
// const myGraphQLSchema = makeExecutableSchema({
//   typeDefs: schema,
//   resolvers,
//   logger: console,
//   context
// });
// export const graphqlHandler = function graphqlHandler(event, context, callback) {
//   function callbackFilter(error, output) {
//     // eslint-disable-next-line no-param-reassign
//     output.headers['Access-Control-Allow-Origin'] = '*';
//     callback(error, output);
//   }
//   const handler = graphqlLambda({ schema: myGraphQLSchema });
//   return handler(event, context, callbackFilter);
// };
// // for local endpointURL is /graphql and for prod it is /stage/graphql
// // exports.playgroundHandler = lambdaPlayground({
// //   endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
// //     ? process.env.REACT_APP_GRAPHQL_ENDPOINT
// //     : '/production/graphql',
// // });
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=graphql.js.map