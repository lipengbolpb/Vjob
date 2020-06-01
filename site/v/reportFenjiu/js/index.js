'use strict'
var dom_address = document.getElementById('address'),//地区
    dom_date = document.getElementById('date'),//日期
    dom_bottle = document.getElementById('bottle'),//当日开瓶扫码量
    dom_bottleTotal = document.getElementById('bottleTotal'),//累计开瓶扫码量
    dom_money = document.getElementById('money'),//当日返利金额
    dom_moneyTotal = document.getElementById('moneyTotal'),//累计返利金额
    dom_exchange = document.getElementById('exchange'),//兑换积分数
    dom_exchangeTotal = document.getElementById('exchangeTotal'),//兑换积分数
    dom_customer = document.getElementById('customer'),//当日扫码消费者
    dom_customerTotal = document.getElementById('customerTotal'),//累计扫码消费者
    dom_add = document.getElementById('add'),//当日新增消费者
    dom_addTotal = document.getElementById('addTotal'),//累计新增消费者
    // dom_average = document.getElementById('average'),//当日人均消费瓶数
    // dom_averageTotal = document.getElementById('averageTotal'),//累计人均消费瓶数
    // dom_fresh = document.getElementById('fresh'),//新鲜度
    // dom_freshTotal = document.getElementById('freshTotal'),//累计新鲜度
    // dom_surplusMoney = document.getElementById('surplusMoney'),//账户剩余金额
    // dom_surplusDate = document.getElementById('surplusDate'),//账户剩余天数
    dom_elseNum = document.getElementById('elseNum'),//其他当日扫码量
    dom_elseCustomer = document.getElementById('elseCustomer'),//其他当日消费者
    dom_elseNumTotal = document.getElementById('elseNumTotal'),//其他累计扫码量
    dom_elseCustomerTotal = document.getElementById('elseCustomerTotal'),//其他累计消费者
    dom_totalNum = document.getElementById('totalNum'),//合计当日扫码量
    dom_totalCustomer = document.getElementById('totalCustomer'),//合计当日消费者
    dom_totalNumTotal = document.getElementById('totalNumTotal'),//合计累计扫码量
    dom_totalCustomerTotal = document.getElementById('totalCustomerTotal'),//合计累计消费者
    itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
    mon_list = document.getElementById('mon_list'),
    dom_body = document.getElementsByTagName('body')[0],
    dom_loading = document.getElementsByClassName('loading')[0];

var itemValue, queryDate, jo;
var init_jo, init_itemValue, init_queryDate, flag = true;

init_data(true, false);
init_nav();
init_basic();
init_seven(true);
init_chart();
init_zone();
init_total();

document.getElementById('btnUser').style.backgroundColor = '#20ceb3';
document.getElementById('btnScan').style.backgroundColor = '#b9b9b9';
document.getElementById('btnUser').addEventListener('click', function () {
    init_seven(true);
    document.getElementById('btnUser').style.backgroundColor = '#20ceb3';
    document.getElementById('btnScan').style.backgroundColor = '#b9b9b9';
}, false);
document.getElementById('btnScan').addEventListener('click', function () {
    init_seven(false);
    document.getElementById('btnUser').style.backgroundColor = '#b9b9b9';
    document.getElementById('btnScan').style.backgroundColor = '#19b5ff';
}, false);

function init_data(first, click) {//初始化数据
    itemValue = sessionStorage.itemValue,
        queryDate = sessionStorage.queryDate,
        jo = sessionStorage.jo;
    jo = JSON.parse(jo);

    if (first == true) {
        init_jo = jo;
        init_itemValue = itemValue;
        init_queryDate = queryDate;
    }
    if (click == true) {
        itemValue = init_itemValue;
        queryDate = init_queryDate;
        jo = init_jo;
    }
    console.log(jo);
}

