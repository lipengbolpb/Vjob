var times = document.getElementsByClassName('time'),
    pics = document.getElementsByClassName('pic'),
    countryNames = document.getElementsByClassName('countryName'),
    activeDates = document.getElementsByClassName('activeDate'),
    activeMYXs = document.getElementsByClassName('activeMYX'),
    activeClose = document.getElementsByClassName('activeClose')[0],
    active_1 = document.getElementsByClassName('active_1')[0];
activeClose.addEventListener('click', function () {
    active_1.style.display = 'none';
});
var iconList = [
    '/v/zzqp20180401/img/guess/E-1.png', //俄罗斯
    '/v/zzqp20180401/img/guess/A-4.png', //沙特阿拉伯
    '/v/zzqp20180401/img/guess/E-8.png', //葡萄牙
    '/v/zzqp20180401/img/guess/E-5.png', //西班牙
    '/v/zzqp20180401/img/guess/E-4.png', //法国
    '/v/zzqp20180401/img/guess/A-5.png', //澳大利亚
    '/v/zzqp20180401/img/guess/S-3.png', //阿根廷
    '/v/zzqp20180401/img/guess/E-7.png', //冰岛
    '/v/zzqp20180401/img/guess/E-9.png', //德国
    '/v/zzqp20180401/img/guess/N-1.png', //墨西哥
    '/v/zzqp20180401/img/guess/S-1.png', //巴西
    '/v/zzqp20180401/img/guess/E-13.png', //瑞士
    '/v/zzqp20180401/img/guess/E-2.png', //比利时
    '/v/zzqp20180401/img/guess/N-3.png', //巴拿马
    '/v/zzqp20180401/img/guess/F-5.png', //突尼斯
    '/v/zzqp20180401/img/guess/E-3.png', //英格兰
    '/v/zzqp20180401/img/guess/S-4.png', //哥伦比亚
    '/v/zzqp20180401/img/guess/A-2.png', //日本
    '/v/zzqp20180401/img/guess/E-1.png', //俄罗斯
    '/v/zzqp20180401/img/guess/F-2.png', //埃及
    '/v/zzqp20180401/img/guess/E-8.png', //葡萄牙
    '/v/zzqp20180401/img/guess/F-4.png', //摩洛哥
    '/v/zzqp20180401/img/guess/A-1.png', //伊朗
    '/v/zzqp20180401/img/guess/E-5.png', //西班牙
    '/v/zzqp20180401/img/guess/E-4.png', //法国
    '/v/zzqp20180401/img/guess/S-5.png', //秘鲁
    '/v/zzqp20180401/img/guess/S-3.png', //阿根廷
    '/v/zzqp20180401/img/guess/E-12.png', //克罗地亚
    '/v/zzqp20180401/img/guess/S-1.png', //巴西
    '/v/zzqp20180401/img/guess/N-2.png', //哥斯达黎加
    '/v/zzqp20180401/img/guess/E-14.png', //塞尔维亚
    '/v/zzqp20180401/img/guess/E-13.png', //瑞士
    '/v/zzqp20180401/img/guess/E-2.png', //比利时
    '/v/zzqp20180401/img/guess/F-5.png', //突尼斯
    '/v/zzqp20180401/img/guess/E-9.png', //德国
    '/v/zzqp20180401/img/guess/E-11.png', //瑞典
    '/v/zzqp20180401/img/guess/E-3.png', //英格兰
    '/v/zzqp20180401/img/guess/N-3.png', //巴拿马
    '/v/zzqp20180401/img/guess/A-2.png', //日本
    '/v/zzqp20180401/img/guess/F-3.png', //塞内加尔
    '/v/zzqp20180401/img/guess/S-2.png', //乌拉圭
    '/v/zzqp20180401/img/guess/E-1.png', //俄罗斯
    '/v/zzqp20180401/img/guess/A-1.png', //伊朗
    '/v/zzqp20180401/img/guess/E-8.png', //葡萄牙
    '/v/zzqp20180401/img/guess/E-10.png', //丹麦
    '/v/zzqp20180401/img/guess/E-4.png', //法国
    '/v/zzqp20180401/img/guess/F-1.png', //尼日利亚
    '/v/zzqp20180401/img/guess/S-3.png', //阿根廷
    '/v/zzqp20180401/img/guess/A-3.png', //韩国
    '/v/zzqp20180401/img/guess/E-9.png', //德国
    '/v/zzqp20180401/img/guess/E-14.png', //塞尔维亚
    '/v/zzqp20180401/img/guess/S-1.png', //巴西
    '/v/zzqp20180401/img/guess/A-2.png', //日本
    '/v/zzqp20180401/img/guess/E-6.png', //波兰
    '/v/zzqp20180401/img/guess/E-3.png', //英格兰
    '/v/zzqp20180401/img/guess/E-2.png', //比利时
    '/v/zzqp20180401/img/guess/E-4.png', //法国 1/8决赛
    '/v/zzqp20180401/img/guess/S-3.png', //阿根廷
    '/v/zzqp20180401/img/guess/S-2.png', //乌拉圭
    '/v/zzqp20180401/img/guess/E-8.png', //葡萄牙
    '/v/zzqp20180401/img/guess/E-5.png', //西班牙
    '/v/zzqp20180401/img/guess/E-1.png', //俄罗斯
    '/v/zzqp20180401/img/guess/E-12.png', //克罗地亚
    '/v/zzqp20180401/img/guess/E-10.png', //丹麦
    '/v/zzqp20180401/img/guess/S-1.png', //巴西
    '/v/zzqp20180401/img/guess/N-1.png', //墨西哥
    '/v/zzqp20180401/img/guess/E-2.png', //比利时
    '/v/zzqp20180401/img/guess/A-2.png', //日本
    '/v/zzqp20180401/img/guess/E-11.png', //瑞典
    '/v/zzqp20180401/img/guess/E-13.png', //瑞士
    '/v/zzqp20180401/img/guess/S-4.png', //哥伦比亚
    '/v/zzqp20180401/img/guess/E-3.png' //英格兰
];
var dateList = [
    '6月14日',
    '6月16日',
    '6月16日',
    '6月16日',
    '6月17日',
    '6月18日',
    '6月18日',
    '6月19日',
    '6月19日',
    '6月20日',
    '6月20日',
    '6月21日',
    '6月21日',
    '6月22日',
    '6月22日',
    '6月23日',
    '6月23日',
    '6月24日',
    '6月24日',
    '6月24日',
    '6月25日',
    '6月26日',
    '6月26日',
    '6月27日',
    '6月27日',
    '6月28日',
    '6月28日',
    '6月29日',
    '6月30日', //1/8决赛
    '7月01日',
    '7月01日',
    '7月02日',
    '7月02日',
    '7月03日',
    '7月03日',
    '7月04日',
    '7月04日'
];
var timeList = [
    '23:00—1:00',
    '2:00—4:00',
    '18:00—20:00',
    '21:00—23:00',
    '23:00—1:00',
    '2:00—4:00',
    '23:00—1:00',
    '2:00—4:00',
    '20:00—22:00',
    '2:00—4:00',
    '20:00—22:00',
    '2:00—4:00',
    '23:00—1:00',
    '2:00—4:00',
    '20:00—22:00',
    '2:00—4:00',
    '20:00—22:00',
    '2:00—4:00',
    '20:00—22:00',
    '23:00—1:00',
    '22:00—00:00',
    '2:00—4:00',
    '22:00—00:00',
    '2:00—4:00',
    '22:00—00:00',
    '2:00—4:00',
    '22:00—00:00',
    '2:00—4:00',
    '22:00-24:00', //法国-阿根廷
    '2:00-4:00', //乌拉圭-葡萄牙
    '22:00-24:00', //西班牙-俄罗斯
    '2:00-4:00', //克罗地亚-丹麦
    '22:00-24:00', //巴西-墨西哥
    '2:00-4:00', //比利时-日本
    '22:00-24:00', //瑞典-瑞士
    '2:00-4:00' //哥伦比亚-英格兰
];
var teamList = [
    '俄罗斯',
    '沙特阿拉伯',
    '葡萄牙',
    '西班牙',
    '法国',
    '澳大利亚',
    '阿根廷',
    '冰岛',
    '德国',
    '墨西哥',
    '巴西',
    '瑞士',
    '比利时',
    '巴拿马',
    '突尼斯',
    '英格兰',
    '哥伦比亚',
    '日本',
    '俄罗斯',
    '埃及',
    '葡萄牙',
    '摩洛哥',
    '伊朗',
    '西班牙',
    '法国',
    '秘鲁',
    '阿根廷',
    '克罗地亚',
    '巴西',
    '哥斯达黎加',
    '塞尔维亚',
    '瑞士',
    '比利时',
    '突尼斯',
    '德国',
    '瑞典',
    '英格兰',
    '巴拿马',
    '日本',
    '塞内加尔',
    '乌拉圭',
    '俄罗斯',
    '伊朗',
    '葡萄牙',
    '丹麦',
    '法国',
    '尼日利亚',
    '阿根廷',
    '韩国',
    '德国',
    '塞尔维亚',
    '巴西',
    '日本',
    '波兰',
    '英格兰',
    '比利时',
    '法国', //1/8决赛
    '阿根廷',
    '乌拉圭',
    '葡萄牙',
    '西班牙',
    '俄罗斯',
    '克罗地亚',
    '丹麦',
    '巴西',
    '墨西哥',
    '比利时',
    '日本',
    '瑞典',
    '瑞士',
    '哥伦比亚',
    '英格兰'
];

