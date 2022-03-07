import { ObjectId } from 'bson';
export function aggregate_bhf(_ids, root, bizhours, eventid) {
   let pipeline = []
  
    if (root == 'event') {
      let match = {}
  
    match["events._id"] = ObjectId(_ids)
    match['events.business_timings'] = false
    const bhf = event_business_hours_false ()
    pipeline = [...bhf]
      pipeline.push(
        // event_business_hours_false()
        { '$match': match },
        {
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
        })
        console.log(`\n aggregate_bhf pipeline  EVENT ID ${_ids} :: ${JSON.stringify(pipeline)} `);
    } else {
      let match = {}
  
    match["staff._id"] = ObjectId(_ids)
      const bhf = staff_business_hours_false ()
    pipeline = [...bhf]
      pipeline.push(
        { '$match': match },
        {
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
        }
      )
      console.log(`\n aggregate_bhf pipeline  STAFF ID ${_ids} :: ${JSON.stringify(pipeline)} `);
    }
    
    return pipeline
  }
  
export function aggregate_bht(_ids, root, bizhours) {
    let pipeline = []
  
    if (root == 'event') {
      let match = {}
  
    match["events._id"] = ObjectId(_ids)
    
    const bht = event_business_hours_true ()
    pipeline = [...bht]
      match['events.business_timings'] = true
      pipeline.push(
  
        { '$match': match },
        {
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
        })
        console.log(`\n aggregate_bht pipeline EVENT ${_ids} : `, JSON.stringify(pipeline));
    } else {
      let match = {}
  
    match["staff._id"] = ObjectId(_ids)
      const bht = staff_business_hours_true()
    pipeline = [...bht]
      pipeline.push(
  
        { '$match': match },
        {
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
        }
      )
      console.log(`\n aggregate_bht pipeline  STAFF ID ${_ids} :: ${JSON.stringify(pipeline)} `);
      
    }
    
    return pipeline
  }
  
  
export  function get_staffdetail_agg(_ids,workspace_id,site_id) {
    let match = {}
  
    match["staff._id"] = ObjectId(_ids)
    match["staff.workspace_ids"] = ObjectId(workspace_id)
    match["staff.site_id"] = ObjectId(site_id)

    let pipeline = []
  
    pipeline.push({ '$project': { staff: '$$ROOT' } },
      {
        '$lookup': {
          localField: 'staff.staff_detail_id',
          from: 'staffdetails',
          foreignField: '_id',
          as: 'staffdetails'
        }
      },
      { '$match': match },
      {
        "$facet": {
          'staffDetails': [
            {
              '$unwind': { path: '$staffdetails', preserveNullAndEmptyArrays: false }
            },
            {
              '$project': {
                'business_timings': '$staffdetails.business_timings',
              }
            }
  
          ],
          'events': [
            {
              "$lookup": {
                "localField": "staff.staff_detail_id",
                "from": "staffdetails",
                "foreignField": "_id",
                "as": "staffdetails"
              }
            },
            {
              '$unwind': { path: '$staffdetails', preserveNullAndEmptyArrays: false }
            },
            {
              '$lookup': {
                localField: 'staffdetails.events_ids',
                from: 'events',
                foreignField: '_id',
                as: 'events'
              }
            },
            {
              '$unwind': { path: '$events', preserveNullAndEmptyArrays: false }
            },
            {
              '$project': {
                'events': '$events._id',
                'event_business_timings': '$events.business_timings',
              }
            }
          ]
        }
      },
      {
        '$project': {
          'staffDetails': '$staffDetails',
          'events': '$events'
        }
      })
  
    console.log('\n get_staffdetail_agg : ', JSON.stringify(pipeline) )
  
    return pipeline
  }
  
