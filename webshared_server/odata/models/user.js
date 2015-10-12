/**
 * Created by Administrator on 2015/9/12 0012.
 */
module.exports = {
    openid: String,//openid
    info: [{                     //信息  活动id 数组 、活动次数、上传图片次数
        activity: [String],
        times: {type: Number, default: 0},
        uploadTime: {type: Number, default: 0}
    }],
    userInfo: {          //用户信息
        nickname: String,
        sex: Number,
        language: String,
        city: String,
        province: String,
        country: String,
        headimgurl: String
    },
    creatInfo: {createTime: {type: Date, default: Date.now}, perple: String},//创建信息  创建时间、创建人
    updateInfo: {createTime: {type: Date, default: Date.now}, perple: String},//修改信息  修改时间、修改人
    states: {type: Boolean, default: true}//状态
};