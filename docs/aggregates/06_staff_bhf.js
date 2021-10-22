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
            localField: 'staffdetails.timing_ids',
            from: 'timings',
            foreignField: '_id',
            as: 'timings'
        }
    },    
    {
        '$lookup': {
            localField: 'staffdetails.business_id',
            from: 'business',
            foreignField: '_id',
            as: 'staffBusiness'
        }
    },
    {
        '$lookup': {
            localField: 'staffBusiness.business_info_ids',
            from: 'businessinfo',
            foreignField: '_id',
            as: 'staffBusinessinfo'
        }
    },
    {
        '$lookup': {
            localField: 'staffBusinessinfo.timing_ids',
            from: 'timings',
            foreignField: '_id',
            as: 'staffBisTiming'
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
            staffTimings: '$timings',
            business_timings: '$staffdetails.business_timings',
        }
    },
    {
        "$addFields": {
            "timings": "$staffTimings",
            "business_timings": "$business_timings"
        }
    },
    {
        '$lookup': {
            localField: 'staffTimings.location_setting_ids',
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
            timings: '$timings',
            business_timings: '$business_timings',
            location_name: '$locationchild.type'
        }
    }
])