const pro=require('../model/pro.js');
const {getpro,getProductList,getParam}=require('../utils/utils-in.js')
const async=require('async');
const fs=require('fs');

const getList=function(req,res,next){
	let { pageNo,so}=req.query;
	let pageSize=4;
	async.parallel([
	    function(callback) {
	    	pro.find({})
	    	  .then((all)=>{
	    	  	callback(null,all.length);
	    	  })
	    },
	    function(callback) {
	    	pro.find({})
	    	  .skip((pageNo-1)*pageSize)
	   	 	  .limit(pageSize)
	   	 	  .sort({_id:so})
	   	 	  .then((result)=>{
	   	 	  	callback(null, result)
	   	 	  })
	    }
		], function(err, results) {
		    let page = {
		      productlist: results[1],
		      pageCount: Math.ceil(results[0] / pageSize),
		      pageNo: parseInt(pageNo, 10)
		    }
		    res.json(getProductList(page))
	})
}
const getListFront=function(req,res){
	pro.find({},function(err,productlist){
		res.json(getProductList({productlist}))
	})
}
const getListhot=function(req,res){
	pro.find({},function(err,productlist){
		res.json(getpro({productlist}))
	})
}
/*const getListFront=function(req,res){
	let Size=2;
	let number=1;
	async.parallel([
	    function(callback) {
	    	pro.find({})
	    	  .then((all)=>{
	    	  	callback(null,all.length);
	    	  })
	    },
	    function(callback) {
	    	pro.find({})
	    	  .skip((number-1)*Size)
	   	 	  .limit(Size)
	   	 	  .then((result)=>{
	   	 	  	callback(null, result)
	   	 	  })
	    }
		], function(err, results) {
		    let page = {
		      items: results[1]
		    }
		    res.json(getPro(page))
	})
}*/
const addOrUpdate=function(req,res,next){
	console.log(req.body);
	const {proname,proprice,yt_price} =req.body;
	if(req.body.proid){
		const setObj={
			name:proname,
			price:proprice,
			yt_price
		}
		//修改操作替换图片
		if(req.file&&req.file.filename){
			setObj.image=req.file.filename;
			
			pro.findById(req.body.proid)
			  .then((result)=>{
			   	fs.unlink(`public/upload/${result.image}`,(error)=>{})	
			  })
		}
	
		pro.findByIdAndUpdate(req.body.proid,{$set:setObj})
			.then(()=>{
      			res.redirect('/details.html')
			})
	}else{
		const willSavePro=new pro({
	      	image: req.file && req.file.filename ? req.file.filename : '',
			name:proname,
			price:proprice,
			yt_price
		});
		willSavePro.save()
		  .then(()=>{
		  	/*res.json(getParam({success:true}))*/
		  	res.redirect('/details.html')
	    })
	}
}

const getdelete=function(req,res,next){
	const {id , pageno} =req.query;
	//删除文件里的图片
	pro.findById(id)
	  .then((result)=>{
	   	fs.unlink(`public/upload/${result.imgage}`,(error)=>{})	
	  })
	
	pro.findByIdAndRemove(id)
	.then((result)=>{
		res.json(getParam({success:true,pageno}))
	})
}

const searchListid=function(req,res,next){
	const {id} =req.query;
	pro.findOne({_id:id})
		.then((productlist)=>{
			console.log(getProductList({productlist}));
			res.json(getProductList({productlist}))
		})
		
}
//搜索查找
const searchByName=function(req,res,next){
	const { imgNa }=req.query;
	console.log(imgNa);
	const re=new RegExp(`${imgNa}`);
	pro.find({'name':re})
		.then((productlist)=>{
			res.json(getProductList({productlist}));
		})
}
module.exports={getList,addOrUpdate,getdelete,searchListid,searchByName,getListFront,getListhot}
