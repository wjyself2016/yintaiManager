var TopBar = function(container){
	this.container = container || $(body);
	this.init();
	this.page = 'hot';
	this.res='';
}

$.extend(TopBar.prototype,{
	init:function(){
		this.getTab();
	},
	createDom:function(tablist){
		console.log(tablist)
		let html = new EJS({url:'/views/hot/top-bar.ejs'}).render({
			tablist:tablist.result,
			pageNumber:tablist.pageNumber
		});
		this.container.html(html);
	},
	bindEvents:function(){
		$('#list-con').on('click',$.proxy(this.handleUptOrDel,this));
	},
	getTab:function(res){
		if(res){
			this.res = res.Currentpageno
		}
		$.ajax({
			url:'api/hot/getTab',
			data:{
				pageNo:this.res || 1
			},
			success:$.proxy(this.handleRenderTab,this)
		})
	},
	handleRenderTab:function(res){
		this.createDom(res.data);
		$(this).trigger(new $.Event('listdata',{res}));
		this.bindEvents();
	},
	handleUptOrDel:function(e){
		if($(e.target).attr('id') == "del"){
			const goback = confirm("是否删除");
			const tabid = $(e.target).closest('tr').attr('tabid');
			if(goback){
				$.ajax({
					url:'api/hot/delTab',
					data:{
						_id:tabid
					},
					success:(res)=>{
						window.location.reload()
					}
				})	
			}
		}
		if($(e.target).attr('id') == "upt"){
			const tabid = $(e.target).closest('tr').attr('tabid');
			$('#addtab').modal('show');
			$.ajax({
				url:'api/hot/uptTab',
				data:{
					_id:tabid
				},
				success:(res)=>{
					$('#argaintagname').val(res[0].argaintagname);
					$('#argaintagtype').val(res[0].argaintagtype);
					$(this).trigger(new $.Event('getdata',{res}));
				}
			})
					
		}
	}
});

