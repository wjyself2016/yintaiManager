const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')

const classifyNav = require('../controller/classify/classifyNav.js')
const classifyBrand = require('../controller/classify/classifyBrand.js')
const classifyRecommend = require('../controller/classify/classifyRecommend.js')
const classifyMore = require('../controller/classify/classifyMore.js')
const getClassify = require('../controller/classify/getClassify.js')

const hotController = require('../controller/hot.js')
const HotsController = require('../controller/hotpro.js')
const uploadhot = require('../utils/hotimgload.js');


const upload1 = require('../utils/uploadimg1')
const upload2 = require('../utils/uploadimg2')

const banController=require('../controller/banner.js')
const proController=require('../controller/pro.js')
const upload = require('../utils/uploadimg')


// 用户相关路由
router.post('/users/signIn',userController.signIn)
router.get('/users/isLogin',userController.isLogin)
router.get('/users/logout',userController.logout)


//classify相关路由
router.post('/classify/getlist1',classifyNav.getList)
router.post('/classify/aulist1',classifyNav.addOrUpdate)
router.get('/classify/delete1',classifyNav.deleteNav)
router.get('/classify/get1',classifyNav.getNav)

router.post('/classify/getlist2',classifyBrand.getList)
router.post('/classify/aulist2',upload1.single('img'),classifyBrand.addOrUpdate)
router.get('/classify/delete2',classifyBrand.deleteBrand)
router.get('/classify/get2',classifyBrand.getBrand)

router.post('/classify/getlist3',classifyRecommend.getList)
router.post('/classify/aulist3',upload2.single('img2'),classifyRecommend.addOrUpdate)
router.get('/classify/delete3',classifyRecommend.deleteRecommend)
router.get('/classify/get3',classifyRecommend.getRecommend)

router.post('/classify/getlist4',classifyMore.getList)
router.post('/classify/aulist4',classifyMore.addOrUpdate)
router.get('/classify/delete4',classifyMore.deleteMore)
router.get('/classify/get4',classifyMore.getMore)

router.get('/classify/getclassify',getClassify.getClassify)


//商品详情
router.get('/pro/list',proController.getList)
router.post('/pro/addOrUpdate', upload.single('image') , proController.addOrUpdate)
router.get('/pro/delete',proController.getdelete)
router.get('/pro/searchlistid',proController.searchListid)
router.get('/pro/search',proController.searchByName)
//轮播图相关
router.get('/ban/list',banController.getList)
router.post('/ban/addOrUpdate', upload.single('banimg') , banController.addOrUpdate)
router.get('/ban/delete',banController.getdelete)
router.get('/ban/searchlistid',banController.searchListid)
//搜索
router.get('/ban/search',banController.searchByName)
router.get('/pro/listfront',proController.getListFront)

router.get('/ban/listfront',banController.getListFront)


/**************************hot******************************/
router.post('/hot/tab', hotController.addOrUptTab);
router.get('/hot/getTab', hotController.getLaterTab);
router.get('/hot/delTab', hotController.delTab);
router.get('/hot/uptTab', hotController.uptTab);
router.get('/Services/Proxy.ashx/tab',hotController.getTab)

/************************hot-pro****************************/
router.post('/hot/Hots', uploadhot.single('logoimage'),HotsController.addOrUptHots);
router.get('/hot/getHots', HotsController.getLaterHots);
router.get('/hot/delHots', HotsController.delHots);
router.get('/hot/uptHots', HotsController.uptHots);
router.get('/Services/Proxy.ashx/Hots', HotsController.getHots)

module.exports = router


