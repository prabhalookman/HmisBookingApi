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
    { '$match': { 'staff._id': ObjectId("614d6350b3df7dad03d6cdb1") } },
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
    }
])