import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './Select.scss'
import { AtTabs, AtTabsPane, AtFloatLayout } from 'taro-ui'
import image from '../../images/back.png'
export default class Select extends Taro.Component {

    state = {
    }
    render() {
        return (<View className='room' >
            <Text className='ban'>
                {this.props.isFill == '1' && <Text className="isFill">*</Text>}
                {this.props.colName}
            </Text>
            <View className='too'>
                <Text className='select'>{this.props.choose}</Text>
                <Image src={image} className='arrow'></Image>
            </View>
        </View>
        );
    }
}