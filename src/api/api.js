import crpoty from 'crypto-js'
import Taro from '@tarojs/taro';
import { ToastUtil } from '../util/toastUtil';
import { config } from '../util/configUtil';
const Token = config.getData('token')
const baseUrl = 'http://api.dev.ikaola.xyz';
// const baseUrl = 'https://ydy.beessoft.net:8008';

const api = {
    binding: '/loginInter/binding',//手机绑定
    login: '/tokens/wechat',//登录
}


const apiGateWay = (prams) => {
    // ToastUtil.showLoadToast();
    if(prams.body){
        Taro.request({
            url: baseUrl + prams.api,
            data: {
                body: prams.data
            },
            method: 'POST' ,
            // header: {
            //     "Authorization": Token
            // },
            success: res => {
                if (res.data.code == 200)
                    prams.success(res.data.data);
                else {
                    ToastUtil.showToast(res.data.message);
                    // prams.success(res.data.data)
                    console.log(res)
                }
            },
            fail: res => {
                console.log(res)
            },
            complete: () => {
            }
        })
    }else{
        //表单提交
        Taro.request({
            url: baseUrl + prams.api,
            data:  prams.data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                // "Authorization": Token
            },
            method: 'POST' ,
            success: res => {
                if (res.data.code == 200)
                    prams.success(res.data.data);
                else {
                    ToastUtil.showToast(res.data.message);
                    console.log(res)
                }
            },
            fail: res => {
                console.log(res)
            },
            complete: () => {
            }
        })
    }
}

const request = (data, url, body = 1) => {
    return new Promise((resolve, reject) => {
        apiGateWay({
            api: url,
            data: data,
            body: body,
            success: res => {
                resolve(res)
                // ToastUtil.hideLoading();
            },
            fail: res => {
                reject(res)
                // ToastUtil.hideLoading();
            }
        })
    })
}


let requestHttp = {
    api: api,
    request: request,
    apiGateWay: apiGateWay,
    baseUrl: baseUrl,
}

export {
    requestHttp
}