const classifyMore = require('../../model/classify/classifyMore.js')
const async = require('async')

const getList = function(req,res){
	var { pageSize,pageNo } = req.body;
	async.parallel([
		function(cb){
			classifyMore.find({}).then(function(all){
				cb(null,all.length)
			})
		},
		function(cb){
			classifyMore.find({})
				.skip((pageNo-1) * pageSize)
				.limit(pageSize)
				.sort({_id:-1})
				.then(function(result){
					cb(null,result)
				})
		}],
		function(err,results){
			var page = {
				result:results[1],
				pageCount:Math.ceil(results[0]/pageSize),
				pageNo:parseInt(pageNo,10)
			}
			res.json(page);
		})
}


const addOrUpdate = function(req,res){
	const { categoryId3,name3,filterId3 } = req.body
	if(req.body.classifyId4) {
		
		const setObj = {
	      	categoryId3,
	      	name3,
	      	filterId3,
	      	createTime: new Date().getTime()
    	}
    	classifyMore.findByIdAndUpdate(req.body.classifyId4, {
      		$set: setObj
    	}).then(() => {
      		res.redirect('/classify.html')
    	})
	}else{
		const willSaveClassifyMore = new classifyMore({
			categoryId3,
	      	name3,
	      	filterId3,
	      	createTime: new Date().getTime()
		})
		
		willSaveClassifyMore.save().then(function(){
			res.redirect('/classify.html')
		})
	}
}

const deleteMore = function(req,res){
	const { id } = req.query;
	classifyMore.findByIdAndRemove(id).then(function(result){
		console.log(result)
		res.json({success:true})
	})
}

const getMore = function(req,res){
	const { id } = req.query;
	console.log(id)
	classifyMore.find({_id:id}).then(function(result){
		res.json({result})
	})
}

module.exports = { getList, addOrUpdate, deleteMore,getMore }