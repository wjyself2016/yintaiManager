const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')
const hotController = require('../controller/hot.js')
const HotsController = require('../controller/hotpro.js')
const uploadhot = require('../utils/hotimgload.js');


// 用户相关路由
router.post('/users/signIn',userController.signIn)
router.get('/users/isLogin',userController.isLogin)
router.get('/users/logout',userController.logout)


/**************************hot******************************/
router.post('/hot/tab', hotController.addOrUptTab);
router.get('/hot/getTab', hotController.getLaterTab);
router.get('/hot/delTab', hotController.delTab);
router.get('/hot/uptTab', hotController.uptTab);
router.get('/Services/Proxy.ashx/tab',hotController.getTab)

/************************hot-pro****************************/
router.post('/hot/Hots', uploadhot.single('logoimg'),HotsController.addOrUptHots);
router.get('/hot/getHots', HotsController.getLaterHots);
router.get('/hot/delHots', HotsController.delHots);
router.get('/hot/uptHots', HotsController.uptHots);
router.get('/Services/Proxy.ashx/Hots', HotsController.getHots)

module.exports = router
