/**
 * Created by peng.xue on 2017/8/1.
 */
'use strict';
var NODE_ENV = process.env.NODE_ENV || "product";//默认开发目录

var config = require("./lib/config/config")[NODE_ENV];

/**
 * KOA 主模块
 *
 * @type {Application}
 */
var koa = require('koa');

/**
 * 已经执行的KOA的模块入口
 */
var app = new koa();

/**
 * 静态服务器模块
 *
 * @type {serve}
 */
var staticServer = require('koa-static');

//路由
var router = require('koa-router')();

//获取post请求的参数
var bodyParse = require("koa-bodyparser");

//ejs模板引擎
var render = require('koa-ejs');

//nodejs 内置模块
var path = require('path');

//日志模块初始化
var Log = require("./lib/utils/Log");
var logger = new Log();

//HTML 片段缓存   重复的请求直接返回304，提升请求的性能
var conditional = require('koa-conditional-get');
var etag = require('koa-etag');

//session储存  数据查询缓存
var session = require("koa-session2");
var Store = require("./lib/store/Store");

//支持对请求的response进行压缩
var compress = require('koa-compress');

//“/”路由
var AppController = require("./lib/controller/AppController");
new AppController(logger, router, config.apiUrl);

render(app, {
    root: path.join(__dirname, config.tmplsPath),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

//中间件排队
app.use(session({
        store:new Store()
})).use(compress({
        threshold: 2048       //要压缩的最小响应字节
})).use(bodyParse({
        jsonLimit:'10mb'
})).use(conditional()).use(etag()).use(staticServer(path.join(__dirname, config.staticPath)))
    .use(logger.logFilter()).use(router.allowedMethods()).use(router.routes());

var server = app.listen(config.serverPort);
console.log("服务已开启,端口：" + config.serverPort);
logger.info("服务已开启,端口：" + config.serverPort);