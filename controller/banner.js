const ban=require('../model/banner.js');
const {getBanList,getProList,getParam}=require('../utils/utils-in.js')
const async=require('async');
const fs=require('fs');

const getList=function(req,res,next){
	let { pageNo,so}=req.query;
	let pageSize=4;
	async.parallel([
	    function(callback) {
	    	ban.find({})
	    	  .then((all)=>{
	    	  	callback(null,all.length);
	    	  })
	    },
	    function(callback) {
	    	ban.find({})
	    	  .skip((pageNo-1)*pageSize)
	   	 	  .limit(pageSize)
	   	 	  .sort({sort:so})
	   	 	  .then((result)=>{
	   	 	  	callback(null, result)
	   	 	  })
	    }
		], function(err, results) {
		    let page = {
		      bannerlist: results[1],
		      pageCount: Math.ceil(results[0] / pageSize),
		      pageNo: parseInt(pageNo, 10)
		    }
		    res.json(getBanList(page))
	})
}

const getListFront=function(req,res){
	ban.find({},function(err,bannerlist){
		res.json(getBanList({bannerlist}))
	})
}

const addOrUpdate=function(req,res,next){
	const {imgname,sort} =req.body;
	if(req.body.banid){
		const setObj={
			imgname,
			sort
		}
		if(req.file&&req.file.filename){
			setObj.imgurl=req.file.filename;
			ban.findById(req.body.proid)
			  .then((result)=>{
			   	fs.unlink(`public/upload/${result.imgurl}`,(error)=>{})	
			  })
		}
	
		ban.findByIdAndUpdate(req.body.banid,{$set:setObj})
			.then(()=>{
      			res.redirect('/banner.html')
			})
	}else{
		ban.find({})
		  .then((all)=>{
		  	const willSaveBan=new ban({
		      	imgurl: req.file && req.file.filename ? req.file.filename : '',
				imgname,
				updatetime:new Date().toLocaleString(),
				sort:all.length
			});
			willSaveBan.save()
				.then(()=>{
			  	 res.redirect('/banner.html')
		    })
		})
	}
}

const getdelete=function(req,res,next){
	const {id , pageno} =req.query;
	//删除文件里的图片
	ban.findById(id)
	  .then((result)=>{
	   	fs.unlink(`public/upload/${result.imgurl}`,(error)=>{})	
	  })
	
	ban.findByIdAndRemove(id)
	.then((result)=>{
		res.json(getParam({success:true,pageno}))
	})
}
//修改时填充数据
const searchListid=function(req,res,next){
	const {id} =req.query;
	ban.findOne({_id:id})
		.then((result)=>{
			res.json(getParam(result))
		})
		
}
//搜索查找
const searchByName=function(req,res,next){
	const { imgNa }=req.query;
	const re=new RegExp(`${imgNa}`);
	ban.find({'imgname':re})
		.then((bannerlist)=>{
			res.json(getBanList({bannerlist}));
		})
}

module.exports={ getList,addOrUpdate,getdelete,searchListid,searchByName,getListFront}
