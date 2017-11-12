const db=require('../utils/database.js')

const schema=new db.Schema({
  "bigimageurl": {
    type: String
  },
  "brandid": {
    type: String
  },
  "brandname": {
    type: String
  },
  "categoryid": {
    type: String
  },
  "discount": {
    type: String
  },
  "endtimesecond": {
    type: String
  },
  "exclusivemobile": {
    type: String
  },
  "groupno":{
  	type: String
  },
	"image": {
    type: String
  },
	"imageurllist": {
    type: String
  },
	"instock": {
    type: String
  },
	"isexclusivemobile": {
    type: String
  },
	"isjumph5": {
    type: String
  },
	"ismiaowgoods": {
    type: String
  },
	"itemcode": {
    type: String
  },
	"jumph5url": {
    type: String
  },
	"midimageurl": {
    type: String
  },
	"name": {
    type: String
  },
	"operatemode": {
    type: String
  },
	"price": {
    type: String
  },
	"producttype": {
    type: String
  },
	"promotion_price": {
    type: String
  },
	"promotionlabel": {
    type: String
  },
	"promotionlist": {
    type: String
  },
	"promotions": {
    type: String
  },
	"providercode": {
    type: String
  },
	"savingamountdesc": {
    type: String
  },
	"yt_price": {
    type: String
  }
})

const pro=db.model('products',schema);
module.exports=pro
