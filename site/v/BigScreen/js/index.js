var dom_date = document.getElementById('date'),
    dom_dateSon = document.getElementById('dateSon'), //二级页面时间
    dom_location = document.getElementById('location'),
    dom_locationSon = document.getElementById('locationSon'),
    dom_myWeather = document.getElementById('myWeather'),
    dom_myWeatherSon = document.getElementById('myWeatherSon'),
    dom_temperature = document.getElementById('temperature'),
    dom_temperatureSon = document.getElementById('temperatureSon'),
    dom_wind = document.getElementById('wind'),
    dom_windSon = document.getElementById('windSon'),
    dom_rise = document.getElementById('rise'),
    dom_week = echarts.init(document.getElementById('week')),
    dom_map = echarts.init(document.getElementById('map')),
    dom_month = echarts.init(document.getElementById('month')),
    dom_core = echarts.init(document.getElementById('core')),
    dom_list = document.getElementById('list'),
    dom_JDguan = document.getElementById('JDguan'),
    dom_Elguan = document.getElementById('Elguan'),
    dom_JDping = document.getElementById('JDping'),
    dom_Elping = document.getElementById('Elping'),
    dom_border1 = document.getElementById('border1'),
    dom_border2 = document.getElementById('border2'),
    dom_border3 = document.getElementById('border3'),
    dom_border4 = document.getElementById('border4');

/*
列出所有接口地址
 */
var host = [
    'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getAllData.do', //总体数据(一天一次)
    'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getRealData.do', //实时数据(5s一次)
    'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getRecordData.do' //扫码记录(一分一次)
]

/*
定义需要用到的全局变量
 */
var Data_week_name = [],
    Data_week_num = [];
var Data_month = [],
    Data_num = [];
var name = '',
    pro = '',
    city = '',
    sku = '';
var flag = 0;
var flag2 = 0;
var option_week,
    option_core,
    Indicator = [],
    maxNum,
    freeArr = [],
    myColor = '#06c9c2';
var name;
var vo;
var timer1, timer2;
var page1 = 0,
    page2 = 0;
var monthMax;
/*
登录系统
判断是否有token
    有token
        发送请求验证token是否过期
            过期：弹出登录框
            未过期：显示主页面 启动接口
    没有token
        弹出登录框
           验证不通过：不请求接口
           验证通过：隐藏弹框 请求数据接口 
*/

/*
使用一天一次的接口来验证token
    返回status=-1显示登录框，并停用接口
    返回非-1则正常显示页面

 */
var dom_login = document.getElementsByClassName('login')[0],
    dom_getcode = document.getElementById('getcode'),
    dom_btn = document.getElementById('btn'),
    dom_phonenum = document.getElementById('phonenum'),
    dom_yzcode = document.getElementById('yzcode');
var vjifenToken = localStorage.vjifenToken === undefined ? '' : localStorage.vjifenToken;

var reg = /^1[0-9]{10}$/; //验证手机号
var countdowntimer = null; //定时器

var mintimer = null;

yz();

function yz() {
    var option = {
        token: vjifenToken
    };
    $.ajax({
        async: false,
        type: "GET",
        url: host[0],
        data: option,
        success: function (data) {
            vo = JSON.parse(data);
            if (vo.status == '-1') {
                console.log('token不可用');
                yzbc(false);
            } else {
                console.log('token可用');
                yzbc(true);
            }
        },
        error: function () {
            console.log('总体数据请求接口出错');
        }
    });
}

function yzbc(token) {
    if (token == false) { //token不可用
        dataStop();
        login();
    } else if (token == true) { //token可用
        //正常调用接口
        dataStart();
		document.getElementById("download").style.display = 'block';
    }
}

function login() { //弹出弹框必定停用接口
    dom_login.style.display = 'block';
}

function dataStart() { //正常调用接口
    getReal();
    clearInterval(mintimer);
    mintimer = setInterval(getReal, 60000);
    // getRise();
    $(function () {
        $('#marquee').myScroll({
            speed: 10, //数值越大，速度越慢
            rowHeight: 45 //li的高度
        });
    });
}

function dataStop() { //停用接口
    clearInterval(mintimer);
}

