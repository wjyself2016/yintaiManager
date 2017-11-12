const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const apiRoute = require('./router/api.js');

const cookieSession = require('cookie-session')

//设置静态路径
app.use(express.static(path.join(__dirname,'public')));

// 配置body解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//使用服务器客户端通信中间件
app.use(cookieSession({
  	name: 'session',
  	secret: 'some random charactors',
  	maxAge: 1000 * 60 * 60 * 24
}))

//使用路由
app.use('/api', apiRoute)

//监听端口号
app.listen(process.env.PORT || '3333','10.9.164.13')