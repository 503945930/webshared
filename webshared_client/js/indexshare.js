/**
 * Created by Administrator on 2015/10/10 0010.
 */
    function share(ac) {
        $('#tishi').css('display', 'block');
        var config = $.ajax({
            url: "http://gobiiig.com/JSSDK?para=" + location.href.split('#')[0],
            type: "get"
        });


        var shareUrl = function () {
            return $.ajax({
                url: "http://gobiiig.com/sharedURL",
                type: "get",
                data:{"openid":openid,"activity":ac}
            });

        };

        var content = function (url) {
            return $.ajax({
                url: "http://gobiiig.com/v1/activities(" + ac + ")",
                type: "get"
            });

        };

        var url="";
        config.then(function (configres) {
            wxconfig(configres);
            return shareUrl()
        }).then(function(urlres){
            url=urlres;
            return content(urlres)
        }).then(function (contentres) {
            wx.onMenuShareAppMessage({
                title: contentres.name, // 分享标题   活动名称
                desc: contentres.info.theme, // 分享描述   活动主题
                link: url, // 分享链接
                imgUrl: "http://gobiiig.com:8003/" + contentres.images.posterr[1], // 分享图标   活动海报
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    $('#tishi').css('display', 'none');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    $('#tishi').css('display', 'none');
                }
            });


            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: contentres.name, // 分享标题
                link: url,
                imgUrl: "http://gobiiig.com:8003/" + contentres.images.posterr[1], // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    $('#tishi').css('display', 'none');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    $('#tishi').css('display', 'none');
                }
            });
        });


        function wxconfig(result) {
            wx.config({
                debug: false,
                appId: result.appId,
                timestamp: result.timestamp,
                nonceStr: result.nonceStr,
                signature: result.signature,
                jsApiList: [
                    //'checkJsApi',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline'
                ]
            });
        }


        // alert("请转发给好友或者转发到朋友圈");
        wx.error(function (res) {
            alert(res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    }


var name;
$(function(){
    $.ajax({
        url:fristurl+"/v1/activities?$select=address,id,states&$filter=states%20eq%201",
        type:getmethod,
        success:function(data){
            $.each(data.value,function(index,content){

            });
        }
    });
});
$(".refresh").click(function(){
    location.reload();
});
