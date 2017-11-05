const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')


// 用户相关路由
router.post('/users/signIn',userController.signIn)
router.get('/users/isLogin',userController.isLogin)
router.get('/users/logout',userController.logout)


module.exports = router
