/**
 * Created by Administrator on 2015/9/12 0012.
 */
module.exports={
    num:{type:Number,default:0},//序号 备注：手动排序
    name:String,//名称
    address:String,//地址
    time:[Date],//时间  数组  开始时间和结束时间
    info:{theme:String,sponsor:String,brief:String},//另外的信息  主题、主办方、简介
    images:{ad:[String],poster:[String],posterr:[String]},//图片  广告、海报
    statistics:{praise:{type:Number,default:0},forward:{type:Number,default:0},browse:{type:Number,default:0},comment:{type:Number,default:0}},  //统计  数组 点赞数、转发数、浏览数,评论数
    sceneid:{type:Number,default:0},//场景id
    qrcodeurl:{type:String,default:""},//二维码地址
    creatInfo:{createTime: {type: Date, default: Date.now},perple:String},//创建信息  创建时间、创建人
    updateInfo:{createTime: {type: Date, default: Date.now},perple:String},//修改信息  修改时间、修改人
    states:{type:Number,default:4}//状态  1.活动中 0. 删除  2 下线 4 未开始
};