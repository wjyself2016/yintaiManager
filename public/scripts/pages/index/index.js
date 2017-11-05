var SignIn = function(){
	this.init()
}


$.extend(SignIn.prototype,{
	init:function(){
		$('#signin').on('click',function(){
			this.submitUser();
		}.bind(this))
	},
	submitUser:function(){
		var oInputName = $('#username').val();
		var oInputPassword = $('#password').val();
		
		$.ajax({
			type:"post",
			url:"/api/users/signIn",
			data:{
				username:oInputName,
				password:oInputPassword
			},
			success:this.submitSucc.bind(this)
		})
	},
	submitSucc:function(res){
		if(res.success){
			window.location.href = '/home.html'
		}else{
			console.log(0)
		}
	}
});

new SignIn();
