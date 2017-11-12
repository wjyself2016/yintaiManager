const db = require('../../utils/database.js')

// 定义Schema
const schema = new db.Schema({

	"categoryId3": {
		type:String,
		required: true
	},
	"name3": {
		type: String,
		required: true
	},
	"filterId3": {
		type: String,
		required: true
	}
})

// 定义model
const classifyMore = db.model('classifymores', schema)

module.exports = classifyMore