function countTime() {
    //获取当前时间  
    var date = new Date();
    var now = date.getTime();
    //设置截止时间  
    var str = "2018/7/15 23:00:00";
    var endDate = new Date(str);
    var end = endDate.getTime();
    //时间差  
    var leftTime = end - now;
    //定义变量 d,h,m,s保存倒计时的时间  
    var d, h, m, s;
    if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
    }
    dArr = d.toString().split('');
    hArr = h.toString().split('');
    mArr = m.toString().split('');
    console.log(date);
    console.log(endDate);
    //将倒计时赋值到div中  
    if (d > 9) {
        times[0].src = '/v/zzqp20180401/img/guess/' + dArr[0] + '.png';
        times[1].src = '/v/zzqp20180401/img/guess/' + dArr[1] + '.png';
    } else {
        times[0].src = '/v/zzqp20180401/img/guess/0.png';
        times[1].src = '/v/zzqp20180401/img/guess/' + d + '.png';
    }
    if (h > 9) {
        times[2].src = '/v/zzqp20180401/img/guess/' + hArr[0] + '.png';
        times[3].src = '/v/zzqp20180401/img/guess/' + hArr[1] + '.png';
    } else {
        times[2].src = '/v/zzqp20180401/img/guess/0.png';
        times[3].src = '/v/zzqp20180401/img/guess/' + h + '.png';
    }
    if (m > 9) {
        times[4].src = '/v/zzqp20180401/img/guess/' + mArr[0] + '.png';
        times[5].src = '/v/zzqp20180401/img/guess/' + mArr[1] + '.png';
    } else {
        times[4].src = '/v/zzqp20180401/img/guess/0.png';
        times[5].src = '/v/zzqp20180401/img/guess/' + m + '.png';
    }
    //递归每秒调用countTime方法，显示动态时间效果  
    setTimeout(countTime, 60000);
}
var now_date = new Date();
var now_time = now_date.getTime();
if (now_time < 1528992000000) { //6.15_0点以前 
    for (var i = 0; i < 4; i++) {
        pics[i].src = iconList[i];
        countryNames[i].innerHTML = teamList[i];
    }
    for (var k = 0; k < 2; k++) {
        activeDates[k].innerHTML = dateList[k];
        activeMYXs[k].innerHTML = timeList[k];
    }
    countTime();
} else if (now_time >= 1528992000000 && now_time < 1530201600000) { //6.29_0点以前
    document.getElementsByClassName('activeTime')[0].style.display = 'none';
    document.getElementsByClassName('notice')[0].style.display = 'none';
    document.getElementsByClassName('activeSlogan')[0].src = '/v/zzqp20180401/img/ad/active_2_slogan.png';
    document.getElementsByClassName('activeSlogan')[0].style.width = '90%';
    document.getElementsByClassName('activeSlogan')[0].style.margin = '2rem auto 0';
    if (now_time < 1528992000000) { //6.16_0点以前
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i];
            countryNames[i].innerHTML = teamList[i];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k];
            activeMYXs[k].innerHTML = timeList[k];
        }
    } else if (now_time >= 1528992000000 && now_time < 1529164800000) { //6.16_0点-6.17_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 4];
            countryNames[i].innerHTML = teamList[i + 4];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 2];
            activeMYXs[k].innerHTML = timeList[k + 2];
        }
    } else if (now_time >= 1529164800000 && now_time < 1529251200000) { //6.17_0点-6.18_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 8];
            countryNames[i].innerHTML = teamList[i + 8];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 4];
            activeMYXs[k].innerHTML = timeList[k + 4];
        }
    } else if (now_time >= 1529251200000 && now_time < 1529337600000) { //6.18_0点-6.19_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 12];
            countryNames[i].innerHTML = teamList[i + 12];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 6];
            activeMYXs[k].innerHTML = timeList[k + 6];
        }
    } else if (now_time >= 1529337600000 && now_time < 1529424000000) { //6.19_0点-6.20_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 16];
            countryNames[i].innerHTML = teamList[i + 16];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 8];
            activeMYXs[k].innerHTML = timeList[k + 8];
        }
    } else if (now_time >= 1529424000000 && now_time < 1529510400000) { //6.20_0点-6.21_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 20];
            countryNames[i].innerHTML = teamList[i + 20];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 10];
            activeMYXs[k].innerHTML = timeList[k + 10];
        }
    } else if (now_time >= 1529510400000 && now_time < 1529596800000) { //6.21_0点-6.22_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 24];
            countryNames[i].innerHTML = teamList[i + 24];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 12];
            activeMYXs[k].innerHTML = timeList[k + 12];
        }
    } else if (now_time >= 1529596800000 && now_time < 1529683200000) { //6.22_0点-6.23_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 28];
            countryNames[i].innerHTML = teamList[i + 28];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 14];
            activeMYXs[k].innerHTML = timeList[k + 14];
        }
    } else if (now_time >= 1529683200000 && now_time < 1529769600000) { //6.23_0点-6.24_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 32];
            countryNames[i].innerHTML = teamList[i + 32];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 16];
            activeMYXs[k].innerHTML = timeList[k + 16];
        }
    } else if (now_time >= 1529769600000 && now_time < 1529856000000) { //6.24_0点-6.25_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 36];
            countryNames[i].innerHTML = teamList[i + 36];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 18];
            activeMYXs[k].innerHTML = timeList[k + 18];
        }
    } else if (now_time >= 1529856000000 && now_time < 1529942400000) { //6.25_0点-6.26_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 40];
            countryNames[i].innerHTML = teamList[i + 40];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 20];
            activeMYXs[k].innerHTML = timeList[k + 20];
        }
    } else if (now_time >= 1529942400000 && now_time < 1530028800000) { //6.26_0点-6.27_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 44];
            countryNames[i].innerHTML = teamList[i + 44];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 22];
            activeMYXs[k].innerHTML = timeList[k + 22];
        }
    } else if (now_time >= 1530028800000 && now_time < 1530115200000) { //6.27_0点-6.28_0点
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 48];
            countryNames[i].innerHTML = teamList[i + 48];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 24];
            activeMYXs[k].innerHTML = timeList[k + 24];
        }
    } else {
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 48];
            countryNames[i].innerHTML = teamList[i + 48];
        }
        for (var k = 0; k < 2; k++) {
            activeDates[k].innerHTML = dateList[k + 24];
            activeMYXs[k].innerHTML = timeList[k + 24];
        }
    }
} else if (now_time >= 1530201600000 && now_time < 1531497600000) { //7.14_0点以前
    document.getElementsByClassName('notice')[0].style.display = 'none';
    document.getElementsByClassName('activeSlogan')[0].src = '/v/zzqp20180401/img/ad/active_3_slogan.png';
    countTime();
    if (now_time > 1530201600000 && now_time < 1530374400000) { //7.1_0点以前
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 56];
            countryNames[i].innerHTML = teamList[i + 56];
        }
        activeDates[0].innerHTML = '6月30日';
        activeDates[1].innerHTML = '7月01日';
        activeMYXs[0].innerHTML = '22:00';
        activeMYXs[1].innerHTML = '2:00';
    } else if (now_time > 1530374400000 && now_time < 1530460800000) { //7.1-7.2
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 60];
            countryNames[i].innerHTML = teamList[i + 60];
        }
        activeDates[0].innerHTML = '7月01日';
        activeDates[1].innerHTML = '7月02日';
        activeMYXs[0].innerHTML = '22:00';
        activeMYXs[1].innerHTML = '2:00';
    } else if (now_time > 1530460800000 && now_time < 1530547200000) { //7.2-7.3
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 64];
            countryNames[i].innerHTML = teamList[i + 64];
        }
        activeDates[0].innerHTML = '7月02日';
        activeDates[1].innerHTML = '7月03日';
        activeMYXs[0].innerHTML = '22:00';
        activeMYXs[1].innerHTML = '2:00';
    } else if (now_time > 1530547200000 && now_time < 1530633600000) { //7.3-7.4
        for (var i = 0; i < 4; i++) {
            pics[i].src = iconList[i + 68];
            countryNames[i].innerHTML = teamList[i + 68];
        }
        activeDates[0].innerHTML = '7月03日';
        activeDates[1].innerHTML = '7月04日';
        activeMYXs[0].innerHTML = '22:00';
        activeMYXs[1].innerHTML = '2:00';
    } else if (now_time > 1530633600000 && now_time < 1530892800000) { //7.7 零点之前 
        pics[0].src = '/v/zzqp20180401/img/guess/S-2.png'; //乌拉圭
        pics[1].src = '/v/zzqp20180401/img/guess/E-4.png'; //法国
        pics[2].src = '/v/zzqp20180401/img/guess/S-1.png'; //巴西
        pics[3].src = '/v/zzqp20180401/img/guess/E-2.png'; //比利时
        countryNames[0].innerHTML = '乌拉圭';
        countryNames[1].innerHTML = '法国';
        countryNames[2].innerHTML = '巴西';
        countryNames[3].innerHTML = '比利时';
        activeDates[0].innerHTML = '7月06日';
        activeDates[1].innerHTML = '7月07日';
        activeMYXs[0].innerHTML = '22:00';
        activeMYXs[1].innerHTML = '2:00';
    } else if (now_time > 1530892800000 && now_time < 1530979200000) { //7.7零点-7.8零点
        pics[0].src = '/v/zzqp20180401/img/guess/E-11.png'; //瑞典
        pics[1].src = '/v/zzqp20180401/img/guess/E-3.png'; //英格兰
        pics[2].src = '/v/zzqp20180401/img/guess/E-1.png'; //俄罗斯
        pics[3].src = '/v/zzqp20180401/img/guess/E-12.png'; //克罗地亚
        countryNames[0].innerHTML = '瑞典';
        countryNames[1].innerHTML = '英格兰';
        countryNames[2].innerHTML = '俄罗斯';
        countryNames[3].innerHTML = '克罗地亚';
        activeDates[0].innerHTML = '7月07日';
        activeDates[1].innerHTML = '7月08日';
        activeMYXs[0].innerHTML = '22:00';
        activeMYXs[1].innerHTML = '2:00';
    } else if (now_time > 1530979200000 && now_time < 1531245600000) { //7.8零点-7.11 2点
        pics[0].src = '/v/zzqp20180401/img/guess/E-4.png'; //法国
        pics[1].src = '/v/zzqp20180401/img/guess/E-2.png'; //比利时
        countryNames[0].innerHTML = '法国';
        countryNames[1].innerHTML = '比利时';
        activeDates[0].innerHTML = '7月11日';
        activeMYXs[0].innerHTML = '2:00';
    } else if (now_time > 1531245600000 && now_time < 1531332000000) { //7.11 2点-7.12 2点
        pics[0].src = '/v/zzqp20180401/img/guess/E-12.png'; //克罗地亚
        pics[1].src = '/v/zzqp20180401/img/guess/E-3.png'; //英格兰
        countryNames[0].innerHTML = '克罗地亚';
        countryNames[1].innerHTML = '英格兰';
        activeDates[0].innerHTML = '7月12日';
        activeMYXs[0].innerHTML = '2:00';
    } else if(now_time < 1531674000000){//7.16 1点之前
        pics[0].src = '/v/zzqp20180401/img/guess/E-2.png'; //比利时
        pics[1].src = '/v/zzqp20180401/img/guess/E-3.png'; //英格兰
        pics[2].src = '/v/zzqp20180401/img/guess/E-4.png'; //法国
        pics[3].src = '/v/zzqp20180401/img/guess/E-12.png'; //克罗地亚
        countryNames[0].innerHTML = '比利时';
        countryNames[1].innerHTML = '英格兰';
        countryNames[2].innerHTML = '法国';
        countryNames[3].innerHTML = '克罗地亚';
        activeDates[0].innerHTML = '7月14日';
        activeDates[1].innerHTML = '7月15日';
        activeMYXs[0].innerHTML = '22:00';
        activeMYXs[1].innerHTML = '23:00';
    }else{
        active_1.style.display = 'none';
    }
}
// countTime();