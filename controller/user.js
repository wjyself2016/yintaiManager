const User = require('../model/user.js')

const signIn = function(req,res){
	const { username, password } = req.body;
	User.findOne({username})
		.then(function(user){
			if(!user){
				res.json({success:false})
			}else{
				if(password === user.password){
					req.session.username = user.username
					res.json({success:true})
				}else{
					res.json({success:false})
				}
			}
		})
}

const isLogin = function(req,res){
	res.json({
		login:req.session.username?true:false,
		username:req.session.username
	})
}

const logout = function(req,res){
	req.session = null;
	res.json({
		logout:true
	})
}


module.exports = { signIn,isLogin,logout };
