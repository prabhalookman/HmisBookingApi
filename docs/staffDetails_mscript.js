function execs (){}
execs()

var site_id = ObjectId('614d6350b3df7dad03d6cdb2')
var workspace_ids = ObjectId('614d63c649a63250a673d1a3')
var staff_ids = ObjectId('614d6350b3df7dad03d6cdb1')

db.getCollection("staff").find({site_id: site_id, workspace_ids: workspace_ids, _id:staff_ids})