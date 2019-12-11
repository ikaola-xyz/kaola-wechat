import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
class Navbar extends Taro.Component {
    render() {
        const style = {
            paddingTop: Taro.$navBarMarginTop + 'px'
        }
        return (
            <View className='navbarWrap' style={style}>
                <View className='navbar'>自定义导航栏</View>
            </View>

        );
    }
}
export default Navbar