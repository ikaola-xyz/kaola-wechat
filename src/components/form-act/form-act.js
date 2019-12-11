import Taro, { Component } from '@tarojs/taro';
import { View, Input, Picker, Textarea } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui"
import './form-act.scss';
import DatePicker from '../date-picker/date-picker';
import Select from '../Select/Select';
import { dateUtil } from '../../util/dateUtil';
import { apiData } from "../../api/apiData"
import { config } from '../../util/configUtil';
import { ToastUtil } from '../../util/toastUtil';

export default class FormAct extends Taro.Component {

    state = {   
        selectArr: [],
        selectValue: '请选择',            //选择的值
        date: dateUtil.formatTime(new Date()),
        startDate: dateUtil.formatTime(new Date()),
        selectDate: '',           //，日期
        imageArr: [],       //图片
    }
    componentWillMount() {
        let type = this.props.fieldType
        if(type == 'select'){
            let selectArr = this.props.fieldList.split(",")
            let selectValue = this.props.placeholder
            this.setState({
                selectArr,
                selectValue,
            })
        }else if(type == 'date'){
            let selectDate = this.props.placeholder ? this.props.placeholder : '请选择'
            this.setState({
                selectDate
            })
        }
    }
    //获取单选栏的值
    selector = e =>{
        let selectValue = this.state.selectArr[e.detail.value]
        this.props.getChildrenValue(this.state.selectArr[e.detail.value]);
        this.setState({
            selectValue
        })
    }
    //日期选择
    pickerDate(res) {
        this.setState({
            selectDate: res.dateString
        })
        this.props.getChildrenValue(res.dateString);
    }
     //选择图片
    chooseImage() {
        let that = this
        let { imageArr } = this.state
        if (imageArr.length >= 3) {
            ToastUtil.showMsgLoadToast('最多上传三张图片')
        }
        Taro.chooseImage({
            count: 1,
            success: (res) => {
                Taro.showLoading({
                    title: '上传中'
                });
                config.upLoadFile(res.tempFilePaths[0], 'schedule').then(response => {
                    let image = JSON.parse(response.data).data
                    imageArr.push(image)
                    let images = imageArr.join(',')
                    this.props.getChildrenValue(images);
                    that.setState({
                        imageArr
                    })
                    ToastUtil.showSuccessToast('上传成功')
                }).catch(err => {
                    ToastUtil.showErrorToast(err.data.message)
                })
            }
        })
    }
    //删除图片
    removeImage(index) {
        let { imageArr } = this.state
        imageArr.splice(index, 1)
        let images = imageArr.join(',')
        this.props.getChildrenValue(images);
        this.setState({
            imageArr
        })
    }
    render() {
        let { placeholder, fieldType, colName, isFill, noBorder } = this.props
        let { selectArr, date, selectValue, selectDate, imageArr } = this.state
        let border = {
            borderBottom: 'none'
        }
        return (
            <View className='room' style = {noBorder ? border : ''}>
                {/* 文本 */}
                {fieldType == 'text' && <View className="title">
                    {isFill == '1' && <Text className="isFill">*</Text>}{colName}
                    <Input
                        placeholder="请输入内容"
                        placeholderStyle="color: #808080; font-size: 24rpx;"
                        style="color: #808080; font-size: 24rpx;"
                        value={placeholder}
                        onInput={({ detail = {} }) => {
                            this.props.getChildrenValue(detail.value);
                            return detail.value
                        }}
                    />
                </View>}
                {/* 多行文本 */}
                {fieldType == 'textarea' && <View className="title">
                    {isFill == '1' && <Text className="isFill">*</Text>}{colName}
                    <Textarea
                        placeholder="请输入内容"
                        placeholderStyle="color: #808080; font-size: 24rpx;"
                        style="color: #808080; font-size: 24rpx; background:#EFF4FB; padding: 15rpx; height: 170rpx;margin-top: 10rpx"
                        maxlength="-1"
                        value={placeholder}
                        onInput={({ detail = {} }) => {
                            this.props.getChildrenValue(detail.value);
                            return detail.value
                        }}
                    />
                </View>}
                {/* 数字 */}
                {fieldType == 'num' && <View className="title">
                    {isFill == '1' && <Text className="isFill">*</Text>}
                    {colName}
                    <Input
                        placeholder="请输入内容"
                        placeholderStyle="color: #808080; font-size: 24rpx;"
                        style="color: #808080; font-size: 24rpx;"
                        value={placeholder}
                        type="number"
                        onInput={({ detail = {} }) => {
                            this.props.getChildrenValue(detail.value);
                            return detail.value
                        }}
                    />
                </View>}
                {/* 单选 */}
                {fieldType == 'select' && <View className="selector">
                    <Text className="name">
                        {isFill == '1' && <Text className="isFill">*</Text>}   
                        {colName}
                    </Text>
                    <View className='picker'>
                        <Picker mode='selector' range={selectArr} onChange={this.selector}>
                            <View>
                                <View>
                                    {selectValue ? selectValue : '请选择'}<View className="icon"></View>
                                </View>
                            </View>
                        </Picker>
                    </View>
                </View>}
                {/* 日期 */}
                {fieldType == 'date' && <DatePicker
                    placeholder={selectDate}
                    date={date}
                    onPickerChange={this.pickerDate.bind(this)}>
                    <Select
                        isFill={isFill}
                        colName={colName}
                        choose={selectDate}
                    >
                    </Select>
                </DatePicker>}
                {/* 日期 */}
                {fieldType == 'img' && <View className="image">
                    {
                        imageArr.length && imageArr.map((item, index) => {
                            return <View className="picture" key>
                                <Text className="remove" onClick={this.removeImage.bind(this, index)}>x</Text>
                                <Image className='img' src={apiData.imgBaseUrl + item} mode="widthFix"></Image>
                            </View>
                        })
                    }
                    <View className="upload" onClick={this.chooseImage}></View>
                </View>}
            </View>
        );
    }
}