function logBtn() { //登录事件
    if (!reg.test(dom_phonenum.value)) {
        title_tip('提 示', '请输入正确的手机号哦！~', '我知道了');
    } else if (dom_getcode.value === '' || dom_getcode.value.indexOf(' ') !== -1) {
        title_tip('提 示', '请输入正确的验证码哦！~', '我知道了');
    } else {
        logsuccess();
    }
}

function logsuccess() {
    var option = {
        phoneNum: dom_phonenum.value,
        msgCode: dom_yzcode.value
    };
    $.ajax({
        async: false,
        type: "GET",
        url: "http://59.110.53.118:9008/DBTMainEntStats/SIMLogin/verifyPhone.do",
        data: option,
        success: function (data) {
            var jo = JSON.parse(data);
            if (jo.status == '-1') { //不允许访问
                title_tip('提 示', '验证未通过请重试', '我知道了');
            } else if (jo.status == '0') { //允许访问
                vjifenToken = jo.token;
                localStorage.vjifenToken = jo.token;
                window.location.reload();
                // dom_login.style.display = 'none';
                // dataStart();
            }
        }
    });
}

function getYzcode() {
    if (!reg.test(dom_phonenum.value)) {
        title_tip('提 示', '请输入正确的手机号哦！~', '我知道了');
    } else {
        if (dom_getcode.value === '获取验证码' || dom_getcode.value === '重新获取') {
            getCheckCode(function () {
                countdown(dom_getcode, 60);
            });
        } else {
            dom_getcode.removeEventListener('click', getYzcode, false);
        }
    }
}

function getCheckCode(cb) { // 获取手机验证码
    var option = {
        phoneNum: dom_phonenum.value
    };
    $.ajax({
        async: false,
        type: "GET",
        url: "http://59.110.53.118:9008/DBTMainEntStats/SIMLogin/sendVerify.do",
        data: option,
        success: function (data) {
            var jo = JSON.parse(data);
            console.log(jo);
            if (jo.status == '-1') { //不允许访问
                title_tip('提 示', '验证不通过,该手机号无访问权限', '我知道了');
            } else { //允许访问
                cb();
            }
        }
    });
}

function countdown(tag, time) {
    var i = time;
    tag.value = i + '秒';
    countdowntimer = setInterval(function () {
        i--;
        tag.value = i + '秒';
        if (i === 0) {
            tag.value = '重新获取';
            i = time;
            clearInterval(countdowntimer); // 清除定时器
            dom_getcode.addEventListener("click", getYzcode, false); //恢复点击事件
            countdowntimer = null;
        }
    }, 1000);
}

dom_btn.addEventListener('click', logBtn, false);
dom_getcode.addEventListener('click', getYzcode, false);

setInterval("show_cur_times()", 100); //获取时间
getLocation(); //获取地理位置、天气

//日期时间
function show_cur_times() {
    //获取当前日期
    var date_time = new Date();
    //年
    var year = date_time.getFullYear();
    //判断小于10，前面补0
    if (year < 10) {
        year = "0" + year;
    }
    //月
    var month = date_time.getMonth() + 1;
    //判断小于10，前面补0
    if (month < 10) {
        month = "0" + month;
    }
    //日
    var day = date_time.getDate();
    //判断小于10，前面补0
    if (day < 10) {
        day = "0" + day;
    }
    //时
    var hours = date_time.getHours();
    //判断小于10，前面补0
    if (hours < 10) {
        hours = "0" + hours;
    }
    //分
    var minutes = date_time.getMinutes();
    //判断小于10，前面补0
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //秒
    var seconds = date_time.getSeconds();
    //判断小于10，前面补0
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    //拼接年月日时分秒
    var date_str = year + "年" + month + "月" + day + "日 " + " " + hours + ":" + minutes + ":" + seconds;
    //显示在id为showtimes的容器里
    dom_date.innerHTML = date_str;
    dom_dateSon.innerHTML = date_str;
    return show_cur_times;
}

