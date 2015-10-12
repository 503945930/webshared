/**
 * Created by Administrator on 2015/10/10 0010.
 */

function daysBetween(DateOne,DateTwo)
{
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));

    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
    return cha;
}
$(function(){
    var t=new Date();
    var time=moment.utc(t).format("YYYY/MM/DD");
    var date= time.replace(/\//g,'-');
    var recentlyurl=fristurl+"/v1/activities?$select=id,images,info,name,time,statistics,states&$orderby=time";
    $.ajax({
        url: recentlyurl,
        type: getmethod,
        async:false,
        success: function (data) {
           // $(".Recently").empty();
            var html = "";
            var date2="";
            var time="";
            $.each(data.value, function (index, content){
                date2=content.time[0];
                time=date2.substr(0,10);
                var cha=daysBetween(time,date);

           html = '<li class="recent" data-time=' + cha + '><h1 style="text-align: center"><label class="ui-label" style="background:red;color: #ffffff;">' + time + '</label>' + content.info.theme + '</h1>' +
        '<div class="img1"><img src=http://gobiiig.com:8003/' + content.images.posterr[1] + ' width=100% height="300"/> <div class="ui-flex ui-flex-pack-end">' +
        '<i class="fa fa-heart-o "></i></div> </div> <div >' +
        '<p style="color:#CCCCCC;font-size:16px;" ><span class="pointss" data-activity=' + content.id + '>' + content.statistics.praise + '</span>likes ．' +
        '<span class="commentss" data-activity=' + content.id + '>' + content.statistics.comment + '</span>comments</p><div>' +
        '<button class="ui-border-radius love-dian" onclick=upcoming(\"' + content.id + '\")  data-potions=' + content.statistics.praise + ' data-activity=' + content.id + ' type="submit" style="width:55px;height:40px;float:left">' +
        '<span class="fa fa-heart-o"></span></button>' +
        '<button class="ui-border-radius" type="submit" onclick=commentt(\"' + content.id + '\") data-activity=' + content.id + ' style="width:55px;height:40px;float:left"><span class="fa fa-comment-o"></span></button>' +
        '<a class="app" style="float: right;margin-right:15px;" href="javascript:void(0);" onclick=share(\"' + content.id + '\")><i class="fa fa-share-alt fa-2x"></i></a>' +
        '</div> </div>' +
        '<div style="clear: both;"></div></li>';
    $(".recently").append(html);
                var bb=$(".recent").eq(index).attr("data-time");
                if(bb<0){
                    $(".recent").eq(index).css("display","none");
                }
            });

            $(".fa-heart-o").click(function(){
                $(this).removeClass("fa-heart-o");
                $(this).addClass('fa-heart');
            });

        },
        error:function(){
            alert("1");
        }
    });

   /* $.ajax({
        url:url1,
        type:getmethod,
        async:false,
        success:function(data){
            $(".points1").text(data.value[0].statistics.praise);
            $(".comments1").text(data.value[0].statistics.comment);
            $(".new").empty();
            var html="";
            $.each(data.value,function(index,content){
                html='<div class="img2"><img src=http://gobiiig.com:8003/'+content.images.posterr[1]+' width=100% ></div>' +
                    '<i class="fa fa-heart-o "></i>';
            });
            $(".new").html(html);
        }
    });*/

});
$(".fa-heart-o").click(function(){
    $(this).removeClass("fa-heart-o");
    $(this).addClass('fa-heart');
});
function commentt(str){
    location.href="/html/pingjia.html?openid="+openid+"&activity="+str;
}

function upcoming(str){
    // console.log($(".pointss[data-activity='"+str+"']"));
    var pointss=$(".pointss[data-activity='"+str+"']").text();
    //$(this).attr("disabled",true);
    $(".love-dian[data-activity='"+str+"']").attr("disabled",true);
    var point=parseInt(pointss);
    //console.log(point);
    /* $(".broes6").text(brows6+1);*/
    $(".pointss[data-activity='"+str+"']").text(point+1);
    var strupcoming={
        statistics:{praise:point+1}
    };
    $.ajax({
        url:fristurl+"/v1/activities("+str+")",
        type:"put",
        data:strupcoming,
        success:function(){
        }
    });
}
