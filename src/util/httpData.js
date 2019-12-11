import Taro from '@tarojs/taro';
import { httpUtil } from './httpUtil';
import { dateUtil } from './dateUtil';
import { config } from './configUtil'

const AmapUrl = 'https://restapi.amap.com/v3/'
const AMapKey = '15b65d3e7e573eeca3294d320b714f01'
let api = httpUtil.api;

/**
 * 小程序获取城市-通过经纬度
 * @param {*经度} longitude 
 * @param {*纬度} latitude 
 */
const getCity = (longitude, latitude) => {
    return new Promise((resolve, reject) => {
        httpUtil.httpRequest({
            url: AmapUrl + "geocode/regeo",
            data: {
                key: AMapKey,
                location: longitude + ',' + latitude
            },
            success: res => {
                if (res.status == 1) {
                    var city = res.regeocode.addressComponent.city ? res.regeocode.addressComponent.city : res.regeocode.addressComponent.province;
                    city = city.replace('市', '');
                    config.savaData('city', city);
                    resolve(city)
                }
            }
        })
    })

}

/**
 * H5获取城市-通过ip
 * @param {*ip} ip 
 */
const webGetLocation = (ip) => {
    return new Promise((resolve, reject) => {
        httpUtil.httpRequest({
            url: AmapUrl + "ip",
            data: {
                key: AMapKey,
                ip: ip
            },
            success: res => {
                if (res.status == 1) {
                    config.savaData('city', res);
                    resolve(res.city)
                }
            }
        })
    })

}

/**
 * 获取两地点距离
 * @param {*出发地坐标} origin 
 * @param {*目的地坐标} destination 
 */
const getDistance = (origin, destination) => {
    return new Promise((resolve, reject) => {
        httpUtil.httpRequest({
            url: AmapUrl + 'direction/driving',
            data: {
                key: AMapKey,
                origin: origin,
                destination: destination,
                strategy: 2,
                extensions: base
            },
            success: res => {
                if (res.status == 1) {
                    var distance = res.route.paths[0].distance;
                    resolve((distance * 1.0) / 1000)
                }
            }
        })
    })
}


/**
 * 支付宝授权
 * @param {*} data 
 */

const getAliAutoInfo = (code) => {
    return httpUtil.apiGateWayPromise(api.getAliAuthInfo, {
        grant_type: 'authorization_code',
        code: code
    });
}

/**
 * 小程序注册
 * @param {*} data 
 */
const smallRegister = (data) => {
    return httpUtil.apiGateWayPromise(api.smallRegister, data);
}

/**
 * 发送验证码
 * @param {*类型} type 
 * @param {*手机号} phone 
 */
const sendSms = (type, phone) => {
    return httpUtil.apiGateWayPromise(api.sendSms, {
        phone: phone,
        type: type
    })
}

/**
 * 绑定手机号
 * @param {*} phone 
 * @param {*} msgCode 
 */
const bindPhone = (phone, msgCode) => {
    var platform = '';
    switch (process.env.TARO_ENV) {
        case 'weapp':
            platform = 'Weixin';
            break;
        case 'alipay':
            platform = 'Alipay';
            break;
    }
    console.log({
        phone: phone,
        uid: config.getUid(),
        code: msgCode,
        type: 0,
        platform: platform
    })
    return httpUtil.apiGateWayPromise(api.editPhone, {
        phone: phone,
        uid: config.getUid(),
        code: msgCode,
        type: 0,
        platform: platform
    })


}

/**
 * 登录
 * @param {*手机号} phone 
 * @param {*验证码} msgCode 
 */
const login = (phone, msgCode) => {
    return httpUtil.apiGateWayPromise(api.login, {
        type: 'Small',
        phone: phone,
        code: msgCode
    })
}


/**
 * 支付下单
 * @param {*} data 
 */
const pay = (orderid,type) =>{
    var booktype = ''
    switch (Taro.getEnv()) {
        case Taro.ENV_TYPE.WEB:
            booktype = 'H5'
            break;
        case Taro.ENV_TYPE.WEAPP:
            booktype = 'WXSMALL'
            break;
        case Taro.ENV_TYPE.ALIPAY:
            booktype = 'ALISMALL'
            break;
    }

    let data = {
        orderno: orderid,
        type: type,
        booktype: booktype,
        userid: config.getUid(),
        openid: config.getOpenid(),
        ip: config.getData('ip')
    }

    return httpUtil.apiGateWayPromise(api.WeixinBooking,data);
}

/**
 * 更新支付状态
 * @param {*} orderNo  订单号 
 * @param {*} type    类型
 */
const payOrderStatus = (orderNo,type) =>{
    return httpUtil.apiGateWayPromise(api.PayOrderSuc,{
        orderno:orderNo,
        type:type
    })
}


/**
 * 获取门票城市列表
 * @param {*} data 
 */
const getScenicCityInfo = (data) => {
    return httpUtil.apiGateWayPromise(api.getScenicCityInfo, data);
}

/**
 * 景点列表
 * @param {*} data 
 */
const getScenicList = (data) => {
    return httpUtil.apiGateWayPromise(api.getScenicList, data);
}

/**
 * 景点详细
 * @param {*} data 
 */
const getScenicDetail = (data) => {
    return httpUtil.apiGateWayPromise(api.getScenicDetail, data);
}

/**
 * 价格日历
 * @param {*} data 
 */
const getScenicPriceCarlendar = (data) => {
    return httpUtil.apiGateWayPromise(api.getScenicPriceCarlendar, data);
}

/**
 * 门票预定
 * @param {*} data 
 */
const bookScenicOrder = (data) => {
    return httpUtil.apiGateWayPromise(api.bookScenicOrder, data);
}

/**
 * 订单列表
 * @param {*} data 
 */
const getScenicOrderList = (data) => {
    return httpUtil.apiGateWayPromise(api.getScenicOrderList, data);
}

/**
 * 订单详情
 * @param {*} data 
 */
const getScenicOrderDetail = (data) => {
    return httpUtil.apiGateWayPromise(api.getScenicOrderDetail, data);
}

/**
 * 取消订单
 * @param {*} data 
 */
const cancelScenicOrder = (data) => {
    return httpUtil.apiGateWayPromise(api.cancelScenicOrder, data);
}

/**
 * 获取退票
 * @param {*} data 
 */
const getScenicRefundReason = (data) => {
    return httpUtil.apiGateWayPromise(api.getScenicRefundReason, data);
}


let httpData = {
    getAliAutoInfo: getAliAutoInfo,
    smallRegister: smallRegister,
    sendSms: sendSms,
    bindPhone: bindPhone,
    login: login,
    pay:pay,
    payOrderStatus:payOrderStatus,
    getCity: getCity,
    webGetLocation: webGetLocation,
    getDistance: getDistance,
    getScenicCityInfo: getScenicCityInfo,
    getScenicList: getScenicList,
    getScenicDetail: getScenicDetail,
    getScenicPriceCarlendar: getScenicPriceCarlendar,
    bookScenicOrder: bookScenicOrder,
    getScenicOrderList: getScenicOrderList,
    getScenicOrderDetail: getScenicOrderDetail,
    cancelScenicOrder: cancelScenicOrder,
    getScenicRefundReason: getScenicRefundReason,

}

export { httpData }