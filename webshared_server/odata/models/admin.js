/**
 * Created by Administrator on 2015/9/9 0009.
 */
module.exports = {
    name: String,
    loginName: String,//用户名
    password: String,
    email: String,
    token: String,
    disabled: {type: Boolean, default: false},
    creatInfo:{createTime: {type: Date, default: Date.now},perple:String},//创建信息  创建时间、创建人
    updateInfo:{createTime: {type: Date, default: Date.now},perple:String},//修改信息  修改时间、修改人
    states:Boolean//状态
};