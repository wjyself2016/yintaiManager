var Classify = function(){
	this.init();
	this.page = 'classify';
}

$.extend(Classify.prototype,{
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
		new Body();
		this.content = $('#content')
		this.bindEvents();
		new List1(this.content);
	},
	bindEvents:function(){
		$('#sidebtn').on('click',function(e){
			var list = $(e.target).closest('li').attr('clickname');
			switch(list){
				case 'list1' : new List1(this.content); break;
				case 'list2' : new List2(this.content); break;
				case 'list3' : new List3(this.content); break;
				case 'list4' : new List4(this.content); break;
			}
		}.bind(this))
	}
});

new Classify();
