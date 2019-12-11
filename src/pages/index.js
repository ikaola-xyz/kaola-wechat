import Taro, { navigateTo } from '@tarojs/taro';
import { View, Text, Image, Progress, Switch } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui"
import './index.scss';

import { ToastUtil } from '../util/toastUtil';
import { dateUtil } from '../util/dateUtil'
import { httpUtil } from '../util/httpUtil';
import { httpData } from '../util/httpData';
import { config } from '../util/configUtil';
import { apiData } from "../api/apiData"
import search from "../images/search.png"
import head from "../images/index.png"
export default class Index extends Taro.Component {
    config = {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '首页',
        navigationBarTextStyle: 'black',
        // usingComponents: {
        //     'navbar': '../components/Navbar/index',
        // }
    };
    state = {
        schedule: 1,   //日程

    }
    
    componentWillMount() {
        
    }
    toDetail(){
        Taro.navigateTo({
            url: './detail/detail'
        })
    }
    render() {
        let {  } = this.state
        return (
            <View className="pro-index">
                <View className="search">
                    <Input
                        placeholder="搜索感兴趣的攻略…"
                        placeholderStyle="color: #999999; font-size: 32rpx"
                        style="padding-right: 35rpx; font-size: 32rpx;display:inline-block;width: 88%;"
                        // onFocus={this.focusSearch.bind(this)}
                        // onInput={this.filterName.bind(this)}
                        />
                    <Image className="img" src = {search}/>
                </View>
                <View className="list">
                    <View className="item" onClick={this.toDetail.bind(this)}>
                        <View className="title">绝地求生- AHQ、GEX双双晋级PGC</View>
                        <View className="content">
                            <View className="info">
                                <Text className="text">这是陌生人任务中的一个事件，需要完成一定条件才能巴拉拉巴拉巴拉巴拉</Text>
                                <View className="bottom">
                                    <View className="left">
                                        <Image src={head}  className="icon"/>
                                        叶子<Text className="point">·</Text>15:09
                                    </View>
                                    <Text className="read">28 阅读</Text>
                                </View>
                            </View>
                            <Image src={head} className="img"/>
                        </View>
                    </View>
                    <View className="item">
                        <View className="title">魔兽怀旧服：自毛人事件之后，DKP团将怎么样怎么样</View>
                        <View className="content">
                            <View className="info">
                                <Text className="text">魔兽世界自从怀旧服开服以来，受到不少老魔兽玩家的追捧。毕竟游戏副本满满的回忆，而魔…</Text>
                                <View className="bottom">
                                    <View className="left">
                                        <Image src={head}  className="icon"/>
                                        考拉游戏<Text className="point">·</Text>昨天
                                    </View>
                                    <Text className="read">28 阅读</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
