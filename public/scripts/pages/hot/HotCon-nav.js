var Hot = function(){
	this.init();
	this.page = 'hot';
}

$.extend(Hot.prototype,{
	init:function(){
		this.getid="";
		$.ajax({
			type:"get",
			url:"/api/users/isLogin",
			success:function(res){
				if(res.login){
					this.createDom(res.username);
					this.bindEvents();
				}else{
					window.location.href = '/index.html'
				}
			}.bind(this)
		});
	},
	createDom:function(name){
		new Header(name,this.page);
		new Slide();
		this.argaintagname = $('#argaintagname');
		this.argaintagtype = $('#argaintagtype');
		this.topbar = new TopBar($('#list-con'));
		$(this.topbar).on('getdata',$.proxy(this.handlegedata,this));
		$(this.topbar).on('listdata',$.proxy(this.handlelistdata,this));
		
	},
	handlegedata:function(res){
		this.getid = res.res[0]._id;
	},
	handlelistdata:function(res){
		const pagination = new Pagination(res.res.data);
		$(pagination).on('Pagdata',$.proxy(this.handlePagination,this));
		
	},
	handlePagination:function(res){
		this.topbar.getTab(res);
	},
	bindEvents:function(){
		$('#btndig').on('click',$.proxy(this.handleAddTab,this))
	},
	handleAddTab:function(){
		$.ajax({
			url:'api/hot/tab',
			method:'post',
			contentType:'application/json;charset=utf-8',
			data:JSON.stringify({
				 argaintagname:this.argaintagname.val(), 
				 argaintagtype:Number(this.argaintagtype.val()),
			     _id:this.getid
			}),
			
			success:$.proxy(this.isgetaddtab,this)
		})
	
	},
	isgetaddtab:function(res){
		if(res.addTabSuccess){
			this.isaddOrUpdate("添加成功");
		}else{
			if(res.Success){
				this.isaddOrUpdate("修改成功");
			}else{
				alert("您的输入有误");
			}
		}
	},
	isaddOrUpdate:function(name){
		alert(name);
		$('#argaintagname').val('');
		$('#argaintagtype').val('');
		$("#addtab").modal('hide');
		window.location.reload()
	}
});

new Hot();
