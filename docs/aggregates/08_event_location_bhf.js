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
        '$lookup': {
            localField: 'events.timing_ids',
            from: 'timings',
            foreignField: '_id',
            as: 'timings'
        }
    },    
    {
        '$unwind': { path: '$timings', preserveNullAndEmptyArrays: false }
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
    { '$match': { 'staff._id': ObjectId("615589d480cdf8b12c8530b9"), 'events.business_timings' : false } },
    {
        '$project': { 
            events: '$events._id',
            timings: '$timings',
            locationsetting_id: '$locationsetting._id',
            
            location_type: '$location.type',
        }
    }    
])
