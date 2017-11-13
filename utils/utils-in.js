module.exports = {
  getParam: function (data) {
    return {
      "errcode": 0,
      "errmsg": "",
      "data": data
    }
  },
  getProList:function(data){
  	return{
  		"content": {
          "data": data,
          "rows": []
      },
      "message": "查询成功!",
      "state": 1
  	}
  },
  getBanList:function(data){
  	return{
  		 "isSuccessful": true,
		   "statusCode": 200,
		   "data": data
	  }
  },
  getProductList:function(data){
  	return{
  		"data": data,
  		"record_count":110,
			"description":"",
			"isSuccessful":true,
			"statusCode":200,
			"userId":''
  	}
  },
  getpro:function(data){
  	return{
	    "isSuccessful": true,
	    "statusCode": 200,
	    "description": "",
	    "userId": "",
	    "data": {
	        "pageid": "30000000",
	        "pageindex": 2,
	        "pagecount": 2,
	        "bgcolor": "#f1f1f1",
	        "pagetitle": "首页20150709",
	        "templatelist": [
	            {
	                "templateid": 20022186,
	                "templatename": "精选好货1103-1107",
	                "templatetype": "ProductDoubleColumn",
	                "sort": 6,
	                "requestdate": 1509794530572,
	                "items": [
	                    {
	                        "itemid": "21-478-1407",
	                        "extra": {
	                            "seckillcountdowndate": 0,
	                            "productdetail": data,
	                            "navigationname": null
	                        },
	                        "height": 360,
	                        "width": 270,
	                        "imgname": null,
	                        "imgurl": "https://p10.ytrss.com/product/21/478/1408/BigImage/58392.jpg",
	                        "itemposition": "30000000|20015680|20022186|9|21-478-1407",
	                        "jumpurl": "yintaimobile://GeneralProductDetial?sku=21-478-1407",
	                        "sort": 9,
	                        "jumpid": "0"
	                    }
	                ]
	            }
	           
	        ]
	    }
  	}
  }
}
