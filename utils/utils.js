module.exports = {
  getClassify1: function (data) {
    return {
      data:data,
      description:'',
      isSuccessful:true,
      statusCode:200,
      userId:''
    }
  },
  getClassify2:function (data) {
  	return {
      data:{
      	brand:data.data1,
      	recommend:data.data2,
      	more:data.data3
      },
      description:'',
      isSuccessful:true,
      statusCode:200,
      userId:''
   }
	},
  getParam: function (data) {
    return {
        "isSuccessful": true,
	    "statusCode": 200,
	    "description": "",
	    "userId": "",
	    "data": data
    }
  }
}
