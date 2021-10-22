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
            'one': [


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
                        localField: 'staffdetails.timing_ids',
                        from: 'timings',
                        foreignField: '_id',
                        as: 'timings'
                    }
                },
                {
                    '$project': {
                        'event': '$events'
                    }
                }
            ],
            'two': [
                {
                    '$project': {
                        staffTimings: '$timings',
                    }
                },
            ]
        }
    }
])