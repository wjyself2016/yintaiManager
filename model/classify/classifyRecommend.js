
const db = require('../../utils/database.js')

// 定义Schema
const schema = new db.Schema({

	"categoryId2": {
		type:String,
		required: true
	},
	"img2": {
		type: String
	},
	"name2": {
		type: String,
		required: true
	},
	"filterId2": {
		type: String,
		required: true
	}
})

// 定义model
const classifyRecommend = db.model('classifyrecommends', schema)

module.exports = classifyRecommend