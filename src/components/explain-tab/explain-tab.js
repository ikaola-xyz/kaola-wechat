import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './explain-tab.scss'
import { AtTabs, AtTabsPane, AtFloatLayout } from 'taro-ui'

export default class ExplainTab extends Taro.Component {

    state = {
        current: 0, 
        navList: [{
            title: '预订须知'
        }, {
            title: '取票须知'
        }, {
            title: '退票须知'
        }]
    }

    componentWillUpdate(nextProps, nextState){
        this.setState({
            current:nextProps.current?nextProps.current:0
        })
    }

    render() {
        return (
            <AtFloatLayout isOpened={this.props.isOpened} className='rule-box' onClose={this.props.onClose}>
                <AtTabs current={this.state.current}
                    tabList={this.state.navList}
                    onClick={(value) => {
                        this.setState({
                            current: value
                        });
                    }}>
                    <AtTabsPane current={this.state.current} index={0}>
                        <View className="info-list">
                            <View className="item">
                                {/* <Text className="title">预订须知：</Text> */}
                                <Text
                                    className="content">{this.props.bookremark}</Text>
                            </View>
                        </View>
                    </AtTabsPane>

                    <AtTabsPane current={this.state.current} index={1}>
                        <View className="info-list">
                            <View className="item">
                                {/* <Text className="title">取票须知：</Text> */}
                                <Text
                                    className="content">{this.props.takeremark}</Text>
                            </View>

                        </View>
                    </AtTabsPane>

                    <AtTabsPane current={this.state.current} index={2}>
                        <View className="info-list">
                            <View className="item">
                                {/* <Text className="title">退改须知：</Text> */}
                                <Text
                                    className="content">{this.props.refundremark}</Text>
                            </View>
                            {/* <View className="item">
                                <Text className="title">退改时间：</Text>
                                <Text className="content">06:30-18:30</Text>
                            </View>
                            <View className="item">
                                <Text className="title">车站地址：</Text>
                                <Text className="content">江苏省南京市玄武区花园17号</Text>
                            </View>
                            <View className="item">
                                <Text className="title">温馨提示：</Text>
                                <Text className="content">温馨提示说明温馨提示说明温馨提示说明温</Text>
                            </View> */}

                        </View>
                    </AtTabsPane>
                </AtTabs>
            </AtFloatLayout>

        );
    }
}