/**
 * Created by Administrator on 2015/10/10 0010.
 */
    $('.submenu').smint({
    });
$(".submenu2").smint1({
});
$(".nav-two").click(function(){
    $(".nav-two").removeClass("ck");
    $(this).addClass('ck');
});

var i=0;
var time;
$(".lunbo-nav-ul li").click(function(){
    $(".lunbo-nav-ul li a").removeClass('bg');
    i=$(this).index();
    $(".lunbo-nav-ul li a").eq(i).addClass('bg');
    $("#img1 .lunbo  li").hide();
    $("#img1 .lunbo li").eq(i).show();
});
function auto(){
    i++;
    if(i>4){
        i=0;
    }
    $("#img1 .lunbo  li").hide();
    $("#img1 .lunbo li").eq(i).show();
    $(".lunbo-nav-ul li a").removeClass('bg');
    $(".lunbo-nav-ul li a").eq(i).addClass('bg');
}
setInterval("auto()",5000);



var x;
$(".nav-two-one").click(function(){

    for(x=0;x<$(".recent").length;x++){
        var cha1=$(".recent").eq(x).attr("data-time");
        if(cha1>=0&&cha1<7){
            $(".recent").eq(x).show();
        }else{
            $(".recent").eq(x).hide();
        }
    }
});
$(".nav-two-two").click(function(){
    for(x=0;x<$(".recent").length;x++){
        var cha1=$(".recent").eq(x).attr("data-time");
        if(cha1>=7&&cha1<14){
            $(".recent").eq(x).show();
        }else{
            $(".recent").eq(x).hide();
        }
    }
});
$(".nav-two-three").click(function(){
    for(x=0;x<$(".recent").length;x++){
        var cha1=$(".recent").eq(x).attr("data-time");
        if(cha1>=14&&cha1<31){
            $(".recent").eq(x).show();
        }else{
            $(".recent").eq(x).hide();
        }
    }
});
var activity2;
var activity3;
var activity4;
var activity5;
var activity6;
var brows2;
var brows3;
var brows4;
var brows5;
var brows6;
function huodong6(){
    location.href="html/pingjia.html?openid="+openid+"&activity="+activity6;
}
function huodong5(){
    location.href="html/pingjia.html?openid="+openid+"&activity="+activity5;
}
function huodong4(){
    location.href="html/pingjia.html?openid="+openid+"&activity="+activity4;
}
function huodong3(){
    location.href="html/pingjia.html?openid="+openid+"&activity="+activity3;
}
function huodong2(){
    location.href="html/pingjia.html?openid="+openid+"&activity="+activity2;
}
function activityer(){
    location.href="html/livepage.html?openid="+openid+"&activity="+activity2;
};

function activitysan(){
    location.href="html/livepage.html?openid="+openid+"&activity="+activity3;
};
function activitysi(){
    location.href="html/livepage.html?openid="+openid+"&activity="+activity4;
};
function activitywu(){
    location.href="html/livepage.html?openid="+openid+"&activity="+activity5;
};
function activityliu(){
    location.href="html/livepage.html?openid="+openid+"&activity="+activity6;
};
var zhan2;
var zhan3;
var zhan4;
var zhan5;
var zhan6;


$(".dianzhan2").click(function(){
    zhan2 =parseInt($(".zhan2").text());
    $(".zhan2").text(zhan2+1);
    $(".zambia2").text(zhan2+1);
    $(".dianzhan2").attr("disabled",true);
    $(".love2").removeClass('fa-heart-o');
    $(".love2").addClass("fa-heart");
    var str2={
        statistics:{comment:comment1,browse:browse1,forward:forward1,praise:zhan2+1}
    };
    $.ajax({
        url:fristurl+"/v1/activities("+activity2+")",
        type:"put",
        data:str2,
        success:function(){

        }
    });
});

