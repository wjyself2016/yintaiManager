var Slide = function(){
	this.init();
	this.page = 'hot';
}

$.extend(Slide.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(name){
		let html = new EJS({url:'/views/hot/slide-bar.ejs'}).render({});
		$('#dropdown').html(html);
	}
});

