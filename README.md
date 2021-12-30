# HMISRealmV1.0
Clone Realm Grapqhl

# Fields 
 - Document Fields & Operator Fields

# Operators :
 - Comparison Operator Fields (gt,gte,lt,lte,ne,in,nin) - Pass
 - Logical Operator Fields (AND, OR)
 - Element Operator Fields (exists)

### InputTypes 
  - InsertInput,UpdateInput,RelationInput,SortByInput

## Query Resolvers :
 - Find a Single Document (singular query) - Pass
 - Find Multiple Documents (plural query) - Pass
 
## Mutation Resolvers :
 - Insert a Single Document - Pass
 - Insert Multiple Documents - Pass
 - Update a Single Document - Pass
 - Update Multiple Documents - Pass
 - Upsert a Single Document - Pass
 - Replace a Single Document - Pass
 - Delete a Single Document - Pass
 - Delete Multiple Documents - Pass

## MongoDB 
MONGO_URL=mongodb://localhost:27017/HMISVRealm
PORT =4000

new grahql api endpoint
https://realm.mongodb.com/api/client/v2.0/app/schedule-spzut/graphql
token :
{
  "jwtTokenString":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJzdWIiOiIxMjMiLCJzY29wZSI6InNlbGYsIGFkbWlucyIsImF1ZCI6InNjaGVkdWxlLXNwenV0IiwianRpIjoiYzMyNDRmMmUtOTVkZS00NTYyLTkwOGYtYzMzMWY0OWMxNTlmIiwiaWF0IjoxNjI1NjYwODUyLCJleHAiOjE4NDE2NjA4NTJ9.iR5bmOpMc2Se-sDKADwb5GD3k_uisHUMa7xqvYh1VIY"
}

mongodb+srv://ananduse:<password>@cluster0.zt0q7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

New DB : mongodb+srv://ananduse:3CTLbbttBT7wTZw@cluster1.zt0q7.mongodb.net/hmis?retryWrites=true&w=majority

pass : 3CTLbbttBT7wTZw
db :hmis

mongodb+srv://ananduse:3CTLbbttBT7wTZw@cluster0.zt0q7.mongodb.net/hmis?authSource=admin&replicaSet=atlas-fyf4l0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true

# Note 
Note:

This is independent page , there is no any authentication only booking
so we need simple api which is provided only needed data
1.Staff - name,color,logo,timing,and location - only query
2.Event-name,color,logo,price,duration,timing,location-- only query
3.Business- Name and address and logo -- only query
4.Customer - name,ph,phone - insert
4.Booking -- insert , update
# HmisBookingApi

Git Token Auth : 
https://stackoverflow.com/questions/68775869/support-for-password-authentication-was-removed-please-use-a-personal-access-to

site_id : 60e2eead5a12d07c2bef058c
workspace_id : 611ba08d7dbdecf4c47091db

## Availability Logic

1. Business will be registered from the registration page with business basic informations and Business Timing
2. While adding a STAFF it will use BusinessId, SiteId, WorkspaceId
3. There are two type of Timing in the application 1) Business Hours, 2) Custom Hours
4. Business Hours timing details available in “Business_info” schema in ‘timing_id’ properties
5. While adding a STAFF/Event by default Business Hours will be selected

  a. ‘business_id’, ‘business_timings’, ‘location_settings_id’ and ‘timing_ids’ are available in “StaffDetails” schema

  b. If ‘business_timings’ is “true” we take the availability from ‘location_settings_id’ in staff details schema and timings from the business_info’s “timings_id”

  c. If ‘business_timings’ is “false” taken the timing_ids in staff details schema, timing array contain multiple location_setting_ids and timings array also

6. If the user selected “Custom Hours” , ‘business_id’ & ‘business_timings’ will  be ignored and the availability(location_settings_id) and timings will be taken from StaffDetails’s ‘timing_ids’

# 3 different function , 
getDate(siteid,workspaceid,staffid,service id),
getDate(siteid,workspaceid,service id),
getDate(siteid,workspaceid,staffid) 
based on that slot would be generate

# Slot
slot please check in setting collection  "client_time_slot" : 30,

slot you have to provide like this "booking_date":
"slot":[
{
     "no":1,
	 "start_time":"",
	 "end_time":"",
	 "available":true,
	 }
	 }

//

http://52.172.97.26:4000/graphql
http://52.172.97.26:4000/ApiSample/index.html (edited) 



http://52.172.97.26:4000/graphql
http://52.172.97.26:4000/ApiSample/index.html (edited) 

Lambda :
Local NVM ls : v15.2.1

service: apollo-lambda-01
provider:
  name: aws
  runtime: nodejs14.x
  region: ap-south-1
  ------
  Service Information
service: apollo-lambda-01
stage: dev
region: ap-south-1
stack: apollo-lambda-01-dev
resources: 11
api keys:
  None
endpoints:
  POST - https://pyvhrzj446.execute-api.ap-south-1.amazonaws.com/dev/
  GET - https://pyvhrzj446.execute-api.ap-south-1.amazonaws.com/dev/
functions:
  graphql: apollo-lambda-01-dev-graphql
layers:
  None

  -----
  Cloud sls Deployment During local running state :
  nvm ls
  v12.16.0
  -> v12.20.2
  v15.2.1

  Local : http://localhost:4000/graphql
