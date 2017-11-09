var Page = function (active) {
	 this.init(active)
}

$.extend(Page.prototype, {

  init: function (active) {
    this.createHeader(active);
    this.initList();
    new Aorup($('#addOrUpdateDialog'));
  },

  createHeader: function (active) {
    this.header = new Header(active)
  },
  initList:function(){
  	this.banlist=new banList($('#list-con'))
  	$(this.banlist).on('getpage',this.handlePagination.bind(this))
  },
  handlePagination:function(res){
  	let pagination=new Pagination($('#paginationCon'),res);
  	$(pagination).on('pagechange',this.changelist.bind(this))
  },
  changelist:function(e){
  	this.banlist.getbanList(e.pageno);
  }
  
})
