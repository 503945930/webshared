/**
 * Created by Administrator on 2015/9/15 0015.
 */
var fs, func, gm, mkdirp, resources, router, multiparty, path,crypto;

fs = require("fs");

mkdirp = require('mkdirp');

gm = require('gm');

func = require('node-odata').Function;

resources = require('node-odata').resources;

router = func();
multiparty = require('multiparty');
path = require('path');
crypto=require('crypto');

//上传图片
router.post('/file-upload', function (req, res, next) {

    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var complated, fileExtension, filename, height, sourcePath, targetFolder, targetPath, width, _ref, _ref1;
        //原路径
        sourcePath = files.file[0].path;
        //目标路径
        targetFolder = "./static/upload/" + req.query.path;
        mkdirp(targetFolder);
        //文件名 加密
        filename =crypto.createHash('sha1').update('' + +new Date()).digest('hex');
        //扩展名
        fileExtension = path.extname(files.file[0].originalFilename);
        targetPath = targetFolder + '/' + filename + fileExtension;
        fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));

        fs.unlink(sourcePath, function() {
            if (err) {
                throw err;
            }
            res.set("Connection", 'keep-alive');
            return res.send('/upload/' + req.query.path + '/' + filename + fileExtension);
        });

    });

});

//返回图片
router.get("/images",function(req, res, next){
    var name=req.query.name;
    console.log(__dirname);
    res.sendFile(__dirname+'/static'+name);
});

module.exports = router;