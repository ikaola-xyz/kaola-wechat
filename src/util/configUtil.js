import Taro from '@tarojs/taro';
import { ToastUtil } from '../util/toastUtil';

//保存uid
const saveUid = (uid) => {
    Taro.setStorageSync('uid', uid);
}

//获取uid
const getUid = () => {
    return Taro.getStorageSync('uid')
}

//保存openid
const saveOpenid = (openid) => {
    Taro.setStorageSync('openid', openid);
}

//获取openid
const getOpenid = () => {
    return Taro.getStorageSync('openid')
}

//保存手机号
const savePhone = (phone) => {
    Taro.setStorageSync('phoneNum', phone);
}

//获取手机号
const getPhone = () => {
    return Taro.getStorageSync('phoneNum')
}

//保存用户信息
const savaUserInfo = (userInfo) => {
    Taro.setStorageSync('userInfo', userInfo)
}

//获取用户信息
const getUserInfo = () => {
    return Taro.getStorageSync('userInfo');
}

//保存数据
const savaData = (key, data) => {
    Taro.setStorageSync(key, data)
}

//获取数据
const getData = (key) => {
    return Taro.getStorageSync(key)
}

//删除数据
const removeData = (key) => {
    Taro.removeStorageSync(key)
}

//获取appid
const getAppid = () => {
    switch (Taro.getEnv()) {
        case Taro.ENV_TYPE.WEAPP:
            return 'wxef40c3d3df8108ab'
        case Taro.ENV_TYPE.ALIPAY:
            return ''
    }
    return ''
}

//保存unionid
const savaUnionid = (unionid) => {
    Taro.setStorageSync('unionid', unionid);
}

//获取unionid
const getUnionid = () => {
    return Taro.getStorageSync('unionid')
}

//身份证获取性别
const getSex = (psidno) => {
    var sexno, sex
    if (psidno.length == 18) {
        sexno = psidno.substring(16, 17)
    } else if (psidno.length == 15) {
        sexno = psidno.substring(14, 15)
    } else {
        alert("错误的身份证号码，请核对！")
        return false
    }
    var tempid = sexno % 2;
    if (tempid == 0) {
        sex = 0
    } else {
        sex = 1
    }
    return sex
}

//根据身份计算年龄
const getAge = (identityCard) => {

    var len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    var strBirthday = "";
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//根据身份证获取出生日期
const getBirthday = (psidno) => {
    var birthdayno, birthdaytemp
    if (psidno.length == 18) {
        birthdayno = psidno.substring(6, 14)
    } else if (psidno.length == 15) {
        birthdaytemp = psidno.substring(6, 12)
        birthdayno = "19" + birthdaytemp
    } else {
        alert("错误的身份证号码，请核对！")
        return false
    }
    var birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8)
    return birthday
}

/**
 * 获得图片地址
 * @param {*} type  1  首页  2汽车票   3 门票
 */
const getBaseImageUrl = (type) => {
    var baseUrl = 'https://img.bflvx.com/mini-app-png/bflvx/'
    switch (type) {
        case 1:
            return baseUrl + 'bflvx-index/'
        case 2:
            return baseUrl + 'mini-bus/'
        case 3:
            return baseUrl + 'mini-ticket/'
    }
    return ''
}

/**
 * 验证手机号
 */
const checkPhone = (phone) => {
    return /^1[3456789]\d{9}$/.test(phone)
}


/**
 * 验证身份证
 * @param {*} id 
 */
const checkCardID = (id) => {
    // 1 "验证通过!", 0 //校验不通过 // id为身份证号码
    var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if (!format.test(id)) {
        return false
    }
    //区位码校验
    //出生年月日校验  前正则限制起始年份为1900;
    var year = id.substr(6, 4),//身份证年
        month = id.substr(10, 2),//身份证月
        date = id.substr(12, 2),//身份证日
        time = Date.parse(month + '-' + date + '-' + year),//身份证日期时间戳date
        now_time = Date.parse(new Date()),//当前时间戳
        dates = (new Date(year, month, 0)).getDate();//身份证当月天数
    if (time > now_time || date > dates) {
        return false
    }
    //校验码判断
    var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);  //系数
    var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
    var id_array = id.split("");
    var sum = 0;
    for (var k = 0; k < 17; k++) {
        sum += parseInt(id_array[k]) * parseInt(c[k]);
    }
    if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
        return false
    }
    return true
}

//跳转到小程序
const intentMiniApp = (data) => {
    Taro.navigateToMiniProgram({
        appId: 'wxef40c3d3df8108ab',
        path: 'pages/common/index/index?mbModel=' + data,
    })
}

//返回上一页
const navigateBack = (delta = 1) => {
    Taro.navigateBack({
        delta: delta
    })
}
//上传本地图片路径，获取图片地址
const upLoadFile = (path, type) => {
    return new Promise((resolve, reject) => {
        Taro.uploadFile({
            url: 'https://ydy.beessoft.net:8008/commonInter/uploadImg',
            filePath: path,
            name: 'imageFile',
            formData: {
                'type': type,     
            },
            success: function (response) {
                if (response.statusCode != 200) {
                    ToastUtil.showErrorToast(response.data.message)
                }else{
                    resolve(response)
                    ToastUtil.hideLoading();
                }
            },
            fail: function (err) {
                reject(err)
                ToastUtil.hideLoading();
            },
        })
    }) 
}

let config = {
    getAppid: getAppid,
    saveUid: saveUid,
    getUid: getUid,
    saveOpenid: saveOpenid,
    getOpenid: getOpenid,
    savaUserInfo: savaUserInfo,
    getUserInfo: getUserInfo,
    savePhone: savePhone,
    getPhone: getPhone,
    savaData: savaData,
    getData: getData,
    removeData: removeData,
    savaUnionid: savaUnionid,
    getUnionid: getUnionid,
    getAge: getAge,
    getSex: getSex,
    getBirthday: getBirthday,
    getBaseImageUrl: getBaseImageUrl,
    checkPhone: checkPhone,
    checkCardID:checkCardID,
    intentMiniApp: intentMiniApp,
    navigateBack: navigateBack,
    upLoadFile: upLoadFile,
}

export {
    config
}