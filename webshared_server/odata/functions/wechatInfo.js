/**
 * Created by Administrator on 2015/9/13 0013.
 */
var wechat = require('wechat'),
    OAuth = require('wechat-oauth'),
    WechatAPI = require('wechat-api'),
    func = require('node-odata').Function,
    resources = require('node-odata').resources,
    request = require("request"),
    router = func();

//读取配置
var wechat_config = require('./../../config/wechat_config.json');

var token = wechat_config.token;
var appid = wechat_config.appid;
var appsecret = wechat_config.appsecret;
var encodingAESKey = wechat_config.encodingAESKey;
var config = {
    token: token,
    appid: appid,
    encodingAESKey: encodingAESKey
};

//wechat oauth
var client = new OAuth(appid, appsecret);

//微信自动回复
router.all('/wechat', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上

    var message = req.weixin;

    console.log(message);
    switch (message.Event) {
        case "SCAN":
            resources.activities.findOne({sceneid: message.EventKey}, function (err, doc) {
                if (err) return res.send(err);


                var q = new resources.qrcodes({
                    sceneid: message.EventKey,
                    user: message.FromUserName,
                    activity: doc.id
                });

                q.save(function (err) {
                    console.log(err);
                });

                resources.users.findOne({openid: message.FromUserName}, function (err, use) {


                    if(use.userInfo.language=='zh_CN'){ 
                        res.reply("欢迎来到【" + doc.info.theme + "】" + doc.name + "的直播，自拍、上传，你就是大屏幕上的那个 BiiiG!");
                    }
                    else{
                        res.reply("Welcome to 【" + doc.info.theme + "】 " + doc.name + ", " +
                            "Take a selfie, upload here, you are the BiiiG one on the  Screen!");
                    }
  
                });





                /* resources.qrcodes.save({sceneid: message.EventKey, user: message.FromUserName}, function (errr, docc) {
                 if (err) return res.send(errr);

                 });*/

            });
            break;
        case "subscribe":
!  
            resources.users.findOne({openid: message.FromUserName}, function (err, use) {
                if (err) return res.status(500).send("server err");
                else if (use) {
                    if (message.EventKey == "") {
                        res.reply("欢迎来到GoBiiiGorGoHome");


                    }
                    else {


                        var scene = message.EventKey.split("_")[1];
                        resources.activities.findOne({sceneid: scene}, function (err, doc) {
                            if (err) return res.send(err);

                            var q = new resources.qrcodes({sceneid: scene, user: message.FromUserName, activity: doc.id});

                            q.save();
                            //res.reply(use.userInfo.language);
                            if(use.userInfo.language=='zh_CN'){
                                res.reply("欢迎来到【" + doc.info.theme + "】" + doc.name + "的直播，自拍、上传，你就是大屏幕上的那个 BiiiG!");
                            }
                            else{
                                res.reply("Welcome to 【" + doc.info.theme + "】 " + doc.name + ", " +
                                    "Take a selfie, upload here, you are the BiiiG one on the  Screen!");
                            }

                            /*res.reply("欢迎来到【" + doc.info.theme + "】" + doc.name + "的直播，自拍、上传，你就是大屏幕上的那个BiiiG！\n" +
                                "Welcome to 【" + doc.info.theme + "】 " + doc.name + " , " +
                                "Selfie, upload, you are the BiiiG one on the  Screen!");*/
                        });



                    }

                }

               else{
                    request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+appsecret, function (error, response, body) {
                        console.log("qqq");

                        console.log(JSON.parse(body).access_token);
                        if (!error && response.statusCode == 200) {

                            request('https://api.weixin.qq.com/cgi-bin/user/info?access_token='+JSON.parse(body).access_token+'&openid='+message.FromUserName, function (error, response, result) {
                                if (!error && response.statusCode == 200) {
                                    console.log(result);

                                    result=JSON.parse(result);
                                    console.log(result);
                                    if (message.EventKey == "") {
                                        console.log("EventKey");
                                        resources.users.create({
                                            openid: message.FromUserName, userInfo: {
                                                nickname: result.nickname,
                                                sex: result.sex,
                                                language: result.language,
                                                city: result.city,
                                                province: result.province,
                                                country: result.country,
                                                headimgurl: result.headimgurl
                                            }
                                        }, function (err, doc) {
                                            res.reply("欢迎来到GoBiiiGorGoHome");
                                            /*if(use.userInfo.language=='zh_CN'){
                                                res.reply("欢迎来到【" + doc.info.theme + "】" + doc.name + "的直播，自拍、上传，你就是大屏幕上的那个 BiiiG! 点击这里分享给好友");
                                            }
                                            else{
                                                res.reply("Welcome to 【" + doc.info.theme + "】 " + doc.name + ", " +
                                                    "Take a selfie, upload here, you are the BiiiG one on the  Screen!!   Tap here, show off to your friends!");
                                            }*/
                                        });


                                    }
                                    else {


                                        resources.users.create({
                                            openid: message.FromUserName, userInfo: {
                                                nickname: result.nickname,
                                                sex: result.sex,
                                                language: result.language,
                                                city: result.city,
                                                province: result.province,
                                                country: result.country,
                                                headimgurl: result.headimgurl
                                            }
                                        }, function (err, doc) {
                                            var scene = message.EventKey.split("_")[1];
                                            resources.activities.findOne({sceneid: scene}, function (err, doc) {
                                                if (err) return res.send(err);

                                                var q = new resources.qrcodes({sceneid: scene, user: message.FromUserName, activity: doc.id});

                                                q.save();
                                                if(use.userInfo.language=='zh_CN'){
                                                    res.reply("欢迎来到【" + doc.info.theme + "】" + doc.name + "的直播，自拍、上传，你就是大屏幕上的那个 BiiiG! ");
                                                }
                                                else{
                                                    res.reply("Welcome to 【" + doc.info.theme + "】 " + doc.name + ", " +
                                                        "Take a selfie, upload here, you are the BiiiG one on the  Screen!");
                                                }
                                                /*res.reply("欢迎来到【" + doc.info.theme + "】" + doc.name + "的直播，自拍、上传，你就是大屏幕上的那个BiiiG！\n" +
                                                    "Welcome to 【" + doc.info.theme + "】 " + doc.name + " , " +
                                                    "Selfie, upload, you are the BiiiG one on the  Screen!");*/
                                            });
                                        });



                                    }

                                }
                            });

                        }
                    });

                }
            });








            break;
        default :
            break;

    }
    switch (message.MsgType) {
        case "text":
            res.reply("你好，欢迎你的到来");
            break;
        case "image":
            resources.qrcodes.findOne({user: message.FromUserName}).sort({"creatInfo.createTime": "desc"}).exec(function (err, doc) {
                if (err) return res.send(err);
                console.log(doc);
                var p = new resources.pictrues({
                    user: message.FromUserName,
                    activity: doc.activity,
                    pictureUrl: message.PicUrl,
                    states: false

                });
                p.save(function (errr) {
                    console.log(errr);
                });
                //console.log("<a href='http://120.24.61.90:8002/html/share-user.html?openid=" + message.FromUserName + "&activity=" + doc.activity + "&userid=" + message.FromUserName + "'>真棒！ 现在也来亮瞎你的朋友圈 Well done!  Last step: show off to your friends！</a>")
                //res.reply("<a href='http://120.24.61.90:8002/html/share-user.html?openid=" + message.FromUserName + "&activity=" + doc.activity + "&userid=" + message.FromUserName + "'>真棒！ 现在也来亮瞎你的朋友圈 Well done!  Last step: show off to your friends！</a>");
                resources.users.findOne({openid: message.FromUserName}, function (err, use) {


                    if(use.userInfo.language=='zh_CN'){
                        res.reply("<a href='http://gobiiig.com:8002/html/share-user.html?openid=" + message.FromUserName + "&activity=" + doc.activity + "&userid=" + message.FromUserName + "'>真棒！ 现在也来亮瞎你的朋友圈！点击这里分享给好友</a>");
                    }
                    else{
                        res.reply("<a href='http://gobiiig.com:8002/html/share-user.html?openid=" + message.FromUserName + "&activity=" + doc.activity + "&userid=" + message.FromUserName + "'> Well done!  Last step: show off to your friends！Tap here, show off to your friends!</a>");
                    }

                });
            });
            break;
        case "voice":
            res.reply("声音");
            break;
        default :
            break;

    }

}));