export  function get_staff_locationsettings_agg_bht(_ids,workspace_id,site_id) {
    let match = {}
    match["staff._id"] = ObjectId(_ids)
    match["staff.workspace_ids"] = ObjectId(workspace_id)
    match["staff.site_id"] = ObjectId(site_id)
    let pipeline = []
    const bht = staff_business_hours_true ()
    pipeline = [...bht]
    pipeline.push(
  {
     '$match': match ,
  },
  { 
    "$facet" : { 
        "locationSetting" : [
            
            { 
                "$project" : { 
                    "locationsetting_id" : "$locationsetting._id", 
                    "appintegration_id" : "$locationsetting.integration_id", 
                    "is_installed" : "$appintegration.is_installed",
                    "app_name": "$app.name",
                    "location_id" : "$location._id", 
                    "location_type" : "$location.type", 
                    "location_name" : "$location.name",
                    "location_app_integration_need" : "$location.app_integration_need"
                }
            }
        ], 
        "location" : [
            { 
                "$unwind" : { 
                    "path" : "$location", 
                    "preserveNullAndEmptyArrays" : false
                }
            }, 
            { 
                "$project" : { 
                    "location_id" : "$location._id", 
                    "location_type" : "$location.type", 
                    "location_name" : "$location.name"
                }
            }
        ]
    }
}, 
  {
      "$project": {
          "locationsetting": "$locationSetting",
          "location_type": "$location"
  
      }
  })
  console.log('\n get_staff_locationsettings_agg_bht : ', JSON.stringify(pipeline) )
  return pipeline
  }
  
export  function get_staff_locationsettings_agg_bhf(_ids,workspace_id,site_id) {
    let match = {}
    match["staff._id"] = ObjectId(_ids)
    match["staff.workspace_ids"] = ObjectId(workspace_id)
    match["staff.site_id"] = ObjectId(site_id)
    let pipeline = []
    const bht = staff_business_hours_false ()
    pipeline = [...bht]
    pipeline.push(
      {
         '$match': match ,
      },
      {
          "$facet": {
              "locationSetting": [
                  
                  {
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
                  }
              ],
      
              "location": [
                  {
                      "$unwind": {
                          "path": "$location",
                          "preserveNullAndEmptyArrays": false
                      }
                  },
                  {
                      "$project": {
                          "location_id": "$location._id",
                          "location_type": "$location.type",
                          "location_name": "$location.name"
                      }
                  }
              ]
          }
      },
      {
          "$project": {
              "locationsetting": "$locationSetting",
              "location_type": "$location"
      
          }
      })
    console.log('\n get_staff_locationsettings_agg_bhf : ', JSON.stringify(pipeline) )
    return pipeline
      
  }

  export  function get_event_locationsettings_agg_bht(_ids,workspace_id,site_id) {
    let match = {}
    match["events._id"] = ObjectId(_ids)
    match["events.workspace_id"] = ObjectId(workspace_id)
    match["events.site_id"] = ObjectId(site_id)
    let pipeline = []
    const bht = event_business_hours_true ()
    pipeline = [...bht]
    pipeline.push(
  {
     '$match': match ,
  },
  { 
    "$facet" : { 
        "locationSetting" : [
            
            { 
                "$project" : { 
                    "locationsetting_id" : "$locationsetting._id", 
                    "appintegration_id" : "$locationsetting.integration_id", 
                    "is_installed" : "$appintegration.is_installed",
                    "app_name": "$app.name",
                    "location_id" : "$location._id", 
                    "location_type" : "$location.type", 
                    "location_name" : "$location.name",
                    "location_app_integration_need" : "$location.app_integration_need"
                }
            }
        ], 
        "location" : [
            { 
                "$unwind" : { 
                    "path" : "$location", 
                    "preserveNullAndEmptyArrays" : false
                }
            }, 
            { 
                "$project" : { 
                    "location_id" : "$location._id", 
                    "location_type" : "$location.type", 
                    "location_name" : "$location.name"
                }
            }
        ]
    }
}, 
  {
      "$project": {
          "locationsetting": "$locationSetting",
          "location_type": "$location"
  
      }
  })
  console.log('\n get_event_locationsettings_agg_bht : ', JSON.stringify(pipeline) )
  return pipeline
  }
  
export  function get_event_locationsettings_agg_bhf(_ids,workspace_id,site_id) {
    let match = {}
    match["events._id"] = ObjectId(_ids)
    match["events.workspace_id"] = ObjectId(workspace_id)
    match["events.site_id"] = ObjectId(site_id)
    let pipeline = []
    const bht = event_business_hours_false ()
    pipeline = [...bht]
    pipeline.push(
      {
         '$match': match ,
      },
      {
          "$facet": {
              "locationSetting": [
                  
                  {
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
                  }
              ],
      
              "location": [
                  {
                      "$unwind": {
                          "path": "$location",
                          "preserveNullAndEmptyArrays": false
                      }
                  },
                  {
                      "$project": {
                          "location_id": "$location._id",
                          "location_type": "$location.type",
                          "location_name": "$location.name"
                      }
                  }
              ]
          }
      },
      {
          "$project": {
              "locationsetting": "$locationSetting",
              "location_type": "$location"
      
          }
      })
    console.log('\n get_events_locationsettings_agg_bhf : ', JSON.stringify(pipeline) )
    return pipeline
      
  }
  
