import Taro, { navigateTo } from '@tarojs/taro';
import { View, Text, Form, ScrollView, Input, Button } from '@tarojs/components';
import './bind_user.scss';
import { config } from '../../util/configUtil';
import { apiData } from "../../api/apiData"
import { ToastUtil } from "../../util/toastUtil"
import { requestHttp } from '../../api/api';

export default class BindUser extends Taro.Component {
    config = {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '登录',
        navigationBarTextStyle: 'black',
    };
    state = {
        phone: '',
        code: '',
        type: '',
    }
    componentWillMount() {
        let params = this.$router.params
        //信息上报详情        
    }

    //绑定
    binding(userInfo){
        let detail = userInfo
        let { phone, code } = this.state
        let data = { 
            phoneNum: phone, 
            verify: code, 
            unionId: config.getData('unionId'), 
            openId: config.getData('openId')
        }
        apiData.binding(data).then(res => {
            this.login(detail)
        }).catch(err => {
            ToastUtil.showErrorToast(err)
        })
    }
    //绑定后登录
    login(detail){
        Taro.login({
            success: res1 => {           
                //获取unionid
                let data = {
                    encryptedData: detail.encryptedData,
                    iv: detail.iv,
                    js_code: res1.code
                }
                Taro.request({
                    url: requestHttp.baseUrl + requestHttp.api.login,
                    data: {
                        body: data
                    },
                    method: "POST" ,
                    success: res2 => {
                        if (res2.data.code == 200){
                            console.log('res2.data.code==',res2.data.code)
                            config.savaData('loginInfo', res2.data.data)
                            ToastUtil.showSuccessToast('绑定成功')
                            config.navigateBack()
                        }else{
                            ToastUtil.showToast(res2.data.message)
                        }
                    },
                    fail: res => {
                        console.log(res)
                    },
                    complete: () => {
                    }
                })
            }
        })
    }
    render() {
        let {  } = this.state
        return (
            <View className="pro-index">
                {/* 日程内容 */}
                <View className="title">校园营销</View>
                <View className="text_bind">快捷绑定手机号码！</View>
                <View className="phone">
                    <Input
                        placeholder="请输入手机号码"
                        placeholderStyle="color:#808080;font-size: 26rpx"
                        style="color:#1A1A1A;font-size: 26rpx"
                        type="number"
                        maxLength="11"
                        onInput={({ detail = {} }) => {
                            this.state.phone = detail.value;
                            return detail.value
                        }}
                        />
                </View>
                <View className="code">
                    <Input
                        placeholder="请输入验证码"
                        placeholderStyle="color:#808080;font-size: 26rpx"
                        style="color:#1A1A1A;font-size: 26rpx;flex: 5;padding-right: 30rpx"
                        type="number"
                        onInput={({ detail = {} }) => {
                            this.state.code = detail.value;
                            return detail.value
                        }}
                        />
                    <Text className="code_text">获取验证码</Text>
                </View>
                <Button className="button" open-type='getUserInfo' onGetUserInfo={this.binding.bind(this)}>绑定</Button>
            </View>
        );
    }
}