function init_nav() {//导航栏初始化
    var dom_control = document.getElementsByClassName('control')[0],
        dom_outside = document.getElementsByClassName('outside')[0],
        dom_content = document.getElementsByClassName('content')[0],
        dom_close = document.getElementsByClassName('close')[0],
        dom_toTop = document.getElementById('toTop'),
        dom_all = document.getElementsByClassName('all')[0];

    var controlFlag = true;
    var skuArr = [];

    if (!jo.skuList) {//总部不显示导航
        dom_control.style.display = 'none';
        return;
    } else {//各个地区显示导航
        dom_control.style.display = 'block';
        dom_close.addEventListener('click', function () {
            if (controlFlag) {
                dom_content.style.display = 'block';
                dom_toTop.style.top = '270px';
                dom_close.style.transform = 'translate(-50%,-50%) rotate(-45deg)';
                controlFlag = false;
            } else {
                dom_content.style.display = 'none';
                dom_toTop.style.top = '170px';
                dom_close.style.transform = 'translate(-50%,-50%) rotate(0deg)';
                controlFlag = true;
            }
        }, false);
        document.getElementsByClassName('wrap')[0].addEventListener('click', function () {
            if (!controlFlag) {
                dom_content.style.display = 'none';
                dom_toTop.style.top = '170px';
                dom_close.style.transform = 'translate(-50%,-50%) rotate(0deg)';
                controlFlag = true;
            }
        }, false);
        get_sku();
    }

    dom_all.addEventListener('click', function () {
        init_data(false, true);
        init_basic();
        init_chart();
        init_seven(true);
        init_zone();
        init_total();
    }, false);

    function get_sku() {//获取该区域所有sku并布局
        /*
        1.获取sku个数
        2.在80deg内进行等分获取等分的角度
        3.将每个sku旋转该角度，平移半径距离，在旋转该角度(60_-20之间)
         */
        var myList = jo.skuList;
        for (var i = 0; i < myList.length; i++) {
            var createP = document.createElement('p');
            createP.className = 'myP';
            createP.innerHTML = myList[i].skuName;
            dom_content.appendChild(createP);
            skuArr[i] = myList[i].skuKey;
        }
        var myP = document.getElementsByClassName('myP');
        var myN = myP.length;
        var average = 120 / myN;
        var initNum = 60;
        for (var i = 0; i < myP.length; i++) {
            myP[i].classList.add('events');
            if (initNum == 60) {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-125px) rotateZ(' + (-initNum) + 'deg)';
            } else if (initNum < 0) {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-105px) rotateZ(' + (-initNum) + 'deg)';
            } else {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-120px) rotateZ(' + (-initNum) + 'deg)';
            }
            initNum = initNum - average;
            (function (i) {//闭包
                myP[i].addEventListener('click', function () {
                    loading('报表加载中');
                    var myskuKey = skuArr[i];
                    var requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getReportSkuData.do?itemValue=' + itemValue + '&queryDate=' + queryDate + '&skuKey=' + myskuKey;
                    myajax(requrl);
                }, false);
            })(i);
        }
    }
}

function myajax(requrl) {
    vge.ajxget(requrl, 60000, function (r) {
        try {
            var s = JSON.parse(r);
            if (s.status == 2) {
                loaded();
                alert('暂无数据');
                return;
            }
            sessionStorage.clear();
            flag = false;
            sessionStorage.jo = r;
            sessionStorage.itemValue = itemValue;
            sessionStorage.queryDate = queryDate;
            init_data(false, false);
            init_basic();
            init_chart();
            init_seven(true);
            init_zone();
            init_total();
            loaded();
        } catch (e) {
            vge.clog('errmsg', [requrl, e]);
        }
    }, function (err) {
        vge.clog('errmsg', [requrl, err]);
    });
}

