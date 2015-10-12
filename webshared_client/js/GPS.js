/**
 * Created by Administrator on 2015/10/10 0010.
 */

var fristurl="http://gobiiig.com";
/* var fristurl="http://zxcasdmko.eicp.net";*/
var fujinurl=fristurl+"/v1/activities?$select=id,address,images,info,name,statistics,states";
var getmethod="get";
var postmethod="post"
$(".more").click(function(){

});
var openid
$(function(){


    var s=window.location.search;
    openid=s.substr(8, s.length-1);
    $.ajax({
        url:fujinurl,
        type:getmethod,
        /*async:false,*/
        success:function(data){
            $(".near").empty();
            var html="";var start;
            var map = new BMap.Map("allmap");
            var new_point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(new_point,12);
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);  // 创建标注
                    label1 =new BMap.Label("当前位置");
                    mk.setLabel(label1);
                    map.addOverlay(mk); // 将标注添加到地图中
                    map.panTo(r.point);
                    // alert('您的位置：'+r.point.lng+','+r.point.lat);
                    //start=new BMap.Point(r.point);
                    start= r.point;
                    $.each(data.value,function(index,content){
                        var name;
                        name=content.address; var juli;
                        var myGeo = new BMap.Geocoder();
                        myGeo.getPoint(name, function(point){
                            map.addOverlay(new BMap.Marker(point));
                            //map.centerAndZoom(point,12);
                            var marker1 = new BMap.Marker(point);  // 创建标注
                            label =new BMap.Label(name);
                            marker1.setLabel(label);
                            map.addOverlay(marker1);// 将标注添加到地图中
                            // map.centerAndZoom(point,16);
                            juli =map.getDistance(start,point);
                            if(juli<1000){
                                html='<li data-activity="'+content.id+'" onclick='+"live('"+content.id+"')"+'><div class="posters"><img class="posters-img" src=http://gobiiig.com:8003/'+content.images.posterr[1]+' width="60" height="60" alt=""/></div>' +
                                    '<div class="theme">'+content.info.theme+' ' +
                                    '<p class="distance" style="margin-top:25px;float:right;margin-right:15px;">距离:'+juli.toFixed(2)+'米</p>' +
                                    '<p class="love"><i style="margin-left:5px;" class="fa fa-heart-o">'+content.statistics.praise+'</i></p></div></div>' +
                                    '<div style=clear:both></div>';
                            }else{
                                juli/=1000;
                                html='<li data-activity="'+content.id+'" onclick='+"live('"+content.id+"')"+'><div class="posters"><img class="posters-img" src=http://gobiiig.com:8003/'+content.images.posterr[1]+' width="60" height="60" alt=""/></div>' +
                                    '<div class="theme">'+content.info.theme+' ' +
                                    '<p class="distance" style="margin-top:25px;float:right;margin-right:15px;">距离:'+juli.toFixed(2)+'公里</p>' +
                                    '<p class="love"><i style="margin-left:5px;" class="fa fa-heart-o">'+content.statistics.praise+'</i></p></div></div>' +
                                    '<div style=clear:both></div>';
                            };
                            $(".near").append(html);
                        });
                    });
                }
                else {
                    alert('failed'+this.getStatus());
                }
            },{enableHighAccuracy: true});
        }
    });
});
function live(str){
    location.href="html/livepage.html?openid="+openid+"&activity="+str;
}
