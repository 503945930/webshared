/**
 * Created by Administrator on 2015/9/23 0023.
 */
module.exports = {
    activity: String,
    sceneid: Number, //场景ID 代表活动
    user: String,
    creatInfo: {createTime: {type: Date, default: Date.now}, perple: String},//创建信息  创建时间、创建人
    updateInfo: {createTime: {type: Date, default: Date.now}, perple: String},//修改信息  修改时间、修改人
    states: Boolean//状态
};