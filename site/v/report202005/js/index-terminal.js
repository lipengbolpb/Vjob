function terminalPartFn() {
    var res = sessionStorage.t_jo ? JSON.parse(sessionStorage.t_jo) : {},
    queryDate = sessionStorage.queryDate,
    company = sessionStorage.company,
    type = sessionStorage.type;
//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeEcharts(c, n) { //c为放echarts的盒子,n为柱状图个数
    c.style.width = window.innerWidth + 'px';
    if (n <= 4) {
        c.style.height = n * 60 + 'px';
    } else {
        c.style.height = n * 50 + 'px';
    }
};

function t_base(flag) {
    if (res) {
        if (flag) { //箱码
            var dom_tr = document.querySelector('#report-terminal .basic_box').querySelectorAll('tr');
            document.querySelectorAll('#report-terminal .itemName')[0].textContent = res.itemName;
            document.querySelectorAll('#report-terminal .itemName')[1].textContent = res.itemName;
            dom_tr[0].querySelectorAll('td')[1].textContent = queryDate;
            dom_tr[1].querySelectorAll('td')[1].textContent = (res.scanCount == undefined ? '0' : res.scanCount) + '箱' + '(' + (res.scanCountP == undefined ? '0' : res.scanCountP) + ')'; //当日消费箱数
            dom_tr[1].querySelectorAll('td')[2].textContent = (res.scanCountAll == undefined ? '0' : res.scanCountAll) + '箱'; //累计消费箱数
            dom_tr[2].querySelectorAll('td')[1].textContent = (res.moneyCount == undefined ? '0' : res.moneyCount) + '元' + '(' + (res.moneyCountP == undefined ? '0' : res.moneyCountP) + ')'; //当日消费金额
            dom_tr[2].querySelectorAll('td')[2].textContent = (res.moneyCountAll == undefined ? '0' : res.moneyCountAll) + '元'; //累计消费金额
            dom_tr[3].querySelectorAll('td')[1].textContent = (res.terminalCount == undefined ? '0' : res.terminalCount) + '个' + '(' + (res.terminalCountP == undefined ? '0' : res.terminalCountP) + ')'; //当日参与终端
            dom_tr[3].querySelectorAll('td')[2].textContent = (res.terminalCountAll == undefined ? '0' : res.terminalCountAll) + '个'; //累计参与终端
            dom_tr[4].querySelectorAll('td')[1].textContent = (res.newTerminalCount == undefined ? '0' : res.newTerminalCount) + '个' + '(' + (res.newTerminalCountP == undefined ? '0' : res.newTerminalCountP) + ')'; //当日新增终端
            dom_tr[4].querySelectorAll('td')[2].textContent = (res.newTerminalCountAll == undefined ? '0' : res.newTerminalCountAll) + '个'; //累计新增终端
            dom_tr[5].querySelectorAll('td')[1].textContent = (res.vpointsCount == undefined ? '0' : res.vpointsCount) + '分' + '(' + (res.vpointsCountP == undefined ? '0' : res.vpointsCountP) + ')'; //当日中出积分
            dom_tr[5].querySelectorAll('td')[2].textContent = (res.vpointsCountAll == undefined ? '0' : res.vpointsCountAll) + '分'; //累计中出积分
            dom_tr[6].querySelectorAll('td')[1].textContent = (res.usedVpointsCount == undefined ? '0' : res.usedVpointsCount) + '分' + '(' + (res.usedVpointsCountP == undefined ? '0' : res.usedVpointsCountP) + ')'; //当日兑出积分
            dom_tr[6].querySelectorAll('td')[2].textContent = (res.usedVpointsCountAll == undefined ? '0' : res.usedVpointsCountAll) + '分'; //累计兑出积分
            dom_tr[7].querySelectorAll('td')[1].textContent = (res.singleMoney == undefined ? '0' : res.singleMoney) + '元' + '(' + (res.singleMoneyP == undefined ? '0' : res.singleMoneyP) + ')'; //当日单箱费用
            dom_tr[7].querySelectorAll('td')[2].textContent = (res.singleMoneyAll == undefined ? '0' : res.singleMoneyAll) + '元'; //累计单箱费用
            dom_tr[8].querySelectorAll('td')[1].textContent = (res.singleVpoints == undefined ? '0' : res.singleVpoints) + '分' + '(' + (res.singleVpointsP == undefined ? '0' : res.singleVpointsP) + ')'; //当日单箱积分
            dom_tr[8].querySelectorAll('td')[2].textContent = (res.singleVpointsAll == undefined ? '0' : res.singleVpointsAll) + '分'; //累计单箱积分
        } else { //盖码
            var dom_tr = document.querySelector('.basic_lid').querySelectorAll('tr');
            document.querySelectorAll('.itemName')[0].textContent = res.itemName;
            document.querySelectorAll('.itemName')[1].textContent = res.itemName;
            dom_tr[0].querySelectorAll('td')[1].textContent = queryDate;
            dom_tr[1].querySelectorAll('td')[1].textContent = res.scanCount + '瓶' + '(' + res.scanCountP + ')'; //当日消费箱数
            dom_tr[1].querySelectorAll('td')[2].textContent = res.scanCountAll + '瓶'; //累计消费箱数
            dom_tr[2].querySelectorAll('td')[1].textContent = res.moneyCount + '元' + '(' + res.moneyCountP + ')'; //当日消费金额
            dom_tr[2].querySelectorAll('td')[2].textContent = res.moneyCountAll + '元'; //累计消费金额
            dom_tr[3].querySelectorAll('td')[1].textContent = res.terminalCount + '个' + '(' + res.terminalCountP + ')'; //当日参与终端
            dom_tr[3].querySelectorAll('td')[2].textContent = res.terminalCountAll + '个'; //累计参与终端
            dom_tr[4].querySelectorAll('td')[1].textContent = res.userCount + '人' + '(' + res.userCountP + ')'; //当日参与人数
            dom_tr[4].querySelectorAll('td')[2].textContent = res.userCountAll + '人'; //累计参与人数
            dom_tr[5].querySelectorAll('td')[1].textContent = res.newUserCount + '人' + '(' + res.newUserCountP + ')'; //当日新增人数
            dom_tr[5].querySelectorAll('td')[2].textContent = res.newUserCountAll + '人'; //累计新增人数
            dom_tr[6].querySelectorAll('td')[1].textContent = res.singleMoney + '元' + '(' + res.singleMoneyP + ')'; //当日单瓶费用
            dom_tr[6].querySelectorAll('td')[2].textContent = res.singleMoneyAll + '元'; //累计单瓶费用
        }
    }
}

