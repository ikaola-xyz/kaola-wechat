
import crpoty from 'crypto-js'
import Taro from '@tarojs/taro';
import { ToastUtil } from './toastUtil';
import { config } from './configUtil';

// const baseUrl = Taro.getEnv() === Taro.ENV_TYPE.WEB ? 'http://127.0.0.1' : 'https://bus.bflvx.com';
const baseUrl = 'https://busweb.bflvx.com';
// const baseUrl = 'https://bus.bflvx.com';


const account = {
    "appidWx": "wxef40c3d3df8108ab",
    "desKey": "ybeq6u8T",
    "secretWx": "df22159f2e70f296dcac2ca1d1c13d68",
    "appid": "5F29F10E1459C45F5D70BBBD227CC936",
    "token": "05BCFA60D45E957D3EB2C43CDA10D91B",
    "aliKey": "25528654",
    "aliSecret": "b167210d865059bc1611938c86bf9dde",
}

const api = {
    login: '/User/Login',                    //小程序登录
    smallRegister: '/User/smallRegister',     //小程序注册
    editPhone: '/User/EditPhone',             //手机号绑定
    getClientIp: '/getClientIp',                //获取ip
    getWxUnionid: '/User/getWxUnionid',       //获取unionid
    getAliAuthInfo: '/User/getAliAuthInfo',    //支付宝授权
    WeixinBooking: '/Pay/WeixinBooking',     //微信支付 汽车-BUS 门票-SC
    PayOrderSuc: '/Pay/PayOrderSuc',           //更新支付状态
    queryOftenUser: '/User/QueryOftenUser',   //获取常旅客
    editOftenUser: '/User/EditOftenUser',     //编辑常旅客
    deleteOftenUser: '/User/DeleteOftenUser',  //删除常旅客
    sendSms: '/User/SendSms',                  //短信发送
    getBusCityInfo: '/Bus/getBusCityInfo',  //获取汽车城市列表
    filterBusStationInfo: '/Bus/filterBusStationInfo',  //汽车票城市筛选
    searchBusSchedules: '/Bus/searchBusSchedules',  //汽车票车次列表查询
    searchStationInfo: '/Bus/searchStationInfo',   //客运站信息查询
    searchBusResidueSeat: '/Bus/searchBusResidueSeat', //汽车票余票查询
    searchProtocol: '/Bus/searchProtocol',       // 汽车票获取协议内容
    crateBusOrder: '/Bus/crateBusOrder',        // 汽车票创建订单
    searchBusOrderList: '/Bus/searchBusOrderList',  //汽车票获取订单列表
    cancelBusOrder: '/Bus/cancelBusOrder',    //汽车票订单取消
    searchRefundFee: '/Bus/searchRefundFee',   //汽车票查询退票手续费
    applyRefund: '/Bus/applyRefund',  //汽车票申请退票 
    searchOrderDetailInfo: '/Bus/searchOrderDetailInfo',   //汽车票获取订单详情
    searchInsurance: '/Bus/searchInsurance',  //汽车票获取服务、保险信息
    getBookynamic: '/Bus/getBookynamic',      //最新预定动态
    getProtocol: '/Bus/getProtocol',         //获取协议内容
    deleteOrder: '/Bus/deleteOrder',        //删除订单
    //门票
    getScenicCityInfo: '/Scenic/GetCityInfo',     //景点门票城市接口
    getScenicList: '/Scenic/GetScenicList',  //景点列表搜索
    getScenicDetail: '/Scenic/GetScenicDetail', //景点详情
    getScenicPriceCarlendar: '/Scenic/GetScenicPriceCarlendar',  //价格日历
    bookScenicOrder: '/Scenic/BookScenicOrder',  //门票预定
    getScenicOrderList: '/Scenic/GetScenicOrderList', //订单列表
    getScenicOrderDetail: '/Scenic/GetScenicOrderDetail', //订单详情
    cancelScenicOrder: '/Scenic/CancelScenicOrder', //取消订单
    getScenicRefundReason: '/Scenic/GetScenicRefundReason', //获取退票原因
    queryInvoiceInfo: '/User/QueryInvoiceInfo', //获取发票抬头列表

}

const apiGateWay = (prams) => {
    let timespan = Date.now();
    var keyHex = crpoty.enc.Utf8.parse(account.desKey);
    prams.data = crpoty.DES.encrypt(JSON.stringify(prams.data), keyHex, {
        mode: crpoty.mode.ECB,
        padding: crpoty.pad.Pkcs7
    }).toString();
    let req = {};
    req['data'] = prams.data;
    req['appid'] = account.appid;
    let key = account.aliKey;
    let secret = account.aliSecret;
    let parm = (prams.isPost ? "POST" : "GET") + "\napplication/json; charset=utf-8\n";
    parm += "\n" + (Taro.getEnv() != Taro.ENV_TYPE.WEB ? "application/json\n\n" : '\n\n');
    parm += "Source:OPEN\n";
    parm += "X-Ca-Key:" + key + "\n";
    parm += "X-Ca-Stage:" + "TEST" + "\n";
    // parm += "X-Ca-Timestamp:" + timespan + "\n";
    parm += prams.api + "?reqData=" + JSON.stringify(req);
    let sign = crpoty.enc.Base64.stringify(crpoty.HmacSHA256(parm, secret));
    let header = {
        'Accept': 'application/json; charset=utf-8',
        "Source": "OPEN",
        "X-Ca-Key": account.aliKey,
        // "X-Ca-Timestamp": timespan,
        "X-Ca-Stage": "TEST",
        "X-Ca-Signature-Headers": "X-Ca-Key,Source,X-Ca-Stage",
        "X-Ca-Signature": sign
    };


    // ToastUtil.showLoadToast();
    Taro.request({
        url: baseUrl + prams.api,
        header: header,
        data: {
            reqData: JSON.stringify(req)
        },
        method: prams.isPost ? "POST" : 'GET',
        success: res => {
            if (res.data.status == "success")
                prams.success(res.data.data);
            else {
                ToastUtil.hideLoading()
                !prams.hideToast && ToastUtil.showToast(res.data.msg);
                console.log(res)
            }
        },
        fail: res => {
            console.log(res)
        },
        complete: () => {
            // ToastUtil.hideLoading();
        }
    })

}



const httpRequest = (prams) => {
    Taro.request({
        url: prams.url,
        method: prams.isPost ? 'POST' : 'GET',
        data: prams.data,
        success: res => {
            prams.success(res.data);
        },
        fail: res => {
            ToastUtil.showErrorToast('请求出错');
            console.log(res)
        }
    })
}


//接口网络请求Promise二次封装
const apiGateWayPromise = (api, data) => {
    return new Promise((resolve, reject) => {
        apiGateWay({
            api: api,
            data: data,
            success: res => {
                resolve(res)
            },
            fail: res => {
                reject(res)
            }
        })
    })
}

//网络请求Promise二次封装
const httpRequestPromise = (url, data, isPost) => {
    return new Promise((resolve, reject) => {
        Taro.request({
            url: url,
            method: isPost ? 'POST' : 'GET',
            data: data,
            success: res => {
                resolve(res.data);
            },
            fail: res => {
                ToastUtil.showErrorToast('请求出错');
                reject(res);
            }
        })
    })
}

let httpUtil = {
    apiGateWay: apiGateWay,
    httpRequest: httpRequest,
    api: api,
    apiGateWayPromise: apiGateWayPromise,
    httpRequestPromise: httpRequestPromise
}
export {
    httpUtil
}


