function skuPartFn() {
    'use strict'
    var base_dom = document.querySelector('#report-sku');
    var dom_address = base_dom.querySelector('#address'), //地区
        dom_date = base_dom.querySelector('#date'), //日期
        dom_bottle = base_dom.querySelector('#bottle'), //当日开瓶扫码量
        dom_bottleTotal = base_dom.querySelector('#bottleTotal'), //累计开瓶扫码量
        dom_money = base_dom.querySelector('#money'), //当日返利金额
        dom_moneyTotal = base_dom.querySelector('#moneyTotal'), //累计返利金额
        dom_customer = base_dom.querySelector('#customer'), //当日扫码消费者
        dom_customerTotal = base_dom.querySelector('#customerTotal'), //累计扫码消费者
        dom_add = base_dom.querySelector('#add'), //当日新增消费者
        dom_addTotal = base_dom.querySelector('#addTotal'), //累计新增消费者
        dom_average = base_dom.querySelector('#average'), //当日人均消费瓶数
        dom_averageTotal = base_dom.querySelector('#averageTotal'), //累计人均消费瓶数
        dom_fresh = base_dom.querySelector('#fresh'), //新鲜度
        dom_freshTotal = base_dom.querySelector('#freshTotal'), //累计新鲜度
        dom_surplusMoney = base_dom.querySelector('#surplusMoney'), //账户剩余金额
        dom_surplusDate = base_dom.querySelector('#surplusDate'), //账户剩余天数
        dom_elseNum = base_dom.querySelector('#elseNum'), //其他当日扫码量
        dom_elseCustomer = base_dom.querySelector('#elseCustomer'), //其他当日消费者
        dom_elseNumTotal = base_dom.querySelector('#elseNumTotal'), //其他累计扫码量
        dom_elseCustomerTotal = base_dom.querySelector('#elseCustomerTotal'), //其他累计消费者
        dom_totalNum = base_dom.querySelector('#totalNum'), //合计当日扫码量
        dom_totalCustomer = base_dom.querySelector('#totalCustomer'), //合计当日消费者
        dom_totalNumTotal = base_dom.querySelector('#totalNumTotal'), //合计累计扫码量
        dom_totalCustomerTotal = base_dom.querySelector('#totalCustomerTotal'), //合计累计消费者
        mon_list = base_dom.querySelector('#mon_list'),
        dom_body = document.getElementsByTagName('body')[0],
        itpl_onenote = document.querySelector("#onenote_tpl").innerHTML,
        dom_loading = document.querySelectorAll('.loading')[0];


    var itemValue, queryDate, jo, company;
    var init_jo, init_itemValue, init_queryDate, flag = true;

    sessionStorage.s_jo_all = sessionStorage.s_jo;
    s_init_data(true, false);
    s_init_nav();
    s_init_basic();
    s_init_seven(true);
    s_init_chart();
    s_init_zone();
    s_init_total();

    base_dom.querySelector('#btnUser').style.backgroundColor = '#20ceb3';
    base_dom.querySelector('#btnScan').style.backgroundColor = '#b9b9b9';
    base_dom.querySelector('#btnUser').addEventListener('click', function () {
        s_init_seven(true);
        base_dom.querySelector('#btnUser').style.backgroundColor = '#20ceb3';
        base_dom.querySelector('#btnScan').style.backgroundColor = '#b9b9b9';
    }, false);
    base_dom.querySelector('#btnScan').addEventListener('click', function () {
        s_init_seven(false);
        base_dom.querySelector('#btnUser').style.backgroundColor = '#b9b9b9';
        base_dom.querySelector('#btnScan').style.backgroundColor = '#19b5ff';
    }, false);

    function s_init_data(first, click) { //初始化数据
        itemValue = sessionStorage.itemValue,
            queryDate = sessionStorage.queryDate,
            company = sessionStorage.company,
            jo = sessionStorage.s_jo;
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

    function s_init_nav() { //导航栏初始化
        var dom_control = base_dom.querySelectorAll('.control')[0],
            dom_outside = base_dom.querySelectorAll('.outside')[0],
            dom_content = base_dom.querySelectorAll('.content')[0],
            dom_close = base_dom.querySelectorAll('.close')[0],
            dom_toTop = base_dom.querySelector('#toTop'),
            dom_all = base_dom.querySelectorAll('.all')[0];

        var controlFlag = true;
        var skuArr = [];

        if (!jo.skuList) { //总部不显示导航
            dom_control.style.display = 'none';
            return;
        } else { //各个地区显示导航
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
            base_dom.querySelectorAll('.wrap')[0].addEventListener('click', function () {
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
            sessionStorage.s_jo = sessionStorage.s_jo_all;
            s_init_data(false, true);
            s_init_basic();
            s_init_chart();
            s_init_seven(true);
            s_init_zone();
            s_init_total();
        }, false);

        function get_sku() { //获取该区域所有sku并布局
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
            var myP = base_dom.querySelectorAll('.myP');
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
                (function (i) { //闭包
                    myP[i].addEventListener('click', function () {
                        s_loading('报表加载中');
                        var myskuKey = skuArr[i];
                        var requrl = 'http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getZDSXSkuData.do?queryDate=' + queryDate + '&companyKey=' + company + '&skuKey=' + myskuKey;
                        s_myajax(requrl);
                    }, false);
                })(i);
            }
        }
    }

    function s_myajax(requrl) {
        vge.ajxget(requrl, 60000, function (r) {
            try {
                var s = JSON.parse(r);
                if (s.status == 2) {
                    s_loaded();
                    alert('暂无数据');
                    return;
                }
                // sessionStorage.clear();
                flag = false;

                sessionStorage.s_jo = r;
                sessionStorage.itemValue = itemValue;
                sessionStorage.queryDate = queryDate;
                s_init_data(false, false);
                s_init_basic();
                s_init_chart();
                s_init_seven(true);
                s_init_zone();
                s_init_total();
                s_loaded();
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

    function s_init_basic(first) { //初始化日报概况部分
        if (itemValue == 'false') {
            base_dom.querySelectorAll('.select4')[0].style.display = 'none';
            base_dom.querySelectorAll('.select3')[0].style.marginBottom = '3rem';
            base_dom.querySelectorAll('.return')[0].style.display = 'none';
            base_dom.querySelector('#freshName').innerHTML = '开瓶新鲜度';
        } else {
            base_dom.querySelector('#freshName').innerHTML = '当日消费者';
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
            userCounts = parseFloat(jo.mainBean.userCounts).toLocaleString(),
            userAll = parseFloat(jo.mainBean.userAll).toLocaleString(),
            newUserCounts = parseFloat(jo.mainBean.newUserCounts).toLocaleString(),
            newUserAll = parseFloat(jo.mainBean.newUserAll).toLocaleString(),
            userScan = parseFloat(jo.mainBean.userScan).toLocaleString(),
            usAll = parseFloat(jo.mainBean.usAll).toLocaleString(),
            freshLev = parseFloat(jo.mainBean.freshLev).toLocaleString(),
            freshLevAll = parseFloat(jo.mainBean.freshLevAll).toLocaleString();

        var myscanP, myvpointsP, myuserP, mynewUserP, myusP, myfreshLevP;
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

        dom_bottle.innerHTML = scanCounts + '瓶&nbsp;&nbsp;(' + myscanP + ')';
        dom_bottleTotal.innerHTML = scanAll + '瓶';
        dom_money.innerHTML = vpointsCounts + '积分&nbsp;&nbsp;(' + myvpointsP + ')';
        dom_moneyTotal.innerHTML = vpointsAll + '积分';
        dom_customer.innerHTML = userCounts + '人&nbsp;&nbsp;(' + myuserP + ')';
        dom_customerTotal.innerHTML = userAll + '人';
        dom_add.innerHTML = newUserCounts + '人&nbsp;&nbsp;(' + mynewUserP + ')';
        dom_addTotal.innerHTML = newUserAll + '人';
        dom_average.innerHTML = userScan + '瓶&nbsp;&nbsp;(' + myusP + ')';
        dom_averageTotal.innerHTML = usAll + '瓶';
        dom_fresh.innerHTML = freshLev + '天&nbsp;&nbsp;(' + myfreshLevP + ')';
        dom_freshTotal.innerHTML = freshLevAll + '天';
    }

    function s_getDate(index) { //tool时间(8月29日 周三)
        var toolDate = jo.dayList[index].reportDate; //08-29
        if (toolDate[0] == '0') {
            base_dom.querySelector('#tool_date').innerHTML = `${toolDate[1]}月${toolDate[3]}${toolDate[4]}日&nbsp;&nbsp;${jo.dayList[index].weekDay}`;
        } else {
            base_dom.querySelector('#tool_date').innerHTML = `${toolDate[0]}${toolDate[1]}月${toolDate[3]}${toolDate[4]}日&nbsp;&nbsp;${jo.dayList[index].weekDay}`;
        }
    }

    function s_getOne(way, index) { //tool第一行(消费者人数)
        if (way == true) { //用户趋势
            let x = parseFloat(jo.dayList[index].userCounts).toLocaleString(); //消费者人数
            let y = jo.dayList[index].userP;
            if (jo.dayList[index].userP.indexOf('-') == '-1') { //百分比为正
                y = `+${jo.dayList[index].userP}`;
            }
            base_dom.querySelector('#tool_one').innerHTML = `消费者人数:${x}(${y})`;
        } else { //扫码趋势
            let a = parseFloat(jo.dayList[index].scanCounts).toLocaleString(); //开瓶扫码量
            let b = jo.dayList[index].scanP;
            if (jo.dayList[index].scanP.indexOf('-') == '-1') { //百分比为正
                b = `+${jo.dayList[index].scanP}`;
            }
            base_dom.querySelector('#tool_one').innerHTML = `开瓶扫码量:${a}(${b})`;
        }
    }

    function s_getTwo(way, index) {
        if (way == true) { //用户趋势
            let x = parseFloat(jo.dayList[index].newUserCounts).toLocaleString(); //新增消费者
            let y = jo.dayList[index].newUserP;
            if (jo.dayList[index].newUserP.indexOf('-') == '-1') { //百分比为正
                y = `+${jo.dayList[index].newUserP}`;
            }
            base_dom.querySelector('#tool_two').innerHTML = `新增消费者:${x}(${y})`;
        } else { //扫码趋势
            let a = parseFloat(jo.dayList[index].vpointsCounts).toLocaleString(); //返利金额
            let b = jo.dayList[index].vpointsP;
            if (jo.dayList[index].vpointsP.indexOf('-') == '-1') { //百分比为正
                b = `+${jo.dayList[index].vpointsP}`;
            }
            base_dom.querySelector('#tool_two').innerHTML = `返利积分:${a}(${b})`;
        }
    }

    function s_getThree(way, index) {
        if (way == true) { //用户趋势
            let x = jo.dayList[index].userNew; //新增消费者占比
            let y = jo.dayList[index].userNewP;
            if (jo.dayList[index].userNewP.indexOf('-') == '-1') { //百分比为正
                y = `+${jo.dayList[index].userNewP}`;
            }
            base_dom.querySelector('#tool_three').innerHTML = `新增消费者占比:${x}(${y})`;
        } else { //扫码趋势
            let a = parseFloat(jo.dayList[index].userScan).toLocaleString(); //人均消费量
            let b = jo.dayList[index].userScanP;
            if (jo.dayList[index].userScanP.indexOf('-') == '-1') { //百分比为正
                b = `+${jo.dayList[index].userScanP}`;
            }
            base_dom.querySelector('#tool_three').innerHTML = `人均消费量:${a}(${b})`;
        }
    }

    function s_dataMax(arr) {
        return Math.max.apply(Math, arr);
    };

    function s_init_seven(way) { //初始化七天趋势图
        if (way == true) { //用户趋势
            base_dom.querySelector('#btnUser').style.backgroundColor = '#20ceb3';
            base_dom.querySelector('#btnScan').style.backgroundColor = '#b9b9b9';
            if (jo.dayList.length == 0) {
                base_dom.querySelectorAll('.select5')[0].style.display = 'none';
            } else {
                base_dom.querySelectorAll('.select5')[0].style.display = 'block';
                s_getDate(jo.dayList.length - 1);
                s_getOne(true, jo.dayList.length - 1);
                s_getTwo(true, jo.dayList.length - 1);
                s_getThree(true, jo.dayList.length - 1);
            }
            //横坐标===>日期(可能小于7天)
            var data_date = [];
            //纵坐标===>消费者人数
            var data_num = [];
            //纵坐标===>新增消费者
            var data_new = [];
            if (jo.dayList.length == 0) {
                base_dom.querySelectorAll('.select5')[0].style.display = 'none';
            } else {
                base_dom.querySelectorAll('.select5')[0].style.display = 'block';
                for (let i = 0; i < jo.dayList.length; i++) {
                    data_date.push(jo.dayList[i].reportDate + jo.dayList[i].weekDay);
                    data_num.push(jo.dayList[i].userCounts);
                    data_new.push(jo.dayList[i].newUserCounts);
                }
            }
            //类目对应颜色
            var data_color = ['#20ceb3', '#fcd91d'];
            //统计类目
            var data_name = [{
                    name: '消费者人数',
                    icon: 'circle',
                    backgroundColor: '#20ceb3'
                },
                {
                    name: '新增消费者',
                    icon: 'circle',
                    backgroundColor: '#fcd91d'
                }
            ];
        } else { //扫码趋势
            if (jo.dayList.length == 0) {
                base_dom.querySelectorAll('.select5')[0].style.display = 'none';
            } else {
                base_dom.querySelectorAll('.select5')[0].style.display = 'block';
                s_getDate(jo.dayList.length - 1);
                s_getOne(false, jo.dayList.length - 1);
                s_getTwo(false, jo.dayList.length - 1);
                s_getThree(false, jo.dayList.length - 1);
            }
            //横坐标===>日期(可能小于7天)
            var data_date = [];
            //纵坐标===>开瓶扫码量
            var data_num = [];
            //纵坐标===>返利金额
            var data_new = [];
            if (jo.dayList.length == 0) {
                base_dom.querySelectorAll('.select5')[0].style.display = 'none';
            } else {
                base_dom.querySelectorAll('.select5')[0].style.display = 'block';
                for (let i = 0; i < jo.dayList.length; i++) {
                    data_date.push(jo.dayList[i].reportDate + jo.dayList[i].weekDay);
                    data_num.push(jo.dayList[i].scanCounts);
                    data_new.push(jo.dayList[i].vpointsCounts);
                }
            }
            var data_new_max = Math.ceil(s_dataMax(data_new) * 2 / 1000) * 1000;

            //类目对应颜色
            var data_color = ['#19b5ff', '#fcd91d'];
            //统计类目
            var data_name = [{
                    name: '开瓶扫码量',
                    icon: 'circle',
                    backgroundColor: '#19b5ff'
                },
                {
                    name: '返利积分',
                    icon: 'circle',
                    backgroundColor: '#fcd91d'
                }
            ];
        }

        var seven = base_dom.querySelector('#seven');
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
                itemWidth: 10, //图例大小（还有itemHeight属性）
                align: 'left',
                left: '8%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
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
                    formatter: function (params) { //横坐标轴换行
                        var newParamsName = ""; // 最终拼接成的字符串
                        var paramsNameNumber = params.length; // 实际标签的个数
                        var provideNumber = 5; // 每行能显示的字的个数
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                        /**
                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                         */
                        // 条件等同于rowNumber>1
                        if (paramsNameNumber > provideNumber) {
                            /** 循环每一行,p表示行 */
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = ""; // 表示每一次截取的字符串
                                var start = p * provideNumber; // 开始截取的位置
                                var end = start + provideNumber; // 结束截取的位置
                                // 此处特殊处理最后一行的索引值
                                if (p == rowNumber - 1) {
                                    // 最后一次不换行
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    // 每一次拼接字符串并换行
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr; // 最终拼成的字符串
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
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#b9b9b9'
                    }
                }
            }],
            series: [{
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

        if (way == false) { //双y轴
            option.yAxis = [{
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
            option.series = [{
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
        console.log(option);
        
        // 使用刚指定的配置项和数据显示图表。
        sevenChart.setOption(option, true);

        //添加点击事件，还有其他鼠标事件和键盘事件等等
        sevenChart.on("click", function (param) {
            if (way == true) {
                s_getDate(param.dataIndex);
                s_getOne(true, param.dataIndex);
                s_getTwo(true, param.dataIndex);
                s_getThree(true, param.dataIndex);
            } else {
                s_getDate(param.dataIndex);
                s_getOne(false, param.dataIndex);
                s_getTwo(false, param.dataIndex);
                s_getThree(false, param.dataIndex);
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

    function s_init_chart() {
        //柱状图部分
        var n = jo.detailList.length;
        var dataArr = [],
            scanData = [], //当日开瓶扫码量
            customerData = [], //当日消费者
            addData = []; //当日新增消费者
        for (var i = 0; i < n; i++) {
            var cityName = jo.detailList[i].city;
            if (cityName.length > 4) {
                cityName = cityName[0] + cityName[1] + cityName[2] + cityName[3];
            }
            dataArr.push(cityName);
            jo.detailList[i].scanCounts = jo.detailList[i].scanCounts.replace(/,/g, ""); //取消字符串中出现的所有逗号
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
        var excel = base_dom.querySelector('#excel');
        //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
        var resizeexcel = function () {
            excel.style.width = window.innerWidth + 'px';
            // excel.style.height = n*35+'px';
            excel.style.height = n * 35 + 'px';
            if(n == 1) {
                excel.style.height = 140 + 'px';
            } else if (n <= 3) {
                excel.style.height = n * 60 + 30 + 'px';
            } else if (n <= 7) {
                excel.style.height = n * 60 + 'px';
            }
        };
        //设置容器高宽
        resizeexcel();
        // debugger
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(excel);
        myChart.resize();
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
                data: [{
                        name: '开瓶扫码量',
                        icon: 'circle',
                        textStyle: {
                            color: '#e5e5e5'
                        },
                        backgroundColor: '#fcd91d'
                    },
                    {
                        name: '当日消费者',
                        icon: 'circle',
                        textStyle: {
                            color: '#e5e5e5'
                        },
                        backgroundColor: '#21cdb3'
                    },
                    {
                        name: '新增消费者',
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
                    // axisPointer: false
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
                    // axisPointer: false
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
                data: dataRe
            },
            color: ['#fcd91d', '#21cdb3', '#19b5ff'],
            series: [{
                    name: '开瓶扫码量',
                    type: 'line',
                    data: scanRe,
                    xAxisIndex: 1,
                    markPoint: {
                        animation: false
                    }
                },
                {
                    name: '当日消费者',
                    type: 'bar',
                    barWidth: '5',
                    data: userRe,
                    markPoint: {
                        animation: false
                    }
                },
                {
                    name: '新增消费者',
                    type: 'bar',
                    barWidth: '5',
                    data: addRe,
                    markPoint: {
                        animation: false
                    }
                }
            ]
        };
        console.log(option);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        //用于使chart自适应高度和宽度
        window.onresize = function () {
            //重置容器高宽
            resizeexcel();
            myChart.resize();
        };
    }

    function s_init_zone() {
        while (mon_list.hasChildNodes()) {
            mon_list.removeChild(mon_list.firstChild);
        }
        if (itemValue == 'false') {
            //地区表格部分
            var i = 0,
                lst = jo.detailList,
                l = lst.length;
            var params = {},
                hs = [];
            for (i = 0; i < l; ++i) {
                params.rank = i + 1;
                var cityName = lst[i].city;

                if (cityName.length > 4) {
                    cityName = cityName[0] + cityName[1] + cityName[2] + cityName[3] + '...';
                }
                params.city = cityName;
                lst[i].scanCounts = parseFloat(lst[i].scanCounts).toLocaleString();
                params.num = lst[i].scanCounts; //当日扫码
                lst[i].freshLev = parseFloat(lst[i].freshLev).toLocaleString();
                params.freshLev = lst[i].freshLev; //开瓶新鲜度
                params.numTotal = lst[i].allScans; //累计扫码
                params.customerTotal = lst[i].allCounts;
                mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
            }
            base_dom.querySelectorAll('.else')[0].style.display = 'none';
            if (l > 4) {
                var li = mon_list.getElementsByTagName('li')[l - 4];
                li.style.borderTop = '1px solid #19b5fe';
            }
        } else {
            //地区表格部分
            var i = 0,
                lst = jo.detailList,
                l = lst.length;
            var params = {},
                hs = [];
            for (i = 0; i < l - 1; ++i) {
                params.rank = i + 1;
                var cityName = lst[i].city;
                if (cityName.length > 4) {
                    cityName = cityName[0] + cityName[1] + cityName[2] + cityName[3] + '...';
                }
                params.city = cityName;
                lst[i].scanCounts = parseFloat(lst[i].scanCounts).toLocaleString();
                params.num = lst[i].scanCounts; //当日扫码
                lst[i].userCounts = parseFloat(lst[i].userCounts).toLocaleString();
                params.freshLev = lst[i].userCounts; //当日用户
                params.numTotal = lst[i].allScans; //累计扫码
                params.customerTotal = lst[i].allCounts; //
                mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
                
                
            }
            //其他
            dom_elseNum.innerHTML = parseFloat(lst[l - 1].scanCounts).toLocaleString();
            dom_elseCustomer.innerHTML = parseFloat(lst[l - 1].userCounts).toLocaleString();
            dom_elseNumTotal.innerHTML = lst[l - 1].allScans;
            dom_elseCustomerTotal.innerHTML = lst[l - 1].allCounts;

            if (l > 4) {
                var li = mon_list.getElementsByTagName('li')[l - 4];
                li.style.borderTop = '1px solid #19b5fe';
            }
        }
    }

    //地区 itemValue == true
    //地区sku itemValue == true && !jo.limitVpoints
    //总部 itemValue == false && !jo.limitVpoints
    function s_init_total() {
        //合计
        if (itemValue == 'false') {
            dom_totalCustomer.innerHTML = jo.allBean.freshLev;
            base_dom.querySelectorAll('.return')[0].style.display = 'none';
            base_dom.querySelector('#freshName').innerHTML = '开瓶新鲜度';
        } else {
            dom_totalCustomer.innerHTML = jo.allBean.userCounts;
        }
        dom_totalNum.innerHTML = jo.allBean.scanCounts;
        dom_totalNumTotal.innerHTML = jo.allBean.allScans;
        dom_totalCustomerTotal.innerHTML = jo.allBean.allCounts;
        //最底部部分
        if (!jo.limitVpoints) {
            base_dom.querySelectorAll('.select4')[0].style.display = 'none';
            base_dom.querySelectorAll('.select3')[0].style.marginBottom = '3rem';
        } else {
            base_dom.querySelector('#freshName').innerHTML = '当日消费者';
            base_dom.querySelectorAll('.select4')[0].style.display = 'block';
            dom_surplusMoney.innerHTML = jo.limitVpoints;
            dom_surplusDate.innerHTML = jo.limitDays;
        }
    }

    function s_loading(txt) {
        document.querySelector('#inner').innerHTML = txt;
        document.querySelector('#loadingToast').style.display = 'block';
    }

    function s_loaded() {
        document.querySelector('#loadingToast').style.display = 'none';
    }

    function s_toast(txt) {
        $('#toast .weui_toast_content').html(txt);
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 2000);
    }
}