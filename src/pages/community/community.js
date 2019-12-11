import Taro, { navigateTo } from '@tarojs/taro';
import { View, Text, Image, Progress, Switch } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui"
import './community.scss';

import { ToastUtil } from '../util/toastUtil';
import { dateUtil } from '../util/dateUtil'
import { httpUtil } from '../util/httpUtil';
import { httpData } from '../util/httpData';
import { config } from '../util/configUtil';
import { apiData } from "../api/apiData"
import search from "../../images/search.png"
import head from "../../images/index.png"
export default class Community extends Taro.Component {
    config = {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '社区',
        navigationBarTextStyle: 'black',
        // usingComponents: {
        //     'navbar': '../components/Navbar/index',
        // }
    };
    state = {

    }
    
    componentWillMount() {
        
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
                        />
                    <Image className="img" src = {search}/>
                </View>

                <View className="title">关注社区</View>
                <View className="attention">
                    <View className="item">
                        <Image className="img" src={head} />
                        <View className="name">魔兽怀旧服</View>
                        <View className="num">3298人关注</View>
                    </View>
                    <View className="item">
                        <Image className="img" src={head} />
                        <View className="name">魔兽怀旧服</View>
                        <View className="num">3298人关注</View>
                    </View>
                    <View className="item">
                        <Image className="img" src={head} />
                        <View className="name">魔兽怀旧服</View>
                        <View className="num">3298人关注</View>
                    </View>
                </View>
                <View className="title">热门社区</View>
                <View className="hot">
                    <View className="item">
                        <Image className="img" src={head} />
                        <View className="content">
                            <View className="name">魔兽怀旧服</View>
                            <View className="num">3298人关注</View>
                        </View>
                    </View>
                    <View className="item">
                        <Image className="img" src={head} />
                        <View className="content">
                            <View className="name">魔兽怀旧服魔兽怀旧服魔兽怀旧服魔兽怀旧服魔兽怀旧服魔兽怀旧服</View>
                            <View className="num">3298人关注魔兽怀旧服魔兽怀旧服魔兽怀旧服魔兽怀旧服魔兽怀旧服魔兽怀旧服</View>
                        </View>
                    </View>
                    <View className="item">
                        <Image className="img" src={head} />
                        <View className="content">
                            <View className="name">魔兽怀旧服</View>
                            <View className="num">3298人关注</View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
