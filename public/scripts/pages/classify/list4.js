const List4 = function(container){
	this.container = container;
	this.init();
}

$.extend(List4.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(){
		
		var html = new EJS({url:'/views/classify/list4.ejs'}).render({})
		this.container.html(html);
		$('#addOrUpdateList').remove();
		
		var html2 = new EJS({url:'/views/classify/listmodal.ejs'}).render({
			name:'更多类目',
			router:'/api/classify/aulist4',
			Id:'classifyId4',
			type:"",
			items:[
				{
					id:'categoryId3',
					name:'分类ID',
					content:'请输入分类id号',
					type:'text'
				},
				{
					id:'name3',
					name:'名字',
					content:'请输入名称',
					type:'text'
				},
				{
					id:'filterId3',
					name:'过滤ID',
					content:'请输入过滤ID',
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
		$('#add-list4').off('click').on('click',function(){
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
			url:"api/classify/getlist4",
			data:{
				pageSize:5,
				pageNo
			},
			success:function(res){
				//渲染item
				var html3 = new EJS({url:'/views/classify/listitem4.ejs'}).render({
					data:res
				})
				$('#list-con4').html(html3)
				//渲染页脚
				var html4 = new EJS({url:'/views/classify/navigation.ejs'}).render({
					data:res
				})
				$('#paginationCon4').html(html4)
				this.changePageEvent(res);
				this.bindEvents2();
				
			}.bind(this)
		});
	},
	
	changePageEvent:function(res){
		$('#paginationCon4').off('click').on('click',function(e){
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
			var id = $(e.target).closest('tr').attr('classifyMoreId')
			console.log(id)
			$.ajax({
				url:'/api/classify/get4',
				type:'get',
				data:{
					id:id
				},
				success:function(result){
					$('#classifyId4').val(result.result[0]._id);
					$('#categoryId3').val(result.result[0].categoryId3);
					$('#name3').val(result.result[0].name3);
					$('#addOrUpdateList').modal('show');
				}
			})
		}.bind(this))
		
		//删除事件
		$('.delete').off().on('click',function(e){
			var id = $(e.target).closest('tr').attr('classifyMoreId')
			$.ajax({
				url:'/api/classify/delete4',
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