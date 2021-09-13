https://realm.mongodb.com/api/client/v2.0/app/schedule-spzut/graphql
workspace_id : 61371329d1e928fce074c397 - Navan
site_id: 61371329d1e928fce074c398 - Navaneeth

mutation{
    insertOneSite(data:{name:"Navan", active: true}){
      _id
      name
      active
    }
  }
  
  mutation {
    insertOneWorkspace(
      data: {
        name: "Navan"
        active: true
        site_id: { create: { name: "Navaneeth", active: true } }
      }
    ) {
      _id
      name
      active
      site_id {
        _id
        name
        active
      }
    }
  }
  {
    "data": {
      "insertOneWorkspace": {
        "_id": "61371329d1e928fce074c397",
        "active": true,
        "name": "Navan",
        "site_id": {
          "_id": "61371329d1e928fce074c398",
          "active": true,
          "name": "Navaneeth"
        }
      }
    }
  }
  ---
  mutation {
    updateOneStaff(
      query: { _id: "60f04f3e70da4e9694f41765" }
      set: {
        site_id: { link: ["61371329d1e928fce074c398"] }
        workspace_ids: { link: ["61371329d1e928fce074c397"] }
      }
    ) {
      _id
      name
      site_id {
        _id
        name
      }
      workspace_ids {
        _id
        name
      }
    }
  }
  ---
  {
    "data": {
      "updateOneStaffdetail": {
        "_id": "612ee8133b64c2a30642557b",
        "active": true,
        "is_service_provider": false,
        "site_id": {
          "_id": "613725a990ca67ac4d9edd94",
          "name": "Navaneeth_S"
        },
        "workspace_ids": [
          {
            "_id": "613725aa90ca67ac4d9edda5",
            "name": "Navaneeth_W"
---
query{
    sites{
      _id
      name
      active
    }
  }

  query {
    workspaces {
      _id
      name
      site_id {
        _id
        name
      }
    }
  }

  query {
    staffdetail(query: { _id: "60f04f3e70da4e9694f41765" }) {
      _id
      active
      address_ids {
        _id
        country
      }
      booking_url
      business_id {
        _id
        display_name
      }
      business_timings
      deafult_calendar_view
      delete
      events_ids {
        _id
        timing_ids {
          _id
          type
          include_weekends
          timings {
            name
            work_day_id
            work_day_name
          }
          business_location_setting_ids {
            _id
          }
          location_setting_ids {
            _id
            inperson {
              buinsess_address
              buinsess_id {
                _id
                name
                display_name
              }
            }
            oncall {
              client_will_call
            }
            video {
              type
            }
            location_id {
              type
              name
            }
          }
        }
      }
      invitationStatus
      invitation_status_accept
      is_login
      is_service_provider
      is_sync_enabled
      location_setting_ids {
        _id
        inperson {
          buinsess_address
          buinsess_id {
            _id
            name
            display_name
          }
        }
        oncall {
          client_will_call
        }
        video {
          type
        }
        location_id {
          type
          name
        }
      }
      paid_plan_commission
      product_commission
      service_commission
      site_id {
        _id
        name
      }
      sortingId
      sorting_id
      staff_commission
      staff_group_id {
        _id
        group_name
      }
      sync {
        key
        type
      }
      timing_ids: timing_ids {
        _id
        type
        include_weekends
        timings {
          name
          work_day_id
          work_day_name
        }
        business_location_setting_ids {
          _id
        }
        location_setting_ids {
          _id
          inperson {
            buinsess_address
            buinsess_id {
              _id
              name
              display_name
            }
          }
          oncall {
            client_will_call
          }
          video {
            type
          }
          location_id {
            type
            name
          }
        }
      }
      voucher_commission
      workspace_ids {
        _id
        name
      }
    }
  }
--
  query{
    staffdetails(query:{location_setting_ids_exists:true}){
      _id
      location_setting_ids{
        _id
      }
      
      timing_ids{
        _id
        timings{
          work_day_name
        }
      }
    }
  }

  --
  query{
    staffs{
      _id
      name
      staff_detail_id{
        _id      
      }
    }
  }