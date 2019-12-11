const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber1).join('-') + ' ' + [hour, minute, second].map(formatNumber1).join(':')
}

const formatNumber1 = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const formatDate = (date) => {
    date = new Date(date)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return [year, month, day].map(formatNumber).join("/");
}

const formatDate1 = (date) => {
    date = new Date(date)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return [year, month, day].map(formatNumber).join("-");
}

const shortFormatDate = (date) => {
    date = new Date(date)
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return [month, day].map(formatNumber).join("-");
}
const formatDateCn = (date) => {
    date = new Date(date)
    const month = date.getMonth() + 1
    const day = date.getDate()
    return month + "月" + day + "日";
}

const formatDayCn = (date) => {
    date = new Date(date)
    const timestamp = new Date(date.setHours(0, 0, 0, 0)).getTime() //获取时间戳
    const today = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); //获取时间戳

    if (today == timestamp) {
        return "今天";
    }
    var days = (timestamp - today) / (24 * 60 * 60 * 1000); //计算相差几天

    if (days == 1) {
        return "明天";
    }
    if (days == 2) {
        return "后天";
    }

    //判断周几
    switch (date.getDay()) {
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2:
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        case 6:
            return "周六";
    }
    return "";
}

const formatDayWeek = (date) => {
    date = new Date(date)

    //判断周几
    switch (date.getDay()) {
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2:
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        case 6:
            return "周六";
    }
}

//计算周几、几天后
const formatDay = (date) => {
    date = new Date(date)
    var week;
    var day;
    const timestamp = new Date(date.setHours(0, 0, 0, 0)).getTime() //获取时间戳
    const today = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); //获取时间戳


    var days = (timestamp - today) / (24 * 60 * 60 * 1000); //计算相差几天
    switch (days) {
        case 0:
            day = '今天';
            break;
        case 1:
            day = '明天';
            break;
        case 2:
            day = '后天';
            break;
        default:
            day = days + '天后'
            break
    }


    //判断周几
    switch (date.getDay()) {
        case 0:
            week = "周日";
            break;
        case 1:
            week = "周一";
            break;
        case 2:
            week = "周二";
            break;
        case 3:
            week = "周三";
            break;
        case 4:
            week = "周四";
            break;
        case 5:
            week = "周五";
            break;
        case 6:
            week = "周六";
            break;
    }

    return { days: day, week: week, dayDiff: days };
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 根据开始时间、结束时间进行倒计时
 * @param data 
 */
const countDown = (data) => {
    var that = this;
    var startTime = Math.floor(data.startTime / 1000);
    var overTime = Math.floor((new Date(data.overTime).getTime()) / 1000);
    var Minute = Math.floor((overTime - startTime) / 60);
    var Second = (overTime - startTime) % 60;

    var interval = setInterval(() => {

        if (Second > 0) {
            Second--;
        } else {
            if (Minute > 0) {
                Minute--;
                Second = 59;
            } else {
                //倒计时结束
                data.complete();
                clearInterval(interval)
            }
        }

        data.next(Minute > 9 ? Minute : "0" + Minute, Second > 9 ? Second : "0" + Second, interval);

    }, 1000)

}

/**
 * 验证码倒计时
 */
const countDownCode = (data) => {
    var Second = 60;

    var interval = setInterval(() => {

        if (Second > 0) {
            Second--;
            data.next(Second);
        } else {
            //倒计时结束
            data.complete(interval);
        }


    }, 1000)
}

const countDownCodePromise = () => {
    return new Promise((next, complete) => {
        var Second = 60;
        var interval = setInterval(() => {

            if (Second > 0) {
                Second--;
            } else {
                //倒计时结束
                complete(interval);
            }
            next(Second);
        }, 1000)
    })
}



//农历
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
    return (m >> n) & 1;
}

function e2c() {

    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getYear();
    if (tmp < 1900) {
        tmp += 1900;
    }
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
    }
    for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
                isEnd = true; break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
        }
    }
}

function GetcDateString() {
    var tmp = "";

    if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
    } else {
        tmp += monString.charAt(cMonth - 1);
    }
    tmp += "月";
    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
    if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
    }
    return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
    if (solarYear < 1921 || solarYear > 2020) {
        return "";
    } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
    }
}

function getAmPm(time) {
    let num = time.substring(0, 2)
    if (num >= 0 && num < 12) {
        return 'AM '
    } else {
        return 'PM '
    }
}

let dateUtil = {
    formatDate: formatDate,
    formatDate1: formatDate1,
    formatDateCn: formatDateCn,
    formatDay: formatDay,
    formatDayCn: formatDayCn,
    formatDayWeek: formatDayWeek,
    shortFormatDate: shortFormatDate,
    countDown: countDown,
    countDownCode: countDownCode,
    countDownCodePromise: countDownCodePromise,
    GetLunarDay: GetLunarDay,
    getAmPm: getAmPm,
    formatTime: formatTime
}
export {
    dateUtil
}