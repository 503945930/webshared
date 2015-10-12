/**
 * Created by Administrator on 2015/10/10 0010.
 */
var openid;
var s=window.location.search;
var array= s.split("&");
openid=array[0].substr(8,array[0].length-1);
// console.log(openid);
///?openid=""  activityid=""
var activity=array[1].substr(9,array[1].length-1);
var userid=array[2].substr(7,array[2].length-1);
var method="get";
var fristurl="http://gobiiig.com";
var url1=fristurl+"/v1/users?$select=userInfo,states&$filter=openid%20eq%20%27"+openid+"%27";
var url2=fristurl+"/v1/activities?$select=id,images,states&$top=5";
var url3= fristurl+"/v1/pictrues?$filter=user%20eq%20%27"+openid+"%27";
var urluser=fristurl+"/v1/pictrues?$filter=user%20eq%20%27"+openid+"%27%20and%20activity%20eq%20%27"+activity+"%27";
$(function(){
    $.ajax({
            url:url1,
            type:method,
            success:function(data){
                var path=data.value[0].userInfo.headimgurl;
                console.log(path);
                /*var imgpath=data.img;*/
                $(".touxiang").empty();
                var html="";
                html+='<img src='+path+' width="115" height="118"/>';
                $(".touxiang").html(html);
                /*$(".live").text(data.lives);
                 $(".post").text(data.post);
                 $(".points").text(data.points);
                 $(".comment").text(data.comment);*/
                $(".name").text(data.value[0].userInfo.nickname);
                //$(".live-post").css("background","url("+imgpath+") no-repeat center");
            }
        }
    );
    $.ajax({
        url:url2,
        type:method,
        success:function(data){
            console.log(data);
            $(".hotimg").empty();
            var html="";
            $.each(data.value,function(index,content){
                html+='<li class="aa"><a onclick=active("'+content.id+'") ><img src=http://gobiiig.com:8003/'+content.images.posterr[1]+' width="60" height="60"/> </a></li>';
                $(".hotimg").html(html);
            })
        }
    });

    $.ajax({
        url:urluser,
        type:method,
        success:function(data){
            console.log(data);
            var html="";
            $.each(data.value,function(index,content){
                html='<li><img src=http://gobiiig.com/imgproxy?url='+content.pictureUrl+' width="100%" height="100%"></li>'
                $(".user-live").append(html);
            });
        }
    });
    $.ajax({
        url:url3,
        type:method,
        success:function(data){
            $(".watchlive").empty();
            var html="";
            $.each(data.value,function(index,content){
                html+='<li class="aa"><img src=http://gobiiig.com/imgproxy?url='+content.pictureUrl+' width="60" height="60"/> </li>';
                $(".watchlive").html(html);
            })
        }
    });
});
var i=0;
function auto(){
    i++;
    if(i>$(".user-live li").length-1){
        i=0;
    }
    $(".user-live li").hide(100);
    $(".user-live li").eq(i).show(100);
}
setInterval("auto()",5000);
function active(str){
    location.href="../html/livepage.html?opendid="+userid+"&activity="+str+"";
}