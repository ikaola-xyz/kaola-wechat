import Taro, { Component } from '@tarojs/taro'

import './app.scss'
import { View } from '@tarojs/components';


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

//H5配置

class App extends Component {

    state = {
        imgBaseUrl: 'https://img.bflvx.com/mini-app-png/bflvx/bflvx-index/'
    }

    config = {
        pages: [
            'pages/index',//首页
            'pages/login/login',//登录
            'pages/city-select/city-select',     //城市选择
            'pages/date-select/date-select',     //日期选择
        ],
        subpackages: [{
            root: 'carPages',
            pages: [
                'pages/index/index',    //汽车票首页
                'pages/order-list/order-list',                    //订单
                'pages/car-reserve/car-reserve',    //汽车票预订
                'pages/map/map',                    //地图
                'pages/pay/pay',                    //支付
                'pages/select-passengers/select-passengers',      //常用乘客
                'pages/add-passengers/add-passengers',             //添加乘客
                'pages/invoice-edit/invoice-edit',                //发票
                'pages/reserve-agreement/reserve-agreement',      //协议
                'pages/order-edit/order-edit',       //填写订单
                'pages/car-list/car-list',          //车次列表
                'pages/order-detail/order-detail',    //订单详情
                'pages/refund-choice/refund-choice',  //退票详情
                'pages/insurance-explain/insurance-explain',       //保险说明
            ]
        }, {
            root: 'ticketPages',
            pages: [
                'pages/index/index',    //门票
                'pages/ticket-list/ticket-list',    //门票列表
                'pages/map-scenic/map-scenic',      //景区地图
                'pages/reserve-notes/reserve-notes',   //预定须知
                'pages/reserve-rules/reserve-rules',   //预定条款
                'pages/invoice-ticket/invoice-ticket',  //发票
                'pages/order-edit/order-edit',         //订单填写
                'pages/pay/pay',                       //支付
                'pages/pay-success/pay-success',       //支付成功
                'pages/refund-application/refund-application',  //退款申请
                'pages/order-detail/order-detail',              //订单详情
                'pages/refund-detail/refund-detail',            //退款详情
                'pages/enter-evidence/enter-evidence',          //入园凭证
                'pages/sms-evidence/sms-evidence',              //短信凭证
                'pages/ele-ticket/ele-ticket',                  //电子票
                'pages/order-list/order-list',                  //订单列表
                'pages/claim-evidence/claim-evidence',          //新增报销凭证
                'pages/select-claim-evidence/select-claim-evidence',   //选择报销凭证
                'pages/reserve-select/reserve-select',   //预定选择
            ]
        }],
        preloadRule: {
            "pages/index": {
                "network": "all",
                "packages": ["carPages", "ticketPages"]
            }
        },
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'white'
        },
        // tabBar: {
        //     color:'#CCCCCC',
        //     selectedColor:'#14c7a3',
        //     borderStyle:'white',
        //     list: [{
        //         pagePath: 'pages/index',
        //         text: '首页',
        //         iconPath: './images/home.png',
        //         selectedIconPath: './images/home-sel.png'
        //     },
        //     {
        //         pagePath: 'pages/mine/index',
        //         text: '我的',
        //         iconPath: './images/mine.png',
        //         selectedIconPath: './images/mine-sel.png'
        //     }]
        // },
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
