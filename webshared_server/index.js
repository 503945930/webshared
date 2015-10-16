/**
 * Created by Administrator on 2015/9/7 0007.
 */
var http = require('http')
    , express = require('express')
    , WechatAPI = require('wechat-api')
    , odata = require('node-odata')
    , morgan = require('morgan')
    , domainError = require('./odata/middleware/domainError')
/*    ,authorization=require("./odata/middleware/authorization")*/
    , cors = require('cors')
    , model = require('./odata/models');


//菜单配置文件
var menu = require('./config/menu.json');
//微信配置
var wechat_config = require('./config/wechat_config.json');

//wxc8179212071d81d4
//8fd49e799483ba033bf596befe971b0b
//微信配置文件

var token = wechat_config.token;
var appid = wechat_config.appid;
var appsecret = wechat_config.appsecret;
var encodingAESKey = wechat_config.encodingAESKey;
var config = {
    token: token,
    appid: appid,
    encodingAESKey: encodingAESKey
};

//连接数据库
var server = odata('mongodb://120.24.61.90/wesharedb');
//var server = odata('mongodb://localhost/wesharedb');
//odata 上下文
odata.resources = server.resources;
server.use(cors({
    exposedHeaders: "authorization"
}));
//server.use(authorization);
server.use(require("./odata/middleware/authorization"));
server.use(domainError());
server.use(morgan("short"));
server.set('prefix', "v1");

var app = express();
//端口
app.set('port', 80);
app.use(express.query());


/*//实例化 WechatAPI
 var api = new WechatAPI(appid, appsecret);

 //创建菜单
 api.createMenu(menu, function(err,result){
 console.log(result);
 });*/


server.use(app);
server.use(require('./odata/resources/user'));
server.use(require('./odata/resources/comment'));
server.use(require('./odata/resources/piccomment'));
server.use(require('./odata/resources/activity'));
server.use(require('./odata/resources/admin'));
server.use(require('./odata/resources/qrcode'));
server.use(require('./odata/resources/picture'));
server.use(require('./odata/functions/login'));
server.use(require('./odata/functions/wechatInfo'));
server.use(require('./odata/functions/upload'));
//启动程序

/*http.createServer(app).listen(app.get('port'), function () {
 console.log('Express server listening on port ' + app.get('port'));
 });*/


server.listen(app.get('port'), function () {
    console.log("odata server listening on port ' + app.get('port')");
});
