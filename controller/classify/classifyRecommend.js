const classifyRecommend = require('../../model/classify/classifyRecommend.js')
const async = require('async')

const getList = function(req,res){
	var { pageSize,pageNo } = req.body;
	async.parallel([
		function(cb){
			classifyRecommend.find({}).then(function(all){
				cb(null,all.length)
			})
		},
		function(cb){
			classifyRecommend.find({})
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
	const { categoryId2,name2,filterId2 } = req.body
	if(req.body.classifyId3) {
		const setObj = {
	      	categoryId2,
	      	name2,
	      	filterId2,
	      	createTime: new Date().getTime()
    	}
		
		if (req.file && req.file.filename) {
      		setObj.img2 = req.file.filename
    	}
		
    	classifyRecommend.findByIdAndUpdate(req.body.classifyId3, {
      		$set: setObj
    	}).then(() => {
      		res.redirect('/classify.html')
    	})
	}else{
		const willSaveClassifyRecommend = new classifyRecommend({
			categoryId2,
	      	img2: req.file && req.file.filename ? req.file.filename : '',
	      	name2,
	      	filterId2,
	      	createTime: new Date().getTime()
		})
		willSaveClassifyRecommend.save().then(function(){
			res.redirect('/classify.html')
		})
	}
}

const deleteRecommend = function(req,res){
	const { id } = req.query;
	classifyRecommend.findByIdAndRemove(id).then(function(result){
		res.json({success:true})
	})
}

const getRecommend = function(req,res){
	const { id } = req.query;
	classifyRecommend.find({_id:id}).then(function(result){
		res.json({result})
	})
}

module.exports = { getList, addOrUpdate, deleteRecommend,getRecommend }

