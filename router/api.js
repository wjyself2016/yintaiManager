const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')
const banController=require('../controller/banner.js')
const upload = require('../utils/uploadimg')

// 用户相关路由
router.post('/users/signIn',userController.signIn)
router.get('/users/isLogin',userController.isLogin)
router.get('/users/logout',userController.logout)

//轮播图相关
router.get('/ban/list',banController.getList)
router.post('/ban/addOrUpdate', upload.single('banimg') , banController.addOrUpdate)
router.get('/ban/delete',banController.getdelete)
router.get('/ban/searchlistid',banController.searchListid)
//搜索
router.get('/ban/search',banController.searchByName)

module.exports = router


