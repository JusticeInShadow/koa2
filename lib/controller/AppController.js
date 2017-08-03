/**
 * Created by peng.xue on 2017/8/1.
 */
var BaseController = require("./BaseController");
// var Util = require("../utils/Util");
var AppService = require("../services/AppService");

class AppController extends BaseController {
    constructor(logger, router, uriPrefix) {
        super(logger);
        this.routerPrefix = "/";
        this.router = router;
        this.appService = new AppService(logger, uriPrefix);
        this.initRouter();
    }

    initRouter(){
        var that = this;
        //跳转到主页面
        this.router.get(this.routerPrefix, async(ctx, next) =>{
            await ctx.render("index")
        });

        //密码验证
        this.router.get(this.routerPrefix+"CheckName", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取类型列表成功"};
            try{
                let token = ctx.accept.headers.cookie;
                token = "test_token";
                let body = ctx.query;
                let name = body.name;
                let password = body.password;
                resBody.data = await that.appService.getData(token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody
        });

        //密码验证
        this.router.post(this.routerPrefix+"CheckPass", async(ctx, next) =>{
            let resBody = {"success": true, "description": "获取类型列表成功"};
            try{
                let token = ctx.request.accept.headers.token;
                token = "test_token";
                let body = ctx.request.body;
                let name = body.name;
                resBody.data = await that.appService.getData(token);
            }catch (e){
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            ctx.body = resBody
        });
    }
}

module.exports = AppController;