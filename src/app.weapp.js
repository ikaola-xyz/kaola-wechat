import Taro, { Component } from '@tarojs/taro'

import './app.scss'
import { View } from '@tarojs/components';


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

//微信小程序配置

class App extends Component {

    state = {
        imgBaseUrl: 'https://img.bflvx.com/mini-app-png/bflvx/bflvx-index/'
    }

    config = {
        pages: [
            'pages/index',//首页
            'pages/attention/attention',//关注
            'pages/community/community',//社区
            'pages/personal/personal',//个人中心
            'pages/detail/detail',//详情

            'pages/bind_user/bind_user',//绑定用户
            'pages/map/map',      //地图   
        ],
        preloadRule: {
            "pages/index": {
                "network": "all",
                "packages": []
            }
        },
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'white'
        },
        tabBar: {
            "color": "#999999",
            "selectedColor": "#44C863",
            "borderStyle": "black",
            "list": [{
                "selectedIconPath": "images/index_active.png",
                "iconPath": "images/index.png",
                "pagePath": "pages/index",
                "text": "首页"
            }, {
                "selectedIconPath": "images/attention_active.png",
                "iconPath": "images/attention.png",
                "pagePath": "pages/attention/attention",
                "text": "关注"
            },
            {
                "selectedIconPath": "images/community_active.png",
                "iconPath": "images/community.png",
                "pagePath": "pages/community/community",
                "text": "社区"
            }, {
                "selectedIconPath": "images/personal_active.png",
                "iconPath": "images/personal.png",
                "pagePath": "pages/personal/personal",
                "text": "个人中心"
            }
            ]
        },




        permission: {
            "scope.userLocation": {
                "desc": "你的位置信息将用于小程序确定你的位置"
            }
        },
        navigateToMiniProgramAppIdList: ['wx144dec2e284be8e3']
    };

    componentDidMount() {

    }

    componentDidShow() {

    }

    componentDidHide() {

    }

    componentDidCatchError() {

    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <View />
        )
    }
}

Taro.render(<App />, document.getElementById('app'))
