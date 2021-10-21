db.getCollection("staff").aggregate([
    { '$project': { staff: '$$ROOT' } },
    {
        '$lookup': {
            localField: 'staff.staff_detail_id',
            from: 'staffdetails',
            foreignField: '_id',
            as: 'staffdetails'
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
        '$lookup': {
            localField: 'events.timing_ids',
            from: 'timings',
            foreignField: '_id',
            as: 'timings'
        }
    },
    {
        '$unwind': { path: '$events', preserveNullAndEmptyArrays: false }
    },
    
    {
        '$lookup': {
            localField: 'events.business_id',
            from: 'business',
            foreignField: '_id',
            as: 'eventsBusiness'
        }
    },
    {
        '$lookup': {
            localField: 'eventsBusiness.business_info_ids',
            from: 'businessinfo',
            foreignField: '_id',
            as: 'eventsBusinessinfo'
        }
    },
    {
        '$lookup': {
            localField: 'eventsBusinessinfo.timing_ids',
            from: 'timings',
            foreignField: '_id',
            as: 'eventsBisTiming'
        }
    },
    {
        '$lookup': {
            localField: 'timings.location_setting_ids',
            from: 'locationsetting',
            foreignField: '_id',
            as: 'locationsetting'
        }
    },
    {
        '$lookup': {
            localField: 'locationsetting.location_id',
            from: 'location',
            foreignField: '_id',
            as: 'location'
        }
    },
    { '$match': { 'staff._id': ObjectId("615589d480cdf8b12c8530b9") } },
    
    {
        '$project': {
            'events': '$events',
            eventTimings: '$timings',
            business_timings: '$events.business_timings',
        }
    },
    {
        "$addFields": {
            "timings": "$eventTimings",
            "business_timings": "$business_timings",
            'events': '$events._id'
        }
    },
    {
        '$lookup': {
            localField: 'eventTimings.location_setting_ids',
            from: 'locationsetting',
            foreignField: '_id',
            as: 'locationsettingchild'
        }
    },
    {
        '$unwind': { path: '$locationsettingchild', preserveNullAndEmptyArrays: false }
    },
    {
        '$lookup': {
            localField: 'locationsettingchild.location_id',
            from: 'location',
            foreignField: '_id',
            as: 'locationchild'
        }
    },
    {
        '$project': {
            events_id: '$events',
            timings: '$timings',
            business_timings: '$business_timings',
            location_name: '$locationchild.type'
        }
    }
])