var Pagination = function(res){
	this.res = res||'';
	this.init();
	this.page = 'hot';
}

$.extend(Pagination.prototype,{
	init:function(){
		this.createDom();
		this.bindEvents();
	},
	createDom:function(){
		let html = new EJS({url:'/views/hot/pagination.ejs'}).render({
			pageCount:this.res.pageCount,
			pageNo:this.res.pageNo
		});
		$('#pagination').html(html);
	},
	bindEvents:function(){
		$('#pagination').off('click').on('click',$.proxy(this.handlepagdata,this))
	},
	handlepagdata:function(e){
		const li = e.target.closest('li');
		const Currentpageno = $(li).attr('pageno')
		console.log(Currentpageno)
//		if(Currentpageno != this.res.pageNo){
			$(this).trigger(new $.Event('Pagdata',{Currentpageno}));	
//		}
	}
});

