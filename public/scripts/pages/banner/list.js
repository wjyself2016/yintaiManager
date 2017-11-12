const banList=function(container){
	this.container=container || $('body');
	this.so=-1;
	this.init();
}

$.extend(banList.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(){
		this.bindEvents();
		this.getbanList();
	},
	getbanList:function(pageno){
		this.pageNo=pageno?pageno:1;
		$.ajax({
			url:'/api/ban/list',
			data:{
				pageNo:this.pageNo,
				so:this.so
			},
			success: this.handleGetbanList.bind(this)
		})
	},
	handleGetbanList:function(res){
		const ejs=new EJS({url:'../../../views/banlist.ejs'});
		let html=ejs.render({
			banlist:res.data.bannerlist
		})
		this.container.html(html);
		$(this).trigger(new $.Event('getpage', res.data));
	},
	bindEvents:function(){
		$('#list-con').on('click',this.handleManban.bind(this));
		$('#add-pros').on('click',this.handleaddban.bind(this));
		//点击排序
		$('#dropdown').on('click',this.handleselected.bind(this));
		$('#search-btn').on('click',this.handsearch.bind(this));
	},
	handleselected:function(e){
		$('#selec-val').html($(e.target).html());
		if($(e.target).html()=='降序'){
			this.so=1;
			this.getbanList()
		}
		if($(e.target).html()=='升序'){
			this.so=-1;
			this.getbanList()
		}
	},
	handsearch:function(){
		const imgNa=$('#searchval').val();
		$.ajax({
			url:'/api/ban/search',
			type:'get',
			data:{
				imgNa
			},
			success:this.handleGetbanList.bind(this)
		})
	},
	getDateDiff:function(dateTimeStamp){
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if(diffValue < 0){return;}
		var monthC =diffValue/month;
		var weekC =diffValue/(7*day);
		var dayC =diffValue/day;
		var hourC =diffValue/hour;
		var minC =diffValue/minute;
		if(monthC>=1){
			result="" + parseInt(monthC) + "月前";
		}
		else if(weekC>=1){
			result="" + parseInt(weekC) + "周前";
		}
		else if(dayC>=1){
			result=""+ parseInt(dayC) +"天前";
		}
		else if(hourC>=1){
			result=""+ parseInt(hourC) +"小时前";
		}
		else if(minC>=1){
			result=""+ parseInt(minC) +"分钟前";
		}else
		result="刚刚";
		return result;
	},
	handleaddban:function(){
   		$('#addOrUpdateDialog').modal('show');
   		$('#submitBanBtn').on('click',this.handleSubmitForm.bind(this));
   		$('#updateimg').html('')
	    $('#banid').val('')
	    $('#imgname').val('')
	    $('#sort').val('0')
	},
	
	handleManban:function(e){
		this.banid=$(e.target).closest('tr').attr('banid');
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
				url:'/api/ban/searchlistid',
				data:{
					id:this.banid
				},
				success:this.handleupdateresult.bind(this)
			});
			$('#submitBanBtn').on('click',this.handleSubmitForm.bind(this));
		}
	},
	handleSubmitForm:function(){
		$('#postBanForm').submit();
	},
	handleisdelete:function(e){
		/*if($(e.target).attr('data-tag')=='del-true'){*/
			$.ajax({
				url:'/api/ban/delete',
				data:{
					id:this.banid,
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
        $('#banid').val(res.data._id);
   	 	$('#updateimg').html(`<img src=/upload/${res.data.imgurl} width=100 height=50 />`)
		$('#imgname').val(res.data.imgname);
		$('#sort').val(res.data.sort);
	}
})
