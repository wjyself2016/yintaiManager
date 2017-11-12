const List2 = function(container){
	this.container = container;
	this.init();
}

$.extend(List2.prototype,{
	init:function(){
		this.createDom();
	},
	createDom:function(){
		var html = new EJS({url:'/views/classify/list2.ejs'}).render({})
		this.container.html(html);
		$('#addOrUpdateList').remove();
		
		var html2 = new EJS({url:'/views/classify/listmodal.ejs'}).render({
			name:'推荐品牌',
			router:'/api/classify/aulist2',
			Id:'classifyId2',
			type:"multipart/form-data",
			items:[
				{
					id:'categoryId',
					name:'分类ID',
					content:'请输入分类id号',
					type:'text'
				},
				{
					id:'brandId',
					name:'商标ID',
					content:'请输入商标id号',
					type:'text'
				},
				{
					id:'img',
					name:'图片',
					content:'上传图片',
					type:'file'
				},
				{
					id:'name',
					name:'名字',
					content:'请输入名称',
					type:'text'
				},
				{
					id:'filterId',
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
		$('#add-list2').off('click').on('click',function(){
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
			url:"api/classify/getlist2",
			data:{
				pageSize:5,
				pageNo
			},
			success:function(res){
				//渲染item
				var html3 = new EJS({url:'/views/classify/listitem2.ejs'}).render({
					data:res
				})
				$('#list-con2').html(html3)
				//渲染页脚
				var html4 = new EJS({url:'/views/classify/navigation.ejs'}).render({
					data:res
				})
				$('#paginationCon2').html(html4)
				this.changePageEvent(res);
				this.bindEvents2();
				
			}.bind(this)
		});
	},
	changePageEvent:function(res){
		$('#paginationCon2').off('click').on('click',function(e){
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
			var id = $(e.target).closest('tr').attr('classifyBrandId')
			console.log(id)
			$.ajax({
				url:'/api/classify/get2',
				type:'get',
				data:{
					id:id
				},
				success:function(result){
					$('#classifyId2').val(result.result[0]._id);
					$('#categoryId').val(result.result[0].categoryId);
					$('#brandId').val(result.result[0].brandId);
					$('#name').val(result.result[0].name);
					$('#addOrUpdateList').modal('show');
				}
			})
		}.bind(this))
		
		//删除事件
		$('.delete').off().on('click',function(e){
			var id = $(e.target).closest('tr').attr('classifyBrandId')
			$.ajax({
				url:'/api/classify/delete2',
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