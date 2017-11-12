var Hotpro = function(){
	this.init();
	this.page = 'hot';
}

$.extend(Hotpro.prototype,{
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
		this.argaintagname = $('#argaintagname');
		this.argaintagtype = $('#argaintagtype');
		this.topbar = new TopBar($('#list-con'));
		$(this.topbar).on('getdata',$.proxy(this.handlegedata,this));
		$(this.topbar).on('listdata',$.proxy(this.handlelistdata,this));
		$.ajax({
			url:'/api/Services/Proxy.ashx/Hots',
			success:(result)=>{
				var socket = io('http://localhost:9001');
				socket.emit('update',{res:result.data})			
			}
		})
		this.bindEvents();
	},
	handlegedata:function(res){
		this.getid = res.res[0]._id;
	},
	handlelistdata:function(res){
		const pagination = new Pagination(res.res.data);
		$(pagination).on('Pagdata',$.proxy(this.handlePagination,this));
		
	},
	handlePagination:function(res){
		this.topbar.getHots(res);
	},
	bindEvents:function(){
		$('#btndig-pro').on('click',$.proxy(this.handlesubmit,this));
	},
	handlesubmit:function(){
		console.log(1)
		$('#btnsubmitFormpro').submit();
	},
	isgetaddHots:function(res){
		if(res.addHotsSuccess){
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
		$("#addHots").modal('hide');
//		window.location.reload()
	}
});

new Hotpro();