function t_trend(flag) { //7天扫码趋势表
    var yDataBox = [],
        yDataNum = [],
        yDataMoney = [],
        yDataPoint = [],
        xData = [],
        seriesData = [];
    var l = res.sevenDayList.length;
    for (var i = 0; i < l; i++) {
        if (flag) { //箱码
            yDataBox[i] = res.sevenDayList[i].scanCount.replace(',', ''); //消费箱数
            yDataNum[i] = res.sevenDayList[i].terminalCount.replace(',', ''); //终端数量
            yDataMoney[i] = res.sevenDayList[i].moneyCount.replace(',', ''); //消费金额
            yDataPoint[i] = res.sevenDayList[i].vpointsCount.replace(',', ''); //中出积分
            xData[i] = res.sevenDayList[i].reportDate + res.sevenDayList[i].weekDay;
            seriesData = ['终端数量', '消费箱数', '消费金额', '中出积分'];
            $('#report-terminal .legend').find('p').eq(0).html('<span></span>消费箱数');
            $('#report-terminal .legend').find('p').eq(3).html('<span></span>中出积分');
        } else { //盖码
            /**
             * 2018.9.12 盖码：消费瓶数与消费金额放到一个坐标轴，终端个数与参与人数放到一个坐标
             */
            yDataBox[i] = res.sevenDayList[i].scanCount.replace(',', ''); //消费瓶数
            yDataMoney[i] = res.sevenDayList[i].moneyCount.replace(',', ''); //消费金额

            yDataNum[i] = res.sevenDayList[i].terminalCount.replace(',', ''); //终端数量
            yDataPoint[i] = res.sevenDayList[i].userCount.replace(',', ''); //参与人数

            xData[i] = res.sevenDayList[i].reportDate + res.sevenDayList[i].weekDay;
            seriesData = ['消费瓶数', '消费金额', '参与终端', '参与人数'];
            $('#report-terminal .legend').find('p').eq(0).html('<span></span>消费瓶数');
            $('#report-terminal .legend').find('p').eq(3).html('<span></span>参与人数');
        }
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('trend'));
    // 指定图表的配置项和数据
    var option = {
        grid: {
            left: 50,
            right: 50
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0)',
            textStyle: {
                color: '#ffffff',
                align: 'left'
            },
            triggerOn: 'click',
            confine: true,
            axisPointer: {
                lineStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            formatter: function (params) {
                t_tool(params[0].dataIndex, flag);
            }
        },
        xAxis: {
            axisLabel: {
                color: function (value, index) {
                    return value.indexOf('周六') != -1 ? '#f7bc1e' : value.indexOf('周日') != -1 ? '#f7bc1e' : '#b1b1b1';
                },
                // color: '#b1b1b1',
                formatter: function (params) {
                    var contant = params.substr(0, 5) + '\n' + params.substr(5, 2);
                    return contant;
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#71757e'
                }
            },
            data: xData
        },
        yAxis: [{
                axisLabel: {
                    color: '#b1b1b1'
                },
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#949494'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#949494'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#949494'
                    }
                },
                boundaryGap: ['0%', '5000%']
            },
            {
                axisLabel: {
                    color: '#b1b1b1'
                },
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#949494'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#949494'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#949494'
                    }
                },
                boundaryGap: ['0%', '50%']
            }
        ],
        series: [{
            name: seriesData[0],
            type: 'bar',
            itemStyle: {
                color: '#19b5fe'
            },
            yAxisIndex: 1,
            label: {
                show: true,
                position: 'top',
                distance: 5
            },
            data: yDataBox
        }, {
            name: seriesData[1],
            type: 'line',
            itemStyle: {
                color: '#20ceb3'
            },
            lineStyle: {
                color: '#20ceb3'
            },
            yAxisIndex: 1,
            data: yDataMoney
        }, {
            name: seriesData[2],
            type: 'bar',
            itemStyle: {
                color: '#f7bc1e'
            },
            label: {
                show: true,
                position: 'top',
                distance: 5
            },
            data: yDataNum
        }, {
            name: seriesData[3],
            type: 'line',
            itemStyle: {
                color: '#ffffff'
            },
            lineStyle: {
                color: '#ffffff'
            },
            data: yDataPoint
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    t_tool(l - 1, flag);
}

function t_tool(i, flag) {
    // 右上角详情部分
    // 日期
    var nowDate = res.sevenDayList[i].reportDate.substr(0, 2) + '月' + res.sevenDayList[i].reportDate.substr(3, 2) + '日';
    if (flag) {
        $('#report-terminal #tool_date').html(nowDate + '&nbsp;&nbsp;' + res.sevenDayList[i].weekDay);
        // 消费箱数
        $('#report-terminal #tool_box').html('<span></span>消费箱数 / 箱：' + res.sevenDayList[i].scanCount + '(' + res.sevenDayList[i].scanCountP + ')');
        // 消费金额
        $('#report-terminal #tool_money').html('<span></span>消费金额 / 元：' + res.sevenDayList[i].moneyCount + '(' + res.sevenDayList[i].moneyCountP + ')');
        // 终端数量
        $('#report-terminal #tool_num').html('<span></span>参与终端 / 个：' + res.sevenDayList[i].terminalCount + '(' + res.sevenDayList[i].terminalCountP + ')');
        // 中出积分
        $('#report-terminal #tool_point').html('<span></span>中出积分 / 分：' + res.sevenDayList[i].vpointsCount + '(' + res.sevenDayList[i].vpointsCountP + ')');
    } else {
        $('#report-terminal #tool_date').html(nowDate + '&nbsp;&nbsp;' + res.sevenDayList[i].weekDay);
        // 消费箱数
        $('#report-terminal #tool_box').html('<span></span>消费瓶数 / 瓶：' + res.sevenDayList[i].scanCount + '(' + res.sevenDayList[i].scanCountP + ')');
        // 消费金额
        $('#report-terminal #tool_money').html('<span></span>消费金额 / 元：' + res.sevenDayList[i].moneyCount + '(' + res.sevenDayList[i].moneyCountP + ')');
        // 终端数量
        $('#report-terminal #tool_num').html('<span></span>参与终端 / 个：' + res.sevenDayList[i].terminalCount + '(' + res.sevenDayList[i].terminalCountP + ')');
        // 中出积分
        $('#report-terminal #tool_point').html('<span></span>参与人数 / 人：' + res.sevenDayList[i].userCount + '(' + res.sevenDayList[i].userCountP + ')');
    }
}

function t_rank(flag) {
    // var nowDate = queryDate.substr(5, 2) + '月' + queryDate.substr(8, 2) + '日';
    if (flag) { //箱码
        $('#report-terminal .rank .title').text('二级区域当日排名');
    } else { //盖码
        $('#report-terminal .rank .title').text('二级区域当日排名');
    }
    var yData = [],
        xDataBox = [],
        xDataPoint = [],
        xDataMoney = [],
        xDataNum = [],
        seriesData = [];
    var l = res.countyList.length - 1;
    for (var i = 0; i < l; i++) {
        if (flag) { //箱码
            yData[i] = res.countyList[i].county;
            xDataBox[i] = res.countyList[i].scanCount.replace(',', '');
            xDataPoint[i] = res.countyList[i].vpointsCount.replace(',', '');
            xDataMoney[i] = res.countyList[i].moneyCount.replace(',', '');
            xDataNum[i] = res.countyList[i].terminalCount.replace(',', '');
            seriesData = ['消费箱数', '中出积分', '消费金额', '参与终端'];
        } else { //盖码
            yData[i] = res.countyList[i].county;
            xDataBox[i] = res.countyList[i].scanCount.replace(',', '');
            xDataPoint[i] = res.countyList[i].userCount.replace(',', '');
            xDataMoney[i] = res.countyList[i].moneyCount.replace(',', '');
            xDataNum[i] = res.countyList[i].terminalCount.replace(',', '');
            seriesData = ['消费瓶数', '参与人数', '消费金额', '参与终端'];
        }
    }
    //翻转，从高往低排
    yData.reverse();
    xDataBox.reverse();
    xDataPoint.reverse();
    xDataMoney.reverse();
    xDataNum.reverse();
    //重置容器高宽
    resizeEcharts(document.getElementById('rank'), res.countyList.length - 1);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('rank'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#3e3e3e',
            textStyle: {
                color: '#ffffff',
                align: 'left'
            },
            triggerOn: 'click',
            confine: true,
            axisPointer: {
                lineStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            formatter: function (params) {
                if (flag) {
                    var content = '<p class="toolTipP"><img src="img/icon-address.png" class="toolTipPIco">' + params[0].name + '&nbsp;&nbsp;</p>' +
                        '<p class="toolTipP"><span class="circle" style="background:#20ceb3;"></span>消费箱数 / 箱：' + params[0].value + '&nbsp;&nbsp;</p>' +
                        '<p class="toolTipP"><span class="circle" style="background:#fcd91d;"></span>消费金额 / 元：' + params[2].value + '&nbsp;&nbsp;</p>' +
                        '<p class="toolTipP"><span class="circle" style="background:#19b5fe;"></span>参与终端 / 个：' + params[3].value + '&nbsp;&nbsp;</p>' +
                        '<p class="toolTipP"><span class="circle" style="background:#ffffff;"></span>中出积分 / 分：' + params[1].value + '&nbsp;&nbsp;</p>';
                } else {
                    var content = '<p class="toolTipP"><img src="img/icon-address.png" class="toolTipPIco">' + params[0].name + '&nbsp;&nbsp;</p>' +
                        '<p class="toolTipP"><span class="circle" style="background:#20ceb3;"></span>消费瓶数 / 瓶：' + params[0].value + '&nbsp;&nbsp;</p>' +
                        '<p class="toolTipP"><span class="circle" style="background:#fcd91d;"></span>消费金额 / 元：' + params[2].value + '&nbsp;&nbsp;</p>' +
                        '<p class="toolTipP"><span class="circle" style="background:#19b5fe;"></span>参与终端 / 个：' + params[3].value + '&nbsp;&nbsp;</p>' +
                        '<p class="toolTipP"><span class="circle" style="background:#ffffff;"></span>参与人数 / 人：' + params[1].value + '&nbsp;&nbsp;</p>';
                }
                return content;
            }
        },
        legend: {
            itemWidth: 10, //图形标记宽度
            selectedMode: false,
            data: [{
                    name: seriesData[0],
                    icon: 'circle',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                {
                    name: seriesData[1],
                    icon: 'circle',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                {
                    name: seriesData[2],
                    icon: 'circle',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                {
                    name: seriesData[3],
                    icon: 'circle',
                    textStyle: {
                        color: '#ffffff'
                    }
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
        xAxis: [{
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
                // boundaryGap: ['0%', '50%']
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
                    show: true,
                    lineStyle: {
                        color: '#979797'
                    }
                },
                axisPointer: false
                // boundaryGap: ['0%', '100%']
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
            // axisPointer: false,
            data: yData
        },
        color: ['#20ceb3', '#ffffff', '#fcd91d', '#19b5fe'],
        series: [{
                name: seriesData[0],
                type: 'bar',
                barWidth: '8',
                data: xDataBox
            }, {
                name: seriesData[1],
                type: 'line',
                data: xDataPoint,
                xAxisIndex: 1
            }, {
                name: seriesData[2],
                type: 'line',
                data: xDataMoney,
                xAxisIndex: 1
            },
            {
                name: seriesData[3],
                type: 'bar',
                barWidth: '8',
                data: xDataNum
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //用于使chart自适应高度和宽度
    window.onresize = function () {
        //重置容器高宽
        // resizeexcel();
        myChart.resize();
    };
}

function t_detail(flag) { //明细表格
    $('#report-terminal .sub').empty();
    // var nowDate = queryDate.substr(5, 2) + '月' + queryDate.substr(8, 2) + '日';
    if (flag) {
        $('#report-terminal .subTitle').text('二级区域当日明细');
        $('#report-terminal .sub').append('<tr>' +
            '<td>排名</td>' +
            '<td>二级区域</td>' +
            '<td>消费箱数（箱）</td>' +
            '<td>消费金额（元）</td>' +
            '<td>参与终端（个）</td>' +
            '<td>中出积分（分）</td>' +
            '</tr>');
    } else {
        $('#report-terminal .subTitle').text('二级区域当日明细');
        $('#report-terminal .sub').append('<tr>' +
            '<td>排名</td>' +
            '<td>二级区域</td>' +
            '<td>消费瓶数（瓶）</td>' +
            '<td>消费金额（元）</td>' +
            '<td>参与终端（个）</td>' +
            '<td>参与人数（人）</td>' +
            '</tr>');
    }
    if (res) {
        var template = '<tr>' +
            '<td>{{num}}</td>' +
            '<td>{{county}}</td>' +
            '<td>{{scanCount}}</td>' +
            '<td>{{moneyCount}}</td>' +
            '<td>{{terminalCount}}</td>' +
            '<td>{{vpointsCount}}</td>' +
            '</tr>';
        var l = res.countyList.length - 1;
        if (flag) {
            for (var i = 0; i < l; i++) {
                var tpl = template.replace('{{num}}', i + 1)
                    .replace('{{county}}', res.countyList[i].county)
                    .replace('{{scanCount}}', res.countyList[i].scanCount)
                    .replace('{{moneyCount}}', res.countyList[i].moneyCount)
                    .replace('{{terminalCount}}', res.countyList[i].terminalCount)
                    .replace('{{vpointsCount}}', res.countyList[i].vpointsCount);
                $('#report-terminal .sub').append(tpl);
            }
            var tplLast = template.replace('{{num}}', '')
                .replace('{{county}}', '合计')
                .replace('{{scanCount}}', res.countyList[l].scanCount)
                .replace('{{moneyCount}}', res.countyList[l].moneyCount)
                .replace('{{terminalCount}}', res.countyList[l].terminalCount)
                .replace('{{vpointsCount}}', res.countyList[l].vpointsCount);
            $('#report-terminal .sub').append(tplLast);
            $('#report-terminal .limitVpoints').text(res.limitVpoints);
            $('#report-terminal .limitDay').text(res.limitDay);
        } else {
            for (var i = 0; i < l; i++) {
                var tpl = template.replace('{{num}}', i + 1)
                    .replace('{{county}}', res.countyList[i].county)
                    .replace('{{scanCount}}', res.countyList[i].scanCount)
                    .replace('{{moneyCount}}', res.countyList[i].moneyCount)
                    .replace('{{terminalCount}}', res.countyList[i].terminalCount)
                    .replace('{{vpointsCount}}', res.countyList[i].userCount);
                $('#report-terminal .sub').append(tpl);
            }
            var tplLast = template.replace('{{num}}', '')
                .replace('{{county}}', '合计')
                .replace('{{scanCount}}', res.countyList[l].scanCount)
                .replace('{{moneyCount}}', res.countyList[l].moneyCount)
                .replace('{{terminalCount}}', res.countyList[l].terminalCount)
                .replace('{{vpointsCount}}', res.countyList[l].userCount);
            $('#report-terminal .sub').append(tplLast);
            $('#report-terminal .limitVpoints').text(res.limitVpoints);
            $('#report-terminal .limitDay').text(res.limitDay);
        }
    }
}

function t_calMax(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) { // 求出一组数组中的最大值
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    var maxint = Math.ceil(max / 10); // 向上取整
    var maxval = maxint * 10; // 最终设置的最大值
    return maxval; // 输出最大值
}

function t_skuList() { //sku列表
    $('#report-terminal .skulist').empty();
    $('#report-terminal .skulist').append('<tr>' +
        '<td>SKU名称</td>' +
        '<td>扫码量</td>' +
        '<td>金额</td>' +
        '<td>用户</td>' +
        '<td>新增用户</td>' +
        '</tr>');
    // console.log(res);
    var template = '<tr>' +
        '<td>{{itemName}}</td>' +
        '<td>{{scanCounts}}</td>' +
        '<td>{{vpointsCounts}}</td>' +
        '<td>{{userCounts}}</td>' +
        '<td>{{newUserCounts}}</td>' +
        '</tr>';
    var o = res.skuList;
    var l = o.length;
    for (var i = 0; i < l; i++) {
        if (o[i].itemName.length >= 15) {
            o[i].itemName = o[i].itemName.substr(0, 15) + '...';
        }
        var tpl = template.replace('{{itemName}}', o[i].itemName)
            .replace('{{scanCounts}}', o[i].scanCounts)
            .replace('{{vpointsCounts}}', o[i].vpointsCounts)
            .replace('{{userCounts}}', o[i].userCounts)
            .replace('{{newUserCounts}}', o[i].newUserCounts);
        $('#report-terminal .skulist').append(tpl);
    }
    $('#report-terminal .skulist').removeClass('hidden');
}

function t_loading(txt) {
    $('#loadingToast .weui_toast_content').html(txt);
    $('#loadingToast').show();
}

function t_loaded() {
    $('#loadingToast').hide();
}

function t_init(flag) {
    console.log(flag);
    t_base(flag);
    t_trend(flag);
    t_rank(flag);
    t_detail(flag);
}


// if (type == '1') {
//     t_init(true);
//     if (res.skuList) {
//         t_skuList();
//         $('#report-terminal .skulist,.skulistTitle').removeClass('hidden');
//     } else {
//         $('#report-terminal .skulist,.skulistTitle').addClass('hidden');
//     }
//     $('#btn_box').css({
//         'background': '#19b5fe url(img/header-box-selected.png) no-repeat 1rem 50%/0.6rem auto',
//         'color': '#ffffff'
//     });
//     $('#btn_lid').css({
//         'background': 'url(img/header-lid.png) no-repeat 1rem 50%/0.6rem auto',
//         'color': '#98999a'
//     });
//     $('#report-terminal .basic_lid').addClass('hidden'); //隐藏箱码
//     $('#report-terminal .basic_box').removeClass('hidden'); //显示盖码
// } else if (type == '2') {
    t_init(false);
    if (res.skuList) {
        t_skuList();
        $('#report-terminal .skulist,.skulistTitle').removeClass('hidden');
    } else {
        $('#report-terminal .skulist,.skulistTitle').addClass('hidden');
    }
    // $('#btn_box').css({
    //     'background': 'url(img/header-box.png) no-repeat 1rem 50%/0.6rem auto',
    //     'color': '#98999a'
    // });
    // $('#btn_lid').css({
    //     'background': '#19b5fe url(img/header-lid-selected.png) no-repeat 1rem 50%/0.6rem auto',
    //     'color': '#ffffff'
    // });
    $('#report-terminal .basic_box').addClass('hidden'); //隐藏箱码
    $('#report-terminal .basic_lid').removeClass('hidden'); //显示盖码
}
// }