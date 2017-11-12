var TopHots = function(container){
	this.container = container || $(body);
	this.init();
	this.page = 'hot';
	this.res='';
}

$.extend(TopHots.prototype,{
	init:function(){
		this.getHots();
	},
	createDom:function(Hotslist){
		console.log(Hotslist)
		let html = new EJS({url:'/views/hot/top-bar.ejs'}).render({
			Hotslist:Hotslist.result,
			pageNumber:Hotslist.pageNumber
		});
		this.container.html(html);
	},
	bindEvents:function(){
		$('#list-con').on('click',$.proxy(this.handleUptOrDel,this));
	},
	getHots:function(res){
		if(res){
			this.res = res.Currentpageno
		}
		$.ajax({
			url:'api/hot/getHots',
			data:{
				pageNo:this.res || 1
			},
			success:$.proxy(this.handleRenderHots,this)
		})
	},
	handleRenderHots:function(res){
		this.createDom(res.data);
		$(this).trigger(new $.Event('listdata',{res}));
		this.bindEvents();
	},
	handleUptOrDel:function(e){
		if($(e.target).attr('id') == "del"){
			const goback = confirm("是否删除");
			const Hotsid = $(e.target).closest('tr').attr('Hotsid');
			if(goback){
				$.ajax({
					url:'api/hot/delHots',
					data:{
						_id:Hotsid
					},
					success:(res)=>{
						window.location.reload()
					}
				})	
			}
		}
		if($(e.target).attr('id') == "upt"){
			const Hotsid = $(e.target).closest('tr').attr('Hotsid');
			$('#addHots').modal('show');
			$.ajax({
				url:'api/hot/uptHots',
				data:{
					_id:Hotsid
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
