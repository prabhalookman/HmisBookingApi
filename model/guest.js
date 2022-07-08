import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: String,
  slug: String,
  first_name: String,
  last_name: String,
  phone: [
    {
      is_verified: Boolean,
      country_code: String,
      name: String,
      no: String,
      type: {type: String},
    },
  ],
  email: String,
  is_email_verified: Boolean,
  email_verified_date_time: Date,
  registration_date: Date,
  source: String,
  registeredUsing: String,
  booking_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "booking" }],
  invited_customer_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "customer" }],
  color_code: String,
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: "site" },
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "workspace" }],
  updated_at: {type: Date, default: Date.now}
});
const Guest = mongoose.model("guest", guestSchema, "guest");
export default Guest;
