const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/yintai'
const options = {
	useMongoClient:true
}

mongoose
	.connect(uri,options)
	.then(function(db){
		console.log('yintai数据库连接成功~');
	})
	.catch(function(err){
		console.log(err);
	})


module.exports = mongoose;