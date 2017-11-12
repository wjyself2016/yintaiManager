const classifyNav = require('../../model/classify/classifyNav.js')
const classifyBrand = require('../../model/classify/classifyBrand.js')
const classifyRecommend = require('../../model/classify/classifyRecommend.js')
const classifyMore = require('../../model/classify/classifyMore.js')
const async = require('async')
const { getClassify1,getClassify2 } = require('../../utils/utils')


const getClassify = function(req,res){
	const { type,id } = req.query
	if(type == '1'){
		classifyNav.find({},function(err,result){
			if(err){
				console.log(err)
			}else{
				res.json(getClassify1(result));
			}
		})
		
	}else if(type == '2'){
		async.parallel([
		function(cb){
			classifyBrand.find({filterId:id}).then(function(data1){
				cb(null,data1)
			})
		},
		function(cb){
			classifyRecommend.find({filterId2:id}).then(function(data2){
					cb(null,data2)
				})
		},
		function(cb){
			classifyMore.find({filterId3:id}).then(function(data3){
					cb(null,data3)
				})
		}],
		
		function(err,results){
			var data = {
				data1:results[0],
				data2:results[1],
				data3:results[2]
			}
			res.json(getClassify2(data));
		})
		
	}else{
		res.json({isSuccess:'参数错误'})
	}
	
	
//	async.parallel([
//		function(cb){
//			classifyRecommend.find({}).then(function(all){
//				cb(null,all.length)
//			})
//		},
//		function(cb){
//			classifyRecommend.find({})
//				.skip((pageNo-1) * pageSize)
//				.limit(pageSize)
//				.sort({_id:-1})
//				.then(function(result){
//					cb(null,result)
//				})
//		}],
//		function(err,results){
//			var page = {
//				result:results[1],
//				pageCount:Math.ceil(results[0]/pageSize),
//				pageNo:parseInt(pageNo,10)
//			}
//			res.json(page);
//		})
}

module.exports = { getClassify }

