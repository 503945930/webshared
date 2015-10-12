/**
 * Created by Administrator on 2015/10/10 0010.
 */

$(".refresh").click(function(){
    location.reload();
});
$(".fa-heart-o").click(function(){
    $(this).removeClass("fa-heart-o");
    $(this).addClass('fa-heart');
});
var s=window.location.search;
var array= s.split("&");
openid=array[0].substr(8,array[0].length-1);
// console.log(openid);
///?openid=""  activityid=""
var activity=array[1].substr(9,array[1].length-1);
function huodong(){
    location.href="pingjia.html?openid="+openid+"&activity="+activity;
}

$(".dianzhan2").click(function(){
    zhan =parseInt($(".points").text());
    console.log(zhan);
    $(".points").text(zhan+1);
    $(".dianzhan2").attr("disabled",true);
    $(".love").removeClass('fa-heart-o');
    $(".love").addClass("fa-heart");
    var str={
        statistics:{praise:zhan+1}
    };

    $.ajax({
        url:fristurl+"/v1/activities("+activity+")",
        type:"put",
        data:str,
        success:function(){

        }
    });
});
var fristurl="http://gobiiig.com";
var url1=fristurl+"/v1/activities("+activity+")?$select=images,info,name,time,statistics,states";
var method="get";
var userid=[];
$(function(){
    $.ajax({
        url:url1,
        type:method,
        success:function(data){
            var html1="";
            $(".posters").empty();
            html1+='<p class="poster"><div style="width:100%"><img src=http://gobiiig.com:8003/'+data.images.posterr[1]+' width=100% /></div></p>';
            $(".posters").html(html1)
            $(".jianjie1").text(data.info.sponsor+" "+data.info.theme);
            $(".points").text(data.statistics.praise);
            $(".comments").text(data.statistics.comment);

        }
    });
    $.ajax({
        url:fristurl+"/v1/pictrues?$filter=states%20eq%20true%20and%20activity%20%20eq%20%20%27"+activity+"%27",
        type:method,
        success:function(data){
            var html3="";
            $.each(data.value,function(index,content){
                userid[index]=content.user;

            });
            function quchong(str){
                var bb={};
                var res=[];
                for(var i=1;i<str.length;i++){
                    if(!bb[str[i]]){
                        res.push(str[i]);
                        bb[str[i]]=1;
                    }
                }
                return res;
            }
            var openID=quchong(userid);
            for(var a=0;a<openID.length;a++){
                $.ajax({
                    url: fristurl+"/v1/users?$filter=openid%20eq%20%27"+openID[a]+"%27",
                    type: method,
                    success: function (result) {
                        html3='<li class="test-img"><img style="border-radius: 25px;" src='+result.value[0].userInfo.headimgurl+' ' +
                            'width="50" height="50" /></li>';
                        $(".field").append(html3);
                    }
                });
            }

        }
    });
    $.ajax({
        url:url1,
        type:method,
        success:function(data){

            $(".guanggao").html('<a class="ad" href='+data.images.ad[0]+'>' +
                '<img src=http://gobiiig.com:8003/'+data.images.ad[1]+' width=100% height=100/>' +
                ' </a>');
        }
    });

    $.ajax({
        url:url1,
        type:method,
        success:function(data){
            var time=data.time[0];
            var t=moment.utc(time).format("YYYY-MM-DD HH:mm:ss");
            /*var tt="";
            tt+= t.getFullYear()+"-";tt+= t.getMonth() + 1 +"-";tt+= t.getDate()+" ";
            tt+= t.getHours()+":"+ t.getMinutes()+":"+ t.getSeconds();*/
            $(".img2").empty();
            $(".img2").html('<img src=http://gobiiig.com:8003/'+data.images.posterr[1]+' width=100% height="300"/>');
            $(".theme").text(data.info.theme);
            $(".time").text(t);
            $(".place").text(data.address);
            $(".xiangqing").text(data.info.brief);
        }
    });
});

