const Tabs = require('../model/hot/tab.js')
const { getParam } = require('../utils/utils.js')

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
const getTab = function(req,res){
	Tabs.find()
	.then((result)=>{
		res.json(getParam(result));
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
module.exports = { addOrUptTab,getTab,delTab,uptTab };
