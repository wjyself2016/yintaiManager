const classifyNav = require('../../model/classify/classifyNav.js')
const async = require('async')

const getList = function(req,res){
	var { pageSize,pageNo } = req.body;
	async.parallel([
		function(cb){
			classifyNav.find({}).then(function(all){
				cb(null,all.length)
			})
		},
		function(cb){
			classifyNav.find({})
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
	const { itemId,classify } = req.body
	if(req.body.classifyId) {
		
		const setObj = {
	      	itemId,
	      	classify,
	      	createTime: new Date().getTime()
    	}
    	classifyNav.findByIdAndUpdate(req.body.classifyId, {
      		$set: setObj
    	}).then(() => {
      		res.redirect('/classify.html')
    	})
	}else{
		const willSaveClassifyNav = new classifyNav({
			itemId,
	      	classify,
	      	createTime: new Date().getTime()
		})
		
		willSaveClassifyNav.save().then(function(){
			res.redirect('/classify.html')
		})
	}
	
	
}

const deleteNav = function(req,res){
	const { id } = req.query;
	classifyNav.findByIdAndRemove(id).then(function(result){
		console.log(result)
		res.json({success:true})
	})
}

const getNav = function(req,res){
	const { id } = req.query;
	console.log(id)
	classifyNav.find({_id:id}).then(function(result){
		res.json({result})
	})
}

module.exports = { getList, addOrUpdate, deleteNav,getNav }