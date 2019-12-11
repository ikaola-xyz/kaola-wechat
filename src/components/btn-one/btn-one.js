import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss'

export default class BtnOne extends Taro.Component {
    render() {
        return (
            <View className={styles.BtnOne}>
                <View className={styles.con} onClick={ this.props.onSure }>
                    <Text>{this.props.text}</Text>
                </View>
            </View>
        );
    }
}