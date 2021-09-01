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