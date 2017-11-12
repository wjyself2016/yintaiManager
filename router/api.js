const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')
const classifyNav = require('../controller/classify/classifyNav.js')
const classifyBrand = require('../controller/classify/classifyBrand.js')
const classifyRecommend = require('../controller/classify/classifyRecommend.js')
const classifyMore = require('../controller/classify/classifyMore.js')
const getClassify = require('../controller/classify/getClassify.js')

const upload1 = require('../utils/uploadimg1')
const upload2 = require('../utils/uploadimg2')

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


module.exports = router