export  function staff_business_hours_true() {
    let pipline = [];
    pipline.push({ 
      "$project" : { 
          "staff" : "$$ROOT"
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "staff.staff_detail_id", 
          "from" : "staffdetails", 
          "foreignField" : "_id", 
          "as" : "staffdetails"
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "staffdetails.business_id", 
          "from" : "business", 
          "foreignField" : "_id", 
          "as" : "business"
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "business.business_info_ids", 
          "from" : "businessinfo", 
          "foreignField" : "_id", 
          "as" : "businessinfo"
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "businessinfo.timing_ids", 
          "from" : "timings", 
          "foreignField" : "_id", 
          "as" : "timings"
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "staffdetails.location_setting_ids", 
          "from" : "locationsetting", 
          "foreignField" : "_id", 
          "as" : "locationsetting"
      }
  }, 
  { 
      "$unwind" : { 
          "path" : "$locationsetting", 
          "preserveNullAndEmptyArrays" : false
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "locationsetting.integration_id", 
          "from" : "appintegration", 
          "foreignField" : "_id", 
          "as" : "appintegration"
      }
  },
  { 
      "$lookup" : { 
          "localField" : "appintegration.app_id", 
          "from" : "app", 
          "foreignField" : "_id", 
          "as" : "app"
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "locationsetting.location_id", 
          "from" : "location", 
          "foreignField" : "_id", 
          "as" : "location"
      }
  }
      )
    return pipline
    //console.log(`\n staff_business_hours_true : ${JSON.stringify(pipline) } `)
  }
  
export  function staff_business_hours_false() {
    let pipline = [];
    pipline.push({
      "$project": {
        "staff": "$$ROOT"
      }
    },
    {
      "$lookup": {
          "localField": "staff.staff_detail_id",
          "from": "staffdetails",
          "foreignField": "_id",
          "as": "staffdetails"
      }
  },
  {
      "$lookup": {
          "localField": "staffdetails.timing_ids",
          "from": "timings",
          "foreignField": "_id",
          "as": "timings"
      }
  },
  {
      "$unwind": {
          "path": "$timings",
          "preserveNullAndEmptyArrays": false
      }
  },
  {
      "$lookup": {
          "localField": "timings.location_setting_ids",
          "from": "locationsetting",
          "foreignField": "_id",
          "as": "locationsetting"
      }
  },
  {
      "$unwind": {
          "path": "$locationsetting",
          "preserveNullAndEmptyArrays": false
      }
  },
  {
      "$lookup": {
          "localField": "locationsetting.integration_id",
          "from": "appintegration",
          "foreignField": "_id",
          "as": "appintegration"
      }
  },
  {
      "$lookup": {
          "localField": "appintegration.app_id",
          "from": "app",
          "foreignField": "_id",
          "as": "app"
      }
  },
  {
      "$lookup": {
          "localField": "locationsetting.location_id",
          "from": "location",
          "foreignField": "_id",
          "as": "location"
      }
  })
    return pipline
    //console.log(`\n staff_business_hours_false : ${JSON.stringify(pipline) } `)
  }