//var url = client.getAuthorizeURL('http://gobiiig.com/oauth-openid', '1', 'snsapi_userinfo');
//注册回调
router.get('/oauth-openid1', function (req, res, next) {
    // console.log(req.query.code);


    var code = req.query.code;
    var share = req.query.share;
    var activity = req.query.activity;
    //获取openid

    client.getUserByCode(code, function (err, result) {
        if (err) {
            res.send(err);
        }
        var openid = result.openid;

        resources.users.findOne({openid: openid}, function (err, use) {
            if (err) return res.status(500).send("server err");
            if (use) {
                res.writeHeader(301, {'Location': "http://gobiiig.com:8002/html/user.html?openid=" + share + "&activity=" + activity + "&userid=" + openid});
                return res.end();
            }

            resources.users.create({
                openid: openid, userInfo: {
                    nickname: result.nickname,
                    sex: result.sex,
                    language: result.language,
                    city: result.city,
                    province: result.province,
                    country: result.country,
                    headimgurl: result.headimgurl
                }
            }, function (err, doc) {
                if (err) res.status(400).send(err);

                res.writeHeader(301, {'Location': "http://gobiiig.com:8002/html/user.html?openid=" + share + "&activity=" + activity + "&userid=" + openid});
                return res.end();
            });
        });


        //console.log(result);
        //var openid = result.openid;
        //console.log(result.openid);
        /*res.writeHeader(301, {'Location': "http://gobiiig.com:8002/html/user.html?openid=" + share + "&activity=" + activity + "&userid=" + openid });
         return res.end();*/
    });


});

