var PaginationPro = function(res){
	this.res = res||'';
	this.init();
	this.page = 'hot';
}

$.extend(PaginationPro.prototype,{
	init:function(){
		this.createDom();
		this.bindEvents();
	},
	createDom:function(){
		let html = new EJS({url:'/views/hot/produ-Hot/pagination.ejs'}).render({
			pageCount:this.res.pageCount,
			pageNo:this.res.pageNo
		});
		$('#pagination-pro').html(html);
	},
	bindEvents:function(){
		$('#pagination-pro').off('click').on('click',$.proxy(this.handlepagdatapro,this))
	},
	handlepagdatapro:function(e){
		const li = e.target.closest('li');
		const Currentpageno = $(li).attr('pageno')
		console.log(Currentpageno)
//		if(Currentpageno != this.res.pageNo){
			$(this).trigger(new $.Event('Pagdatapro',{Currentpageno}));	
//		}
	}
});
