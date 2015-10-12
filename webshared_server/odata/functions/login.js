/**
 * Created by Administrator on 2015/9/13 0013.
 */
/**
 * Created by Administrator on 2015/9/6 0006.
 */
var crypto = require('crypto'),
    func = require('node-odata').Function,
    resources = require('node-odata').resources,
    router = func();

//注册回调
router.post('/login', function (req, res, next) {
    // console.log(req.body);
    var name, pwd;
    name = req.body.name;
    pwd = req.body.password;
    return resources.admins.findOne({
        password: pwd
    }).or([{
        loginName: name
    }, {
        email: name
    }
    ]).exec(function (err, user) {
        if (!user || err) {
            return res.status(401).send("fail to login");
        }
        //token md5加密
        user.token = crypto.createHash("md5").update(new Date() + pwd).digest("hex");
        user.save();
        res.set("authorization", user.token);
        return res.json({
            name: user.name,
            loginName: user.loginName,
            email: user.email,
            gravatar: user.gravatar,
            disabled: user.disabled

        })
    })


});

router.post('/auto-login', function (req, res, next) {
    if (!req.user) {
        return res.status(401).send("fail to auto-login");
    }
    return res.json({
        name: req.user.name,
        loginName: req.user.loginName,
        email: req.user.email,
        gravatar: req.user.gravatar,
        disabled: req.user.disabled
    });
});

router.post('/logoff', function (req, res, next) {
    var token;
    token = req.get("authorization");
    return resources.admins.findOne({
        token: token
    }).exec(function (err, user) {
        if (!user) {
            return res.status(400).send("User not found.");
        }
        user.token = null;
        user.save();
        return res.json({
            name: user.name,
            loginName: user.loginName,
            email: user.email,
            gravatar: user.gravatar,
            disabled: user.disabled
        });
    });
});

module.exports = router;
