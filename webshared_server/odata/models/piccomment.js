/**
 * Created by Administrator on 2015/10/16 0016.
 */
/**
 * Created by Administrator on 2015/9/12 0012.
 */
module.exports={
    picture:String,//图片id
    openid:String,//用户id
    parentid:{type: String, default: "0"},//父结点id
    content:String,//内容
    info:{},//其它信息 扩展
    creatInfo:{createTime: {type: Date, default: Date.now},perple:String},//创建信息  创建时间、创建人
    updateInfo:{createTime: {type: Date, default: Date.now},perple:String},//修改信息  修改时间、修改人
    states:Boolean//状态 true false
};