var Body = function(container){
	this.container = container || $('body');
	this.init();
}

$.extend(Body.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(){
		var html = new EJS({url:'../../views/classify/body.ejs'}).render({});
		this.container.append(html);
	}
});
