// 'use strict';
var result = JSON.parse(sessionStorage.jo),
    queryDate = sessionStorage.queryDate;
var flag = true;
var colors = ['#c4eff6', '#28f4cf', '#3cc0fe', '#2857db', '#9ae5e0'],
    colorAreas = [{ //全部
        start: '#c5eff7',
        end: '#23292f'
    }, { //罐（经典）
        start: '#1af8cc',
        end: '#23292f'
    }, { //罐（其他）
        start: '#1f5774',
        end: '#23292f'
    }, { //瓶（经典）
        start: '#3a5299',
        end: '#23292f'
    }, { //瓶（其他）
        start: '#95ece0',
        end: '#23292f'
    }];
var dom_dayFresh = document.querySelector('#dayFresh'), //新鲜度
    dom_dayFreshP = document.querySelector('#dayFreshP'), //环比
    dom_icon = document.querySelector('#icon'), //up||down
    dom_lookDate = document.querySelector('#lookDate'), //日期
    dom_main = document.querySelector('.main'),
    dom_loading = document.querySelector('.loading'),
    dom_mask = document.querySelector('.mask');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
var resizeEcharts = function (c, n) { //c为放echarts的盒子,n为柱状图个数
    c.style.width = window.innerWidth + 'px';
    if (n <= 4) {
        c.style.height = n * 60 + 'px';
    } else {
        c.style.height = n * 45 + 'px';
    }
};

function init(res) { //页面初始化数据
    dom_dayFresh.textContent = res.dayFresh;
    dom_dayFreshP.textContent = res.dayFreshP;
    dom_lookDate.textContent = res.lookDate;
    if (res.dayFreshP.indexOf('-') == '-1') {
        dom_icon.src = '/v/FreshReport/img/up.png';
    } else {
        dom_icon.src = '/v/FreshReport/img/down.png';
    }
}

