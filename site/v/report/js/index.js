    var dom_address = document.getElementById('address'),//地区
        dom_date = document.getElementById('date'),//日期
        dom_bottle = document.getElementById('bottle'),//当日开瓶扫码量
        dom_bottleTotal = document.getElementById('bottleTotal'),//累计开瓶扫码量
        dom_money = document.getElementById('money'),//当日返利金额
        dom_moneyTotal = document.getElementById('moneyTotal'),//累计返利金额
        dom_customer = document.getElementById('customer'),//当日扫码消费者
        dom_customerTotal = document.getElementById('customerTotal'),//累计扫码消费者
        dom_add = document.getElementById('add'),//当日新增消费者
        dom_addTotal = document.getElementById('addTotal'),//累计新增消费者
        dom_average = document.getElementById('average'),//当日人均消费瓶数
        dom_averageTotal = document.getElementById('averageTotal'),//累计人均消费瓶数
        dom_surplusMoney = document.getElementById('surplusMoney'),//账户剩余金额
        dom_surplusDate = document.getElementById('surplusDate'),//账户剩余天数
        dom_elseNum = document.getElementById('elseNum'),//其他当日扫码量
        dom_elseCustomer = document.getElementById('elseCustomer'),//其他当日消费者
        dom_elseNumTotal = document.getElementById('elseNumTotal'),//其他累计扫码量
        dom_elseCustomerTotal = document.getElementById('elseCustomerTotal'),//其他累计消费者
        dom_totalNum = document.getElementById('totalNum'),//合计当日扫码量
        dom_totalCustomer = document.getElementById('totalCustomer'),//合计当日消费者
        dom_totalNumTotal = document.getElementById('totalNumTotal'),//合计累计扫码量
        dom_totalCustomerTotal = document.getElementById('totalCustomerTotal'),//合计累计消费者
        itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
        mon_list = document.getElementById('mon_list');

    var args = vge.urlparse(location.href),
        itemValue = args.itemValue,
        queryDate = args.queryDate;

        var requrl='http://59.110.53.118:9008/DBTMainEntStats/reportDetail/getReportData.do?itemValue='+itemValue+'&queryDate='+queryDate;
        vge.ajxget(requrl, 5000, function(jo){
            jo = JSON.parse(jo);
            // 日报概况部分
            dom_address.innerHTML = '<img src="img/address.png?v=1">'+jo.itemName;
            dom_date.innerHTML = '<img src="img/date.png?v=1">'+jo.reportDate;
            var scanCounts = parseFloat(jo.mainBean.scanCounts).toLocaleString(),
                scanAll = parseFloat(jo.mainBean.scanAll).toLocaleString(),
                // vpointsCounts = parseFloat(jo.mainBean.vpointsCounts).toLocaleString(),
                vpointsCounts = jo.mainBean.vpointsCounts,
                // vpointsAll = parseFloat(jo.mainBean.vpointsAll).toLocaleString(),
                vpointsAll = jo.mainBean.vpointsAll,
                userCounts = parseFloat(jo.mainBean.userCounts).toLocaleString(),
                userAll = parseFloat(jo.mainBean.userAll).toLocaleString(),
                newUserCounts = parseFloat(jo.mainBean.newUserCounts).toLocaleString(),
                newUserAll = parseFloat(jo.mainBean.newUserAll).toLocaleString(),
                userScan = parseFloat(jo.mainBean.userScan).toLocaleString(),
                usAll = parseFloat(jo.mainBean.usAll).toLocaleString();
            if(jo.mainBean.scanP.indexOf('-')==-1){
                jo.mainBean.scanP = '+'+jo.mainBean.scanP;
            }
            if(jo.mainBean.vpointsP.indexOf('-')==-1){
                jo.mainBean.vpointsP = '+'+jo.mainBean.vpointsP;
            }
            if(jo.mainBean.userP.indexOf('-')==-1){
                jo.mainBean.userP = '+'+jo.mainBean.userP;
            }
            if(jo.mainBean.newUserP.indexOf('-')==-1){
                jo.mainBean.newUserP = '+'+jo.mainBean.newUserP;
            }
            if(jo.mainBean.usP.indexOf('-')==-1){
                jo.mainBean.usP = '+'+jo.mainBean.usP;
            }
            dom_bottle.innerHTML = scanCounts+'瓶&nbsp;&nbsp;('+jo.mainBean.scanP+')';
            dom_bottleTotal.innerHTML = scanAll+'瓶';
            dom_money.innerHTML = vpointsCounts+'元&nbsp;&nbsp;('+jo.mainBean.vpointsP+')';
            dom_moneyTotal.innerHTML = vpointsAll+'元';
            dom_customer.innerHTML = userCounts+'人&nbsp;&nbsp;('+jo.mainBean.userP+')';
            dom_customerTotal.innerHTML = userAll+'人';
            dom_add.innerHTML = newUserCounts+'人&nbsp;&nbsp;('+jo.mainBean.newUserP+')';
            dom_addTotal.innerHTML = newUserAll+'人';
            dom_average.innerHTML = userScan+'瓶&nbsp;&nbsp;('+jo.mainBean.usP+')';
            dom_averageTotal.innerHTML = usAll+'瓶';

        //柱状图部分
            var n=jo.detailList.length;
            var dataArr = [],
                scanData = [],//当日开瓶扫码量
                customerData = [],//当日消费者
                addData = [];//当日新增消费者
            for(var i=0;i<n;i++){
                var cityName =  jo.detailList[i].city;
                if(cityName.length>4){
                    cityName = cityName[0]+cityName[1]+cityName[2]+cityName[3];
                }
                // dataArr.push(jo.detailList[i].city);
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
                excel.style.width = window.innerWidth+'px';
                // excel.style.height = n*35+'px';
                excel.style.height = n*35+'px';
                if(n<=5){
                    excel.style.height = n*60+'px';
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
                    backgroundColor:'#ffffff',
                    textStyle:{
                        color:'#000000'
                    }
                },
                legend: {
                    data: [
                        {
                            name:'开瓶扫码量',
                            icon:'circle',
                            textStyle:{
                                color:'#e5e5e5'
                            },
                            backgroundColor:'#fcd91d'
                        },
                        {
                            name:'当日消费者',
                            icon:'circle',
                            textStyle:{
                                color:'#e5e5e5'
                            },
                            backgroundColor:'#21cdb3'
                        },
                        {
                            name:'新增消费者',
                            icon:'circle',
                            textStyle:{
                                color:'#e5e5e5'
                            },
                            backgroundColor:'#19b5ff'
                        }
                    ]
                },
                grid: {
                    left: '15',
                    right: '25',
                    bottom: '0',
                    top:'40',
                    containLabel: true,
                    backgroundColor:'#979797'
                },
                xAxis:[
                    {
                        type: 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                fontSize:10
                            }
                        },
                        splitLine:{
                            show:false
                        },
                        axisPointer:false
                        // min: 0,
                        // max: 20000,
                        // interval:4000
                    },
                    {
                        type: 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                fontSize:10
                            }
                        },
                        splitLine:{
                            show:false
                        },
                        axisPointer:false
                        // min: 0,
                        // max: 14000,
                        // interval:2800
                    }
                ], 
                yAxis: {
                    type: 'category',
                    boundaryGap:true,
                    axisLine:{
                        lineStyle:{
                            color:'#979797'
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            fontSize:10
                        }
                    },
                    axisTick:{
                        alignWithLabel:true
                    },
                    axisPointer:false,
                    data: dataRe
                },
                color:['#fcd91d','#21cdb3','#19b5ff'],
                series: [
                    {
                        name: '开瓶扫码量',
                        type: 'line',
                        data: scanRe,
                        xAxisIndex: 1
                    },
                    {
                        name: '当日消费者',
                        type: 'bar',
                        barWidth: '5',
                        data: userRe
                    },
                    {
                        name: '新增消费者',
                        type: 'bar',
                        barWidth: '5',
                        data: addRe
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

        //地区表格部分
            var i=0, lst=jo.detailList, l=lst.length;
            var params={},hs=[];
            for (i = 0; i < l-1; ++i) {
                params.rank = i+1;
                var cityName =  lst[i].city;
                if(cityName.length>4){
                    cityName = cityName[0]+cityName[1]+cityName[2]+cityName[3]+'...';
                }
                params.city=cityName;
                params.num=lst[i].scanCounts;//当日扫码
                params.customer=lst[i].userCounts;//当日用户
                params.numTotal=lst[i].allScans;//累计扫码
                params.customerTotal=lst[i].allCounts;//
                mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
                
            }
            //其他
            dom_elseNum.innerHTML = lst[l-1].scanCounts;
            dom_elseCustomer.innerHTML = lst[l-1].userCounts;
            dom_elseNumTotal.innerHTML = lst[l-1].allScans;
            dom_elseCustomerTotal.innerHTML = lst[l-1].allCounts;

            if(l>4){
                var li = mon_list.getElementsByTagName('li')[l-4];
                li.style.borderTop = '1px solid #19b5fe';
            }
            
            //合计
            dom_totalNum.innerHTML = parseFloat(jo.allBean.scanCounts).toLocaleString();
            dom_totalCustomer.innerHTML = parseFloat(jo.allBean.userCounts).toLocaleString();
            dom_totalNumTotal.innerHTML = parseFloat(jo.allBean.allScans).toLocaleString();
            dom_totalCustomerTotal.innerHTML = parseFloat(jo.allBean.allCounts).toLocaleString();
            //最底部部分
            dom_surplusMoney.innerHTML =  jo.limitVpoints;
            dom_surplusDate.innerHTML = jo.limitDays;
                    
    });
