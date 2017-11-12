const List3 = function(container){
	this.container = container;
	this.init();
}

$.extend(List3.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(){
		var html = new EJS({url:'/views/classify/list3.ejs'}).render({})
		this.container.html(html);
		$('#addOrUpdateList').remove();
		
		var html2 = new EJS({url:'/views/classify/listmodal.ejs'}).render({
			name:'推荐类目',
			router:'/api/classify/aulist3',
			Id:'classifyId3',
			type:"multipart/form-data",
			items:[
				{
					id:'categoryId2',
					name:'分类ID',
					content:'请输入分类id号',
					type:'text'
				},
				{
					id:'img2',
					name:'图片路径',
					content:'请输入图片路径',
					type:'file'
				},
				{
					id:'name2',
					name:'名字',
					content:'请输入名称',
					type:'text'
				},
				{
					id:'filterId2',
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
		$('#add-list3').off('click').on('click',function(){
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
			url:"api/classify/getlist3",
			data:{
				pageSize:5,
				pageNo
			},
			success:function(res){
				//渲染item
				var html3 = new EJS({url:'/views/classify/listitem3.ejs'}).render({
					data:res
				})
				$('#list-con3').html(html3)
				//渲染页脚
				var html4 = new EJS({url:'/views/classify/navigation.ejs'}).render({
					data:res
				})
				$('#paginationCon3').html(html4)
				this.changePageEvent(res);
				this.bindEvents2();
				
			}.bind(this)
		});
	},
	changePageEvent:function(res){
		$('#paginationCon3').off('click').on('click',function(e){
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
			var id = $(e.target).closest('tr').attr('classifyRecommendId')
			console.log(id)
			$.ajax({
				url:'/api/classify/get3',
				type:'get',
				data:{
					id:id
				},
				success:function(result){
					$('#classifyId3').val(result.result[0]._id);
					$('#categoryId2').val(result.result[0].categoryId2);
					$('#name2').val(result.result[0].name2);
					$('#addOrUpdateList').modal('show');
				}
			})
		}.bind(this))
		//删除事件
		$('.delete').off().on('click',function(e){
			var id = $(e.target).closest('tr').attr('classifyRecommendId')
			$.ajax({
				url:'/api/classify/delete3',
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