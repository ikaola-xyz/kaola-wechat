import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import './toast-modal.scss'
import { AtTabs, AtTabsPane, AtFloatLayout } from 'taro-ui'
import pic_success from '../../images/pic_success.png'
import pic_fail from '../../images/pic_fail.png'
import pic_tips from '../../images/pic_tips.png'
import pic_register from '../../images/pic_register.png'
export default class ToastModal extends Taro.Component {

    state = {
    }
    iKnow() {
        this.props.closeModal()
    }
    render() {
        let tips, showPic
        let showButton = false
        let modalSizeStyle = {
            width: '480rpx'
        }
        let picHeight = {
            height: '174rpx'
        }
        let isShow = false
        if(this.props.type){
            isShow = true
        }
        switch (this.props.type) {
            case 'success':
                tips = '恭喜您，操作成功了'
                showPic = pic_success
                break;
            case 'fail':
                tips = '很遗憾，操作失败了'
                showPic = pic_fail
                break;
            case 'warning':
                tips = '您的信息填写有误'
                showPic = pic_tips
                break;
            case 'register':
                tips = '您还未登录，请先登录'
                showPic = pic_register
                showButton = true
                modalSizeStyle.width = '590rpx'
                picHeight.height = '207rpx'
                break;
        }
        return (<View className='room' >
            {/* 弹窗Model */}
            {isShow&& <View className="mask" catchTouchmove="preventTouchMove" ></View>}
            {isShow && <View className="modalDlg" style={modalSizeStyle}>
                <Image className="img" src={showPic} style={picHeight}></Image>
                <View className="title">{this.props.words? this.props.words : tips}</View>
                {showButton && <Button className="i_know" onClick={this.iKnow.bind(this)}>我知道了</Button>}
            </View>}
        </View>
        );
    }
}