export function event_business_hours_true() {
  let pipline = [];
  pipline.push({
    "$project": {
        "events": "$$ROOT"
    }
},
{ 
    "$lookup" : { 
        "localField" : "events.business_id", 
        "from" : "business", 
        "foreignField" : "_id", 
        "as" : "business"
    }
}, 
{ 
    "$lookup" : { 
        "localField" : "business.business_info_ids", 
        "from" : "businessinfo", 
        "foreignField" : "_id", 
        "as" : "businessinfo"
    }
}, 
{ 
    "$lookup" : { 
        "localField" : "businessinfo.timing_ids", 
        "from" : "timings", 
        "foreignField" : "_id", 
        "as" : "timings"
    }
}, 
{ 
    "$lookup" : { 
        "localField" : "events.location_setting_ids", 
        "from" : "locationsetting", 
        "foreignField" : "_id", 
        "as" : "locationsetting"
    }
}, 
{ 
    "$unwind" : { 
        "path" : "$locationsetting", 
        "preserveNullAndEmptyArrays" : false
    }
}, 
{ 
    "$lookup" : { 
        "localField" : "locationsetting.integration_id", 
        "from" : "appintegration", 
        "foreignField" : "_id", 
        "as" : "appintegration"
    }
},
{ 
    "$lookup" : { 
        "localField" : "appintegration.app_id", 
        "from" : "app", 
        "foreignField" : "_id", 
        "as" : "app"
    }
}, 
{ 
    "$lookup" : { 
        "localField" : "locationsetting.location_id", 
        "from" : "location", 
        "foreignField" : "_id", 
        "as" : "location"
    }
}
    )
    console.log(`\n event_business_hours_true : ${JSON.stringify(pipline) } `)
  return pipline
  
}

export function event_business_hours_false() {
  let pipline = [];
    pipline.push(
      {
        "$project": {
            "events": "$$ROOT"
        }
    },

    {
        "$lookup": {
            "localField": "events.timing_ids",
            "from": "timings",
            "foreignField": "_id",
            "as": "timings"
        }
    },
    {
        "$unwind": {
            "path": "$timings",
            "preserveNullAndEmptyArrays": false
        }
    },
    {
        "$lookup": {
            "localField": "timings.location_setting_ids",
            "from": "locationsetting",
            "foreignField": "_id",
            "as": "locationsetting"
        }
    },
    {
      "$unwind": {
        "path": "$locationsetting",
        "preserveNullAndEmptyArrays": false
      }
    },
     {
        "$lookup": {
            "localField": "locationsetting.integration_id",
            "from": "appintegration",
            "foreignField": "_id",
            "as": "appintegration"
        }
    },
    {
        "$lookup": {
            "localField": "appintegration.app_id",
            "from": "app",
            "foreignField": "_id",
            "as": "app"
        }
    },
    {
        "$lookup": {
            "localField": "locationsetting.location_id",
            "from": "location",
            "foreignField": "_id",
            "as": "location"
        }
    },)
    console.log(`\n event_business_hours_false : ${JSON.stringify(pipline) } `)
  return pipline
    
}
  
  //To check staff_id is business_hours true or false
