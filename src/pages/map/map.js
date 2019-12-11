import Taro from '@tarojs/taro';
import { View, Image, Text, Input, WebView, Map } from '@tarojs/components';
import { config } from '../../util/configUtil';
import { ToastUtil } from '../../util/toastUtil';


export default class notice extends Taro.Component {
    config = {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '地图',
        navigationBarTextStyle: 'black',
    };
    constructor(props) {
        super(props);
        this.state = {
            longitude: '',
            latitude: '',
            mapContext: null,
        }
    }
    componentWillMount() {
        let params = this.$router.params
        this.setState({
            longitude: params.longitude,
            latitude: params.latitude,
        })
    }
    componentDidShow() {
        // this.mapCtx = qq.createMapContext('myMap')
        // console.log(this.mapCtx)
    }
    regionChange = (e) => {
        console.log(e)
        let _this = this
        let mapCtx = Taro.createMapContext('myMap')
        if (e.type == 'end') {
            mapCtx.getCenterLocation({
                success: function (res) {
                    ToastUtil.showToast(res)
                    console.log('res===',res)
                    // qqmapsdk.reverseGeocoder({
                    //     location: {
                    //         latitude: res.latitude,
                    //         longitude: res.longitude
                    //     },
                    //     success: function (resc) {
                    //         console.log(resc)
                    //         value = resc.result.address_component.street_number //address
                    //         Taro.setStorageSync('site', value)
                    //         console.log('地址是：' + vlaue)
                    //     }
                    // })
                },
                fail: err => {  
                    console.log(err)
                }
            })
        }
    }
    render() {
        return (
            <View>
                <Map
                    id="myMap"
                    longitude={this.state.longitude}
                    latitude={this.state.latitude}
                    onRegionChange={this.regionChange.bind(this)}
                    show-location
                    style="width: 100%; height: 100%;position: absolute;"
                ></Map>
            </View>
        )
    }
}