function trend(res, typename) { //一周新鲜度趋势
    var xData = [],
        yData = [],
        colorLine = '',
        colorAreaStart = '',
        colorAreaEnd = '';
    for (var i = 0; i < res.sdayDataList.length; i++) {
        xData[i] = res.sdayDataList[i].reportDate;
        yData[i] = res.sdayDataList[i].dayFresh;
    }
    switch (typename) {
        case '全部':
            colorLine = colors[0];
            colorAreaStart = colorAreas[0].start;
            colorAreaEnd = colorAreas[0].end;
            break;
        case '罐(经典)':
            colorLine = colors[1];
            colorAreaStart = colorAreas[1].start;
            colorAreaEnd = colorAreas[1].end;
            break;
        case '罐(其他)':
            colorLine = colors[2];
            colorAreaStart = colorAreas[2].start;
            colorAreaEnd = colorAreas[2].end;
            break;
        case '瓶(经典)':
            colorLine = colors[3];
            colorAreaStart = colorAreas[3].start;
            colorAreaEnd = colorAreas[3].end;
            break;
        case '瓶(其他)':
            colorLine = colors[4];
            colorAreaStart = colorAreas[4].start;
            colorAreaEnd = colorAreas[4].end;
            break;
        default:
            colorLine = colors[0];
            colorAreaStart = colorAreas[0].start;
            colorAreaEnd = colorAreas[0].end;
            break;
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echartsTrend'));
    // 指定图表的配置项和数据
    var option = {
        grid: {
            top: 10,
            bottom: 20
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(49,47,61,0.6)',
            textStyle: {
                color: '#00ffce',
                align: 'left'
            },
            triggerOn: 'click',
            confine: true,
            axisPointer: {
                type: 'none'
            },
            formatter: function (params) {
                var content = '<p style="text-align:left;margin:0;padding:0;font-size:14px;height:16px;line-height:16px;color:#b8bfc7;">' + params[0].name + '新鲜度</p><p style="text-align:left;margin:0;padding:0;font-size:14px;height:16px;line-height:16px;color:#b8bfc7;"><i style="width:14px;height:14px;background:#1bf8cd;"></i>' + typename + '：<span style="color:#ffffff;">' + params[0].value + '天（' + res.sdayDataList[params[0].dataIndex].dayFreshP + '）</span></p>'
                return content;
            }
        },
        xAxis: {
            axisLabel: {
                color: '#71757e'
            },
            axisLine: {
                lineStyle: {
                    color: '#71757e'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['#312f3c', '#2c2b38']
                }
            },
            data: xData
        },
        yAxis: {
            axisLabel: {
                color: '#71757e'
            },
            axisLine: {
                lineStyle: {
                    color: '#71757e'
                }
            },
            boundaryGap: ['0%', '200%']
        },
        series: [{
            name: '全部',
            type: 'line',
            symbol: 'pin',
            symbolSize: 0,
            lineStyle: {
                // color: '#1ef8cd'
                color: colorLine
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        // color: '#227269' // 0% 处的颜色
                        color: colorAreaStart // 0% 处的颜色
                    }, {
                        offset: 1,
                        // color: '#27333a' // 100% 处的颜色
                        color: colorAreaEnd // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            },
            data: yData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function sku(res) { //SKU排名
    var xData = [],
        yData = [],
        offset = '',
        size = '';
    for (var i = 0; i < res.typeDataList.length; i++) {
        xData[i] = res.typeDataList[i].dayFresh;
        yData[i] = res.typeDataList[i].itemName;
        if (res.typeDataList[i].itemName.length >= 6) {
            offset = '20%';
            size = '10';
        } else {
            offset = '18%';
            size = '12';
        }
    }
    var c = document.getElementById('echartsSku');
    //重置容器高宽
    resizeEcharts(c, res.typeDataList.length);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(c);
    // 指定图表的配置项和数据
    var option = {
        grid: {
            top: 30,
            left: offset,
            bottom: 20
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#312f3d',
            textStyle: {
                color: '#00ffce',
                align: 'left'
            },
            triggerOn: 'click',
            confine: true,
            axisPointer: {
                type: 'none'
            },
            formatter: function (params) {
                // console.log(params);
                var content = '<p style="text-align:left;height:16px;line-height:16px;font-size:12px;margin:0;padding:0;"><i style="display:inline-block;width:10px;height:10px;background:#00fecc;border-radius:50%;margin-right:5px;"></i><span style="color:#00fecc;">' + params[0].name.replace('#', '') + '</span></p><p style="text-align:left;height:16px;line-height:16px;font-size:12px;margin:0;padding:0;color:#b8bfc9;">' + queryDate + '</p><p style="text-align:left;height:16px;line-height:16px;font-size:12px;margin:0;padding:0;color:#b8bfc9;">新鲜度：<span style="color:#ffffff">' + params[0].data + '天（' + res.typeDataList[params[0].dataIndex].dayFreshP + '）</span></p>'
                return content;
            }
        },
        xAxis: {
            position: 'top',
            axisLabel: {
                color: '#71757e'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#71757e'
                },
                show: true
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['#312f3c', '#2c2b38']
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            axisLabel: {
                color: '#71757e',
                fontSize: size,
                formatter: function (value, index) {
                    if (value.length >= 6) {
                        if (value.indexOf('#') != -1) { //包含#
                            value = value.replace('#', '\n');
                        } else {
                            value = value.substring(0, 3) + '\n' + value.substring(4, value.length);
                        }
                    }
                    return value;
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#71757e'
                },
                show: true
            },
            data: yData
        },
        series: [{
            name: '新鲜度',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0,
                        color: '#19b5fe' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#00ffcc' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            },
            data: xData
        }]
    };
    myChart.setOption(option);
    //用于使chart自适应高度和宽度
    myChart.resize();
}

function skuList(res) { //sku排名列表
    $('.main').empty();
    for (var i = 0; i < res.typeDataList.length; i++) {
        var content = null,
            itemValue = null,
            skuKey = null,
            freshType = null;
        if (res.typeDataList[i].itemValue) { //详细sku
            itemValue = res.typeDataList[i].itemValue;
            skuKey = res.typeDataList[i].itemKey;
            freshType = '';
        } else { //瓶罐（经典、其他）
            itemValue = '';
            skuKey = '';
            freshType = res.typeDataList[i].itemKey;
        }
        res.typeDataList[i].itemName = res.typeDataList[i].itemName.replace('#', '');
        content = template
            .replace('{{num}}', i + 1)
            .replace('{{itemName}}', res.typeDataList[i].itemName)
            .replace('{{dayFresh}}', res.typeDataList[i].dayFresh)
            .replace('{{itemValue}}', itemValue)
            .replace('{{skuKey}}', skuKey)
            .replace('{{freshType}}', freshType)
            .replace('{{itemName}}', res.typeDataList[i].itemName);
        dom_main.insertAdjacentHTML('beforeend', content);
    }
    var btns = document.querySelectorAll('.ck');
    for (var i = 0; i < btns.length; i++) {
        (function (i) {
            btns[i].addEventListener('click', function () {
                ck(btns[i].getAttribute('itemValue'), btns[i].getAttribute('skuKey'), btns[i].getAttribute('freshType'), btns[i].getAttribute('itemName'));
            });
        })(i);
    }
}

function ck(itemValue, skuKey, freshType, itemName) {
    var url = '';
    if (freshType != '') { //总体数据
        url = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getFreshByType.do?queryDate=' + queryDate + '&freshType=' + freshType;
    } else { //详细sku数据
        url = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getFreshBySku.do?queryDate=' + queryDate + '&itemValue=' + itemValue + '&skuKey=' + skuKey;
    }
    loading();
    dom_mask.style.display = 'block';
    $.ajax({
        async: true,
        type: "GET",
        url: url,
        success: function (jo) {
            loaded();
            var res = JSON.parse(jo);
            // console.log(res);
            mask(res, itemName);
            $('.maskClose').css('display', 'block');
            $('.maskClose').on('click', function () {
                $('.maskClose').unbind();
                $('.mask').css('display', 'none');
                $('.legend').css('display', 'none');
            });
        },
        error: function () {
            console.log('总体数据请求接口出错');
        }
    });
}

function mask(res, itemName) {
    var xData = [],
        yData = [],
        title = '';
    for (var i = 0; i < res.length; i++) {
        xData[i] = res[i].reportDate;
        yData[i] = res[i].dayFresh;
    }
    title = itemName;
    $('.legendHtml').text(title);
    $('.legend').css('display', 'block');
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echartsMask'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#312f3d',
            textStyle: {
                color: '#00ffce',
                align: 'left'
            },
            triggerOn: 'click',
            confine: true,
            axisPointer: {
                type: 'none'
            },
            formatter: function (params) {
                // console.log(params);
                var content = '<p style="font-size:14px;height:14px;line-height:14px;color:#b8bfc7;">' + params[0].name + '</p><p style="font-size:14px;height:14px;line-height:14px;color:#b8bfc7;">新鲜度：<span style="color:#ffffff;">' + params[0].value + '天</span></p>'
                return content;
            }
        },
        grid: {
            top: 10,
            bottom: 20
        },
        color: [
            '#1ef7cc',
            '#99ece2',
            '#3ac0fd',
            '#c4eff6',
            '#2a56db'
        ],
        xAxis: {
            axisLabel: {
                color: '#71757e'
            },
            axisLine: {
                lineStyle: {
                    color: '#71757e'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['#312f3c', '#2c2b38']
                }
            },
            data: xData
        },
        yAxis: {
            axisLabel: {
                color: '#71757e'
            },
            axisLine: {
                lineStyle: {
                    color: '#71757e'
                }
            },
            boundaryGap: ['0', '200%']
        },
        series: [{
            name: '全部',
            type: 'line',
            symbol: 'pin',
            symbolSize: 0,
            lineStyle: {
                color: '#1ef8cd'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#227269' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#27333a' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            },
            data: yData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function nav(res) { //导航栏初始化
    var controlFlag = true,
        skuArr = [];
    $('.close').on('click', function () {
        if (controlFlag) {
            $('.content').css('display', 'block');
            $('#toTop').css('top', '270px');
            $('.close').css('transform', 'translate(-50%,-50%) rotate(-45deg)');
            controlFlag = false;
        } else {
            $('.content').css('display', 'none');
            $('#toTop').css('top', '170px');
            $('.close').css('transform', 'translate(-50%,-50%) rotate(0deg)');
            controlFlag = true;
        }
    });
    $('.wrap').on('click', function () {
        if (!controlFlag) {
            $('.content').css('display', 'none');
            $('#toTop').css('top', '170px');
            $('.close').css('transform', 'translate(-50%,-50%) rotate(0deg)');
            controlFlag = true;
        }
    });
    $('.all').on('click', function () {
        trend(result, '全部');
        sku(result);
        skuList(result);
        $('.skuTitle1').text('品种');
        $('.skuTitle2').text('品种');
    });

    get_sku(res);

    function get_sku(res) { //获取该区域所有sku并布局
        /*
        1.获取sku个数
        2.在80deg内进行等分获取等分的角度
        3.将每个sku旋转该角度，平移半径距离，在旋转该角度(60_-20之间)
         */
        // console.log(res);
        var myList = res.typeList;
        var _typeName = [];
        for (var i = 0; i < myList.length; i++) {
            var createP = $('<p class="myP">' + myList[i].typeName + '</p>');
            $('.content').append(createP);
            skuArr[i] = myList[i].freshType;
            _typeName[i] = myList[i].typeName;
        }
        var myP = document.getElementsByClassName('myP');
        var myN = myP.length;
        var average = 120 / myN;
        var initNum = 60;
        for (var i = 0; i < myP.length; i++) {
            myP[i].classList.add('events');
            if (initNum == 60) {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-100px) rotateZ(' + (-initNum) + 'deg)';
            } else if (initNum < 0) {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-80px) rotateZ(' + (-initNum) + 'deg)';
            } else {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-95px) rotateZ(' + (-initNum) + 'deg)';
            }
            initNum = initNum - average;
            (function (i) { //闭包
                myP[i].addEventListener('click', function () {
                    loading();
                    $('.skuTitle1').text('SKU排名');
                    $('.skuTitle2').text('SKU名称');
                    var myskuKey = skuArr[i];
                    var requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getFreshData.do?queryDate=' + queryDate + '&freshType=' + myskuKey;
                    if (flag) {
                        myajax(requrl, _typeName[i]);
                    }
                }, false);
            })(i);
        }
    }
}

function myajax(requrl, typename) {
    flag = false;
    $.ajax({
        async: true,
        type: "GET",
        url: requrl,
        success: function (r) {
            var s = JSON.parse(r);
            trend(s, typename);
            sku(s);
            skuList(s);
            // console.log(s);
            loaded();
            flag = true;
        },
        error: function () {
            console.log('总体数据请求接口出错');
        }
    });
}

function loading() {
    dom_loading.style.display = 'block';
}

function loaded() {
    dom_loading.style.display = 'none';
}

var template = `
    <li>
        <span>{{num}}</span>
        <span>{{itemName}}</span>
        <span>{{dayFresh}}</span>
        <span class="ck" itemValue="{{itemValue}}" skuKey="{{skuKey}}" freshType="{{freshType}}" itemName="{{itemName}}">查看</span>
    </li>
`;

init(result);
trend(result, '全部');
sku(result);
skuList(result);
nav(result);