export  function bushiness_timings_agg(_id,workspace_id,site_id, type_o) {
    let pipline = [];
    let match = {}
  if(type_o == 'staff') {
    match["staff._id"] = ObjectId(_id)
    match["staff.workspace_ids"] = ObjectId(workspace_id)
    match["staff.site_id"] = ObjectId(site_id)
    pipline.push(
      {
          "$project": {
              "staff": "$$ROOT"
          }
      },
      {
          "$lookup": {
              "localField": "staff.staff_detail_id",
              "from": "staffdetails",
              "foreignField": "_id",
              "as": "staffdetails"
          }
      },
      {
          "$unwind": {
              "path": "$staffdetails",
              "preserveNullAndEmptyArrays": false
          }
      },
      {
          "$match": match
      }, {
          "$project": {
              "business_hours": "$staffdetails.business_timings"
          }
      })
  } else {
    match["events._id"] = ObjectId(_id)
    match["events.workspace_id"] = ObjectId(workspace_id)
    match["events.site_id"] = ObjectId(site_id)
    pipline.push(
      {
          "$project": {
              "events": "$$ROOT"
          }
      },
      
      {
          "$match": match
      }, {
          "$project": {
              "business_hours": "$events.business_timings"
          }
      })
  }
    console.log(`\n bushiness_timings_agg ${type_o} :  ${JSON.stringify(pipline)}` )
    return pipline
  }

  export  function get_staff_dd_locationsettings_agg_bht(_ids,workspace_id,site_id) {
    let match = {}
    match["staff._id"] = ObjectId(_ids)
    match["staff.workspace_ids"] = ObjectId(workspace_id)
    match["staff.site_id"] = ObjectId(site_id)
    let pipeline = [];
    pipeline.push(
      {
        $project: {
          staff: "$$ROOT",
        },
      },
      {
        $lookup: {
          localField: "staff.staff_detail_id",
          from: "staffdetails",
          foreignField: "_id",
          as: "staffdetails",
        },
      },
      {
          "$lookup" : {
              "localField": "staffdetails.events_ids",
              "from": "events",
              "foreignField": "_id",
              "as": "events"
          }
      },
      {
        $lookup: {
          localField: "staffdetails.business_id",
          from: "business",
          foreignField: "_id",
          as: "business",
        },
      },
      {
        $lookup: {
          localField: "business.business_info_ids",
          from: "businessinfo",
          foreignField: "_id",
          as: "businessinfo",
        },
      },
      {
        $lookup: {
          localField: "businessinfo.timing_ids",
          from: "timings",
          foreignField: "_id",
          as: "timings",
        },
      },
      {
        "$unwind": {
          "path": "$timings",
          "preserveNullAndEmptyArrays": false
        }
      },
      {
        $lookup: {
          localField: "staffdetails.location_setting_ids",
          from: "locationsetting",
          foreignField: "_id",
          as: "locationsetting",
        },
      },
      {
        $lookup: {
          localField: "locationsetting.integration_id",
          from: "appintegration",
          foreignField: "_id",
          as: "appintegration",
        },
      },
      {
        $lookup: {
          localField: "appintegration.app_id",
          from: "app",
          foreignField: "_id",
          as: "app",
        },
      },
      {
        $lookup: {
          localField: "locationsetting.location_id",
          from: "location",
          foreignField: "_id",
          as: "location",
        },
      },
      {
        $match: match,
      },
      {
        $facet: {
          locationSetting: [
            {
              $project: {
                locationsetting_id: "$locationsetting._id",
                location_name: "$location.name",
                timings_day: "$timings.timings.work_day_name",
                timings: "$timings",
                events: "$events.name",
                events_id: "$events._id",
                staff_id:"$staff._id"
              },
            },
          ],
        },
      },
      {
        $project: {
          locationsetting: "$locationSetting",
        },
      }
    );
  console.log('\n get_staff_dd_locationsettings_agg_bht : ', JSON.stringify(pipeline) )
  return pipeline
  }

  export  function get_staff_dd_locationsettings_agg_bhf(_ids,workspace_id,site_id) {
    let match = {}
    match["staff._id"] = ObjectId(_ids)
    match["staff.workspace_ids"] = ObjectId(workspace_id)
    match["staff.site_id"] = ObjectId(site_id)
    let pipeline = []

    pipeline.push(
      {
        "$project": {
          "staff": "$$ROOT"
        }
      },
      {
        "$lookup": {
            "localField": "staff.staff_detail_id",
            "from": "staffdetails",
            "foreignField": "_id",
            "as": "staffdetails"
        }
    },
    {
        "$lookup" : {
            "localField": "staffdetails.events_ids",
            "from": "events",
            "foreignField": "_id",
            "as": "events"
        }
    },
    {
        "$lookup": {
            "localField": "staffdetails.timing_ids",
            "from": "timings",
            "foreignField": "_id",
            "as": "timings"
        }
    },
    {
        "$unwind": {
            "path": "$timings",
            "preserveNullAndEmptyArrays": false
        }
    },
    {
        "$lookup": {
            "localField": "timings.location_setting_ids",
            "from": "locationsetting",
            "foreignField": "_id",
            "as": "locationsetting"
        }
    },
    {
        "$lookup": {
            "localField": "locationsetting.integration_id",
            "from": "appintegration",
            "foreignField": "_id",
            "as": "appintegration"
        }
    },
    {
        "$lookup": {
            "localField": "appintegration.app_id",
            "from": "app",
            "foreignField": "_id",
            "as": "app"
        }
    },
    {
        "$lookup": {
            "localField": "locationsetting.location_id",
            "from": "location",
            "foreignField": "_id",
            "as": "location"
        }
    },
      {
         '$match': match ,
      },
      {
          "$facet": {
              "locationSetting": [
                  
                  {
                      "$project": {
                        "locationsetting_id": "$locationsetting._id",
                        "location_name": "$location.name",
                        "timings_day": "$timings.timings.work_day_name",
                        "timings": "$timings",
                        "events_id": "$events._id",
                        "staff_id":"$staff._id"
                      }
                  }
              ],
      
              
          }
      },
      {
        "$project": {
          "locationsetting": "$locationSetting"
        }
      })
    console.log('\n get_staff_dd_locationsettings_agg_bhf : ', JSON.stringify(pipeline) )
    return pipeline
      
  }

  export  function get_event_dd_locationsettings_agg_bht(_ids,workspace_id,site_id) {
    let match = {}
    match["events._id"] = ObjectId(_ids)
    match["events.workspace_id"] = ObjectId(workspace_id)
    match["events.site_id"] = ObjectId(site_id)
    let pipeline = []
    pipeline.push(
      {
        "$project": {
            "events": "$$ROOT"
        }
    },
    {
      "$lookup": {
          "localField": "events.staff",
          "from": "staff",
          "foreignField": "_id",
          "as": "staff"
      }
  },
  {
      "$lookup": {
          "localField": "staff.staff_detail_id",
          "from": "staffdetails",
          "foreignField": "_id",
          "as": "staffdetails"
      }
  },
    { 
        "$lookup" : { 
            "localField" : "events.business_id", 
            "from" : "business", 
            "foreignField" : "_id", 
            "as" : "business"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "business.business_info_ids", 
            "from" : "businessinfo", 
            "foreignField" : "_id", 
            "as" : "businessinfo"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "businessinfo.timing_ids", 
            "from" : "timings", 
            "foreignField" : "_id", 
            "as" : "timings"
        }
    }, 
    { 
      "$unwind" : { 
          "path" : "$timings", 
          "preserveNullAndEmptyArrays" : false
      }
  }, 
    { 
        "$lookup" : { 
            "localField" : "events.location_setting_ids", 
            "from" : "locationsetting", 
            "foreignField" : "_id", 
            "as" : "locationsetting"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "locationsetting.integration_id", 
            "from" : "appintegration", 
            "foreignField" : "_id", 
            "as" : "appintegration"
        }
    },
    { 
        "$lookup" : { 
            "localField" : "appintegration.app_id", 
            "from" : "app", 
            "foreignField" : "_id", 
            "as" : "app"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "locationsetting.location_id", 
            "from" : "location", 
            "foreignField" : "_id", 
            "as" : "location"
        }
    },
  {
     '$match': match ,
  },
  { 
    "$facet" : { 
        "locationSetting" : [
            
            { 
                "$project" : { 
                  "locationsetting_id": "$locationsetting._id",
                  "location_name": "$location.name",
                  "timings_day": "$timings.timings.work_day_name",
                  "timings": "$timings",
                  "events": "$events",
                  "events_id": "$events._id",
                  "staff_id":"$staff._id"
                }
            }
        ]
    }
}, 
  {
      "$project": {
          "locationsetting": "$locationSetting",
      }
  })
  console.log('\n get_event_dd_locationsettings_agg_bht : ', JSON.stringify(pipeline) )
  return pipeline
  }

  export  function get_event_dd_locationsettings_agg_bhf(_ids,workspace_id,site_id) {
    let match = {}
    match["events._id"] = ObjectId(_ids)
    match["events.workspace_id"] = ObjectId(workspace_id)
    match["events.site_id"] = ObjectId(site_id)
    let pipeline = []
    pipeline.push(
      {
        "$project": {
            "events": "$$ROOT"
        }
    },
    {
      "$lookup": {
          "localField": "events.staff",
          "from": "staff",
          "foreignField": "_id",
          "as": "staff"
      }
  },
  {
      "$lookup": {
          "localField": "staff.staff_detail_id",
          "from": "staffdetails",
          "foreignField": "_id",
          "as": "staffdetails"
      }
  },
    {
        "$lookup": {
            "localField": "events.timing_ids",
            "from": "timings",
            "foreignField": "_id",
            "as": "timings"
        }
    },
    {
        "$unwind": {
            "path": "$timings",
            "preserveNullAndEmptyArrays": false
        }
    },
    {
        "$lookup": {
            "localField": "timings.location_setting_ids",
            "from": "locationsetting",
            "foreignField": "_id",
            "as": "locationsetting"
        }
    },
     {
        "$lookup": {
            "localField": "locationsetting.integration_id",
            "from": "appintegration",
            "foreignField": "_id",
            "as": "appintegration"
        }
    },
    {
        "$lookup": {
            "localField": "appintegration.app_id",
            "from": "app",
            "foreignField": "_id",
            "as": "app"
        }
    },
    {
        "$lookup": {
            "localField": "locationsetting.location_id",
            "from": "location",
            "foreignField": "_id",
            "as": "location"
        }
    },
      {
         '$match': match ,
      },
      {
          "$facet": {
              "locationSetting": [
                  
                  {
                      "$project": {
                        "locationsetting_id": "$locationsetting._id",
                        "location_name": "$location.name",
                        "timings_day": "$timings.timings.work_day_name",
                        "timings": "$timings",
                        "events_id": "$events._id",
                        "staff_id":"$staff._id"
                      }
                  }
              ]
          }
      },
      {
          "$project": {
              "locationsetting": "$locationSetting"
          }
      })
    console.log('\n get_events_dd_locationsettings_agg_bhf : ', JSON.stringify(pipeline) )
    return pipeline
      
  }
  
  export  let get_staff_locationName_bht_agg = (staff_id)=>{
    let match = { 
      "staff._id" : { 
          "$in" : staff_id
      }
  }
    let pipeline = []
    pipeline.push(
      { 
        "$project" : { 
            "staff" : "$$ROOT"
        }
    }, 
    { 
      "$lookup" : { 
          "localField" : "staff.staff_detail_id", 
          "from" : "staffdetails", 
          "foreignField" : "_id", 
          "as" : "staffdetails"
      }
  }, 
    { 
        "$lookup" : { 
            "localField" : "staffdetails.location_setting_ids", 
            "from" : "locationsetting", 
            "foreignField" : "_id", 
            "as" : "locationsetting"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$locationsetting", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "locationsetting.location_id", 
            "from" : "location", 
            "foreignField" : "_id", 
            "as" : "location"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$location", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$match" : match
    }, 
    { 
        "$project" : { 
            "staff._id" : "$staff._id", 
            "staff.location_setting_ids" : "$staff.location_setting_ids", 
            "location.name" : "$location.name", 
            "location._id" : "$location._id", 
            "locationsetting._id": "$locationsetting._id",
        }
    }
    )
    console.log('\n get_staff_locationName_bht_agg : ', JSON.stringify(pipeline) )
    return pipeline
      
  }
  export  let get_staff_locationName_bhf_agg = (staff_id)=>{
    let match = { 
      "staff._id" : { 
          "$in" : staff_id
      }
  }
    let pipeline = []
    pipeline.push(
      { 
        "$project" : { 
            "staff" : "$$ROOT"
        }
    }, 
    { 
      "$lookup" : { 
          "localField" : "staff.staff_detail_id", 
          "from" : "staffdetails", 
          "foreignField" : "_id", 
          "as" : "staffdetails"
      }
  },  { 
    "$lookup" : { 
        "localField" : "staffdetails.timing_ids", 
        "from" : "timings", 
        "foreignField" : "_id", 
        "as" : "timings"
    }
},
    { 
        "$lookup" : { 
            "localField" : "timings.location_setting_ids", 
            "from" : "locationsetting", 
            "foreignField" : "_id", 
            "as" : "locationsetting"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$locationsetting", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "locationsetting.location_id", 
            "from" : "location", 
            "foreignField" : "_id", 
            "as" : "location"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$location", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$match" : match
    }, 
    { 
        "$project" : { 
            "staff._id" : "$staff._id", 
            "staff.location_setting_ids" : "$staff.location_setting_ids", 
            "location.name" : "$location.name", 
            "location._id" : "$location._id", 
            "locationsetting._id": "$locationsetting._id",
        }
    }
    )
    console.log('\n get_staff_locationName_bhf_agg : ', JSON.stringify(pipeline) )
    return pipeline
      
  }
  export  let get_event_locationName_bht_agg = (event_ids)=>{
    let match = { 
      "events._id" : { 
          "$in" : event_ids
      }
  }
    let pipeline = []
    pipeline.push(
      { 
        "$project" : { 
            "events" : "$$ROOT"
        }
    },
    { 
        "$lookup" : { 
            "localField" : "events.location_setting_ids", 
            "from" : "locationsetting", 
            "foreignField" : "_id", 
            "as" : "locationsetting"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$locationsetting", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "locationsetting.location_id", 
            "from" : "location", 
            "foreignField" : "_id", 
            "as" : "location"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$location", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$match" : match
    }, 
    { 
        "$project" : { 
            "events._id" : "$events._id", 
            "events.location_setting_ids" : "$events.location_setting_ids", 
            "location.name" : "$location.name", 
            "location._id" : "$location._id", 
            "locationsetting._id": "$locationsetting._id",
        }
    }
    )
    console.log('\n get_event_locationName_bht_agg : ', JSON.stringify(pipeline) )
    return pipeline
      
  }
  export  let get_event_locationName_bhf_agg = (event_ids)=>{
    let match = { 
      "events._id" : { 
          "$in" : event_ids
      }
  }
    let pipeline = []
    pipeline.push(
      { 
        "$project" : { 
            "events" : "$$ROOT"
        }
    },
    {
      "$lookup": {
        "localField": "events.timing_ids",
        "from": "timings",
        "foreignField": "_id",
        "as": "timings"
      }
    },
    {
      "$lookup": {
        "localField": "timings.location_setting_ids",
        "from": "locationsetting",
        "foreignField": "_id",
        "as": "locationsetting"
      }
    },
    {
      "$unwind": {
        "path": "$locationsetting",
        "preserveNullAndEmptyArrays": false
      }
    },
    { 
        "$lookup" : { 
            "localField" : "locationsetting.location_id", 
            "from" : "location", 
            "foreignField" : "_id", 
            "as" : "location"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$location", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$match" : match
    }, 
    { 
        "$project" : { 
            "events._id" : "$events._id", 
            "events.location_setting_ids" : "$events.location_setting_ids", 
            "location.name" : "$location.name", 
            "location._id" : "$location._id", 
            "locationsetting._id": "$locationsetting._id",
        }
    }
    )
    console.log('\n get_event_locationName_bhf_agg : ', JSON.stringify(pipeline) )
    return pipeline
      
  }
  export  let get_staff_event_locationName_bhf_agg = (locationsett_ids)=>{
    //let match = {}
    //match["staff._id"] = ObjectId(staff_id)
    let match = { 
      "timings._id" : { 
          "$in" : locationsett_ids
      }
  }
    let pipeline = []
    pipeline.push(
      { 
        "$project" : { 
            "timings" : "$$ROOT"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "timings.location_setting_ids", 
            "from" : "locationsetting", 
            "foreignField" : "_id", 
            "as" : "locationsetting"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$locationsetting", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "locationsetting.location_id", 
            "from" : "location", 
            "foreignField" : "_id", 
            "as" : "location"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$location", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$match" : match
    }, 
    { 
        "$project" : { 
            "timings._id" : "$timings._id", 
            "timings.location_setting_ids" : "$timings.location_setting_ids", 
            "location.name" : "$location.name", 
            "location._id" : "$location._id", 
            "locationsetting._id": "$locationsetting._id",
        }
    }
    )
    console.log('\n get_staff_event_locationName_bhf_agg : ', JSON.stringify(pipeline) )
    return pipeline
      
  }

  export  let get_locationsettings_agg = (_id)=>{
    let match = {}
    match["locationsetting._id"] = ObjectId(_id)
    let pipeline = []
    pipeline.push({
      "$project": {
          "locationsetting": "$$ROOT"
      }
  },
  {
      "$lookup": {
          "localField": "locationsetting.location_id",
          "from": "location",
          "foreignField": "_id",
          "as": "location"
      }
  },

  {
      "$project": {
          "locationsetting": "$locationsetting",
          "location": "$location"
      }
  },{
    '$match': match 
 },)
    console.log('\n get_locationsettings_agg : ', JSON.stringify(pipeline) )
    return pipeline
      
  }

  export  let get_staffdetails_agg = (staff_id)=>{
    let match = {}
    match["staff._id"] = ObjectId(staff_id)
    let pipeline = []
    pipeline.push({ 
      "$project" : { 
          "staff" : "$$ROOT"
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "staff.staff_detail_id", 
          "from" : "staffdetails", 
          "foreignField" : "_id", 
          "as" : "staffdetails"
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "staffdetails.events_ids", 
          "from" : "events", 
          "foreignField" : "_id", 
          "as" : "events"
      }
  }, 
  { 
      "$match" : match
  },)
    console.log('\n get_staffdetails_agg : ', JSON.stringify(pipeline) )
    return pipeline
      
  }