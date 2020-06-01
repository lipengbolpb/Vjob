
//zj(1),zj(2),zj(3),zj(4),zj(5)->土豪罐，任性罐,傲娇罐,轻松罐,社交罐
//1游轮;  2现金红包;  3猜拳;   4电影票;   5奥古特;

(function () {
    var headimgurl = sessionStorage.headimgurl === undefined ? '/v/zzqp/img/bg/headimg.png' : sessionStorage.headimgurl,
        nickname = sessionStorage.nickname === undefined ? '未知用户' : sessionStorage.nickname,
        totalAccountMoney = 0,
        first = false,
        args = vge.urlparse(location.href);
    if (args.hbopenid === undefined) {
        hbopenid = args.openid;
        openid = sessionStorage.openid;
    } else {
        hbopenid = args.hbopenid;
        openid = args.openid;
    }

    sessionStorage.openid = openid;

    var Vtx = document.getElementById("tx"),
        counts = 0,
        dom_infoKey = '', dom_prizeType = '',
        Vlist = document.getElementById("Vlist"),
        itpl_onenote = document.getElementById("onenote_tpl").innerHTML,//奖品li
        Vlq = document.getElementById("Vlq");

    var Vtjname = document.getElementById("Vtjname"),
        Vtjtel = document.getElementById("Vtjtel"),
        Vtj = document.getElementById("Vtj"),
        Vsta1 = document.getElementsByClassName('sta1')[0],
        Vsta2 = document.getElementsByClassName('sta2')[0],
        Vsta3 = document.getElementsByClassName('sta3')[0],
        Vsta4 = document.getElementsByClassName('sta4')[0],
        Vsta5 = document.getElementsByClassName('sta5')[0],
        Vtjname2 = document.getElementById("Vtjname2"),
        Vtjtel2 = document.getElementById("Vtjtel2"),
        Vtjaddress = document.getElementById("Vtjaddress"),
        jwbtn = document.getElementById("jwdj"),
        Vtjxx = document.getElementById("Vtjxx"),
        Vtjcg = document.getElementById("tjcg");

    var reg2 = /^1[34578]\d{9}$/,//判断电话
        reg3 = /^[\s]/g,//地址判断	
        reg1 = /^[\s]*$/;//判断姓名为空

    info();
    function info() {
        var javai = vge.zzqp + '/DBTHNQPInterface/user/queryShow';//炫遥卡
        var req = {
            "openid": openid
        };
        vge.callJApi(javai, req, function (jo) {
            if (jo.result.code == '0') {
                if (jo.result.businessCode == '0') {
                    if(jo.reply.headImgUrl == '/0'){
                        headimgurl = '/v/zzqp/img/bg/headimg.png';
                    }else if(jo.reply.headImgUrl == undefined){
                        headimgurl = '/v/zzqp/img/bg/headimg.png';
                    }else{
                        headimgurl = jo.reply.headImgUrl === ''?'/v/zzqp/img/bg/headimg.png' : jo.reply.headImgUrl;
                    }
                    nickname = jo.reply.nickName === '' ? '未知用户' : jo.reply.nickName;
                    sessionStorage.nickname = nickname;
                    sessionStorage.headimgurl = headimgurl;
                    $('#Vhead').attr('src', headimgurl);//头像
                    $('.name').html(nickname);
                }
            }
        });
    }

    $('.money').html(sessionStorage.currentMoney);//现金红包

    $('#toMyJp').on('click',function(){
		_hmt.push(['_trackEvent', '点击我的排行', '排行榜', '抽奖结果']);
		location.href = 'http://'+location.host+'/v/zzqp20170815/myJp.html';
	});

    init();
    //我的接口
    function init() {
        var javai = vge.zzqp + '/DBTHNQPInterface/myInfo/queryMyInfo';
        var req = {
            "openid": openid
        };
        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        Vtx.addEventListener('click', give_spack, false);
                        totalAccountMoney = jo.reply.subMoney;
                        $('#totalAccountMoney').html('￥' + jo.reply.subMoney);//用户剩余金额

                        if (jo.reply.userPrizeList.length != 0) {//大奖列表
                            Vlq.addEventListener('click', getList, false);
                            Vlq.style.background = "url(http://" + vge.zzqp_host + "/v/zzqp20170815/img/zj/lq.png) no-repeat center/contain";
                        } else {
                            Vlq.style.background = "#999999";
                        }

                        if (jo.reply.beerTotalCount == undefined) {
                            sessionStorage.beerTotalCount = 1;
                        } else {
                            sessionStorage.beerTotalCount = jo.reply.beerTotalCount;
                        }
                        sessionStorage.userRanking = jo.reply.userRanking;

                        var Month = new Date().getMonth() + 1,
                            year = new Date().getFullYear(),
                            Day = new Date().getDate();
                        Month = Month==12?0:Month;   
                        if (jo.reply.quarterPrizeInfoType == 0) {//预留信息
                            $('#tjxxtip1').css('display', 'none');//排名信息
                            $('#tjxxtip2').css('opacity', '0');
                            $('#tjxxtip').css('display', 'block');//预留信息
                            $('#stopday').html(Month + 1 + '月1日零时');
                            switch (Month) {
                                case 3: $('#jiduNum').html('一'); break;
                                case 6: $('#jiduNum').html('二'); break;
                                case 6: $('#jiduNum').html('三'); break;
                                case 12: $('#jiduNum').html('四'); break;
                                default: $('#jiduNum').html('上');
                            }
                        } else {//领奖排名
                            switch (Month) {
                                case 4: $('#month').html('4'); $('#year').html(year); break;
                                case 7: $('#month').html('7'); $('#year').html(year); break;
                                case 10: $('#month').html('10'); $('#year').html(year); break;
                                case 1: $('#month').html('1'); $('#year').html(year); break;
                                default: ;
                            }
                            $('#tjxxtip1').css('display', 'block');
                            $('#tjxxtip2').css('opacity', '1');
                            $('#tjxxtip').css('display', 'none');
                        }

                        if (jo.reply.isQuarterPrize === '0') {//是否显示酒王领奖按钮
                            $('#jwdj').css('display', 'none');
                        } else {
                            $('#jwdj').css('opacity', 1);
                            $('#jidu').html(jo.reply.quarterPrizeRecord.quarterNum);
                            $('#mingci').html(jo.reply.quarterPrizeRecord.quarterRanking);
                            if (jo.reply.quarterPrizeRecord.quarterRanking < 2) {
                                $('#jlz').html('酒王金牌一枚');
                            } else if (jo.reply.quarterPrizeRecord.quarterRanking < 11) {
                                $('#jlz').html('手机一部');
                            } else if (jo.reply.quarterPrizeRecord.quarterRanking < 1001) {
                                $('#jlz').html('青岛啤酒奥古特一箱');
                            }

                            jwbtn.addEventListener('click', function () {
                                $('#ipt').css('display', 'block');
                                $('.ipt').css('display', 'none'); $('.iptxx').css('display', 'block');
                            }, false);
                            if (jo.reply.isQuarterPrize === '1') {//强制显示填写酒王信息表单
                                document.getElementById("jwmark").style.display = 'block';
                                document.getElementById("jwmark").addEventListener('click', function () {
                                    $('#ipt').css('display', 'block');
                                    $('.ipt').css('display', 'none'); $('.iptxx').css('display', 'block');
                                    document.getElementById("jwmark").style.display = 'none';
                                }, false);
                            }

                            if (jo.reply.quarterPrizeRecord.userName) {//已提交
                                $('#Vtjname2').val(jo.reply.quarterPrizeRecord.userName);
                                $('#Vtjtel2').val(jo.reply.quarterPrizeRecord.phoneNum);
                                $('#Vtjaddress').val(jo.reply.quarterPrizeRecord.address);
                                $('#Vtjxx').html('信息已提交');
                                Vtjname2.readOnly = true;
                                Vtjtel2.readOnly = true;
                                Vtjaddress.readOnly = true;
                                Vtjxx.removeEventListener('click', jwxx, false);
                            }
                        }

                        function getList() {//领奖列表
                            Vlq.removeEventListener('click', getList, false);
                            Vlq.addEventListener('click', lqjp, false);
                            document.getElementById('music_3').play();
                            $('#fyb2').fadeIn();
                            var j = 0, priceList = jo.reply.userPrizeList;
                            var params = {}, hs = [];
                            for (j = 0; j < priceList.length; j++) {
                                if (jo.reply.userPrizeList[j].prizeType == '1') {
                                    params.pricelevel = '二等奖';
                                    params.pricename = '奥古特啤酒×12';
                                } else if (jo.reply.userPrizeList[j].prizeType == '3') {
                                    params.pricelevel = '三等奖';
                                    params.pricename = '电影票';
                                } else {
                                    params.pricelevel = '一等奖';
                                    params.pricename = '歌诗达游轮';
                                }
                                params.useStatus = priceList[j].useStatus;
                                params.infoKey = priceList[j].infoKey;
                                params.prizeType = priceList[j].prizeType;
                                params.gettime = priceList[j].earnTime;//中奖时间
                                params.ticketCode = priceList[j].ticketCode;
                                Vlist.innerHTML += vge.renderTpl(itpl_onenote, params);
                                $('#Vlist').find("li:even").css('background', '#93c96f');
                                $('#Vlist').find("li:odd").css('background', '#cbff99');
                            }

                            var Vwlq = Vlist.getElementsByTagName('a');

                            for (var t = 0; t < Vwlq.length; t++) {
                                if (Vwlq[t].getAttribute('useStatus') == '0') {
                                    Vwlq[t].innerHTML = '领取';
                                    Vwlq[t].addEventListener('click', function () {
                                         								// _hmt.push(['_trackEvent', 'click', '领取奖品', '我的']);
                                        dom_infoKey = this.getAttribute('infoKey');
                                        dom_prizeType = this.getAttribute('prizeType');
                                        if (dom_prizeType == '3') {
                                            concern();//判断关注
                                        } else if(dom_prizeType == '1'){
                                            if (jo.reply.isUserAddressFlag == '0') {
                                                $('#ipt').css({ 'display': 'block', 'z-index': '10000' });
                                                $('#ipt').css('display', 'block');
                                                $('#fyb2').css('display', 'none');
                                            } else if (jo.reply.isUserAddressFlag != '0') {
                                                give_jp();
                                            }
                                        }else{
                                            $('.prizeMsg').css('display', 'block');
                                            if (jo.reply.isUserAddressFlag == '0') {
                                                $('#ipt').css({ 'display': 'block', 'z-index': '10000' });
                                                $('#ipt').css('display', 'block');
                                                $('#fyb2').css('display', 'none');
                                            } else if (jo.reply.isUserAddressFlag != '0') {
                                                give_jp();
                                            }
                                        }
                                    }, false);
                                } else {
                                    Vwlq[t].innerHTML = '已领取';
                                    Vwlq[t].style.background = 'none';
                                    if (Vwlq[t].getAttribute('prizeType') == '3') {
                                        Vwlq[t].innerHTML = '查看';
                                        Vwlq[t].style.background = '#009749';
                                        Vwlq[t].addEventListener('click', function () {
                                            location.href = 'http://' + vge.zzqp_host + '/v/zzqp20170815/ticket.html?a=1&ticketCode=' + this.getAttribute('ticketCode') + '&datedTime=2017-05-11';
                                        }, false);
                                    }
                                }


                            }
                        }

                        var l = jo.reply.userPrizeList.length;
                        for (var i = 0; i < l; i++) {//遍历数组userPrize
                            if (jo.reply.userPrizeList[i].useStatus == '0' && counts < '3') {//0为未使用，1为已使用
                                switch (jo.reply.userPrizeList[i].prizeType) {
                                    case '1'://奥古特二等奖
                                        createImg(2);
                                        break;
                                    case '3'://电影票三等奖
                                        createImg(3);
                                        break;
                                    case '5'://游轮一等奖
                                        createImg(1);
                                        break;
                                }
                            }
                            if (jo.reply.userPrizeList[i].useStatus == '1') {//都已使用或者从未中奖
                                first = true;
                            }
                        }
                        if (first || l == 0) {
                            Vlq.removeEventListener('click', lqjp, false);
                        }
                    } else if (jo.result.businessCode === '1') { //1
                        $('#comTips').css('display', 'block');
                        $('#fail').css('display', 'block');
                        $('#tip').html('系统开了个小差，请稍后重试！');
                    }
                } else { //code!='0'
                    $('#comTips').css('display', 'block');
                    $('#fail').css('display', 'block');
                    $('#tip').html('系统开了个小差，请稍后重试！');
                }
            });
    }

    //领取实物奖
    function give_jp() {
        _hmt.push(['_trackEvent', '点击领取', '实物奖', '我的']);
        var javai = vge.zzqp + '/DBTHNQPInterface/myInfo/getPrizeInfo';
        var req = {
            "openid": openid,
            "infoKey": dom_infoKey,//奖品主键
            "userName": Vtjname.value,//联系人姓名（用户存在地址时可为null）
            "phoneNum": Vtjtel.value,//联系人手机号（用户存在地址时可为null）
            "prizeType": dom_prizeType//奖品类型 1:实物奖（奥古特）, 3:电影票, 5:游轮"
        };

        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {//用户信息提交成功
                        tj1();
                    } else if (jo.result.businessCode == '4') {
                        $('#comTips').css({ 'display': 'block', 'z-index': '999999999' });
                        $('#fail').css('display', 'block');
                        if (dom_prizeType == 5) {
                            $('#tip').html('此奖项为旅游项目，需要在规定时间内兑奖。<br />兑奖截止日期2017年7月25日已截止。');
                        } else {
                            $('#tip').html('兑奖日期已截止！');
                        }
                    } else {//提交失败
                        tj2();
                    }
                } else { //code!='0'
                    $('#comTips').css('display', 'block');
                    $('#fail').css('display', 'block');
                    $('#tip').html('系统开了个小差，请稍后重试！');
                }
            });
    }
    $('.attention').on('click', function () {
        _hmt.push(['_trackEvent', '点击关注', '引导关注', '我的']);
        window.location.href = 'http://' + vge.zzqp_host + '/v/zzqp20170815/attention.html';//关注页面
    });
    function concern() {//判断关注接口
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + vge.zzqpappid;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == 0) {//未关注
                    $('#gzwx').css('display', 'block');

                } else {//已关注用户
                    give_jp();
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) { vge.clog('errmsg', [requrl, err]); });
    }

    function lqjp() {//显示大奖列表
        _hmt.push(['_trackEvent', '点击领取', '奖品列表', '我的']);
        document.getElementById('music_3').play();
        $('#fyb2').fadeIn();
    }

    Vtjname.addEventListener('keyup', function () {
        if (Vtjname.value != null && Vtjname.value != '') {
            Vsta1.className = 'right sta1';
        } else {
            Vsta1.className = 'wrong sta1';
        }
    }, false);
    Vtjtel.addEventListener('keyup', function () {
        if (reg2.test(Vtjtel.value)) {
            Vsta2.className = 'right sta2';
        } else {
            Vsta2.className = 'wrong sta2';
        }
    }, false);
    Vtj.addEventListener('click', function () {
        var nameValue = Vtjname.value.trim();
        if (Vtjname.value == null || Vtjname.value == '') {
            $('#comTips').css('display', 'block');
            $('#fail').css('display', 'block');
            $('#tip').html('请填写正确的姓名哦！');
        } else if (!reg2.test(Vtjtel.value)) {
            $('#comTips').css('display', 'block');
            $('#fail').css('display', 'block');
            $('#tip').html('请填写正确的手机号！');
        } else {
            if (dom_prizeType == '3') {//电影票
                concern();//判断关注
            } else {
                give_jp();
            }
        }
    }, false);


    Vtjxx.addEventListener('click', jwxx, false);
    function jwxx() {//酒王信息提交
        _hmt.push(['_trackEvent', '点击提交', '酒王信息提交', '我的']);
        var nameValue2 = Vtjname2.value.trim();
        if (Vtjname2.value == null || Vtjname2.value == '') {
            $('#comTips').css('display', 'block');
            $('#fail').css('display', 'block');
            $('#tip').html('请填写正确的姓名哦！');
        } else if (!reg2.test(Vtjtel2.value)) {
            $('#comTips').css('display', 'block');
            $('#fail').css('display', 'block');
            $('#tip').html('请填写正确的手机号！');
        } else if (Vtjaddress.value == null || Vtjaddress.value == '') {
            $('#comTips').css('display', 'block');
            $('#fail').css('display', 'block');
            $('#tip').html('请填写正确的收货地址！');
        } else {
            tjxx();
        }
    }
    function tjxx() {//酒王信息提交
        var javai = vge.zzqp + '/DBTHNQPInterface/myInfo/getQuarterPrize';
        var req = {
            "openid": openid,
            "userName": $('#Vtjname2').val(),
            "phoneNum": $('#Vtjtel2').val(),
            "address": $('#Vtjaddress').val()
        };
        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        tj1();
                    } else {
                        tj2();
                    }
                } else {
                    $('#comTips').css('display', 'block');
                    $('#fail').css('display', 'block');
                    $('#tip').html('系统开了个小差，请稍后重试！！');
                }
            });
    }


    Vtjname2.addEventListener('keyup', function () {
        if (Vtjname2.value != null && Vtjname2.value != '') {
            Vsta3.className = 'right sta3';
        } else {
            Vsta3.className = 'wrong sta3';
        }
    }, false);
    Vtjtel2.addEventListener('keyup', function () {
        if (reg2.test(Vtjtel2.value)) {
            Vsta4.className = 'right sta4';
        } else {
            Vsta4.className = 'wrong sta4';
        }
    }, false);
    Vtjaddress.addEventListener('keyup', function () {
        if (!reg3.test(Vtjaddress.value)) {
            Vsta5.className = 'right sta5';
        } else {
            Vsta5.className = 'wrong sta5';
        }
    }, false);

    //创建中奖img图片
    function createImg(x) {
        var jpimg = document.createElement("img");
        jpimg.src = "/v/zzqp20170815/img/zj/jp" + x + ".png?v=1";
        $('#jplb').append(jpimg);
        counts++;
    }

    function give_spack() {//提现
        _hmt.push(['_trackEvent', '点击提现', '提现', '我的']);
        document.getElementById('music_3').play();
        Vtx.removeEventListener('click', give_spack, false);
        var javai = vge.zzqp + '/DBTHNQPInterface/gifts/getGiftspack';
        var req = {
            "openid": openid,
            "hbopenid": hbopenid,
            "withdrawMoney": totalAccountMoney
        };
        vge.callJApi(javai, req,
            function (jo) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        $('.tx1').show();
                        $('.money').html('￥0.00');
                    } else if (jo.result.businessCode === '-1') {
                        $('#comTips').css('display', 'block');
                        $('#fail').css('display', 'block');
                        $('#tip').html('系统升级中...');
                    } else if (jo.result.businessCode === '-2') {
                        $('#comTips').css('display', 'block');
                        $('#fail').css('display', 'block');
                        $('#tip').html('提现操作过于频繁');
                    } else if (jo.result.businessCode === '4') {
                        $('#comTips').css('display', 'block');
                        $('#fail').css('display', 'block');
                        $('#tip').html('提现处理中，请稍后查看详细记录');
                    } else if (jo.result.businessCode === '1') {
                        $('#tx2').show();
                    } else if (jo.result.businessCode === '2') {
                        $('#comTips').css('display', 'block');
                        $('#fail').css('display', 'block');
                        $('#tip').html('系统开了个小差');
                        Vtx.addEventListener('click', give_spack, false);
                    } else if (jo.result.businessCode === '3') {
                        $('#rzzs').css('display', 'block');
                        Vtx.addEventListener('click', give_spack, false);
                    } else {
                        $('#comTips').css('display', 'block');
                        $('#fail').css('display', 'block');
                        $('#tip').html('系统开了个小差');
                    }
                } else { //code!='0'
                    $('#comTips').css('display', 'block');
                    $('#fail').css('display', 'block');
                    $('#tip').html('系统开了个小差，请稍后重试！');
                }
            });
    }


    function tj1() {
        if (dom_prizeType == '3') {
            $('.prizeTier').html('领取成功！<br>请查看您公众号信息');
            $('.swj').on('click', function () {
                location.reload();
            });
        }
        $('#ipt').hide();
        $('#prizeTier').show();
        $('#prizeTier').css('zIndex', '100001');
    }
    function tj2() {
        $('#ipt').hide();
        $('#noprizeTier2').show();
        $('#noprizeTier2').css('zIndex', '100001');
    }
    $('#Vclose').click(function () {
        $('#comTips').hide();
    });
    Vtjcg.addEventListener('click', function () {
        window.location.reload();
    }, false);
})();



