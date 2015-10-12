/**
 * Created by Administrator on 2015/10/10 0010.
 */
var activity2,activity3,activity4,activity5,activity6;
//var fristurl="http://zxcasdmko.eicp.net";
var point1,point2,point3,point4,point5,browse1,browse2,browse3,browse4,browse5;
var forward1,forward2,forward3,forward4,forward5,comment1,comment2,comment3,comment4,comment5;
var poster2,poster3,poster4,poster5,poster6,title2,title3,title4,title5,title6;
var theme2,theme3,theme4,theme5,theme6;
var fristurl="http://gobiiig.com";
var posterurl=fristurl+"/v1/activities?$select=images,states&$orderby=creatInfo%20desc&$top=5";
var url1=fristurl+"/v1/activities?$select=id,num,images,info,name,statistics,time,address,states&$orderby=num&$top=1&$skip=0";
var url2=fristurl+"/v1/activities?$select=id,num,images,info,name,statistics,time,address,states&$orderby=num&$top=1&$skip=1";
var url3=fristurl+"/v1/activities?$select=id,num,images,info,name,statistics,time,address,states&$orderby=num&$top=1&$skip=2";
var url4=fristurl+"/v1/activities?$select=id,num,images,info,name,statistics,time,address,states&$orderby=num&$top=1&$skip=3";
var url5=fristurl+"/v1/activities?$select=id,num,images,info,name,statistics,time,address,states&$orderby=num&$top=1&$skip=4";
var ADurl=fristurl+"/v1/activities?$select=images,states&$orderby=num&$top=1&skip=0";
$(function(){
    $.ajax({
        url:posterurl,
        type:getmethod,
        success:function(result){
            var html="";
            console.log(result);
            $(".lunbo").empty();
            $.each(result.value,function(index,content){
                html+='<li><img src=http://gobiiig.com:8003/'+content.images.posterr[1]+' width=100% height="300" /></li>';
                $(".lunbo").html(html);

            });
        }
    });
    $.ajax({
        url:url1,
        type:getmethod,
        success:function(result){
            var path=result.value[0].images.posterr[1];
            $(".poster2").append('<li><a href="#" onclick='+"activityer()"+'><img src=http://gobiiig.com:8003/'+path+' width=100% height="300"/></a></li>');
            $(".jianjie2").text(result.value[0].info.sponsor+" "+result.value[0].info.theme);
            //$(".activity2").text(result.value[0].id);
            activity2=result.value[0].id;
            point1=result.value[0].statistics.praise;
            comment1=result.value[0].statistics.comment;
            browse1=result.value[0].statistics.browse;
            forward1=result.value[0].statistics.forward;
            var t=result.value[0].time[0];
            var tt=moment.utc(t).format("YYYY-MM-DD HH:mm:ss");
            /*var v=new Date(t);
            tt+= v.getMonth()+1+"-";
            tt+= v.getDate()+" ";
            tt+= v.getHours()+":";
            tt+= v.getMinutes();*/
            $(".zhan2").text(result.value[0].statistics.praise);//input
            $(".pinlun2").text(result.value[0].statistics.comment)//span button p
            $(".seclected2").text(result.value[0].name);
            $(".theme2").text(result.value[0].info.theme);
            $('.time2').text(tt);
            $(".brief2").text(result.value[0].info.brief);
            $(".place2").text(result.value[0].address);
            $(".brows2").text(result.value[0].statistics.browse);
            $(".zambia2").text(result.value[0].statistics.praise);
            $(".Sponsor2").text(result.value[0].info.sponsor);
            $.ajax({
                url:fristurl+"/v1/pictrues?$filter=states%20eq%20true%20and%20activity%20%20eq%20%20%27"+activity2+"%27&$orderby=creatInfo%20desc",
                type:getmethod,
                success:function(data){
                    var html="";
                    $.each(data.value,function(index,content){
                        html='<li><a href="#" onclick='+"activityer()"+'><img src=http://gobiiig.com/imgproxy?url='+content.pictureUrl+' width="100%" height="300"></a> </li>'
                        $(".poster2").append(html);
                    })
                }
            })
        }
    });
    $.ajax({
        url:url2,
        type:getmethod,
        //async:false,
        success:function(result){
            var path=result.value[0].images.posterr[1];
            $(".poster3").append('<li><a href="#" onclick='+"activitysan()"+'><img src=http://gobiiig.com:8003/'+path+' width=100% height="300"/></a></li>');
            $(".jianjie3").text(result.value[0].info.sponsor+" "+result.value[0].info.theme);
            //$(".activity3").text(result.value[0].id);
            activity3=result.value[0].id;
            point2=result.value[0].statistics.praise;
            comment2=result.value[0].statistics.comment;
            browse2=result.value[0].statistics.browse;
            forward2=result.value[0].statistics.forward;
            var t=result.value[0].time[0];
            /*var tt="";
            var v=new Date(t);
            tt+= v.getMonth()+1+"-";
            tt+= v.getDate()+" ";
            tt+= v.getHours()+":";
            tt+= v.getMinutes();*/
            var tt=moment.utc(t).format("YYYY-MM-DD HH:mm:ss");
            $(".zhan3").text(result.value[0].statistics.praise);//input
            $(".pinlun3").text(result.value[0].statistics.comment)//span button p
            $(".seclected3").text(result.value[0].name);
            $(".theme3").text(result.value[0].info.theme);
            $('.time3').text(tt);
            $(".brief3").text(result.value[0].info.brief);
            $(".place3").text(result.value[0].address);
            $(".brows3").text(result.value[0].statistics.browse);
            $(".zambia3").text(result.value[0].statistics.praise);
            $(".Sponsor3").text(result.value[0].info.sponsor);
            $.ajax({
                url:fristurl+"/v1/pictrues?$filter=states%20eq%20true%20and%20activity%20%20eq%20%20%27"+activity3+"%27&$orderby=creatInfo%20desc",
                type:getmethod,
                success:function(data){
                    var html="";
                    $.each(data.value,function(index,content){
                        html='<li><a href="#" onclick='+"activitysan()"+'><img src=http://gobiiig.com/imgproxy?url='+content.pictureUrl+' width="100%" height="300"></a> </li>'
                        $(".poster3").append(html);
                    })
                }
            })
        }
    });
    $.ajax({
        url:url3,
        type:getmethod,
        success:function(result){
            var path=result.value[0].images.posterr[1];
            $(".poster4").append('<li><a href="#" onclick='+"activitysi()"+'><img src=http://gobiiig.com:8003/'+path+' width=100% height="300"/></a></li>');
            $(".jianjie4").text(result.value[0].info.sponsor+" "+result.value[0].info.theme );
            //$(".activity4").text(result.value[0].id);
            activity4=result.value[0].id;
            point3=result.value[0].statistics.praise;
            comment3=result.value[0].statistics.comment;
            browse3=result.value[0].statistics.browse;
            forward3=result.value[0].statistics.forward;
            var t=result.value[0].time[0];

            var tt=moment.utc(t).format("YYYY-MM-DD HH:mm:ss");
            $(".zhan4").text(result.value[0].statistics.praise);//input
            $(".pinlun4").text(result.value[0].statistics.comment)//span button p
            $(".seclected4").text(result.value[0].name);
            $(".theme4").text(result.value[0].info.theme);
            $('.time4').text(tt);
            $(".brief4").text(result.value[0].info.brief);
            $(".place4").text(result.value[0].address);
            $(".brows4").text(result.value[0].statistics.browse);
            $(".zambia4").text(result.value[0].statistics.praise);
            $(".Sponsor4").text(result.value[0].info.sponsor);
            //console.log(result);
            $.ajax({
                url:fristurl+"/v1/pictrues?$filter=states%20eq%20true%20and%20activity%20%20eq%20%20%27"+activity4+"%27&$orderby=time desc",
                type:getmethod,
                success:function(data){
                    var html="";
                    $.each(data.value,function(index,content){
                        html='<li><a href="#" onclick='+"activitysi()"+'><img src=http://gobiiig.com/imgproxy?url='+content.pictureUrl+' width="100%" height="300"></a> </li>'
                        $(".poster4").append(html);
                    })
                }
            })
        }
    });
    $.ajax({
        url:url4,
        type:getmethod,
        success:function(result){
            var path=result.value[0].images.posterr[1];
            $(".poster5").append('<li><a href="#" onclick='+"activitywu()"+'><img src=http://gobiiig.com:8003/'+path+' width=100% height="300"/></a></li>');
            $(".jianjie5").text(result.value[0].info.sponsor+" "+result.value[0].info.theme);
            //$(".activity5").text(result.value[0].id);
            activity5=result.value[0].id;
            point4=result.value[0].statistics.praise;
            comment4=result.value[0].statistics.comment;
            browse4=result.value[0].statistics.browse;
            forward4=result.value[0].statistics.forward;
            var t=result.value[0].time[0];
            /*var tt="";
            var v=new Date(t);
            tt+= v.getMonth()+1+"-";
            tt+= v.getDate()+" ";
            tt+= v.getHours()+":";
            tt+= v.getMinutes();*/
            var tt=moment.utc(t).format("YYYY-MM-DD HH:mm:ss");

            $(".zhan5").text(result.value[0].statistics.praise);//input
            $(".pinlun5").text(comment4)//span button p
            $(".seclected5").text(result.value[0].name);
            $(".theme5").text(result.value[0].info.theme);
            $('.time5').text(tt);
            $(".brief5").text(result.value[0].info.brief);
            $(".place5").text(result.value[0].address);
            $(".brows5").text(result.value[0].statistics.browse);
            $(".zambia5").text(result.value[0].statistics.praise);
            $(".Sponsor5").text(result.value[0].info.sponsor);
            //console.log(result);
            $.ajax({
                url:fristurl+"/v1/pictrues?$filter=states%20eq%20true%20and%20activity%20%20eq%20%20%27"+activity5+"%27&$orderby=time desc",
                type:getmethod,
                success:function(data){
                    var html="";
                    $.each(data.value,function(index,content){
                        html='<li><a href="#" onclick='+"activitywu()"+'><img src=http://gobiiig.com/imgproxy?url='+content.pictureUrl+' width="100%" height="300"></a> </li>'
                        $(".poster5").append(html);
                    })
                }
            })
        }
    });
    $.ajax({
        url:url5,
        type:getmethod,
        success:function(result){

            var path=result.value[0].images.posterr[1];
            $(".poster6").append('<li><a href="#" onclick='+"activityliu()"+'><img src=http://gobiiig.com:8003/'+path+' width=100% height="300"/></a></li>');
            $(".jianjie6").text(result.value[0].info.sponsor +" "+ result.value[0].info.theme);
            //$(".activity6").text(result.value[0].id);
            activity6=result.value[0].id;
            point5=result.value[0].statistics.praise;
            comment5=result.value[0].statistics.comment;
            browse5=result.value[0].statistics.browse;
            forward5=result.value[0].statistics.forward;
            var t=result.value[0].time[0];
            /*var tt="";
            var v=new Date(t);

            tt+= v.getMonth()+1+"-";
            tt+= v.getDate()+" ";
            tt+= v.getHours()+":";
            tt+= v.getMinutes();*/
            var tt=moment.utc(t).format("YYYY-MM-DD HH:mm:ss");
            $(".zhan6").text(result.value[0].statistics.praise);//input
            $(".pinlun6").text(result.value[0].statistics.comment)//span button p
            $(".seclected6").text(result.value[0].name);
            $(".theme6").text(result.value[0].info.theme);
            $('.time6').text(tt);
            $(".brief6").text(result.value[0].info.brief);
            $(".place6").text(result.value[0].address);
            $(".brows6").text(result.value[0].statistics.browse);
            $(".zambia6").text(result.value[0].statistics.praise);
            $(".Sponsor6").text(result.value[0].info.sponsor);
            //console.log(result);
            $.ajax({
                url:fristurl+"/v1/pictrues?$filter=states%20eq%20true%20and%20activity%20%20eq%20%20%27"+activity6+"%27&$orderby=time desc",
                type:getmethod,
                success:function(data){
                    var html="";
                    $.each(data.value,function(index,content){
                        html='<li><a href="#" onclick='+"activityliu()"+'><img src=http://gobiiig.com/imgproxy?url='+content.pictureUrl+' width="100%" height="300"></a> </li>'
                        $(".poster6").append(html);
                    })
                }
            })
        }
    });
    $.ajax({
        url:ADurl,
        type:getmethod,
        success:function(result){

            var path=result.value[0].images.ad[1];
            var urlad=result.value[0].images.ad[0];
            $(".guanggao").empty();
            var html="";
            html='<a class="ad" href="http://"'+urlad+'>'+
                '<img src=http://gobiiig.com:8003/'+path+' width=100% height="100"/></a>';
            $(".guanggao").html(html);

        }
    });
});
$(".HOT").click(function(){
    $(".NOW").removeClass("ck");
    $(".UPCOMING").removeClass("ck");
    $(this).addClass("ck");
    $(".Hot").show();
    $(".Now").hide();
    $(".upcoming").hide();
});
$(".NOW").click(function(){
    $(".HOT").removeClass("ck");
    $(".UPCOMING").removeClass("ck");
    $(this).addClass("ck");
    $(".Hot").hide();
    $(".Now").show();
    $(".upcoming").hide();
});
$(".UPCOMING").click(function(){
    $(".HOT").removeClass("ck");
    $(".NOW").removeClass("ck");
    $(this).addClass("ck");
    $(".Hot").hide();
    $(".Now").hide();
    $(".upcoming").show();
});
$(".seclected2").click(function(){
    $("#Hotjj2").toggle();

});
$(".seclected3").click(function(){
    $("#Hotjj3").toggle();
});
$(".seclected4").click(function(){
    $("#Hotjj4").toggle();
});
$(".seclected5").click(function(){
    $("#Hotjj5").toggle();
});
$(".seclected6").click(function(){
    $("#Hotjj6").toggle();
});
