/**
 * Created by Administrator on 2015/9/12 0012.
 */
module.exports={
    user:String,//用户id
    activity:String,//活动id
    pictureUrl:String,//图片路径
    creatInfo:{createTime: {type: Date, default: Date.now},perple:String},//创建信息  创建时间、创建人
    updateInfo:{createTime: {type: Date, default: Date.now},perple:String},//修改信息  修改时间、修改人
    states:Boolean//状态
};