function init_basic(first) {//初始化日报概况部分
    if (itemValue == 'false') {
        // document.getElementsByClassName('select4')[0].style.display = 'none';
        document.getElementsByClassName('select3')[0].style.marginBottom = '3rem';
        document.getElementsByClassName('return')[0].style.display = 'none';
        document.getElementById('freshName').innerHTML = '开瓶新鲜度';
    } else {
        document.getElementById('freshName').innerHTML = '当日用户数';
    }

    // 日报概况部分
    if (jo.itemName.length > 5) {
        jo.itemName = jo.itemName.substr(0, 4) + '...';
    }
    dom_address.innerHTML = '<img src="img/address.png?v=1">' + jo.itemName;
    dom_date.innerHTML = '<img src="img/date.png?v=1">' + jo.reportDate;

    var scanCounts = parseFloat(jo.mainBean.scanCounts).toLocaleString(),
        scanAll = parseFloat(jo.mainBean.scanAll).toLocaleString(),
        vpointsCounts = parseFloat(jo.mainBean.vpointsCounts).toLocaleString(),
        vpointsAll = parseFloat(jo.mainBean.vpointsAll).toLocaleString(),
        exchangeVpoints = parseFloat(jo.mainBean.exchangeVpoints).toLocaleString(),
        allExchangeVpoints = parseFloat(jo.mainBean.allExchangeVpoints).toLocaleString(),
        userCounts = parseFloat(jo.mainBean.userCounts).toLocaleString(),
        userAll = parseFloat(jo.mainBean.userAll).toLocaleString(),
        newUserCounts = parseFloat(jo.mainBean.newUserCounts).toLocaleString(),
        newUserAll = parseFloat(jo.mainBean.newUserAll).toLocaleString(),
        userScan = parseFloat(jo.mainBean.userScan).toLocaleString(),
        usAll = parseFloat(jo.mainBean.usAll).toLocaleString(),
        freshLev = parseFloat(jo.mainBean.freshLev).toLocaleString(),
        freshLevAll = parseFloat(jo.mainBean.freshLevAll).toLocaleString();

    var myscanP, myvpointsP, myuserP, mynewUserP, myusP, myfreshLevP,exchangeVpointsP;
    if (jo.mainBean.scanP.indexOf('-') == -1) {
        myscanP = '+' + jo.mainBean.scanP;
    } else {
        myscanP = jo.mainBean.scanP;
    }
    if (jo.mainBean.vpointsP.indexOf('-') == -1) {
        myvpointsP = '+' + jo.mainBean.vpointsP;
    } else {
        myvpointsP = jo.mainBean.vpointsP;
    }
    if (jo.mainBean.userP.indexOf('-') == -1) {
        myuserP = '+' + jo.mainBean.userP;
    } else {
        myuserP = jo.mainBean.userP;
    }
    if (jo.mainBean.newUserP.indexOf('-') == -1) {
        mynewUserP = '+' + jo.mainBean.newUserP;
    } else {
        mynewUserP = jo.mainBean.newUserP;
    }
    if (jo.mainBean.usP.indexOf('-') == -1) {
        myusP = '+' + jo.mainBean.usP;
    } else {
        myusP = jo.mainBean.usP;
    }
    if (jo.mainBean.freshLevP.indexOf('-') == -1) {
        myfreshLevP = '+' + jo.mainBean.freshLevP;
    } else {
        myfreshLevP = jo.mainBean.freshLevP;
    }
    if(jo.mainBean.exchangeVpointsP){
        if (jo.mainBean.exchangeVpointsP.indexOf('-') == -1) {
            exchangeVpointsP = '+' + jo.mainBean.exchangeVpointsP;
        } else {
            exchangeVpointsP = jo.mainBean.exchangeVpointsP;
        }
        document.getElementsByClassName('exchange')[0].style.display = 'block';
    }else{
        document.getElementsByClassName('exchange')[0].style.display = 'none';
    }
    dom_bottle.innerHTML = scanCounts + '次&nbsp;&nbsp;(' + myscanP + ')';
    dom_bottleTotal.innerHTML = scanAll + '次';
    dom_money.innerHTML = vpointsCounts + '积分&nbsp;&nbsp;(' + myvpointsP + ')';
    dom_moneyTotal.innerHTML = vpointsAll + '积分';
    dom_exchange.innerHTML = exchangeVpoints + '积分&nbsp;&nbsp;(' + exchangeVpointsP + ')';
    dom_exchangeTotal.innerHTML = allExchangeVpoints + '积分';
    dom_customer.innerHTML = userCounts + '人&nbsp;&nbsp;(' + myuserP + ')';
    dom_customerTotal.innerHTML = userAll + '人';
    dom_add.innerHTML = newUserCounts + '人&nbsp;&nbsp;(' + mynewUserP + ')';
    dom_addTotal.innerHTML = newUserAll + '人';
    // dom_average.innerHTML = userScan + '瓶&nbsp;&nbsp;(' + myusP + ')';
    // dom_averageTotal.innerHTML = usAll + '瓶';
    // dom_fresh.innerHTML = freshLev + '天&nbsp;&nbsp;(' + myfreshLevP + ')';
    // dom_freshTotal.innerHTML = freshLevAll + '天';
}

