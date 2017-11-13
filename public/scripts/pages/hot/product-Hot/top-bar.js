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
		let html = new EJS({url:'/views/hot/produ-Hot/top-bar.ejs'}).render({
			Hotslist:Hotslist.result,
			pageNumber:Hotslist.pageNumber
		});
		this.container.html(html);
	},
	bindEvents:function(){
		$('#list-con-pro').on('click',$.proxy(this.handleUptOrDelpro,this));
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
		console.log(res)
		this.createDom(res.data);
		$(this).trigger(new $.Event('listdatapro',{res}));
		this.bindEvents();
	},
	handleUptOrDelpro:function(e){
		if($(e.target).attr('id') == "delpro"){
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
		if($(e.target).attr('id') == "uptpro"){
			const Hotsid = $(e.target).closest('tr').attr('Hotsid');
			
			$('#addprodu').modal('show');
			$.ajax({
				url:'api/hot/uptHots',
				data:{
					_id:Hotsid
				},
				success:(res)=>{
					console.log(res)
					$('#updateLogo').html(`<img src=/upload/hotimg/${res[0].logoimage}  width=30 height=30 />`);
					$('#Hotid').val(res[0]._id);
					$('#brandname').val(res[0].brandname);
					$('#discount').val(res[0].discount);
					$('#name').val(res[0].name);
					$('#starttime').val(res[0].starttime);
					$('#endtime').val(res[0].endtime);
					$(this).trigger(new $.Event('getdatapro',{res}));
				}
			})
					
		}
	}
});
