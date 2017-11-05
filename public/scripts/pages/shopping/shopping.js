var Shopping = function(){
	this.init();
	this.page = 'shopping';
}

$.extend(Shopping.prototype,{
	init:function(){
		$.ajax({
			type:"get",
			url:"/api/users/isLogin",
			success:function(res){
				if(res.login){
					this.createDom(res.username);
				}else{
					window.location.href = '/index.html'
				}
			}.bind(this)
		});
	},
	createDom:function(name){
		new Header(name,this.page);
	}
});

new Shopping();
