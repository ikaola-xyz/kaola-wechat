import Taro from '@tarojs/taro'
import error from '../images/close.png'
import error1 from '../images/audited.png'
import error2 from '../images/person/info_bg.png'
//显示成功Toast
const showSuccessToast = function(msg){
    Taro.showToast({
        title:msg,
        icon:'success'
    })
}

//显示错误Toast
const showErrorToast = function(msg){
    Taro.showToast({
        title:msg,
        icon:'none'
    })
}

//显示警告Toast
const showWarnToast = function(msg){
    Taro.showToast({
        title:msg,
    })
}

//显示普通Toast
const showToast = function(msg){
    Taro.showToast({
        title:msg,
        icon:'none'
    })
}

//加载Toast
const showLoadToast = function(){
    Taro.showLoading({
        title:'加载中...',
        // mask: true,
    })
}

//加载Toast
const showMsgLoadToast = function(msg){
    Taro.showLoading({
        title:msg,
        // mask: true
    })
}

//取消加载Toast
const hideLoading = function(){
    Taro.hideLoading()
}

let ToastUtil = {
    showSuccessToast:showSuccessToast,
    showErrorToast:showErrorToast,
    showLoadToast:showLoadToast,
    showMsgLoadToast:showMsgLoadToast,
    showToast:showToast,
    hideLoading:hideLoading
}

export{ ToastUtil }