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
        '$addFields': {
            "customfield": {
                "$switch": {
                    "branches": [
                        { "case": { "$eq": ["$staffdetails.business_timings", true] }, "then": 30 },
                        { "case": { "$eq": ["$staffdetails.business_timings", false] }, "then": 25 }
                    ],
                    "default": 10
                }
            }
        }
    },
    { '$match': { 'staff._id': ObjectId("615589d480cdf8b12c8530b9") } },
    {
        '$project': {
            'business_timings': "$staffdetails.business_timings",
            'customfield': '$customfield'

        }
    }
])

/*
'$staffdetails.business_timings'
{
        '$addFields': {
            'summary1': {
                $switch: {
                    branches: [{
                        case: {
                            $eq: [
                                "$staffdetails.business_timings",
                                true
                            ]
                        },
                        then: "hi",
                        case: {
                            $eq: [
                                "$staffdetails.business_timings",
                                false
                            ]
                        },
                        then: "no"
                    }
                    ],
                    default: {
                        $toString: "$staffdetails.business_timings"
                    }
                }
            }
        }
    }
    
    --
    
    ,
    {
        $addFields: {
            summary1: {
                $cond: [
                    {
                        $eq: [
                            "$staffdetails.business_timings",
                            true
                        ]
                    },
                    "yes",
                    "no"
                ]
            }
        }
    }
*/