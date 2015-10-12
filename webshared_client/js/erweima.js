/**
 * Created by Administrator on 2015/10/10 0010.
 */




var a,b;
var s=window.location.search;
var ac= s.substr(4,s.length-1);
console.log(ac);
var fristurl="http://gobiiig.com";
/*var fristurl="http://zxcasdmko.eicp.net";
 background:url("http://gobiiig.com/imgproxy?url=http://mmbiz.qpic.cn/mmbiz/Aic5X90eSstO5TEPOgNicXQa3ct4xNPMu11Q0KTGY5QBvoibmXhQc5jxUxDb76L3nw8jP8By2XZN1sVZM9DnJblXw/0") no-repeat
 e582dbb3-67ac-45fa-95f0-8a01dda92421*/
var getmethod="get";
$(function(){
    $.ajax({
        url:fristurl+"/v1/activities("+ac+")",
        type:getmethod,
        success:function(data){
            $(".er").append('<img src='+data.qrcodeurl+' width="60%" style="box-shadow:10px 10px 20px #777"/>');
            $(".poster").css("background","url(http://gobiiig.com:8003"+data.images.poster[1]+")");
        }
    });
});
function load(){

    $.ajax({
        url:fristurl+"/v1/pictrues?$filter=states%20eq%20true%20and%20activity%20%20eq%20%20%27"+ac+"%27&$orderby=creatInfo%20desc",
        type:getmethod,
        async:false,
        success:function(data){
            console.log(data);
            var html="";
            a=data.value.length;
            $.each(data.value,function(index,content){
                var openid=content.user;
                $.ajax({
                    url:fristurl+"/v1/users?$filter=openid%20eq%20%27"+openid+"%27",
                    type:getmethod,
                    async:false,
                    success:function(result){
                        console.log(result);
                        html='<li style="background:url(http://gobiiig.com/imgproxy?url='+content.pictureUrl+') no-repeat;">' +
                        '<div class="head col-sm-2 col-lg-2 col-md-2 col-md-offset-10 col-sm-offset-10 col-lg-offset-10"><img src='+result.value[0].userInfo.headimgurl+'' +
                        ' width="100%" class="img-circle" style="border:8px solid #fff"/> </div></li>'
                        /*';*/
                        $(".images").append(html);
                    }
                });

            })
        }
    });
    $.ajax({
        url:fristurl+"/v1/activities("+ac+")",
        type:getmethod,
        success:function(data){
            var bgurl="http://gobiiig.com:8003"+data.images.posterr[1]+"";
            if($(".images li").length==0){
                $(".images").css("background","url("+bgurl+")");
            }else{
                auto();
            }

        }
    })
}
load();
var i=0;
function auto(){
    if($(".images li").length-1>1){
    i++;
    if(i>$(".images li").length-1){
        i=0;
    }
    $(".images li").hide(100);
    $(".images li").eq(i).show(100);
}}
setInterval("auto()",8000);
function refresh(){
    $.ajax({
        url:fristurl+"/v1/pictrues?$filter=states%20eq%20true%20and%20activity%20%20eq%20%20%27"+ac+"%27&$orderby=time desc",
        type:getmethod,
        success:function(result){
            b=result.value.length;
        }
    });
    if(b-a>=1){
        load();
    }
}
setInterval("refresh()",10000)


