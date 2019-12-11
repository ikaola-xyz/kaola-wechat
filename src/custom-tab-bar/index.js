import Taro, { navigateTo } from '@tarojs/taro';
import { View, Text, Image, Progress, Switch, CoverView, CoverImage } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui"
import './index.scss';


export default class Index extends Taro.Component {
    config = {
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black',
    };
    state = {
        selected: 0,
        list: [{
            pagePath: "/pages/index",
            iconPath: "/images/index.png",
            selectedIconPath: "/images/index_active.png",
            text: "组件"
        }, {
            pagePath: "/pages/attention/attention",
            iconPath: "/images/attention.png",
            selectedIconPath: "/images/attention_active.png",
            text: "接口"
        },{
            pagePath: "/pages/community/community",
            iconPath: "/images/community.png",
            selectedIconPath: "/images/community_active.png",
            text: "接口"
        },{
            pagePath: "/pages/personal/personal",
            iconPath: "/images/personal.png",
            selectedIconPath: "/images/personal_active.png",
            text: "接口"
        }]
    }

    componentWillMount() {

    }
    componentDidShow(){
    }
    switchTab(index, e) {
        const data = e.currentTarget.dataset
        const url = data.path
        Taro.switchTab({ url })
        this.setState({
            selected: index
        })
    }
    render() {
        let { list, selected } = this.state
        console.log('selected', selected)
        return (
            <CoverView className="tab-bar">
                <CoverView className="tab-bar-border"></CoverView>
                <CoverView className="tab-bar-item" data-path={list[0].pagePath} data-index={0} onClick={this.switchTab.bind(this, 0)}>
                    <CoverImage className="img" src={selected == 0 ? list[0].selectedIconPath : list[0].iconPath}></CoverImage>
                    <CoverView className={selected == 0 ? 'name active' : 'name'}>首页</CoverView>
                </CoverView>
                <CoverView className="tab-bar-item" data-path={list[1].pagePath} data-index={1} onClick={this.switchTab.bind(this, 1)}>
                    <CoverImage className="img" src={selected == 1 ? list[1].selectedIconPath : list[1].iconPath}></CoverImage>
                    <CoverView className={selected == 1 ? 'name active' : 'name'}>关注</CoverView>
                </CoverView>
                <CoverView className="tab-bar-item" data-path={list[2].pagePath} data-index={2} onClick={this.switchTab.bind(this, 2)}>
                    <CoverImage className="img" src={selected == 2 ? list[2].selectedIconPath : list[2].iconPath}></CoverImage>
                    <CoverView className={selected == 2 ? 'name active' : 'name'}>社区</CoverView>
                </CoverView>
                <CoverView className="tab-bar-item" data-path={list[3].pagePath} data-index={3} onClick={this.switchTab.bind(this, 3)}>
                    <CoverImage className="img" src={selected == 3 ? list[3].selectedIconPath : list[3].iconPath}></CoverImage>
                    <CoverView className={selected == 3 ? 'name active' : 'name'}>个人中心</CoverView>
                </CoverView>
            </CoverView >
        );
    }
}