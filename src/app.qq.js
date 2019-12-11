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
            'pages/bind_user/bind_user',//绑定用户
            'pages/outWeb/schoolMarket',    // 营销宝典
            'pages/outWeb/notice',    // 公告通知
            'pages/mark_collection/mark_collection',    // 营销宝典
            'pages/person/person',
            'pages/team/team',              
            'pages/schedule/schedule',     //日程     
            'pages/schedule_add/schedule_add',     //日程添加    
            'pages/sch_activity/sch_activity',     //日程活动详情    
            'pages/sch_checkIn/sch_checkIn',     //日程活动签到   
            'pages/sch_select/sch_select',     //日程添加人员选择 
            'pages/task_manger/task_manger',     //任务管理 
            'pages/task_detail/task_detail',     //任务详情    
            'pages/task_integral/task_integral',     //任务积分    
            'pages/upload_info/upload_info',      //信息上报首页    
            'pages/upload_add/upload_add',      //信息上报-新增   
            'pages/upload_detail/upload_detail',      //信息上报-详情 

            'pages/qq_group/qq_group',      //QQ群   
            'pages/map/map',      //地图   
        ],  
        preloadRule: {
            "pages/index": {
                "network": "all",
                "packages": [ ]
            }
        },
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'white'
        },
        tabBar: {
            "color": "#4D4D4D",
            "selectedColor": "#4A8CFF",
            "borderStyle":"black",
            "backgroundColor": "#fff",
            "list": [{
              "selectedIconPath": "images/index/tab_home_pre.png",
              "iconPath": "images/index/tab_home.png",
              "pagePath": "pages/index",
              "text": "首页"
            }, {
                "selectedIconPath": "images/index/tab_team_pre.png",
                "iconPath": "images/index/tab_team.png",
                "pagePath": "pages/mark_collection/mark_collection",
                "text": "营销宝典"
              }, {
              "selectedIconPath": "images/index/tab_team_pre.png",
              "iconPath": "images/index/tab_team.png",
              "pagePath": "pages/team/team",
              "text": "团队组织"
            }, {
              "selectedIconPath": "images/index/tab_info_pre.png",
              "iconPath": "images/index/tab_info.png",
              "pagePath": "pages/person/person",
              "text": "个人中心"
            }]
        },

        permission: {
            "scope.userLocation": {
                "desc": "你的位置信息将用于小程序确定你的位置"
            }
        },
        navigateToMiniProgramAppIdList: ['wxef40c3d3df8108ab']
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
