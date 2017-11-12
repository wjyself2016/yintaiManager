const Hots = require('../model/hot/hotpro.js')
const { getParam } = require('../utils/utils.js')
const async = require('async')


const addOrUptHots = function(req,res){
	const { logoimage,brandname,discount,name,starttime,endtime,_id} = req.body;
	console.log(req.body)
	if(!brandname){
		res.json({addHotsuccess:false});
	}
		if(_id){
			const saveHots = {
					brandname,
					discount,
					name,
					starttime,
					endtime
			};
			if(req.file && req.file.filename){
				saveHots.companyLogo=req.file.filename;
			}
			Hots.findByIdAndUpdate(id,{
				$set:saveHots
			}).then((err,ress)=>{
				res.json({Success:true});
			})
	}else{
			const willSaveHots = new Hots({
					logoimage:req.file && req.file.filename ?req.file.filename :'',
					brandname,
					discount,
					name,
					starttime,
					endtime
			});	
			willSaveHots.save().then(()=>{
				res.json({addHotsuccess:true});
			})	
		}
	}
//前台接口
const getHots = function(req,res){
	Hots.find()
	.then((result)=>{
		res.json(getParam(result));
	})
}

//后台显示：
const getLaterHots = function(req,res){
	let pageSize = 3;
	let { pageNo } = req.query;
	async.parallel([
		function(cb){
			Hots.find({})
				.then((all)=>{
					cb(null,all.length);
				})
		},
		function(cb){
			Hots.find({})
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
const delHots = function(req,res){
	const { _id } = req.query;
	Hots.findByIdAndRemove(_id)
	.then(()=>{
		res.json({success:true});
	})
}
const uptHots = function(req,res){
	const { _id } = req.query;
	Hots.find({_id})
	.then((result)=>{
		res.json(result);
	})
}
module.exports = { addOrUptHots,getHots,getLaterHots,delHots,uptHots };
