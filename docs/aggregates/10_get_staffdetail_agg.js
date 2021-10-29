db.getCollection("staff").aggregate([{
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
{ '$match': { 'staff._id': ObjectId("614d6350b3df7dad03d6cdb1") } },
{
    '$project': {
        'business_timings': '$staffdetails.business_timings',
        'events': '$events._id',
        'event_bizTimings': '$events.business_timings',
    }
}])
