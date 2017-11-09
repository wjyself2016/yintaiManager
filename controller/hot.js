const Tabs = require('../model/hot/tab.js')
const { getParam } = require('../utils/utils.js')
const async = require('async')


const addOrUptTab = function(req,res){
	const { argaintagname, argaintagtype,_id} = req.body;
	if(!argaintagtype){
		res.json({addTabSuccess:false});
	}
	const id = _id;
		if(id){
				const savetab = {
						argaintagname,
						argaintagtype
				};
				Tabs.findByIdAndUpdate(id,{
					$set:savetab
				}).then((err,ress)=>{
					console.log(err)
					res.json({Success:true});
				})
	}else{
		Tabs.findOne({argaintagname})
		.then((result)=>{
			if(result){
				res.json({addTabSuccess:false});
			}else{
				const willSavetab = new Tabs({
						argaintagname,
						argaintagtype
				});
				
				willSavetab.save().then(()=>{
					res.json({addTabSuccess:true});
				})	
			}
		})
	}
}
//前台接口
const getTab = function(req,res){
	Tabs.find()
	.then((result)=>{
		res.json(getParam(result));
	})
}

//后台显示：
const getLaterTab = function(req,res){
	let pageSize = 3;
	let { pageNo } = req.query;
	async.parallel([
		function(cb){
			Tabs.find({})
				.then((all)=>{
					cb(null,all.length);
				})
		},
		function(cb){
			Tabs.find({})
				.limit(pageSize)
				.skip((pageNo-1) * pageSize)
				.sort({_id:1})
				.then((result)=>{
					cb(null,result)
				})
			}
		],function(err,results){
			let page={
				result:results[1],
				pageCount:Math.ceil(results[0]/pageSize),
				pageNo:parseInt(pageNo,10),
				pageNumber:(pageNo-1)*pageSize+1
			}
			res.json(getParam(page));
		})
}
const delTab = function(req,res){
	const { _id } = req.query;
	Tabs.findByIdAndRemove(_id)
	.then(()=>{
		res.json({success:true});
	})
}
const uptTab = function(req,res){
	const { _id } = req.query;
	Tabs.find({_id})
	.then((result)=>{
		res.json(result);
	})
}
module.exports = { addOrUptTab,getTab,getLaterTab,delTab,uptTab };
