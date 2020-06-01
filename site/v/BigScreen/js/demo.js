	'use strict';
    var dom_date = document.getElementById('date'),
        dom_location = document.getElementById('location'),
        dom_myWeather = document.getElementById('myWeather'),
        dom_pm2_5 = document.getElementById('pm2_5'),
        dom_temperature = document.getElementById('temperature'),
        dom_wind = document.getElementById('wind'),
        dom_rise = document.getElementById('rise'),
        dom_week = echarts.init(document.getElementById('week')),
    	dom_map = echarts.init(document.getElementById('map')),
        dom_month = echarts.init(document.getElementById('month')),
        dom_core = echarts.init(document.getElementById('core')),
        dom_list = document.getElementById('list'),
        dom_Lnum = document.getElementsByClassName('Lnum');
        
    var day_host = 'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getAllData.do',//总体数据(一天一次)
        second_host = 'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getRealData.do',//实时数据(5s一次)
        minute_host = 'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getRecordData.do',//扫码记录(一分一次)
        hour_host = 'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getMapData.do';//热力图(一小时一次)
    
    var yo,ho,mo,so;

    var name = '',pro='',city='',sku='';

    var flag = 0;

    var Data_month = [],
        Data_num = [];

    var Data_week_name = [],
        Data_week_num = [];

    //请求接口
    getRise();
    getHour();
    getReal();
    getSecond();
    setInterval("show_cur_times()",100);//获取时间
    getLocation();//获取地理位置、天气
    


    //日期时间
    function show_cur_times(){
        //获取当前日期
        var date_time = new Date();
        //年
        var year = date_time.getFullYear();
        //判断小于10，前面补0
        if(year<10){
            year="0"+year;
        }
        //月
        var month = date_time.getMonth()+1;
        //判断小于10，前面补0
        if(month<10){
            month="0"+month;
        }
        //日
        var day = date_time.getDate();
        //判断小于10，前面补0
        if(day<10){
           day="0"+day;
        }
        //时
        var hours =date_time.getHours();
        //判断小于10，前面补0
        if(hours<10){
           hours="0"+hours;
        }
        //分
        var minutes =date_time.getMinutes();
        //判断小于10，前面补0
        if(minutes<10){
           minutes="0"+minutes;
        }
        //秒
        var seconds=date_time.getSeconds();
        //判断小于10，前面补0
        if(seconds<10){
           seconds="0"+seconds;
        }
        //拼接年月日时分秒
        var date_str = year+"年"+month+"月"+day+"日 "+" "+hours+":"+minutes+":"+seconds;
        //显示在id为showtimes的容器里
        dom_date.innerHTML= date_str;
    }
        
    //地理位置
    function getLocation(){
        //通过搜狐接口获取ip地理位置
        dom_location.innerHTML = '中国-'+returnCitySN["cname"];
        // dom_pm2_5.innerHTML = '';
        //天气
        var option = {
            "city":returnCitySN["cname"].substr(0,returnCitySN["cname"].length-1)
        };
        $.ajax({
            async:false,
            type: "GET",
            url: "http://wthrcdn.etouch.cn/weather_mini",
            data: option,
            success: function(data){
                var jo = JSON.parse(data);
                var reg=/[\u4E00-\u9FA5]/g;//正则方法去除中文
                //气温
                var now = new Date(),hour = now.getHours(); 
                var low = jo.data.forecast[0].low.replace(reg,'');
                var high = jo.data.forecast[0].high.replace(reg,'');
                if(hour >= 0 && hour < 9){//凌晨至9点显示低温
                    dom_temperature.innerHTML = low;
                }else if(hour >=9 && hour <=18){//9点至18点显示高温
                    dom_temperature.innerHTML = high;
                }else if(hour > 18 && hour <=24){//18点至24点显示低温
                    dom_temperature.innerHTML = low;
                } 
                //天气
                if(jo.data.forecast[0].type.indexOf('晴')!=-1){
                    dom_myWeather.src = 'img/sun.png';
                }else if(jo.data.forecast[0].type.indexOf('阴')!=-1){
                    dom_myWeather.src = 'img/yin.png';
                }else if(jo.data.forecast[0].type.indexOf('雨')!=-1){
                    dom_myWeather.src = 'img/rain.png';
                }else if(jo.data.forecast[0].type.indexOf('云')!=-1){
                    dom_myWeather.src = 'img/cloud.png';
                }else if(jo.data.forecast[0].type.indexOf('沙')!=-1){
                    dom_myWeather.src = 'img/sand.png';
                }else if(jo.data.forecast[0].type.indexOf('霾')!=-1){
                    dom_myWeather.src = 'img/fog.png';
                }else if(jo.data.forecast[0].type.indexOf('雾')!=-1){
                    dom_myWeather.src = 'img/fog.png';
                }else if(jo.data.forecast[0].type.indexOf('冰雹')!=-1){
                    dom_myWeather.src = 'img/ice.png';
                }else if(jo.data.forecast[0].type.indexOf('浮尘')!=-1){
                    dom_myWeather.src = 'img/sand.png';
                }else if(jo.data.forecast[0].type.indexOf('霜冻')!=-1){
                    dom_myWeather.src = 'img/ice.png';
                }else if(jo.data.forecast[0].type.indexOf('风')!=-1){
                    dom_myWeather.src = 'img/wind.png';
                }else{
                    dom_myWeather.src = 'img/sun.png';
                }
                //风力
                dom_wind.innerHTML = jo.data.forecast[0].fengli.substring(0,2);
            }
        });
        var option_pm25 = {
            "location":"北京",
            "output":"json",
            "ak":"awfR4OBORHv6YXmfuqaKaFyWQVX1Gohc"
        };
        
    }

    // 周扫码量
    
    var option_week = {
        grid: {
            left: '2%',
            right: '10%',
            bottom: '10%',
            top:'0%',
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
            splitLine:{
                show:false
            }
        },
        yAxis: {
            type: 'category',
            data:Data_week_name,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#01e9e2'
                }
            },
        },
        series: [
            {
                type: 'bar',
                // barWidth : 30,//柱图宽度
                barMaxWidth:15,//最大宽度
                itemStyle: {
                    normal: {
                        color: function(params) {
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
                data:Data_week_num
            }
        ]
    };
    

    // 地图
    function randomData() {
    	return Math.round(Math.random()*1000);
	}
	var option_map = {
        visualMap: {
            show:false,
            min: 0,
            max: 800,
            inRange: {
                color: ['#4c88cd', '#09366a']
            }
        },
        geo:{
            nameMap:{

            }
        },
    	series: [
    	    {
    	        name: '用户热力',
    	        type: 'map',
    	        mapType: 'china',
    	        roam: false,//是否开启鼠标缩放和平移漫游。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                label: {//文字样式
    	            normal: {
    	                show: false,
                        textStyle:{
                            color:'#04e1f4'
                        }
    	            }
    	        },
                itemStyle:{
                    normal:{
                        areaColor: '#2d63a1',
                        borderColor:'#183961'//图形描边颜色
                    }
                },
                aspectScale:0.75,//地图长宽比，默认0.75
                layoutCenter:['50%','50%'],
                layoutSize: 480,//地图的大小
                zoom:1.3,//缩放比例
    	        data:[
                    {name: '南海诸岛',value: 0, itemStyle: { normal:{opacity:0}} },
    	            {name: '北京',value: randomData() ,label:{normal:{show:true}}},
    	            {name: '天津',value: randomData() ,label:{normal:{show:true}}},
    	            {name: '河北',value: randomData() ,label:{normal:{show:true}}},
                    {name: '河南',value: randomData() ,label:{normal:{show:true}}},
    	            {name: '黑龙江',value: randomData() ,label:{normal:{show:true}}},
    	            {name: '湖南',value: randomData() ,label:{normal:{show:true}}},
    	            {name: '山东',value: randomData() ,label:{normal:{show:true}}},
                	{name: '浙江',value: randomData() ,label:{normal:{show:true}}},
                	{name: '湖北',value: randomData() ,label:{normal:{show:true}}},
                	{name: '广西',value: randomData() ,label:{normal:{show:true}}},
                	{name: '山西',value: randomData() ,label:{normal:{show:true}}},
                	{name: '福建',value: randomData() ,label:{normal:{show:true}}},
                	{name: '广东',value: randomData() ,label:{normal:{show:true}}},
                	{name: '四川',value: randomData() ,label:{normal:{show:true}}},
                	{name: '海南',value: randomData() ,label:{normal:{show:true}}}
        	    ]
        	}
	    ]
	};
	dom_map.setOption(option_map);
    dom_map.on("mouseover", function (params){   
        dom_map.dispatchAction({  
            type: 'downplay'  
        });  
    });

    //月扫码量
    
    var option_month = {
        calculable : true,
        grid:{
            left:'7%',
            right:'5%',
            top:'15%',
            bottom:'15%'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data:Data_month,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#3e91d7'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#3e91d7'
                    }
                },
                splitArea:{
                    show:true,
                    interval:1,
                    areaStyle:{
                        color:['#101535','#151e3b']
                    }
                },
                splitLine:{
                    show:false
                }
            }
        ],
        series : [
            {
                name:'月扫码量',
                type:'line',
                stack: '总量',
                itemStyle: {
                    normal: {
                        type: 'default',
                        color: '#22f5c1',
                        label : {show: true}
                    }
                },
                label:{
                    normal:{
                        // position:['top','right']
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
                data:Data_num
            }
        ]
    };

    //雷达图
    var dataHB = [
        {
            value:[350,150,320,280,280]
        }
    ];
    var dataHN = [
        {
            value:[250,280,300,350,300]
        }
    ];
    var dataZZ = [
        {
            value:[330,320,270,250,280]
        }
    ];
    var dataZJ = [
        {
            value:[230,350,220,230,350]
        }
    ];
    var dataGX = [
        {
            value:[270,260,320,250,330]
        }
    ];
    
    var option_core = {
        legend: {
            bottom:'10%',
            left:'5%',
            orient:'vertical',//图例对齐方向
            data: ['河北','华中','华南','浙江','广西'],
            itemGap: 15,//每项间隔
            textStyle: {
                color: ['#00fff6','#00aeff','#0465fd','#744ff0','#67809f'],
                fontSize: 14
            },
            selectedMode: false
        },
        radar: {
            radius:'70%',
            center:['52%','55%'],
            indicator: [
                {name: '新鲜度(天)', max: 350},
                {name: '进度', max: 350},
                {name: '提现率', max: 350},
                {name: '单瓶返利金额', max: 350},
                {name: '人均饮酒瓶数(瓶/支)', max: 350}
            ],
            shape: 'circle',//圆形
            splitNumber: 5,
            name: {
                textStyle: {
                    color: '#3e91d7'
                }
            },
            splitLine: {
                lineStyle: {//环形的样式
                    color: '#24304a',
                    type:'dashed'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#24304a',
                    type:'dashed'
                }
            }
        },
        series: [
            {
                name: '河北',
                type: 'radar',
                lineStyle:{
                    normal: {
                        width: 3,
                        opacity: 0.5,
                        color:'#00fff6'
                    }
                },
                data: dataHB,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#00fff6'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
            {
                name:'华中',
                type:'radar',
                lineStyle:{
                    normal: {
                        width: 3,
                        opacity: 0.5,
                        color:'#00aeff'
                    }
                },
                data: dataZZ,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#00aeff'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
            {
                name:'华南',
                type:'radar',
                lineStyle:{
                    normal: {
                        width: 3,
                        opacity: 0.5,
                        color:'#0465fd'
                    }
                },
                data: dataZJ,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#0465fd'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
            {
                name:'浙江',
                type:'radar',
                lineStyle:{
                    normal: {
                        width: 3,
                        opacity: 0.5,
                        color:'#744ff0'
                    }
                },
                data: dataHN,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#744ff0'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
            {
                name:'广西',
                type:'radar',
                lineStyle:{
                    normal: {
                        width: 3,
                        opacity: 0.5,
                        color:'#67809f'
                    }
                },
                data: dataGX,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#67809f'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            }
        ]
    };
    dom_core.setOption(option_core);


    function comdify(n){
    　　var re=/\d{1,3}(?=(\d{3})+$)/g;
    　　var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
    　　return n1;
    }

    //一天一次
    function getRise(){
        $.ajax({
            async:false,
            type: "GET",
            url: day_host,
            data: "",
            success: function(data){
                yo = JSON.parse(data);
                //总千升数
                dom_rise.innerHTML = yo.totalCapacity;
                //月扫码量
                for(var i=0;i<yo.monthList.length;i++){
                    Data_month[i] = yo.monthList[i].reportDate.substr(6,yo.monthList[i].reportDate.length);
                    Data_num[i] = yo.monthList[i].scanCounts;
                }
                dom_month.setOption(option_month);
        
                //周扫码量
                getWeek();
                function getWeek(){
                    if(flag == 0){
                        Data_week_name = [];
                        Data_week_num = [];
                        for(var i=0;i<yo.batchMap.A.length;i++){
                            Data_week_name[i] = yo.batchMap.A[i].mainSkuName;
                            Data_week_num[i] = yo.batchMap.A[i].batchDays;
                        }
                        flag=1;
                    }else if(flag == 1){
                        Data_week_name = [];
                        Data_week_num = [];
                        for(var i=0;i<yo.batchMap.B.length;i++){
                            Data_week_name[i] = yo.batchMap.A[i].mainSkuName;
                            Data_week_num[i] = yo.batchMap.A[i].batchDays;
                        }
                        flag=2;
                    }else if(flag == 2){
                        Data_week_name = [];
                        Data_week_num = [];
                        for(var i=0;i<yo.batchMap.C.length;i++){
                            Data_week_name[i] = yo.batchMap.A[i].mainSkuName;
                            Data_week_num[i] = yo.batchMap.A[i].batchDays;
                        }
                        flag=3;
                    }else if(flag == 3){
                        Data_week_name = [];
                        Data_week_num = [];
                        for(var i=0;i<yo.batchMap.D.length;i++){
                            Data_week_name[i] = yo.batchMap.A[i].mainSkuName;
                            Data_week_num[i] = yo.batchMap.A[i].batchDays;
                        }
                        flag = 0;
                    }
                    dom_week.setOption(option_week);   
                }
            },
            error:function(){
                console.log('一天一次请求接口出错');
            }
        });
    }
    //一小时一次
    function getHour(){
        $.ajax({
            async:false,
            type: "GET",
            url: hour_host,
            data: "",
            success: function(data){
                ho = JSON.parse(data);
            },
            error:function(){
                console.log('一小时一次请求接口出错');
            }
        });
    }
    //一分钟一次
    function getReal(){
        $.ajax({
            async:false,
            type: "GET",
            url: minute_host,
            data: "",
            success: function(data){
                mo = JSON.parse(data);
                //实时扫码滚动
                while(dom_list.hasChildNodes()){  
                    dom_list.removeChild(dom_list.firstChild);  
                } 
                for(var i in mo){
                    //处理昵称
                    if(mo[i].nickName.length>4){
                        name = mo[i].nickName.substr(0,2)+'*'+mo[i].nickName.substr(mo[i].nickName.length-2,mo[i].nickName.length);
                    }else if(mo[i].nickName.length<=1){
                        name = '*';
                    }else if(mo[i].nickName.length==2){
                        name = mo[i].nickName.substr(0,1)+'*';
                    }else{
                        name = mo[i].nickName.substr(0,1)+'*'+mo[i].nickName.substr(mo[i].nickName.length-1,mo[i].nickName.length);
                    }
                    //处理省份
                    if(mo[i].province.length<=2){
                        pro = mo[i].province+'省';
                    }else if(mo[i].province.length>=4){
                        pro = mo[i].province.substr(0,4)+'...';
                    }else{
                        pro = mo[i].province;
                    }
                    //处理市名
                    if(mo[i].city.length<=2){
                        city = mo[i].city+'市';
                    }else if(mo[i].city.length>=5){
                        city = mo[i].city.substr(0,4)+'...';
                    }else{
                        city = mo[i].city;
                    }
                    //处理sku
                    if(mo[i].skuName.length>=12){
                        sku = mo[i].skuName.substr(0,12)+'...';
                    }else{
                        sku = mo[i].skuName;
                    }
                    var dom_li = document.createElement('li');
                    dom_li.innerHTML = '<span>'+name+'</span><span>'+pro+'</span><span>'+city+'</span><span>'+sku+'</span>';
                    dom_list.appendChild(dom_li);
                }
            },
            error:function(){
                console.log('一分钟一次请求接口出错');
            }
        });
    }
    //5s一次
    function getSecond(){
        $.ajax({
            async:false,
            type: "GET",
            url: second_host,
            data: "",
            success: function(data){
                so = JSON.parse(data);
            },
            error:function(){
                console.log('实时数据请求接口出错');
            }
        });
    }