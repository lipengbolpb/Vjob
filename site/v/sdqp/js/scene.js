var app = new Vue({
    el:"#app",
    data:{
        nikeName:'',
        scanDate:'',
        maxDateScan:'',     
        queryStartDate:'',
        maxCounty:'',   
        countyCounts:'',    
        luckCounts:'',
        prizeCount:'',        
        yearScanDays:'',      
        rankString:'',
        maxMoney:'', 
        firstSku:'', 
        otherDaysScan:'',
        queryEndDate:'',
        lastYearScanDays:'',   
        lateTime:'',
        loveScan:'',    
        scanCounts:'',    
        workDaysScan:'',
        scanDays:'',    
        maxDate:'', 
        maxMoneyCount:'',
        scanMoney:'',           
        loveSku:'',   
        // ewm:false, 
        img:'',
    },
    filters:{
 
    },
    computed:{

    },
    
    methods:{
        getData(){
            var args = vge.urlparse(location.href);
            var openid = args.openid;
            var that = this;
            if(sessionStorage.result){
                var result = JSON.parse(sessionStorage.result);
                sessionStorage.result = JSON.stringify(result);
                that.scanDate = result.scanDate;
                that.maxDateScan = result.maxDateScan;     
                that.queryStartDate= result.queryStartDate;
                that.maxCounty= result.maxCounty;   
                that.countyCounts= result.countyCounts;    
                that.luckCounts= result.luckCounts;
                that.prizeCount= result.prizeCount;        
                that.yearScanDays= result.yearScanDays;      
                that.rankString= result.rankString;
                that.maxMoney= result.maxMoney; 
                that.firstSku= result.firstSku; 
                that.firstSku= result.firstSku;
                that.queryEndDate= result.queryEndDate;
                that.lastYearScanDays= result.lastYearScanDays;   
                that.lateTime= result.lateTime;
                that.loveScan= result.loveScan;    
                that.scanCounts=result.scanCounts;    
                that.workDaysScan= result.workDaysScan;
                that.scanDays= result.scanDays;    
                that.maxDate= result.maxDate; 
                that.maxMoneyCount= result.maxMoneyCount;
                that.scanMoney= result.scanMoney;           
                that.loveSku= result.loveSku;

                var str = that.scanDate;
                // 转换日期格式
                str = str.replace(/-/g, '/'); // "2010/08/01";
                // 创建日期对象
                var date = new Date(str);
                // 加一天
                date.setDate(date.getDate());
                // 没有格式化的功能，只能一个一个取
                str = date.getFullYear() + '年'
                    // 因为js里month从0开始，所以要加1
                    + (parseInt(date.getMonth()) + 1) + '月'
                    + date.getDate() + '日';
                    console.log(str);
                that.scanDate = str;


                var maxTime = that.maxDate;
                // 转换日期格式
                maxTime = maxTime.replace(/-/g, '/'); // "2010/08/01";
                // 创建日期对象
                var date = new Date(maxTime);
                // 加一天
                date.setDate(date.getDate());
                // 没有格式化的功能，只能一个一个取
                maxTime = date.getFullYear() + '年'
                    // 因为js里month从0开始，所以要加1
                    + (parseInt(date.getMonth()) + 1) + '月'
                    + date.getDate()  + '日';
                    console.log(maxTime);
                that.maxDate = maxTime;

                if(sessionStorage.flag == undefined){
                    sessionStorage.flag = 1;
                    if(that.scanCounts==0 || result == '' ||result == null ||result == undefined){
                        window.location.href = 'http://' + location.host + '/v/sdqp/shareScene.html?openid='+ openid
                    }else{
                        window.location.href = 'http://' + location.host + '/v/sdqp/swiperV.html?openid='+ openid
                        // window.location.href = '../sdqp/swiper.html';
                    }
                }
                return false;
            }
            var javai = vge.sdqp + '/DBTSDQPInterface/user/queryUserWineKingTravel';
            var params={
                openid:openid
                // openid:"o3vIpt3yqF4EDGy389JURyo8TbLE"
            };
            
            vge.callJApi(javai,params,function(jo){
                if(jo.result.businessCode === '0'){
                    var result = jo.reply;
                    sessionStorage.result = JSON.stringify(result);
                    that.scanDate = result.scanDate;
                    that.maxDateScan = result.maxDateScan;     
                    that.queryStartDate= result.queryStartDate;
                    that.maxCounty= result.maxCounty;   
                    that.countyCounts= result.countyCounts;    
                    that.luckCounts= result.luckCounts;
                    that.prizeCount= result.prizeCount;        
                    that.yearScanDays= result.yearScanDays;      
                    that.rankString= result.rankString;
                    that.maxMoney= result.maxMoney; 
                    that.firstSku= result.firstSku; 
                    that.firstSku= result.firstSku;
                    that.queryEndDate= result.queryEndDate;
                    that.lastYearScanDays= result.lastYearScanDays;   
                    that.lateTime= result.lateTime;
                    that.loveScan= result.loveScan;    
                    that.scanCounts=result.scanCounts;    
                    that.workDaysScan= result.workDaysScan;
                    that.scanDays= result.scanDays;    
                    that.maxDate= result.maxDate; 
                    that.maxMoneyCount= result.maxMoneyCount;
                    that.scanMoney= result.scanMoney;           
                    that.loveSku= result.loveSku;

                    var str = that.scanDate;
                    // 转换日期格式
                    str = str.replace(/-/g, '/'); // "2010/08/01";
                    // 创建日期对象
                    var date = new Date(str);
                    // 加一天
                    date.setDate(date.getDate());
                    // 没有格式化的功能，只能一个一个取
                    str = date.getFullYear() + '年'
                        // 因为js里month从0开始，所以要加1
                        + (parseInt(date.getMonth()) + 1) + '月'
                        + date.getDate() + '日';
                    that.scanDate = str;


                    var maxTime = that.maxDate;
                    // 转换日期格式
                    maxTime = maxTime.replace(/-/g, '/'); // "2010/08/01";
                    // 创建日期对象
                    var date = new Date(maxTime);
                    // 加一天
                    date.setDate(date.getDate());
                    // 没有格式化的功能，只能一个一个取
                    maxTime = date.getFullYear() + '年'
                        // 因为js里month从0开始，所以要加1
                        + (parseInt(date.getMonth()) + 1) + '月'
                        + date.getDate()  + '日';
                    that.maxDate = maxTime;

                    if(sessionStorage.flag == undefined){
                        sessionStorage.flag = 1;
                        if(that.scanCounts==0 || result == '' ||result == null ||result == undefined){
                            window.location.href = 'http://' + location.host + '/v/sdqp/shareScene.html?openid='+ openid
                            //  window.location.href = '../sdqp/shareScene.html';
                        }else{
                            window.location.href = 'http://' + location.host + '/v/sdqp/swiperV.html?openid='+ openid
                            // window.location.href = '../sdqp/swiper.html';
                        }
                    }
                }else{
                    // window.location.href = '../sdqp/shareScene.html';
                    console.log('error')
                }
            })
        },

        getNickName(){
            var args = vge.urlparse(location.href);
            var openid = args.openid;
            // var openid = "o3vIpt3yqF4EDGy389JURyo8TbLE";
            var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.sdqpappid;
            var that = this;
            vge.ajxget(requrl, 5000, function (r) {
                try {
                    var o = JSON.parse(r);
                    console.log(o);
                    if (o.subscribe == 0) { //未关注
                        that.nikeName = '   '
                    } else { //已关注用户
                        that.nikeName = o.nickname;
                    }
                } catch (e) {
                    vge.clog('errmsg', [requrl, e]);
                }
            }, function (err) {
                vge.clog('errmsg', [requrl, err]);
            });
        }
    },
    created:function(){
        
    },
    mounted:function(){
        this.getData();
        this.getNickName();
    },      
});
