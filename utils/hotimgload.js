const multer = require('multer');
const mime = require('mime');
const crypto = require('crypto')

const storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建
	destination:function(req,file,cb){
		console.log(file)
		//项目所在目录下,路径自己建好，不会帮你建的，哭死
		cb(null,'./public/upload/hotimg')
	},
////	//给上传文件重命名，获取添加后缀名
	filename:function(req,file,cb){
		crypto.pseudoRandomBytes(16,function(err,raw){
			cb(null,raw.toString('hex') + new Date().getTime() + '.' +mime.getExtension(file.mimetype) )
		})
	}
})
module.exports = multer({storage})
