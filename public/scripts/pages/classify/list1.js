const List1 = function(container){
	this.container = container;
	this.init();
}

$.extend(List1.prototype,{
	init:function(){
		this.createDom();
	},
	
	createDom:function(){
		
		var html = new EJS({url:'/views/classify/list1.ejs'}).render({})
		this.container.html(html);
		$('#addOrUpdateList').remove();
		
		var html2 = new EJS({url:'/views/classify/listmodal.ejs'}).render({
			name:'导航分栏',
			router:'/api/classify/aulist1',
			Id:'classifyId',
			type:"",
			items:[
				{
					id:'itemId',
					name:'ID号',
					content:'请输入id号',
					type:'text'
				},
				{
					id:'classify',
					name:'分类条目',
					content:'请输入分类条目',
					type:'text'
				}
			]
		})
		$('body').prepend(html2)
		this.bindEvents();
		this.createTable(1);
	},
	
	bindEvents:function(){
		
		//模态框点击弹出
		$('#add-list1').off('click').on('click',function(){
			$('#addOrUpdateList').modal('show');
		}.bind(this))
		
		//模态框点击提交
		$('#submitBtn').off('click').on('click',function(){
			$('#addOrUpdateList').modal('hide');
			$('#postClassifyForm').submit();
		}.bind(this))
	},
	
	createTable:function(pageNo){
		$.ajax({
			type:"post",
			url:"api/classify/getlist1",
			data:{
				pageSize:5,
				pageNo
			},
			success:function(res){
				//渲染item
				var html3 = new EJS({url:'/views/classify/listitem.ejs'}).render({
					data:res
				})
				$('#list-con').html(html3)
				//渲染页脚
				var html4 = new EJS({url:'/views/classify/navigation.ejs'}).render({
					data:res
				})
				$('#paginationCon').html(html4)
				this.changePageEvent(res);
				this.bindEvents2();
				
			}.bind(this)
		});
	},
	
	changePageEvent:function(res){
		$('#paginationCon').off('click').on('click',function(e){
			var oLi = $(e.target).closest('li')
			var currentPage = oLi.attr('pageno')
			if(currentPage != res.pageNo){
				this.createTable(currentPage)
			}
		}.bind(this))
	},
	
	bindEvents2:function(){
		//更新事件
		$('.update').off().on('click',function(e){
			var id = $(e.target).closest('tr').attr('classifyNavId')
			console.log(id)
			$.ajax({
				url:'/api/classify/get1',
				type:'get',
				data:{
					id:id
				},
				success:function(result){
					$('#classifyId').val(result.result[0]._id);
					$('#itemId').val(result.result[0].itemId);
					$('#classify').val(result.result[0].classify);
					$('#addOrUpdateList').modal('show');
				}
			})
		}.bind(this))
		
		//删除事件
		$('.delete').off().on('click',function(e){
			var id = $(e.target).closest('tr').attr('classifyNavId')
			$.ajax({
				url:'/api/classify/delete1',
				type:'get',
				data:{
					id:id
				},
				success:function(result){
					window.location.reload();
				}
			})
		}.bind(this))
	}
});