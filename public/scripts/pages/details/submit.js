const Aorup=function(container){
	this.container=container|| $('body');
	this.init()
}

$.extend(Aorup.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(){
		const html=new EJS({url:'../../../views/submit.ejs'}).render({});
		this.container.html(html);
	}
})