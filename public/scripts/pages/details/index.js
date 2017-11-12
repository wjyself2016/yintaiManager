var Page = function (active) {
	this.init(active)
	this.page = active;
}

$.extend(Page.prototype, {

  init: function (active) {
    //this.createHeader(active);
    this.initList();
    new Aorup($('#addOrUpdateDialog'));
    $.ajax({
		type:"get",
		url:"/api/users/isLogin",
		success:function(res){
			if(res.login){
				this.createHeader(res.username,active);
			}else{
				window.location.href = '/index.html'
			}
		}.bind(this)
	});
  },

  createHeader: function (name,active) {
    this.header = new Header(name,this.page)
  },
  initList:function(){
  	this.prolist=new ProList($('#list-con'))
  	$(this.prolist).on('getpage',this.handlePagination.bind(this))
  },
  handlePagination:function(res){
  	let pagination=new Pagination($('#paginationCon'),res);
  	$(pagination).on('pagechange',this.changelist.bind(this))
  },
  changelist:function(e){
  	this.prolist.getProList(e.pageno);
  }
  
})
