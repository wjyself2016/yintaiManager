const db = require('../../utils/database.js')

// 定义Schema
const schema = new db.Schema({

	"itemId": {
		type:String,
		required: true
	},
	"classify": {
		type: String,
		required: true
	}
})

// 定义model
const classifyNav = db.model('classifynavs', schema)

module.exports = classifyNav