router.get('/oauth-openid', function (req, res, next) {
    // console.log(req.query.code);


    var code = req.query.code;
    //获取openid

    client.getUserByCode(code, function (err, result) {
        if (err) {
            res.send(err);
        }
        //console.log(result);
        var openid = result.openid;
        //console.log(result.openid);
        resources.users.findOne({openid: openid}, function (err, use) {
            if (err) return res.status(500).send("server err");
            if (use) {
                res.writeHeader(301, {'Location': 'http://gobiiig.com:8002?openid=' + openid});
                return res.end();
            }

            resources.users.create({
                openid: openid, userInfo: {
                    nickname: result.nickname,
                    sex: result.sex,
                    language: result.language,
                    city: result.city,
                    province: result.province,
                    country: result.country,
                    headimgurl: result.headimgurl
                }
            }, function (err, doc) {
                if (err) res.status(400).send(err);

                res.writeHeader(301, {'Location': 'http://gobiiig.com:8002?openid=' + openid});
                return res.end();
            });
        });
    });


});


router.get("/JSSDK", function (req, res, next) {

    var para_url = req.query.para;
    var api = new WechatAPI(appid, appsecret);
    var param = {
        debug: false,
        jsApiList: ['openLocation', 'getLocation'],
        url: para_url
    };
    api.getJsConfig(param, function (err, result) {
        //console.log(err);
        //console.log(result);
        return res.send(result);

    });
});


router.post("/qrcode", function (req, res, next) {
    var id = req.body.id;
    var api = new WechatAPI(appid, appsecret);
    resources.activities.findOne().sort({"sceneid": "desc"}).exec(function (errr, docc) {
        if (errr) return err;
        console.log(docc);
        console.log(docc.sceneid + 1);
        api.createLimitQRCode(docc.sceneid + 1, function (err, result) {
            qrcodeurl = api.showQRCodeURL(result.ticket);
            resources.activities.findOne({"_id": id}).exec(function (err, doc) {
                if (err) return res.send(err);
                doc.sceneid = docc.sceneid + 1;
                doc.updateInfo.createTime = new Date();
                doc.qrcodeurl = qrcodeurl;
                doc.save();
                return res.send(qrcodeurl);
            });

        });
    });


});

router.get("/sharedURL", function (req, res, next) {
    var openid = req.query.openid;
    var activity = req.query.activity;
    var url = client.getAuthorizeURL('http://gobiiig.com/oauth-openid1?share=' + openid + "&activity=" + activity, '1', 'snsapi_userinfo');
    return res.send(url);
});


//图片代理
router.get("/imgproxy", function (req, res, next) {
    var url = req.query.url;
    request(url).pipe(res);

})
;


module.exports = router;