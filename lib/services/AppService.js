/**
 * Created by peng.xue on 2017/8/1.
 */
var BaseService = require("./BaseService");
var Util = require("../utils/Util");
var HttpClientUtil = require("../utils/HttpClientUtil");

class AppService extends BaseService {
    constructor(logger, uriPrefix) {
        super(logger);
        this.uriPrefix = uriPrefix;
    }

    /**
     *注册获取验证码
     * @param local
     */
    getData(token) {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = that.uriPrefix + "/api/score/typelist";
            resolve(HttpClientUtil.getFormJSON(url, token));
        });
    }

}
module.exports = AppService;