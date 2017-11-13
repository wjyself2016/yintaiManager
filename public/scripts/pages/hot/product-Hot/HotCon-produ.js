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
		this.topbar = new TopHots($('#list-con-pro'));
		$(this.topbar).on('getdatapro',$.proxy(this.handlegedata,this));
		$(this.topbar).on('listdatapro',$.proxy(this.handlelistdata,this));
		$.ajax({
			url:'/api/Services/Proxy.ashx/Hots',
			success:(result)=>{
//				var socket = io('http://localhost:9001');
//				socket.emit('update',{res:result.data})			
			}
		})
	},
	handlegedata:function(res){
		this.getid = res.res[0]._id;
	},
	handlelistdata:function(res){
		const pagination = new PaginationPro(res.res.data);
		$(pagination).on('Pagdatapro',$.proxy(this.handlePagination,this));
		
	},
	handlePagination:function(res){
		this.topbar.getHots(res);
	},
	bindEvents:function(){
		$('#btndig-pro').on('click',$.proxy(this.handlesubmitpro,this));
	},
	handlesubmitpro:function(){
		$('#btnsubmitFormPro').submit();
	},
	isgetaddHots:function(res){
		console.log(res)
		if(res.addHotsSuccess){
			this.isaddOrUpdatepro("添加成功");
			
		}else{
			if(res.Success){
				this.isaddOrUpdatepro("修改成功");
			
			}else{
				alert("您的输入有误");
			}
		}
	},
	isaddOrUpdatepro:function(name){
		alert(name);
		$("#addHots").modal('hide');
//		window.location.reload()
	}
});

new Hotpro();
