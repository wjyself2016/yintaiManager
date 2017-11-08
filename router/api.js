const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')
const hotController = require('../controller/hot.js')


// 用户相关路由
router.post('/users/signIn',userController.signIn)
router.get('/users/isLogin',userController.isLogin)
router.get('/users/logout',userController.logout)


/**************************hot******************************/
router.post('/hot/tab', hotController.addOrUptTab);
router.get('/hot/getTab', hotController.getTab);
router.get('/hot/delTab', hotController.delTab);
router.get('/hot/uptTab', hotController.uptTab);

module.exports = router