//地理位置
function getLocation() {
    //通过搜狐接口获取ip地理位置
    dom_location.innerHTML = '中国-' + returnCitySN["cname"];
    dom_locationSon.innerHTML = '中国-' + returnCitySN["cname"];
    // dom_pm2_5.innerHTML = '';
    //天气
    if (returnCitySN["cname"].indexOf('上海') != -1) {
        returnCitySN["cname"] = '上海市';
    }
    var option = {
        "city": returnCitySN["cname"].substr(0, returnCitySN["cname"].length - 1)
    };
    $.ajax({
        async: false,
        type: "GET",
        url: "http://wthrcdn.etouch.cn/weather_mini",
        data: option,
        success: function (data) {
            var jo = JSON.parse(data);
            var reg = /[\u4E00-\u9FA5]/g; //正则方法去除中文
            //气温
            var now = new Date(),
                hour = now.getHours();
            var low = jo.data.forecast[0].low.replace(reg, ''); //低温值
            var high = jo.data.forecast[0].high.replace(reg, ''); //高温值
            // if (hour >= 9 && hour <= 18) {//9点至18点显示高温
            //     dom_temperature.innerHTML = high;
            //     dom_temperatureSon.innerHTML = high;
            // } else {//其余显示低温
            //     dom_temperature.innerHTML = low;
            //     dom_temperatureSon.innerHTML = low;
            // }
            dom_temperature.innerHTML = low + '~' + high;
            dom_temperatureSon.innerHTML = low + '~' + high;
            //天气展示
            if (jo.data.forecast[0].type.indexOf('晴') != -1) {
                dom_myWeather.src = 'img/sun.png';
                dom_myWeatherSon.src = 'img/sun.png';
            } else if (jo.data.forecast[0].type.indexOf('阴') != -1) {
                dom_myWeather.src = 'img/yin.png';
                dom_myWeatherSon.src = 'img/yin.png';
            } else if (jo.data.forecast[0].type.indexOf('雨') != -1) {
                dom_myWeather.src = 'img/rain.png';
                dom_myWeatherSon.src = 'img/rain.png';
            } else if (jo.data.forecast[0].type.indexOf('云') != -1) {
                dom_myWeather.src = 'img/cloud.png';
                dom_myWeatherSon.src = 'img/cloud.png';
            } else if (jo.data.forecast[0].type.indexOf('沙') != -1) {
                dom_myWeather.src = 'img/sand.png';
                dom_myWeatherSon.src = 'img/sand.png';
            } else if (jo.data.forecast[0].type.indexOf('霾') != -1) {
                dom_myWeather.src = 'img/fog.png';
                dom_myWeatherSon.src = 'img/fog.png';
            } else if (jo.data.forecast[0].type.indexOf('雾') != -1) {
                dom_myWeather.src = 'img/fog.png';
                dom_myWeatherSon.src = 'img/fog.png';
            } else if (jo.data.forecast[0].type.indexOf('冰雹') != -1) {
                dom_myWeather.src = 'img/ice.png';
                dom_myWeatherSon.src = 'img/ice.png';
            } else if (jo.data.forecast[0].type.indexOf('浮尘') != -1) {
                dom_myWeather.src = 'img/sand.png';
                dom_myWeatherSon.src = 'img/sand.png';
            } else if (jo.data.forecast[0].type.indexOf('霜冻') != -1) {
                dom_myWeather.src = 'img/ice.png';
                dom_myWeatherSon.src = 'img/ice.png';
            } else if (jo.data.forecast[0].type.indexOf('风') != -1) {
                dom_myWeather.src = 'img/wind.png';
                dom_myWeatherSon.src = 'img/wind.png';
            } else {
                dom_myWeather.src = 'img/sun.png';
                dom_myWeatherSon.src = 'img/sun.png';
            }
            //风力展示
            // dom_wind.innerHTML = jo.data.forecast[0].fengli.substring(0, 2);
            dom_wind.innerHTML = jo.data.forecast[0].fengxiang;
            // dom_windSon.innerHTML = jo.data.forecast[0].fengli.substring(0, 2);
            dom_windSon.innerHTML = jo.data.forecast[0].fengxiang;
        }
    });
}