function getDate(index) {//tool时间(8月29日 周三)
    var toolDate = jo.dayList[index].reportDate;//08-29
    if (toolDate[0] == '0') {
        document.getElementById('tool_date').innerHTML = `${toolDate[1]}月${toolDate[3]}${toolDate[4]}日&nbsp;&nbsp;${jo.dayList[index].weekDay}`;
    } else {
        document.getElementById('tool_date').innerHTML = `${toolDate[0]}${toolDate[1]}月${toolDate[3]}${toolDate[4]}日&nbsp;&nbsp;${jo.dayList[index].weekDay}`;
    }
}
function getOne(way, index) {//tool第一行(消费者人数)
    if (way == true) {//用户趋势
        let x = parseFloat(jo.dayList[index].userCounts).toLocaleString();//消费者人数
        let y = jo.dayList[index].userP;
        if (jo.dayList[index].userP.indexOf('-') == '-1') {//百分比为正
            y = `+${jo.dayList[index].userP}`;
        }
        document.getElementById('tool_one').innerHTML = `独立用户数:${x}(${y})`;
    } else {//扫码趋势
        let a = parseFloat(jo.dayList[index].scanCounts).toLocaleString();//开瓶扫码量
        let b = jo.dayList[index].scanP;
        if (jo.dayList[index].scanP.indexOf('-') == '-1') {//百分比为正
            b = `+${jo.dayList[index].scanP}`;
        }
        document.getElementById('tool_one').innerHTML = `用户扫码量:${a}(${b})`;
    }
}

function getTwo(way, index) {
    if (way == true) {//用户趋势
        let x = parseFloat(jo.dayList[index].newUserCounts).toLocaleString();//新增消费者
        let y = jo.dayList[index].newUserP;
        if (jo.dayList[index].newUserP.indexOf('-') == '-1') {//百分比为正
            y = `+${jo.dayList[index].newUserP}`;
        }
        document.getElementById('tool_two').innerHTML = `新增用户数:${x}(${y})`;
    } else {//扫码趋势
        let a = parseFloat(jo.dayList[index].vpointsCounts).toLocaleString();//返利金额
        let b = jo.dayList[index].vpointsP;
        if (jo.dayList[index].vpointsP.indexOf('-') == '-1') {//百分比为正
            b = `+${jo.dayList[index].vpointsP}`;
        }
        document.getElementById('tool_two').innerHTML = `消耗积分数:${a}(${b})`;
    }
}

