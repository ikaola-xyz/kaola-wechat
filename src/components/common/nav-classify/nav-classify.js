import {Component} from "react";
import {Image, View} from "@tarojs/components";
import Icon1 from "../../../images/enter-1.png";
import Icon2 from "../../../images/enter-2.png";
import Icon3 from "../../../images/enter-3.png";
import Icon4 from "../../../images/enter-4.png";
import 'index.module.scss'

export default class NavClassify extends Component{
    render() {
        return  <View className="other-entr">
            <View className="item">
                <View className="icon icon-1">
                    <Image className="icon-image" src={Icon1}/>
                </View>
                <View className="name">游艇·帆船</View>
            </View>
            <View className="item">
                <View className="icon icon-2">
                    <Image className="icon-image" src={Icon2}/>
                </View>
                <View className="name">机场大巴</View>
            </View>
            <View className="item">
                <View className="icon icon-3">
                    <Image className="icon-image" src={Icon3}/>
                </View>
                <View className="name">旅游攻略</View>
            </View>
            <View className="item">
                <View className="icon icon-4">
                    <Image className="icon-image" src={Icon4}/>
                </View>
                <View className="name">景点门票</View>
            </View>
        </View>
    }
}
