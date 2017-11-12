const db = require('../../utils/database.js')

// 定义Schema
const schema = new db.Schema({

	"categoryId": {
		type:String,
		required: true
	},
	"brandId": {
		type: String,
		required: true
	},
	"img": {
		type: String
	},
	"name": {
		type: String,
		required: true
	},
	"filterId": {
		type:String,
		required: true
	}
})

// 定义model
const classifyBrand = db.model('classifybrands', schema)

module.exports = classifyBrand