function getThree(way, index) {
    if (way == true) {//用户趋势
        let x = jo.dayList[index].userNew;//新增消费者占比
        let y = jo.dayList[index].userNewP;
        if (jo.dayList[index].userNewP.indexOf('-') == '-1') {//百分比为正
            y = `+${jo.dayList[index].userNewP}`;
        }
        document.getElementById('tool_three').innerHTML = `新增用户占比:${x}(${y})`;
    } else {//扫码趋势
        let a = parseFloat(jo.dayList[index].userScan).toLocaleString();//人均消费量
        let b = jo.dayList[index].userScanP;
        if (jo.dayList[index].userScanP.indexOf('-') == '-1') {//百分比为正
            b = `+${jo.dayList[index].userScanP}`;
        }
        document.getElementById('tool_three').innerHTML = `人均扫码数:${a}(${b})`;
    }
}

function dataMax(arr) {
    return Math.max.apply(Math, arr);
};

function init_seven(way) {//初始化七天趋势图
    if (way == true) {//用户趋势
        document.getElementById('btnUser').style.backgroundColor = '#20ceb3';
        document.getElementById('btnScan').style.backgroundColor = '#b9b9b9';
        if(jo.dayList.length == 0){
            document.getElementsByClassName('select5')[0].style.display = 'none';
        }else{
            document.getElementsByClassName('select5')[0].style.display = 'block';
            getDate(jo.dayList.length - 1);
            getOne(true, jo.dayList.length - 1);
            getTwo(true, jo.dayList.length - 1);
            getThree(true, jo.dayList.length - 1);
        }
        //横坐标===>日期(可能小于7天)
        var data_date = [];
        //纵坐标===>消费者人数
        var data_num = [];
        //纵坐标===>新增消费者
        var data_new = [];
        if (jo.dayList.length == 0) {
            document.getElementsByClassName('select5')[0].style.display = 'none';
        } else {
            document.getElementsByClassName('select5')[0].style.display = 'block';
            for (let i = 0; i < jo.dayList.length; i++) {
                data_date.push(jo.dayList[i].reportDate + jo.dayList[i].weekDay);
                data_num.push(jo.dayList[i].userCounts);
                data_new.push(jo.dayList[i].newUserCounts);
            }
        }
        //类目对应颜色
        var data_color = ['#20ceb3', '#fcd91d'];
        //统计类目
        var data_name = [
            {
                name: '独立用户数',
                icon: 'circle',
                backgroundColor: '#20ceb3'
            },
            {
                name: '新增用户数',
                icon: 'circle',
                backgroundColor: '#fcd91d'
            }
        ];
    } else {//扫码趋势
        if (jo.dayList.length == 0) {
            document.getElementsByClassName('select5')[0].style.display = 'none';
        }else{
            document.getElementsByClassName('select5')[0].style.display = 'block';
            getDate(jo.dayList.length - 1);
            getOne(false, jo.dayList.length - 1);
            getTwo(false, jo.dayList.length - 1);
            getThree(false, jo.dayList.length - 1);
        }
        //横坐标===>日期(可能小于7天)
        var data_date = [];
        //纵坐标===>开瓶扫码量
        var data_num = [];
        //纵坐标===>返利金额
        var data_new = [];
        if (jo.dayList.length == 0) {
            document.getElementsByClassName('select5')[0].style.display = 'none';
        }else{
            document.getElementsByClassName('select5')[0].style.display = 'block';
            for (let i = 0; i < jo.dayList.length; i++) {
                data_date.push(jo.dayList[i].reportDate + jo.dayList[i].weekDay);
                data_num.push(jo.dayList[i].scanCounts);
                data_new.push(jo.dayList[i].vpointsCounts);
            }
        }
        var data_new_max = Math.ceil(dataMax(data_new) * 2 / 1000) * 1000;

        //类目对应颜色
        var data_color = ['#19b5ff', '#fcd91d'];
        //统计类目
        var data_name = [
            {
                name: '用户扫码量',
                icon: 'circle',
                backgroundColor: '#19b5ff'
            },
            {
                name: '消耗积分数',
                icon: 'circle',
                backgroundColor: '#fcd91d'
            }
        ];
    }

    var seven = document.getElementById('seven');
    //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    var resizeexcel = function () {
        seven.style.width = window.innerWidth + 'px';
        seven.style.height = 300 + 'px';
    };
    //设置容器高宽
    resizeexcel();
    // 基于准备好的dom，初始化echarts实例
    var sevenChart = echarts.init(seven);
    var option = {
        color: data_color,
        legend: {
            data: data_name,
            textStyle: {
                color: '#ffffff',
                fontSize: 10
            },
            itemWidth: 10,//图例大小（还有itemHeight属性）
            align: 'left',
            left: '8%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: data_date,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle: {
                        color: '#b9b9b9',
                        fontSize: 10
                    },
                    formatter: function (params) {//横坐标轴换行
                        var newParamsName = "";// 最终拼接成的字符串
                        var paramsNameNumber = params.length;// 实际标签的个数
                        var provideNumber = 5;// 每行能显示的字的个数
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                        /**
                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                         */
                        // 条件等同于rowNumber>1
                        if (paramsNameNumber > provideNumber) {
                            /** 循环每一行,p表示行 */
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = "";// 表示每一次截取的字符串
                                var start = p * provideNumber;// 开始截取的位置
                                var end = start + provideNumber;// 结束截取的位置
                                // 此处特殊处理最后一行的索引值
                                if (p == rowNumber - 1) {
                                    // 最后一次不换行
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    // 每一次拼接字符串并换行
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr;// 最终拼成的字符串
                            }
                        } else {
                            // 将旧标签的值赋给新标签
                            newParamsName = params;
                        }
                        //将最终的字符串返回
                        return newParamsName
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#c0c0c0'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#b9b9b9'
                    }
                }
            }
        ],
        series: [
            {
                name: data_name[0].name,
                type: 'bar',
                barWidth: '40%',
                data: data_num,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            fontSize: 10
                        },
                        formatter: function (params) {
                            return parseFloat(params.value).toLocaleString();
                        }
                    }
                }
            },
            {
                name: data_name[1].name,
                type: 'line',
                markPoint: {
                    symbol: 'circle',
                    symbolSize: 500
                },
                data: data_new
            }
        ]
    };

    if (way == false) {//双y轴
        option.yAxis = [
            {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#b9b9b9',
                        fontSize: 10
                    }
                }
            },
            {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#b9b9b9'
                    }
                },
                splitLine: {
                    show: false
                },
                max: data_new_max
            }
        ];
        option.series = [
            {
                name: data_name[0].name,
                type: 'bar',
                barWidth: '40%',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            fontSize: 10
                        },
                        formatter: function (params) {
                            return parseFloat(params.value).toLocaleString();
                        }
                    }
                },
                data: data_num
            },
            {
                name: data_name[1].name,
                type: 'line',
                markPoint: {
                    symbol: 'circle',
                    symbolSize: 500
                },
                data: data_new,
                yAxisIndex: 1
            }
        ]

    }
    // 使用刚指定的配置项和数据显示图表。
    sevenChart.setOption(option);

    //添加点击事件，还有其他鼠标事件和键盘事件等等
    sevenChart.on("click", function (param) {
        if (way == true) {
            getDate(param.dataIndex);
            getOne(true, param.dataIndex);
            getTwo(true, param.dataIndex);
            getThree(true, param.dataIndex);
        } else {
            getDate(param.dataIndex);
            getOne(false, param.dataIndex);
            getTwo(false, param.dataIndex);
            getThree(false, param.dataIndex);
        }

        // alert(param.dataIndex+':'+option.series[0].data[param.dataIndex]);
    });

    //用于使chart自适应高度和宽度
    window.onresize = function () {
        //重置容器高宽
        resizeexcel();
        sevenChart.resize();
    };
}

