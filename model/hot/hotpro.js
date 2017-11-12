const db = require('../../utils/database.js')

// 定义Schema
const schema = new db.Schema({
 	logoimage:{
		type:String,
		required:true
	},
	brandname:{
		type:String,
		required:true
	},
	discount:{
		type: Number,
    	required: true
	},
	name:{
		type:String,
		required:true
	},
	starttime:{
		type:String,
		required:true
	},
	endtime:{
		type:String,
		required:true
	}
})

// 定义model
const Hots = db.model('hots', schema)

module.exports = Hots
