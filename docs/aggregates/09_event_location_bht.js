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
            localField: 'events.business_id',
            from: 'business',
            foreignField: '_id',
            as: 'business'
        }
    },
    {
        '$lookup': {
            localField: 'business.business_info_ids',
            from: 'businessinfo',
            foreignField: '_id',
            as: 'businessinfo'
        }
    },
    {
        '$lookup': {
            localField: 'businessinfo.timing_ids',
            from: 'timings',
            foreignField: '_id',
            as: 'timings'
        }
    },
    {
        '$lookup': {
            localField: 'events.location_setting_ids',
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
    
    { '$match': { 'staff._id': ObjectId("614d6350b3df7dad03d6cdb1") } },
    {
        '$project': {
            event: '$events._id',            
            timings: '$timings',
            location: '$location.type'
        }
    }
])