/**
 * Created by peng.xue on 2017/8/1.
 */
module.exports= {
    develop:{
        tmplsPath: "./src/html",//模板地址迁移出项目      //"/develop/html",//模板地址
        staticPath: "./src",//静态资源路径迁移出项目     //"/develop", //静态资源路径
        apiUrl: "http://172.30.1.118:7900/oneclick-services-passport",//http://172.28.10.28:6004
        serverPort: 7002,
        redisUrl: "172.30.1.107",
        redisPort: "6379",
        redisPass: '',
        loginUrl: "http://127.0.0.1:3001/login"//登录页面
    }
}