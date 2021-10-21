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
      localField: 'staffdetails.timing_ids',
      from: 'timings',
      foreignField: '_id',
      as: 'timings'
    }
  },
  {
    '$unwind': { path: '$staffdetails', preserveNullAndEmptyArrays: false }
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
  { '$match': { 'staff._id': ObjectId("615589d480cdf8b12c8530b9") }  },
  {
    '$project': {
      _id: '$staff._id',      
      business_timings: '$staffdetails.business_timings',
      event: '$events._id',
      locationsetting: '$locationsetting',
      locationtype: '$location.type',
      timings: '$timings',
      staffBizTimings: '$staffBisTiming'
    }
  }
])