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
  }
}
