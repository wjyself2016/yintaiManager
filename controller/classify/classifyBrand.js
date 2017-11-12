const classifyBrand = require('../../model/classify/classifyBrand.js')
const async = require('async')

const getList = function(req,res){
	var { pageSize,pageNo } = req.body;
	async.parallel([
		function(cb){
			classifyBrand.find({}).then(function(all){
				cb(null,all.length)
			})
		},
		function(cb){
			classifyBrand.find({})
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
	const { categoryId,brandId,name,filterId } = req.body
	if(req.body.classifyId2) {
		
		const setObj = {
	      	categoryId,
	      	brandId,
	      	name,
	      	filterId,
	      	createTime: new Date().getTime()
    	}
		
		if (req.file && req.file.filename) {
      		setObj.img = req.file.filename
    	}
		
    	classifyBrand.findByIdAndUpdate(req.body.classifyId2, {
      		$set: setObj
    	}).then(() => {
      		res.redirect('/classify.html')
    	})
	}else{
		const willSaveClassifyBrand = new classifyBrand({
			categoryId,
	      	brandId,
	      	img: req.file && req.file.filename ? req.file.filename : '',
	      	name,
	      	filterId,
	      	createTime: new Date().getTime()
		})
		
		willSaveClassifyBrand.save().then(function(){
			res.redirect('/classify.html')
		})
	}
}

const deleteBrand = function(req,res){
	const { id } = req.query;
	classifyBrand.findByIdAndRemove(id).then(function(result){
		res.json({success:true})
	})
}

const getBrand = function(req,res){
	const { id } = req.query;
	classifyBrand.find({_id:id}).then(function(result){
		res.json({result})
	})
}

module.exports = { getList, addOrUpdate, deleteBrand,getBrand }