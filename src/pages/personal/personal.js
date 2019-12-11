import Taro, { navigateTo } from '@tarojs/taro';
import { View, Text, Image, Progress, Switch, Button } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui"
import './personal.scss';

import { ToastUtil } from '../../util/toastUtil';

import { config } from '../../util/configUtil';

import head from "../../images/index.png"
import right from "../../images/back.png"
import { requestHttp } from '../../api/api';
export default class Personal extends Taro.Component {
    config = {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '个人中心',
        navigationBarTextStyle: 'black',
    };
    state = {
        isLogin: false,
        userInfo: {},
        js_code: '',
        canLogin: false,
    }
    
    componentWillMount() {
        Taro.showShareMenu({
            withShareTicket: true
        })
        let token = config.getData('token')
        let userInfo = config.getData('userInfo')
        if (token) {
            this.setState({
                isLogin: true,
                userInfo,
            })
        }
    }

    isCanLogin(userInfo) {
        let that = this
        let canLogin = config.getData('canLogin')
        if (this.state.canLogin == false && canLogin != 1) {
            Taro.showModal({
                content: '是否允许登录',
                success: function (res) {
                    if (res.confirm) {
                        that.login(userInfo)
                        config.savaData('canLogin', 1)
                        that.setState({
                            canLogin: true
                        })
                    } else if (res.cancel) {
                        return
                    }
                }
            })
        } else {
            this.login(userInfo)
        }
    }

    login(userInfo) {
        console.log(userInfo)
        ToastUtil.showMsgLoadToast('登陆中...')
        Taro.getUserInfo({
            success: response => {
                Taro.login({
                    success: res => {
                        console.log(response, res)
                        let data = {
                            avatar: response.userInfo.avatarUrl,
                            gender: response.userInfo.gender,
                            nickname: response.userInfo.nickName,
                            jscode: res.code
                        }
                        Taro.request({
                            url: requestHttp.baseUrl + requestHttp.api.login,
                            data: data,
                            method: "POST",
                            success: res2 => {
                                config.savaData('token', res2.data.token)
                                config.savaData('userInfo', res2.data.user)
                                this.setState({
                                    isLogin: true,
                                    userInfo: res2.data.user,
                                })
                                ToastUtil.showSuccessToast('登录成功')
                            },
                            fail: res => {
                                console.log(res)
                            },
                            complete: () => {
                                ToastUtil.hideLoading();
                            }
                        })
                    }
                })
            }
        })
    }
    getLocation(){
        Taro.chooseLocation({
            success: res=>{
                console.log(res)
            }
        })
    }
    render() {
        let { userInfo, isLogin } = this.state
        return (
            <View className="pro-index">
                <View className="head">
                    <Image src={isLogin ? userInfo.avatar : head} className="img" />
                    {isLogin && <View className="content">
                        <View className="name">{userInfo.nickname}</View>
                        <View className="change">查看修改个人资料<Image src={right} className="right_icon"/></View>
                    </View>}
                    {!isLogin && <Button className="login" open-type='getUserInfo' onClick={this.isCanLogin.bind(this)}>登录</Button>}
                </View>
                <View className="mine">我的贴子</View>
                <View className="mine">我的收藏</View>
                <View className="mine" onClick={this.getLocation.bind()}>我的关注</View>
                <View className="mine">设置</View>
            </View>
        );
    }
}
