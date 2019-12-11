import Taro, { navigateTo } from '@tarojs/taro';
import { View, Text, Image, Progress, Switch } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui"
import './detail.scss';

import { ToastUtil } from '../util/toastUtil';
import { dateUtil } from '../util/dateUtil'
import { httpUtil } from '../util/httpUtil';
import { httpData } from '../util/httpData';
import { config } from '../util/configUtil';
import { apiData } from "../api/apiData"

import head from "../../images/index.png"
import index_active from "../../images/index_active.png"
export default class Detail extends Taro.Component {
    config = {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '攻略详情',
        navigationBarTextStyle: 'black',
    };
    state = {
    }

    componentWillMount() {

    }
    render() {
        let { } = this.state
        return (
            <View className="pro-index">
                <View className="title">魔兽世界怀旧服入坑攻略：10个快速练级技巧要领！</View>
                <View className="tips">
                    <View className="item">
                        <Image src={head} className="icon" />
                        考拉游戏
                    </View>
                    <View className="item" style="color: #666666"><Image src={index_active} className="icon" />18</View>
                </View>
                <Image src={head} className="cover" mode="widthFix" />
                <View className="words">怀旧服要开测了，在接近5年的等待后，我们终于再次有机会重温14年前『初代魔兽世界』的感觉。怀旧服与正式服的一大不同点就在于，练级很难，打金很难。在60级的时代，很多玩家就只能专精一个号打团/副本/PVP，很多职业甚至需要特意开个小号法师或猎人来养。 而且，在没有插件的年代，无法有效优化升级路线，而且很多职业一次只能打1-2个怪，打完怪还要吃喝近1分钟，这一切让升级过程变得异常艰难。 今天，我们就来总结下经典旧世怀旧服的一些练级技巧，只要你练级时把握住这些要领，就能让你更快练满60级。</View>
                <View className="title">评论区</View>
                <View className="user_info">
                    <View className="user_name">
                        <Image src={head} className="head" />守望者1945
                    </View>
                    <View className="comment">因为练级非常难练,60级时期通常人均只有一个号,败人品的黑子很少,在服务器被刷后就混不下去了</View>
                    <View className="bottom">
                        <View className="left">10分钟前</View>
                        <View className="right">
                            <View style="padding-right: 48rpx; display: inline"><Image src={head} className="icon" />12</View>
                            <View style="display: inline"><Image src={head} className="icon" style="width: 34rpx"/>8</View>
                        </View>
                    </View>
                    <View className="others">
                        <View className="comments">
                            <View className="text">
                                <Text className="name">
                                    微微 : 
                                </Text>
                                没错,那些快餐狗肯定玩不下去的,还得灰溜溜的滚回现在的正式服,其实这么一比,正式…
                                <Text className="all">全文</Text>
                            </View>
                            <View className="bottom">
                                <View className="left">2019-07-28</View>
                                <View className="right">
                                    <View><Image src={head} className="icon" />12</View>
                                </View>
                            </View>
                        </View>
                        <View className="comments">
                            <View className="text">
                                <Text className="name">
                                小潇 :
                                </Text>
                                左边的十字地方可以在铁炉堡新手村复活左边的十字地方可以在铁炉堡新手村复活
                            </View>
                            <View className="bottom">
                                <View className="left">2019-07-28</View>
                                <View className="right">
                                    <View><Image src={head} className="icon" />12</View>
                                </View>
                            </View>
                        </View>
                        <View className="more">查看更多评论</View>
                    </View>
                </View>
                <View className="user_info">
                    <View className="user_name">
                        <Image src={head} className="head" />掌柜的888
                    </View>
                    <View className="comment">因为练级非常难练,60级时期通常人均只有一个号,败人品的黑子很少,在服务器被刷后就混不下去了</View>
                    <View className="bottom">
                        <View className="left">10分钟前</View>
                        <View className="right">
                            <View style="padding-right: 48rpx; display: inline"><Image src={head} className="icon" />12</View>
                            <View style="display: inline"><Image src={head} className="icon" style="width: 34rpx"/>8</View>
                        </View>
                    </View>
                </View>
                <View className="user_info">
                    <View className="user_name">
                        <Image src={head} className="head" />一个怪老头 
                    </View>
                    <View className="comment">帮你补充个怀旧服大技巧,升级时遇到盗贼请下线,改天再练右边十字军的地方复活到不了铁炉堡墓地</View>
                    <View className="bottom">
                        <View className="left">10分钟前</View>
                        <View className="right">
                            <View style="padding-right: 48rpx; display: inline"><Image src={head} className="icon" />12</View>
                            <View style="display: inline"><Image src={head} className="icon" style="width: 34rpx"/>8</View>
                        </View>
                    </View>
                </View>
                <View className="search">
                    <Input
                        placeholder="输入你想说的…"
                        placeholderStyle="color: #D6D6D6; font-size: 28rpx"
                        style="padding-right: 35rpx; font-size: 32rpx;display:inline-block;width: 100%;"
                    />
                </View>
            </View>
        );
    }
}