//月扫码量
var option_month = {
    calculable: true,
    grid: {
        left: '8%',
        right: '5%',
        top: '15%',
        bottom: '15%'
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: Data_month,
        axisLabel: {
            show: true,
            textStyle: {
                color: '#3e91d7'
            }
        },
        boundaryGap: true
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: '#3e91d7'
            }
        },
        splitArea: {
            show: true,
            interval: 1,
            areaStyle: {
                color: ['#101535', '#151e3b']
            }
        },
        splitLine: {
            show: false
        },
        // max:'dataMax'
        // max: '800000'
        boundaryGap: ['0%', '60%']
    }],
    series: [{
        name: '月扫码量',
        type: 'line',
        stack: '总量',
        itemStyle: {
            normal: {
                type: 'default',
                color: '#22f5c1',
                label: {
                    show: true
                }
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#0e6c7c'
                }, {
                    offset: 1,
                    color: '#0f2140'
                }])
            }
        },
        data: Data_num
        // showAllSymbol:true
    }]
};
//一分钟一次
function getReal() {
    var option = {
        token: vjifenToken
    };
    $.ajax({
        async: false,
        type: "GET",
        url: host[2],
        data: option,
        success: function (data) {
            var jo = JSON.parse(data);
            for (var i in jo) {
                if (jo[i].nickName == undefined) {
                    return;
                }
            }
            while (dom_list.hasChildNodes()) {
                dom_list.removeChild(dom_list.firstChild);
            }

            for (var m in jo) {
                if (jo[m].skuName == 'null') {
                    delete jo[m];
                }
            }
            for (var i in jo) {
                //处理昵称
                if (jo[i].nickName.length > 4) {
                    name = jo[i].nickName.substr(0, 2) + '*' + jo[i].nickName.substr(jo[i].nickName.length - 2, jo[i].nickName.length);
                } else if (jo[i].nickName.length <= 1) {
                    name = '*';
                } else if (jo[i].nickName.length == 2) {
                    name = jo[i].nickName.substr(0, 1) + '*';
                } else {
                    name = jo[i].nickName.substr(0, 1) + '*' + jo[i].nickName.substr(jo[i].nickName.length - 1, jo[i].nickName.length);
                }
                //处理省份
                if (jo[i].province.length <= 2) {
                    pro = jo[i].province + '省';
                } else if (jo[i].province.length >= 4) {
                    pro = jo[i].province.substr(0, 4) + '...';
                } else {
                    pro = jo[i].province;
                }
                //处理市名
                if (jo[i].city.length <= 2) {
                    city = jo[i].city + '市';
                } else if (jo[i].city.length >= 5) {
                    city = jo[i].city.substr(0, 4) + '...';
                } else {
                    city = jo[i].city;
                }
                //处理sku
                if (jo[i].skuName.length >= 12) {
                    sku = jo[i].skuName.substr(0, 12) + '...';
                } else {
                    sku = jo[i].skuName;
                }
                var dom_li = document.createElement('li');
                dom_li.innerHTML = '<span>' + name + '</span><span>' + pro + '</span><span>' + city + '</span><span>' + sku + '</span>';
                dom_list.appendChild(dom_li);
            }
        },
        error: function () {
            console.log('实时扫码量请求接口出错');
        }
    });
    return getReal;
}