$(".dianzhan3").click(function(){
    zhan3 =parseInt($(".zhan3").text());
    $(".zhan3").text(zhan3+1);
    $(".zambia3").text(zhan3+1);
    $(".dianzhan3").attr("disabled",true);
    $(".love3").removeClass('fa-heart-o');
    $(".love3").addClass("fa-heart");
    var str3={
        statistics:{comment:comment2,browse:browse2,forward:forward2,praise:zhan3+1}
    };

    $.ajax({
        url:fristurl+"/v1/activities("+activity3+")",
        type:"put",
        data:str3,
        success:function(){

        }
    });
});
$(".dianzhan4").click(function(){
    zhan4 =parseInt($(".zhan4").text());
    $(".zhan4").text(zhan4+1);
    $(".zambia4").text(zhan4+1);
    $(".dianzhan4").attr("disabled",true);
    $(".love4").removeClass('fa-heart-o');
    $(".love4").addClass("fa-heart");
    var str4={
        statistics:{comment:comment3,browse:browse3,forward:forward3,praise:zhan4+1}
    };

    $.ajax({
        url:fristurl+"/v1/activities("+activity4+")",
        type:"put",
        data:str4,
        success:function(){

        }
    });
});
$(".dianzhan5").click(function(){
    zhan5 =parseInt($(".zhan5").text());
    $(".zhan5").text(zhan5+1);
    $(".zambia5").text(zhan5+1);
    $(".dianzhan5").attr("disabled",true);
    $(".love5").removeClass('fa-heart-o');
    $(".love5").addClass("fa-heart");
    var str5={
        statistics:{comment:comment4,browse:browse4,forward:forward4,praise:zhan5+1}
    };

    $.ajax({
        url:fristurl+"/v1/activities("+activity5+")",
        type:"put",
        data:str5,
        success:function(){

        }
    });
});
$(".dianzhan6").click(function(){
    zhan6 =parseInt($(".zhan6").text());
    $(".zhan6").text(zhan6+1);
    $(".zambia6").text(zhan6+1);
    $(".dianzhan6").attr("disabled",true);
    $(".love6").removeClass('fa-heart-o');
    $(".love6").addClass("fa-heart");
    var str6={
        statistics:{comment:comment5,browse:browse5,forward:forward5,praise:zhan6+1}
    };
    $.ajax({
        url:fristurl+"/v1/activities("+activity6+")",
        type:"put",
        data:str6,
        success:function(){
        }
    });
});
$(".poster2").click(function(){
    brows2=parseInt($(".brows2").text());
    $(".broes2").text(brows2+1);
    var str2={
        statistics:{comment:comment1,browse:brows2+1,forward:forward1,praise:point1}
    };
    $.ajax({
        url:fristurl+"/v1/activities("+activity2+")",
        type:"put",
        data:str2,
        success:function(){

        }
    });
});
$(".poster3").click(function(){
    brows3=parseInt($(".brows3").text());
    $(".broes3").text(brows3+1);
    var str3={
        statistics:{comment:comment2,browse:brows3+1,forward:forward2,praise:point2}
    };
    $.ajax({
        url:fristurl+"/v1/activities("+activity3+")",
        type:"put",
        data:str3,
        success:function(){

        }
    });
});
$(".poster4").click(function(){
    brows4=parseInt($(".brows4").text());
    $(".broes4").text(brows4+1);
    var str4={
        statistics:{comment:comment3,browse:brows4+1,forward:forward3,praise:point3}
    };
    $.ajax({
        url:fristurl+"/v1/activities("+activity4+")",
        type:"put",
        data:str4,
        success:function(){

        }
    });
});
$(".poster5").click(function(){
    brows5=parseInt($(".brows5").text());
    $(".broes5").text(brows5+1);
    var str5={
        statistics:{comment:comment4,browse:brows5+1,forward:forward4,praise:point4}
    };
    $.ajax({
        url:fristurl+"/v1/activities("+activity5+")",
        type:"put",
        data:str5,
        success:function(){

        }
    });
});
$(".poster6").click(function(){
    brows6=parseInt($(".brows6").text());
    $(".broes6").text(brows6+1);
    var str6={
        statistics:{comment:comment5,browse:brows6+1,forward:forward5,praise:point5}
    };
    $.ajax({
        url:fristurl+"/v1/activities("+activity6+")",
        type:"put",
        data:str6,
        success:function(){

        }
    });
});