function init_chart() {
    //柱状图部分
    var n = jo.detailList.length;
    var dataArr = [],
        scanData = [],//当日开瓶扫码量
        customerData = [],//当日消费者
        addData = [];//当日新增消费者
    for (var i = 0; i < n; i++) {
        var cityName = jo.detailList[i].city;
        if (cityName.length > 4) {
            cityName = cityName[0] + cityName[1] + cityName[2] + cityName[3];
        }
        dataArr.push(cityName);
        jo.detailList[i].scanCounts = jo.detailList[i].scanCounts.replace(/,/g, "");//取消字符串中出现的所有逗号
        scanData.push(jo.detailList[i].scanCounts);
        jo.detailList[i].userCounts = jo.detailList[i].userCounts.replace(/,/g, "");
        customerData.push(jo.detailList[i].userCounts);
        jo.detailList[i].newUserCounts = jo.detailList[i].newUserCounts.replace(/,/g, "");
        addData.push(jo.detailList[i].newUserCounts);
    }
    var dataRe = dataArr.reverse(),
        scanRe = scanData.reverse(),
        userRe = customerData.reverse(),
        addRe = addData.reverse();
    var excel = document.getElementById('excel');
    //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    var resizeexcel = function () {
        excel.style.width = window.innerWidth + 'px';
        // excel.style.height = n*35+'px';
        excel.style.height = n * 35 + 'px';
        if (n <= 7) {
            excel.style.height = n * 60 + 'px';
        }
    };
    //设置容器高宽
    resizeexcel();
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(excel);

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#ffffff',
            textStyle: {
                color: '#000000',
                align: 'left'
            },
            triggerOn: 'click',
            confine: true
        },
        legend: {
            data: [
                {
                    name: '用户扫码量',
                    icon: 'circle',
                    textStyle: {
                        color: '#e5e5e5'
                    },
                    backgroundColor: '#fcd91d'
                },
                {
                    name: '独立用户数',
                    icon: 'circle',
                    textStyle: {
                        color: '#e5e5e5'
                    },
                    backgroundColor: '#21cdb3'
                },
                {
                    name: '新增用户数',
                    icon: 'circle',
                    textStyle: {
                        color: '#e5e5e5'
                    },
                    backgroundColor: '#19b5ff'
                }
            ]
        },
        grid: {
            left: '15',
            right: '25',
            bottom: '0',
            top: '40',
            containLabel: true,
            backgroundColor: '#979797'
        },
        xAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#979797'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 10
                    }
                },
                splitLine: {
                    show: false
                },
                axisPointer: false
            },
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#979797'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 10
                    }
                },
                splitLine: {
                    show: false
                },
                axisPointer: false
            }
        ],
        yAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: {
                lineStyle: {
                    color: '#979797'
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 10
                }
            },
            axisTick: {
                alignWithLabel: true
            },
            axisPointer: false,
            data: dataRe
        },
        color: ['#fcd91d', '#21cdb3', '#19b5ff'],
        series: [
            {
                name: '用户扫码量',
                type: 'line',
                data: scanRe,
                xAxisIndex: 1,
                markPoint: {
                    animation: false
                }
            },
            {
                name: '独立用户数',
                type: 'bar',
                barWidth: '5',
                data: userRe,
                markPoint: {
                    animation: false
                }
            },
            {
                name: '新增用户数',
                type: 'bar',
                barWidth: '5',
                data: addRe,
                markPoint: {
                    animation: false
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //用于使chart自适应高度和宽度
    window.onresize = function () {
        //重置容器高宽
        resizeexcel();
        myChart.resize();
    };
}

function init_zone() {
    while (mon_list.hasChildNodes()) {
        mon_list.removeChild(mon_list.firstChild);
    }
    if (itemValue == 'false') {
        //地区表格部分
        var i = 0, lst = jo.detailList, l = lst.length;
        var params = {}, hs = [];
        for (i = 0; i < l; ++i) {
            params.rank = i + 1;
            var cityName = lst[i].city;

            if (cityName.length > 4) {
                cityName = cityName[0] + cityName[1] + cityName[2] + cityName[3] + '...';
            }
            params.city = cityName;
            lst[i].scanCounts = parseFloat(lst[i].scanCounts).toLocaleString();
            params.num = lst[i].scanCounts;//当日扫码
            lst[i].freshLev = parseFloat(lst[i].freshLev).toLocaleString();
            params.freshLev = lst[i].freshLev;//开瓶新鲜度
            params.numTotal = lst[i].allScans;//累计扫码
            params.customerTotal = lst[i].allCounts;
            mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
        }
        document.getElementsByClassName('else')[0].style.display = 'none';
        if (l > 4) {
            var li = mon_list.getElementsByTagName('li')[l - 4];
            li.style.borderTop = '1px solid #19b5fe';
        }
    } else {
        //地区表格部分
        var i = 0, lst = jo.detailList, l = lst.length;
        var params = {}, hs = [];
        for (i = 0; i < l; ++i) {
            params.rank = i + 1;
            var cityName = lst[i].city;
			if(cityName!='其他'){
				if (cityName.length > 4) {
				    cityName = cityName[0] + cityName[1] + cityName[2] + cityName[3] + '...';
				}
				params.city = cityName;
				lst[i].scanCounts = parseFloat(lst[i].scanCounts).toLocaleString();
				params.num = lst[i].scanCounts;//当日扫码
				lst[i].userCounts = parseFloat(lst[i].userCounts).toLocaleString();
				params.freshLev = lst[i].userCounts;//当日用户
				params.numTotal = lst[i].allScans;//累计扫码
				params.customerTotal = lst[i].allCounts;//
				mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
			}
        }
		//其他
		if(lst[l - 1].city=='其他'){
			dom_elseNum.innerHTML = parseFloat(lst[l - 1].scanCounts).toLocaleString();
			dom_elseCustomer.innerHTML = parseFloat(lst[l - 1].userCounts).toLocaleString();
			dom_elseNumTotal.innerHTML = lst[l - 1].allScans;
			dom_elseCustomerTotal.innerHTML = lst[l - 1].allCounts;
		}else{
			$('.else').css('display','none');
		}
		
        if (l > 4) {
            var li = mon_list.getElementsByTagName('li')[l - 4];
            li.style.borderTop = '1px solid #19b5fe';
        }
    }
}

//地区 itemValue == true
//地区sku itemValue == true && !jo.limitVpoints
//总部 itemValue == false && !jo.limitVpoints
function init_total() {
    //合计
    if (itemValue == 'false') {
        dom_totalCustomer.innerHTML = jo.allBean.freshLev;
        document.getElementsByClassName('return')[0].style.display = 'none';
        document.getElementById('freshName').innerHTML = '开瓶新鲜度';
    } else {
        dom_totalCustomer.innerHTML = jo.allBean.userCounts;
    }
    
    dom_totalNum.innerHTML = jo.allBean.scanCounts;
    dom_totalNumTotal.innerHTML = jo.allBean.allScans;
    dom_totalCustomerTotal.innerHTML = jo.allBean.allCounts;
    //最底部部分
    if (!jo.limitVpoints) {
        // document.getElementsByClassName('select4')[0].style.display = 'none';
        document.getElementsByClassName('select3')[0].style.marginBottom = '3rem';
    } else {
        document.getElementById('freshName').innerHTML = '当日用户数';
        // document.getElementsByClassName('select4')[0].style.display = 'block';
        // dom_surplusMoney.innerHTML = jo.limitVpoints;
        // dom_surplusDate.innerHTML = jo.limitDays;
    }
}

function loading(txt) {
    document.getElementById('inner').innerHTML = txt;
    document.getElementById('loadingToast').style.display = 'block';
}
function loaded() {
    document.getElementById('loadingToast').style.display = 'none';
}
function toast(txt) {
    $('#toast .weui_toast_content').html(txt);
    $('#toast').show();
    setTimeout(function () {
        $('#toast').hide();
    }, 2000);
}