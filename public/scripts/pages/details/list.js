const ProList=function(container){
	this.container=container || $('body');
	this.so=-1;
	this.init();
}

$.extend(ProList.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(){
		this.bindEvents();
		this.getProList();
	},
	getProList:function(pageno){
		this.pageNo=pageno?pageno:1;
		$.ajax({
			url:'/api/pro/list',
			data:{
				pageNo:this.pageNo,
				so:this.so
			},
			success: this.handleGetProList.bind(this)
		})
	},
	handleGetProList:function(res){
		const ejs=new EJS({url:'../../../views/prolist.ejs'});
		let html=ejs.render({
			prolist:res.data.productlist
		})
		this.container.html(html);
		$(this).trigger(new $.Event('getpage', res.data));
	},
	bindEvents:function(){
		$('#list-con').on('click',this.handleManpro.bind(this));
		$('#add-pros').on('click',this.handleaddpro.bind(this));
		//点击排序
		$('#dropdown').on('click',this.handleselected.bind(this));
		$('#search-btn').on('click',this.handsearch.bind(this));
	},
	handsearch:function(){
		const imgNa=$('#searchval').val();
		$.ajax({
			url:'/api/pro/search',
			type:'get',
			data:{
				imgNa
			},
			success:this.handleGetProList.bind(this)
		})
	},
	handleselected:function(e){
		$('#selec-val').html($(e.target).html());
		if($(e.target).html()=='降序'){
			this.so=-1;
			this.getProList()
		}
		if($(e.target).html()=='升序'){
			this.so=1;
			this.getProList()
		}
	},
	handleSubmitForm:function(){
		$('#postJobForm').submit();
	},
	
	handleaddpro:function(){
   		$('#addOrUpdateDialog').modal('show');
   		$('#submitBtn').on('click',this.handleSubmitForm.bind(this));
   		$('#updateLogo').html('')
	    $('#proname').val('')
	    $('#proprice').val('')
		$('#yt_price').val('')
	},
	
	handleManpro:function(e){
		this.proid=$(e.target).closest('tr').attr('proid');
		if($(e.target).attr('data-tag')=='delete'){
    		$('#isdelete').modal('show');
    		$('#del-true').on('click',function(){
    			this.handleisdelete();
    			$(e.target).closest('tr').remove();
    		}.bind(this));
		}
		if($(e.target).attr('data-tag')=='update'){
			$('#addOrUpdateDialog').modal('show');
   		    $.ajax({
				url:'/api/pro/searchlistid',
				data:{
					id:this.proid
				},
				success:this.handleupdateresult.bind(this)
			});
   		    $('#submitBtn').on('click',this.handleSubmitForm.bind(this));
			
		}
	},
	handleisdelete:function(e){
		/*if($(e.target).attr('data-tag')=='del-true'){*/
			$.ajax({
				url:'/api/pro/delete',
				data:{
					id:this.proid,
					pageno:this.pageNo
				},
				success:this.handledeleteresult.bind(this)
			});
		
	},
	handledeleteresult:function(res){
		/*window.location.reload()*/
		$('#isdelete').modal('hide');
		$(this).trigger(new $.Event('pagechange', {
			pageno:res.pageno
		}));
		
	},
	handleupdateresult:function(res){
        $('#proid').val(res.data.productlist._id);
   	 	$('#updateLogo').html(`<img src=/upload/${res.data.productlist.image} width=30 height=30 />`)
		$('#proname').val(res.data.productlist.name);
		$('#proprice').val(res.data.productlist.price);
		$('#yt_price').val(res.data.productlist.yt_price);
	}
})
