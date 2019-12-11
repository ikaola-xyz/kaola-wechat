import Taro from '@tarojs/taro';
import { requestHttp } from './api';

const AmapUrl = 'https://restapi.amap.com/v3/'
const AMapKey = '15b65d3e7e573eeca3294d320b714f01'
let api = requestHttp.api;

const imgBaseUrl = 'https://ydy.beessoft.net:8002/schoolmarket_qq';   //图片地址
/**
 * 绑定手机号
 * @param {*} data 
 */
const binding = (data) => {
    return requestHttp.request(data, api.binding);
}

let apiData = {
    binding,
}

export { apiData }