if (vjifenToken != '') {
    getRise();
}
//一天一次
function getRise() {
    var option = {
        token: vjifenToken
    };
    $.ajax({
        async: false,
        type: "GET",
        url: host[0],
        data: option,
        success: function (data) {
            vo = JSON.parse(data);
            console.log(vo);
            //总千升数
            dom_rise.innerHTML = vo.totalCapacity;
            //月扫码量
            for (var i = 0; i < vo.monthList.length; i++) {
                if (vo.monthList[i].reportDate[5] == '0') {
                    Data_month[i] = vo.monthList[i].reportDate.substr(6, vo.monthList[i].reportDate.length);
                } else {
                    Data_month[i] = vo.monthList[i].reportDate.substr(5, vo.monthList[i].reportDate.length);
                }
                Data_num[i] = vo.monthList[i].scanCounts;
            }
            // monthMax = Math.max.apply(null,Data_num)+200000;
            // monthMax = monthMax.toString();
            // console.log(monthMax);
            dom_month.setOption(option_month);

            //周扫码量
            function getWeek() {
                Data_week_name = [];
                Data_week_num = [];
                if (page1 == 0) {
                    for (var i = 0; i < vo.weekMap.A.length; i++) {
                        if (i == 10) {
                            break;
                        }
                        name = vo.weekMap.A[i].mainSkuName;
                        name = name.replace('#', '');
                        Data_week_name[i] = name;
                        Data_week_num[i] = vo.weekMap.A[i].scanCounts;
                    }
                    page1 = 1;
                } else if (page1 == 1) {
                    for (var i = 0; i < vo.weekMap.C.length; i++) {
                        if (i == 10) {
                            break;
                        }
                        name = vo.weekMap.C[i].mainSkuName;
                        name = name.replace('#', '');
                        Data_week_name[i] = name;
                        Data_week_num[i] = vo.weekMap.C[i].scanCounts;
                    }
                    page1 = 2;
                } else if (page1 == 2) {
                    for (var i = 0; i < vo.weekMap.B.length; i++) {
                        if (i == 10) {
                            break;
                        }
                        name = vo.weekMap.B[i].mainSkuName;
                        name = name.replace('#', '');
                        Data_week_name[i] = name;
                        Data_week_num[i] = vo.weekMap.B[i].scanCounts;
                    }
                    page1 = 3;
                } else if (page1 == 3) {
                    for (var i = 0; i < vo.weekMap.D.length; i++) {
                        if (i == 10) {
                            break;
                        }
                        name = vo.weekMap.D[i].mainSkuName;
                        name = name.replace('#', '');
                        Data_week_name[i] = name;
                        Data_week_num[i] = vo.weekMap.D[i].scanCounts;
                    }
                    page1 = 0;
                }
                option_week = {
                    grid: {
                        left: '2%',
                        right: '10%',
                        bottom: '8%',
                        top: '0%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#3e91d7'
                            }
                        },
                        splitNumber: 4,
                        splitLine: {
                            show: false
                        }
                        // scale:true
                        // splitNumber:5
                    },
                    yAxis: {
                        type: 'category',
                        data: Data_week_name,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#01e9e2'
                            }
                        },
                    },
                    series: [{
                        type: 'bar',
                        barMaxWidth: 15, //最大宽度
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#494b88',
                                        '#5900fd',
                                        '#6654ca',
                                        '#079eff',
                                        '#00f0ff'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{c}'
                                }
                            }
                        },
                        data: Data_week_num
                    }]
                };
                dom_week.setOption(option_week);
                return getWeek;
            }

            function loop() {
                if (page2 == 0) {
                    freeArr = [];
                    Indicator = [];
                    for (var i = 0; i < vo.batchMap.A.length; i++) {
                        if (i == 10) {
                            break;
                        }
                        freeArr[i] = Number(vo.batchMap.A[i].batchDays);
                    }
                    maxNum = Math.max.apply(null, freeArr);
                    myColor = '#06c9c2';
                    for (var j = 0; j < vo.batchMap.A.length; j++) {
                        if (j == 10) {
                            break;
                        }
                        vo.batchMap.A[j].mainSkuName = vo.batchMap.A[j].mainSkuName.replace('#', '\n');
                        Indicator[j] = {
                            name: vo.batchMap.A[j].mainSkuName,
                            max: maxNum
                        };
                    }
                    dom_border1.style.border = '1px solid #06c9c2';
                    dom_border2.style.border = 'none';
                    dom_border3.style.border = 'none';
                    dom_border4.style.border = 'none';
                    page2 = 1;
                } else if (page2 == 1) {
                    freeArr = [];
                    Indicator = [];
                    for (var i = 0; i < vo.batchMap.C.length; i++) {
                        if (i == 10) {
                            break;
                        }
                        freeArr[i] = Number(vo.batchMap.C[i].batchDays);
                    }
                    maxNum = Math.max.apply(null, freeArr);
                    myColor = '#744ff0';
                    for (var j = 0; j < vo.batchMap.C.length; j++) {
                        if (j == 10) {
                            break;
                        }
                        vo.batchMap.C[j].mainSkuName = vo.batchMap.C[j].mainSkuName.replace('#', '\n');
                        Indicator[j] = {
                            name: vo.batchMap.C[j].mainSkuName,
                            max: maxNum
                        };
                    }
                    dom_border2.style.border = '1px solid #744ff0';
                    dom_border1.style.border = 'none';
                    dom_border3.style.border = 'none';
                    dom_border4.style.border = 'none';
                    page2 = 2;
                } else if (page2 == 2) {
                    freeArr = [];
                    Indicator = [];
                    for (var i = 0; i < vo.batchMap.B.length; i++) {
                        if (i == 10) {
                            break;
                        }
                        freeArr[i] = Number(vo.batchMap.B[i].batchDays);
                    }
                    maxNum = Math.max.apply(null, freeArr);
                    myColor = '#0465fd';
                    for (var j = 0; j < vo.batchMap.B.length; j++) {
                        if (j == 10) {
                            break;
                        }
                        vo.batchMap.B[j].mainSkuName = vo.batchMap.B[j].mainSkuName.replace('#', '\n');
                        Indicator[j] = {
                            name: vo.batchMap.B[j].mainSkuName,
                            max: maxNum
                        };
                    }
                    dom_border3.style.border = '1px solid #0465fd';
                    dom_border1.style.border = 'none';
                    dom_border2.style.border = 'none';
                    dom_border4.style.border = 'none';
                    page2 = 3;
                } else if (page2 == 3) {
                    freeArr = [];
                    Indicator = [];
                    for (var i = 0; i < vo.batchMap.D.length; i++) {
                        if (i == 10) {
                            break;
                        }
                        freeArr[i] = Number(vo.batchMap.D[i].batchDays);
                    }
                    maxNum = Math.max.apply(null, freeArr);
                    myColor = '#00aeff';
                    for (var j = 0; j < vo.batchMap.D.length; j++) {
                        if (j == 10) {
                            break;
                        }
                        vo.batchMap.D[j].mainSkuName = vo.batchMap.D[j].mainSkuName.replace('#', '\n');
                        Indicator[j] = {
                            name: vo.batchMap.D[j].mainSkuName,
                            max: maxNum
                        };
                    }
                    dom_border4.style.border = '1px solid #00aeff';
                    dom_border1.style.border = 'none';
                    dom_border2.style.border = 'none';
                    dom_border3.style.border = 'none';
                    page2 = 0;
                }
                option_core = {
                    radar: {
                        radius: '60%',
                        center: ['60%', '50%'],
                        indicator: Indicator,
                        shape: 'circle', //圆形
                        splitNumber: 5,
                        name: {
                            textStyle: {
                                color: '#3e91d7'
                            }
                        },
                        splitLine: {
                            lineStyle: { //环形的样式
                                color: '#24304a',
                                type: 'dashed'
                            }
                        },
                        splitArea: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#24304a',
                                type: 'dashed'
                            }
                        }
                    },
                    series: [{
                        name: '新鲜度',
                        type: 'radar',
                        data: [{
                            value: freeArr,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value;
                                    }
                                }
                            }
                        }],
                        itemStyle: {
                            normal: {
                                color: myColor
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                opacity: 0.5,
                                color: myColor
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.1,
                                color: myColor
                            }
                        }
                    }]
                };
                dom_core.setOption(option_core);
                return loop;
            }

            /*
            add添加/清除定时器
             */
            function keyer(add) {
                if (add === true) {
                    timer1 = setInterval(getWeek(), 5000);
                    timer2 = setInterval(loop(), 5000);
                } else if (add === false) {
                    clearInterval(timer1);
                    clearInterval(timer2);
                }
            }

            keyer(true);

            function JDguan() {
                keyer(false);
                page1 = 0;
                page2 = 0;
                keyer(true);
            }

            function Elguan() {
                keyer(false);
                page1 = 1;
                page2 = 1;
                keyer(true);
            }

            function JDping() {
                keyer(false);
                page1 = 2;
                page2 = 2;
                keyer(true);
            }

            function Elping() {
                keyer(false);
                page1 = 3;
                page2 = 3;
                keyer(true);
            }
            dom_JDguan.addEventListener('click', JDguan, false);
            dom_Elguan.addEventListener('click', Elguan, false);
            dom_JDping.addEventListener('click', JDping, false);
            dom_Elping.addEventListener('click', Elping, false);
        },
        error: function () {
            console.log('总体数据请求接口出错');
        }
    });
    return getRise;
}

//为防止页面时间太长造成假死，每小时刷新页面
setInterval(pageFresh, 1000 * 60 * 60)

function pageFresh() {
    window.location.reload(true);
}