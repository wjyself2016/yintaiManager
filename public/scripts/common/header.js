var Header = function(name,page,container){
	this.name = name;
	this.page = page;
	this.container = container || $('body');
	this.init();
}

$.extend(Header.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(){
		var html = new EJS({url:'../../views/header.ejs'}).render({
			name:this.name,
			page:this.page
		});
		this.container.prepend(html);
		this.bindEvents();
	},
	bindEvents:function(){
		$('#js-logout').on('click',function(){
			
			$.ajax({
				type:'get',
				url:'api/users/logout',
				success:function(res){
					if(res.logout){
						window.location.reload();
					}
				}
			});
		})
	}
});