/**
 * Created by Administrator on 2015/10/10 0010.
 */
var s=window.location.search;
var array= s.split("&");
var openid=array[0].substr(8,array[0].length-1);
// console.log(openid);
///?openid=""  activityid=""
var activity=array[1].substr(9,array[1].length-1);
var mydate=new Date();
//console.log(new Date());
var strtime="";
strtime+=mydate.getMonth()+1+"-";
strtime+=mydate.getDate()+" ";
strtime+=mydate.getHours()+":";
strtime+=mydate.getMinutes()+":";
strtime+=mydate.getSeconds();
//var date= time.replace(/\//g,'-');

var fristurl="http://gobiiig.com";
var url_0 = fristurl+"/v1/comments?$count=true&$orderby=creatInfo%20desc&$filter=activity%20eq%20%27"+activity+"%27%20and%20parentid%20eq%20%27"+0+"%27";
var url_1=fristurl+"/v1/comments?$count=true&$orderby=creatInfo%20desc&$filter=activity%20eq%20%27"+activity+"%27%20and%20parentid%20eq%20";
var name1;var headimgurl1;
var browse;
var point;
var forward;var comment;
var commentid2;
$(function(){
    $.ajax({
        url:url_0,
        type:method,
        success:function(data){
            comment=data["@odata.count"];

            $.ajax({
                url:fristurl+"/v1/activities("+activity+")",
                type:method,
                success:function(re){
                    browse=re.statistics.browse;
                    point=re.statistics.praise;
                    forward=re.statistics.forward;
                }
            });

            $(".bb").click(function(){
                if($("#aa").val().length!=0&&$("#aa").val()!=" "){
                    //console.log($("#aa").val());
                    $(function(){
                        var str2={
                            activity:activity,
                            openid:openid,
                            content:$("#aa").val(),
                            states:true,
                            parentid:0,
                            creatInfo:{createTime:mydate}
                        };
                        $.ajax({
                            url:fristurl+"/v1/comments",
                            type:"post",
                            data:str2,
                            async:false,
                            success:function(result){
                                commentid2=result.id;
                                $.ajax({
                                    url:fristurl+"/v1/users?$select=creatInfo,openid,userInfo,states&$filter=openid%20eq%20%27"+openid+"%27",
                                    type:method,
                                    async:false,
                                    success:function(data){
                                        name1=data.value[0].userInfo.nickname;
                                        headimgurl1=data.value[0].userInfo.headimgurl;
                                    }
                                });
                            }
                        });
                        var comment1=parseInt(comment)+1;
                        console.log(comment1);
                        $(".pinglun").append('<li class="comment" data-commentid="'+comment1+'"><div style="float:left;width:45px;">' +
                            '<a class="users"  onclick='+"user('"+openid+"')"+' data-userid='+openid+'>' +
                            '<img classs="touxiang"  src='+headimgurl1+' width="45" height="45"/> </a></div>' +
                            '<div class="plxq"> <p><b>'+name1+'</b><span class="time">&nbsp;&nbsp;'+strtime+'</span></p><div ><p>'+$("#aa").val()+'</p>' +
                            '</div><div class="ui-flex ui-flex-pack-end"><i class="fa fa-heart-o"></i> <span> </span>' +
                            '<button class="huifu" onclick='+"btnclick(openid,"+comment1+",commentid2)"+' type="submit" data-userid='+openid+' data-parentid="'+0+'" data-commentid="'+comment1+'">' +
                            '<i class="fa fa-commenting fa-1x" style="color:#222">回复</i></button></div></div><ul class="erjipinglun" data-commentid="'+comment1+'"></ul><hr/></li>' +
                            '<div style="clear:both"></div>');
                        $(".huifu").click(function(){
                            $("PL").hide();
                            $(".PLGR").show();
                        });
                        $(".fa-heart-o").click(function(){
                            $(this).removeClass('fa-heart-o');
                            $(this).addClass('fa-heart');
                        });
                        $(function(){
                            var str1={
                                statistics:{comment:comment+1,browse:browse,forward:forward,praise:point}
                            };
                            $.ajax({
                                url:fristurl+"/v1/activities("+activity+")",
                                type:"put",
                                data:str1,
                                success:function(result){
                                    // console.log(result.statistics.comment);
                                }
                            })
                        });
                    });
                    $("#aa").val("");
                }else{
                    alert("请输入内容！");
                }
            });
        }

    });
});
function btnclick(str1,str4,str3){
    $(".PL").hide();
    $(".PLGR").show();
    $.ajax({
        url:fristurl+'/v1/users?$filter=openid%20eq%20%27'+str1+'%27',
        type:method,
        success:function(result){
            $("#aa1").attr('placeholder','回复”'+result.value[0].userInfo.nickname+'“：');

            $(".bb1").click(function(){
                var name1,name2,headimgurl1;
                if($("#aa1").val().length!=0&&$("#aa1").val()!=" "){

                    //console.log($("#aa").val());
                    $(function(){
                        var str2={
                            activity:activity,
                            openid:openid,
                            parentid:str3,
                            content:$("#aa1").val(),
                            states:true,
                            creatInfo:{createTime:mydate}
                        };
                        $.ajax({
                            url:fristurl + "/v1/users?$select=creatInfo,openid,userInfo,states&$filter=openid%20eq%20%27" +openid+ "%27",
                            type:method,
                            async:false,
                            success:function(result){
                                name2=result.value[0].userInfo.nickname;
                            }
                        });
                        $.ajax({
                            url:fristurl+"/v1/comments",
                            type:"post",
                            data:str2,
                            async:false,
                            success:function(){
                                $.ajax({
                                    url:fristurl+"/v1/users?$select=creatInfo,openid,userInfo,states&$filter=openid%20eq%20%27"+openid+"%27",
                                    type:method,
                                    async:false,
                                    success:function(data){
                                        name1=data.value[0].userInfo.nickname;
                                        headimgurl1=data.value[0].userInfo.headimgurl;
                                    }
                                });
                            }
                        });
                        var li=$("ul[data-commentid='"+str4+"']");

                        li.append('<li class="comment"><div style="float:left;width:45px;">' +
                            '<a class="users"  onclick='+"user('"+openid+"')"+' data-userid='+openid+'>' +
                            '<img classs="touxiang"  src='+headimgurl1+' width="45" height="45"/> </a></div>' +
                            '<div class="plxq"> <p><b>'+name1+'</b>回复<b>'+name2+'</b><span class="time">&nbsp;&nbsp;'+strtime+'</span></p><div ><p>'+$("#aa1").val()+'</p>' +
                            '</div><div class="ui-flex ui-flex-pack-end"><i class="fa fa-heart-o"></i> <SPAN> </SPAN><button class="huifu" type="submit" data-userid='+openid+'data-parentid="'+str3+'" data_commentid="'+str4+'">' +
                            '<i class="fa fa-commenting fa-1x"  style="color:#222"></i>回复</button></div></div></li>' +
                            '<div style="clear:both"></div>');

                        $(".fa-heart-o").click(function(){
                            $(this).removeClass('fa-heart-o');
                            $(this).addClass('fa-heart');
                        })

                        $(function(){
                            var str1={
                                statistics:{comment:comment+1,browse:browse,forward:forward,praise:point}
                            };
                            $.ajax({
                                url:fristurl+"/v1/activities("+activity+")",
                                type:"put",
                                data:str1,
                                success:function(result){
                                    // console.log(result.statistics.comment);
                                }
                            })
                        });
                    });
                    $("#aa1").val("");
                    $(".PLGR").hide();
                    $(".PL").show();
                }else{
                    alert("请输入内容！");
                }
            })
        }

    });

}
$(function(){

    $(function () {
        var first =  $.ajax({
            url: url_0
        });
        first.then(function (data) {
            if(data.value.length!=0){
                xh(data.value);
            }
        }, function (err) {
            console.log(err);
        })
    });
    var strhtml='<li>';
    function  xh(str){
        $(".pinglun").empty();
        /* console.log(str);*/
        var name;
        var headimgurl;
        $.each(str,function(index,content) {
            $.ajax({
                url: fristurl + "/v1/users?$select=creatInfo,openid,userInfo,states&$filter=openid%20eq%20%27" + content.openid + "%27",
                type: method,
                async: false,
                success: function (data) {
                    name = data.value[0].userInfo.nickname;
                    headimgurl = data.value[0].userInfo.headimgurl;
                }
            });
            var t = content.creatInfo.createTime;
            var tt=moment.utc(t).format("MM-DD HH:mm");
            strhtml+=' <li class="comment" data-commentid="'+index+'"><div style="float:left;width:45px;">'+
                '<a  class="users" onclick='+"user('"+content.openid+"')"+' data-userid='+content.openid+'>' +
                '<img classs="touxiang" src='+headimgurl+' width="45" height="45"></a></div>' +
                '<div class="plxq"> <p><b>'+name+'</b><span class="time">&nbsp;&nbsp;'+tt+'</span></p>' +
                '<div ><p>'+content.content+'</p>' +
                '</div><div class="ui-flex ui-flex-pack-end"><i class="fa fa-heart-o"></i>' +
                '<button CLASS="huifu" data-commentid="'+index+'" data-parentid="'+content.id+'" data-userid='+content.openid+' type="submit" >' +
                '<i class="fa fa-commenting fa-1x" style="color:#222"></i>回复</button></div></div>' +
                '<div style="clear:both"></div><ul class="erjipinglun" data-commentid="'+index+'">';
            $.ajax({
                url: url_1+"%27"+content.id+"%27",
                async:false
            }).done(function(data){
                // console.log(data);
                if(data.value.length!=0){
                    xh2(data.value,index);
                }else{
                    strhtml+='</ul><hr/></li>';
                }
            });
            $('.pinglun').append(strhtml);
            strhtml='';
        });
        $(".fa-heart-o").click(function(){
            $(this).removeClass('fa-heart-o');
            $(this).addClass("fa-heart");
        });
        var user_id,li,parentid,commentid;
        $(".huifu").click(function(){
            /* console.log($('.PL').css("display"));
             $('.PL').css("display","none")*/
            user_id=$(this).attr('data-userid');
            parentid=$(this).attr('data-parentid');
            /* console.log(parentid);*/
            $(".PL").hide();
            $(".PLGR").show();
            commentid=$(this).attr('data-commentid');
            li=$("ul[data-commentid='"+commentid+"']");
            $(function(){
                $.ajax({
                    url:fristurl+'/v1/users?$filter=openid%20eq%20%27'+user_id+'%27',
                    type:method,
                    success:function(result){
                        console.log(user_id);
                        $("#aa1").attr('placeholder','回复”'+result.value[0].userInfo.nickname+'“：');
                    }
                });
            });
        });
        $(".bb1").click(function(){
            var name1,name2,headimgurl1;
            if($("#aa1").val().length!=0&&$("#aa1").val()!=" "){
                //console.log($("#aa").val());
                $(function(){
                    var str2={
                        activity:activity,
                        openid:openid,
                        parentid:parentid,
                        content:$("#aa1").val(),
                        states:true,
                        creatInfo:{createTime:mydate}
                    };
                    $.ajax({
                        url:fristurl + "/v1/users?$select=creatInfo,openid,userInfo,states&$filter=openid%20eq%20%27" +user_id+ "%27",
                        type:method,
                        async:false,
                        success:function(result){
                            name2=result.value[0].userInfo.nickname;
                        }
                    });
                    $.ajax({
                        url:fristurl+"/v1/comments",
                        type:"post",
                        data:str2,
                        async:false,
                        success:function(){
                            $.ajax({
                                url:fristurl+"/v1/users?$select=creatInfo,openid,userInfo,states&$filter=openid%20eq%20%27"+openid+"%27",
                                type:method,
                                async:false,
                                success:function(data){
                                    name1=data.value[0].userInfo.nickname;
                                    headimgurl1=data.value[0].userInfo.headimgurl;
                                }
                            });
                        }
                    });
                    li.append('<li class="comment"><div style="float:left;width:45px;">' +
                        '<a class="users"  onclick='+"user('"+openid+"')"+' data-userid='+openid+'>' +
                        '<img classs="touxiang"  src='+headimgurl1+' width="45" height="45"/> </a></div>' +
                        '<div class="plxq"> <p><b>'+name1+'</b>回复<b>'+name2+'</b><span class="time">&nbsp;&nbsp;'+strtime+'</span></p><div ><p>'+$("#aa1").val()+'</p>' +
                        '</div><div class="ui-flex ui-flex-pack-end" ><i class="fa fa-heart-o"></i><span > </span><button class="huifu" type="submit" data-userid='+openid+'data-parentid="'+parentid+'" data_commentid="'+commentid+'">' +
                        '<i class="fa fa-commenting fa-1x"  style="color:#222"></i></button>回复</div></div></li>' +
                        '<div style="clear:both"></div>');

                    $(".fa-heart-o").click(function(){
                        $(this).removeClass('fa-heart-o');
                        $(this).addClass('fa-heart');
                    });

                    $(function(){
                        var str1={
                            statistics:{comment:comment+1,browse:browse,forward:forward,praise:point}
                        };
                        $.ajax({
                            url:fristurl+"/v1/activities("+activity+")",
                            type:"put",
                            data:str1,
                            success:function(result){
                                // console.log(result.statistics.comment);
                            }
                        })
                    });
                });
                $("#aa1").val("");
                $(".PLGR").hide();
                $(".PL").show();
            }else{
                alert("请输入内容！");
            }
        })
    }
    function xh2(str,str1){
        //console.log(str);
        $.each(str,function(index,content){
            var name1,headimgurl,name2;
            console.log(str1);
            $.ajax({
                url:fristurl + "/v1/users?$select=creatInfo,openid,userInfo,states&$filter=openid%20eq%20%27" + content.openid + "%27",
                type:method,
                async:false,
                success:function(result){
                    name2=result.value[0].userInfo.nickname;
                }
            });
            $.ajax({
                url: fristurl + "/v1/users?$select=creatInfo,openid,userInfo,states&$filter=openid%20eq%20%27" + content.openid + "%27",
                type: method,
                async: false,
                success: function (data) {
                    name1 = data.value[0].userInfo.nickname;
                    headimgurl = data.value[0].userInfo.headimgurl;
                }
            });
            var t = content.creatInfo.createTime;
            var v = new Date(t);
            /*var tt="";
            tt += v.getMonth() + 1 + "-";
            tt += v.getDate() + " ";
            tt += v.getHours() + ":";
            tt += v.getMinutes();*/
            var tt=moment.utc(t).format("MM-DD HH:mm");
            strhtml+=' <li class="comment"><div style="float:left;width:45px;">'+
                '<a  class="users" onclick='+"user('"+content.openid+"')"+' data-userid='+content.openid+'>' +
                '<img classs="touxiang" src='+headimgurl+' width="45" height="45"></a></div>' +
                '<div class="plxq"> <p><b>'+name1+'</b>回复<b>'+name2+'</b><span class="time">&nbsp;&nbsp;'+tt+'</span></p>' +
                '<div ><p>'+content.content+'</p>' +
                '</div><div class="ui-flex ui-flex-pack-end" style="width:100%"><i CLASS="fa fa-heart-o"></i><span> </span>' +
                '<button CLASS="huifu" data-userid='+content.openid+' data-parentid='+content.parentid+' data-commentid='+str1+' type="submit" >' +
                '<i class="fa fa-commenting fa-1x" style="color:#222"></i>回复</button></div>' +
                '<div style="clear:both"></div></div></li>';
            $.ajax({
                url: url_1+"'"+content.openid+"'",
                async:false
            }).done(function(data){
                if(data.value.length!=0){
                    xh2(data.value);
                }
            });
        });
        strhtml+='</ul><hr/></li>';
    }

});

function user(str1){
    // console.log(openid);
    location.href="user.html?openid="+str1+"&activity="+activity+"&userid="+openid+"";
}
var method="get";
$(function(){
    $.ajax({
        url:fristurl+"/v1/activities("+activity+")?$select=images,id,states",
        type:method,
        async:false,
        success:function(data){
            /*console.log(data);*/
            $(".shuoshuo").html('<img src=http://gobiiig.com:8003/'+data.images.posterr[1]+' width=100%  height=250 />');
        }
    });
});
