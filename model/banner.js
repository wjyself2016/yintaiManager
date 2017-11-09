const db=require('../utils/database.js')

const schema=new db.Schema({
  "imgname": {
    type: String,
    required: true
  },
  "imgurl": {
    type: String,
    required: true
  },
  "sort": {
    type: String
  },
  "updatetime": {
    type: String
  }
})

const ban=db.model('banners',schema);
module.exports=ban
