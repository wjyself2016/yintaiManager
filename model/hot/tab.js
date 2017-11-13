const db = require('../../utils/database.js')

// 定义Schema
const schema = new db.Schema({
  argaintagname: {
    type: String,
    required: true
  },
  argaintagtype: {
    type: Number,
    required: true
  }
})

// 定义model
const Tabs = db.model('tabs', schema)

module.exports = Tabs
