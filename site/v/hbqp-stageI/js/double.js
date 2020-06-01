$(document).ready(function () {
    // 接口
    var Port_GiveUp = vge.hbqp + '/DBTHBQPInterface/doubleprize/cancelLotteryPrize'; //放弃抽奖接口
    var Port_Lottery = vge.hbqp + '/DBTHBQPInterface/doubleprize/lotteryPrize'; //抽奖接口
    var Port_Check = vge.hbqp + '/DBTHBQPInterface/user/getCaptcha'; //获取验证码接口
    var Port_Sub = vge.hbqp + '/DBTHBQPInterface/user/savePrize'; //大奖提交接口
    var Port_QueryList = vge.hbqp + '/DBTHBQPInterface/gifts/queryPrizeList'; //大奖列表查询接口
    var Port_FindPrize = vge.hbqp + '/DBTHBQPInterface/user/findPrize'; //一等奖查询接口
    var Port_Rule = vge.hbqp + '/DBTHBQPInterface/doubleprize/findActivity'; //活动说明接口

    var dom_get = document.getElementsByClassName('doubleYz')[0];

    // 获取扫码返回数据
    var doublePrize = {};
    if (sessionStorage.getItem('doublePrize')) {
        doublePrize = JSON.parse(sessionStorage.getItem('doublePrize'));
    }
    // 变量记录未领取奖品的个数
    var prizeNum = doublePrize.doublePirzeNuUsedNum;
    // 变量记录从列表点击领取还是抽奖领取
    var prizeSource = true;

    var currentPageNo = 1;
    var currentPageYes = 1;
    var count = 10;
    /**
     * 第一次点击按钮时，请求接口，将li标签用变量保存
     * 以后再点击时，清空，将该保存数据放入
     */
    //活动开启，在拆红包之前显示广告页、中奖列表页

    $('.get,.open').one('click', function () {
        $('.get,.open').unbind();
		if (doublePrize.doublePrizeFlag == '1') {
		    $('.double').show();
		} else {
		    $('.double').hide();
		    return;
		}
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
                $('.double').show(); //遮挡界面，防止用户点击
                if (doublePrize.doublePrizeBeginFlag == '1') {
                    notice(); //领奖按钮，已中奖品数量
                    // bord(); //顶部轮播通知
                }
                if (doublePrize.doublePrizeLottery == '1') { //本次是否中奖
                    // 本次可以抽奖，不隐藏double层，用户两秒无法点击，两秒后弹出抽奖
                    // 累计支数
                    // alert(doublePrize.doublePrizePeriodName);
                    // alert(typeof doublePrize.doublePrizePeriodName);
                    // alert(doublePrize.doublePrizePeriodName == undefined);
                    // if (doublePrize.doublePrizePeriodName == undefined) {
                    //     $('.doubleAlertTitle').html('您的累计支数');
                    // } else {
                    //     $('.doubleAlertTitle').html('您的' + doublePrize.doublePrizePeriodName + '累计支数');
                    // }
                    // $('.doubleAlertNum').text(doublePrize.doublePrizePeriodScanNum);
                    setTimeout(function () {
                        $('.doubleAlert').show();
                    }, 1000);
                } else {
                    // 本次不能抽奖，隐藏double层，继续红包流程
                    $('.double').hide();
                }
            });
        }, 1000);
    });

    // if (doublePrize.doublePrizePopup == '1') { //广告开关
    //     // 弹出广告页
    //     $('.doubleAdTitle').text(doublePrize.doublePrizeSummaryTitle);
    //     $('#doubleAdMain').text(doublePrize.doublePrizeSummary);
    //     $('.doubleAd').show();
    //     // 查看活动详情
    //     $('.doubleCk').on('click', function () {
    //         $('#signContent').html(doublePrize.doublePrizeDesc);
    //         $('.signRule').show();
    //     });
    //     // 关闭广告页按钮事件
    //     $('.doubleAdClose').on('click', function () {
    //         // 关闭广告页
    //         $('.doubleAd').hide();
    //         // 显示二重惊喜
    //         if (doublePrize.doublePrizeBeginFlag == '1') {
    //             surprise();
    //         } else {
    //             $('.double').hide();
    //         }
    //     });
    // } else {
    //     //不弹出广告页
    //     $('.doubleAd').hide();
    //     $('.double').hide();
    // }

    // 二重惊喜相关函数，配置好内容，然后弹出
    function surprise() {
        /**
         * 奖品滚动
         */
        // 初始化奖品列表
        if (doublePrize.doublePrizeEarnNum) {
            var tpl1 = '<li><span>{{prize}}</span>已中出<span>{{num}}</span>个</li>';
            var l = doublePrize.doublePrizeEarnNum.length;
            for (var i = 0; i < l; i++) {
                var template = tpl1.replace('{{prize}}', doublePrize.doublePrizeEarnNum[i].prizeName)
                    .replace('{{num}}', doublePrize.doublePrizeEarnNum[i].prizeTotal);
                $('.doubleSurpriseList').append(template);
            }
            if (l > 3) { //大于3个时开始滚动
                prizeScroll(true);
            }
        }
        var timer1 = null;

        function prizeScroll(flag) {
            if (flag == false) {
                return;
            }
            $('.doubleSurpriseList>li:first').css('marginTop', '-30px');
            clearTimeout(timer1);
            timer1 = setTimeout(function () {
                var html = $('.doubleSurpriseList>li:first').html();
                $('.doubleSurpriseList').append('<li>' + html + '</li>');
                $('.doubleSurpriseList>li:first').remove();
                prizeScroll(true);
            }, 1000);
        }
        /**
         * 中奖者列表滚动
         */
        // 初始化中奖者列表
        if (doublePrize.doublePrizeEarnUser) {
            var tpl2 = '<li><span>{{name}}</span><span>{{phone}}</span><span>{{prize}}</span></li>';
            var ll = doublePrize.doublePrizeEarnUser.length;
            for (var k = 0; k < ll; k++) {
                var template = tpl2.replace('{{name}}', doublePrize.doublePrizeEarnUser[k].userName)
                    .replace('{{phone}}', doublePrize.doublePrizeEarnUser[k].phoneNum)
                    .replace('{{prize}}', doublePrize.doublePrizeEarnUser[k].prizeName);
                $('.doubleSurpriseLucky').append(template);
            }
            if (ll > 4) { //大于4个时开始滚动
                luckyScroll(true);
            }
        }

        var timer2 = null;

        function luckyScroll(flag) {
            if (flag == false) {
                return;
            }
            $('.doubleSurpriseLucky>li:first').css('marginTop', '-30px');
            clearTimeout(timer2);
            timer2 = setTimeout(function () {
                var html = $('.doubleSurpriseLucky>li:first').html();
                $('.doubleSurpriseLucky').append('<li>' + html + '</li>');
                $('.doubleSurpriseLucky>li:first').remove();
                luckyScroll(true);
            }, 1000);
        }

        // 显示二重惊喜
        $('.doubleSurprise').show();

        // 关闭二重惊喜按钮
        $('.doubleSurpriseClose').on('click', function () {
            // 跳出递归，结束滚动
            prizeScroll(false);
            luckyScroll(false);
            // 隐藏奖品滚动页面
            $('.doubleSurprise').hide();
            $('.double').hide();
        });
    }

    // 顶部滚动条
    function bord() {
        /**
         * 顶部滚动广播
         */
        // 返利总金额
        $('.doubleTransformMoney').text(sessionStorage.allAccountMoney == 'undefined' ? '0' : sessionStorage.allAccountMoney);
        // 活动参与次数
        $('.doubleTransformNum').text(doublePrize.doublePrizeScanNum == 'undefined' ? '0' : doublePrize.doublePrizeScanNum);
        // 横向滚动
        var timer = null;
        var w = document.body.clientWidth;

        function topScroll(flag) {
            if (flag == false) {
                return;
            }
            $('.doubleTransform>p:first').css('marginLeft', -1.5 * w + 'px');
            clearTimeout(timer);
            timer = setTimeout(function () {
                $('.doubleTransform').append('<p class="doubleTransformP">您的红包累计已领取' +
                    '<span>' + sessionStorage.allAccountMoney + '</span>元' +
                    '<span class="doubleNbsp"></span>二重惊喜活动累计支数' +
                    '<span>' + doublePrize.doublePrizeScanNum + '</span>支</p>');
                $('.doubleTransform>p:first').remove();
                topScroll(true);
            }, 5000);
        }
        topScroll(true);

        $('.doubleTransform').show();
    }

    // 进入奖品列表的按钮
    function notice() {
        /**
         * 有未领奖品
         * 没有未领奖品
         */
        if (Number(prizeNum) >= 1) {
            $('.doubleBtnTitle').text('您已中奖');
            $('.doubleBtnNum').text(prizeNum);
        } else {
            $('.doubleBtnNum').hide();
            $('.doubleBtnTitle').text('中奖记录');
        }
        $('.doubleBtn').show();
    }

    // 放弃抽奖
    $('.doubleAlertNo').one('click', function () {
        var req = {
            "openid": sessionStorage.openid,
            "vcodeActivityKey": doublePrize.doublePrizeActivityKey
        };
        $.ajax({
            type: "POST",
            url: Port_GiveUp,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        $('.doubleAlert').hide();
                        $('.double').hide();
                    } else if (jo.result.businessCode === '3') { //参数不完整
                        title_tip('尊敬的用户', '参数不完整', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    });

    // 抽奖
    $('.doubleAlertYes').one('click', function () {
        var req = {
            "openid": sessionStorage.openid,
            "vcodeActivityKey": doublePrize.doublePrizeActivityKey,
            "skuKey": sessionStorage.skukey,
            "prizeVcode": sessionStorage.prizeVcode,
            "longitude": sessionStorage.longitude,
            "latitude": sessionStorage.latitude
        };
        $.ajax({
            type: "POST",
            url: Port_Lottery,
            dataType: 'json',
            data: JSON.stringify(req),
            success: function (jo, status, xhr) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        sessionStorage.prizeInfoKey = jo.reply.prizeInfoKey;
                        $('.doubleGetPrize').text(jo.reply.prizeName);
                        if (jo.reply.prizeImg.indexOf('R.png') != -1 || jo.reply.prizeImg.indexOf('r.png') != -1) {
							$('.doubleGetBtn').attr('src', '/v/hbqp-stageI/img/20190423/double_prize.png');//青啤有一套
                            $('.doubleGet').show();
                            $('.doubleAlert').hide();
                        }else if(jo.reply.prizeImg.indexOf('/6.png') != -1){
							$('.doubleGetBtn').attr('src', '/v/hbqp-stageI/img/20190423/double_prize_2.png');//李宗盛门票
                            $('.doubleGet').show();
                            $('.doubleAlert').hide();
                        }else{
							$('.doubleNone').show();
						}
                        prizeSource = true;
                    } else if (jo.result.businessCode === '1') { //抽奖失败
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    } else if (jo.result.businessCode === '2') { //未中奖
                        $('.doubleNone').show();
                    } else if (jo.result.businessCode === '3') { //参数不完整
                        title_tip('尊敬的用户', '参数不完整', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else if (jo.result.code == '1') { //失败
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);// 状态码
				console.log(XMLHttpRequest.readyState);// 状态
				console.log(textStatus);// 错误信息   
				title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    });

    // 抽奖领取按钮
    $('.doubleGetBtn').one('click', function () {
        // 显示填写信息页面
        $('.doubleInfo').show();
        $('.doubleGet').hide();
    });
    // 抽奖后未中奖按钮
    $('.doubleNoneImg').one('click', function () {
        $('.double').hide();
    });

    var reg1 = /^1[0-9]{10}$/, //验证手机号
        reg2 = /^[1-9][0-9xX]{17}$/, //验证身份证号
        reg3 = /^[0-9]{4}$/;
    var countdowntimer = null;
    $('.doubleYz').on('click', function () {
        getYzcode();
    });

    $('.doubleInfoBtn').on('click', function () {
		if(sessionStorage.success){
			$('.double,.doubleInfo').hide();
			if (!prizeSource) {
			    prizeNum--;
			    notice();
			}
		}else{
			send();
		}
    });
    // 提交信息成功后点击确定按钮
    // $('.doubleSuccessBtn').on('click', function () {
    //     $('.doubleSuccess').hide();
    //     $('.double').hide();
    //     if (!prizeSource) {
    //         prizeNum--;
    //         notice();
    //     }
    // });

    function getYzcode() {
        if ($('.doubleName').val() === '' || $('.doubleName').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if ($('.doubleAddress').val() === '' || $('.doubleAddress').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
        } else if (!reg1.test($('.doubleTel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else {
            if ($('.doubleYz').val() === '获取验证码' || $('.doubleYz').val() === '重新获取') {
				$('.doubleYz').unbind();
                getCheckCode(function () {
                    countdown(dom_get, 60);
                });
            } else {
                $('.doubleYz').off('click');
            }
        }
    }

    function countdown(tag, time) {
        var i = time;
        tag.value = i + '秒';
        countdowntimer = setInterval(function () {
            i--;
            tag.value = i + '秒';
            if (i <= 0) {
                tag.value = '重新获取';
                i = time;
                clearInterval(countdowntimer); // 清除定时器
                $('.doubleYz').on('click', function () {
                    getYzcode();
                });
                countdowntimer = null;
            }
        }, 1000);
    }

    function getCheckCode(cb) { // 获取手机验证码
        var req = {
            "phonenum": $('.doubleTel').val()
        };
        $.ajax({
            type: "POST",
            url: Port_Check,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                if (jo.result.code == '0') {
                    if (jo.result.businessCode == '0') {
                        cb(); //成功，开始倒计时
                    } else if (jo.result.businessCode === '2') {
                        title_tip('尊敬的用户', '您填写的手机号错误，发送验证码失败！', '我知道了');
                    } else { //1 为服务器报错
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    function send() {
        if ($('.doubleName').val() === '' || $('.doubleName').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
        } else if ($('.doubleAddress').val() === '' || $('.doubleAddress').val().indexOf(' ') !== -1) {
            title_tip('提 示', '请输入正确的收货地址哦！~', '我知道了');
        } else if (!reg1.test($('.doubleTel').val())) {
            title_tip('提 示', '请填写正确的手机号！~', '我知道了');
        } else {
			sub_message();
        }
    }

    function sub_message() { // 提交注册信息
        var req = {
            "openid": sessionStorage.openid,
            "unionid": sessionStorage.unionid, //广西、浙江
            "hbopenid": sessionStorage.hbopenid, //广西、浙江
            "address": $('.doubleAddress').val(),
            "username": $('.doubleName').val(),
            "idcard": "idcard",
            "phonenum": $('.doubleTel').val(),
            "grandPrizeType": '',
            "prizeVcode": '',
            "prizeInfoKey": sessionStorage.prizeInfoKey, //大奖记录主键，从抽奖时获取
            "captcha": $('.doubleCode').val()
        };
        $.ajax({
            type: "POST",
            url: Port_Sub,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        // $('.doubleInfo').hide();
                        // $('.doubleSuccess').show();
                        // $('.doubleName').val('');
                        // $('.doubleAddress').val('');
                        // $('.doubleIdcard').val('');
                        // $('.doubleTel').val('');
                        // $('.doubleCode').val('');
                        clearInterval(countdowntimer);
                        $('.doubleYz').val('获取验证码');
						$('.zhang').css('display','block');
						$('.doubleInfoBtn').val('我知道了');
						sessionStorage.success = true;
                    } else if (jo.result.businessCode == '1') { //1
                        title_tip('提 示', '验证码已失效', '我知道了');
                    } else if (jo.result.businessCode == '2') { //2
                        title_tip('提 示', '您填写的验证码有误', '我知道了');
                    } else if (jo.result.businessCode == '-1') {
                        title_tip('提 示', '系统升级中...', '我知道了');
                    } else if (jo.result.businessCode == '4') {
                        title_tip('提 示', '兑奖截止时间已过期', '我知道了');
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    $('.doubleBtn').on('click', function () {
        if (Number(doublePrize.doublePirzeNuUsedNum) >= 1) { //有未领取
            getListNo(true);
        } else { //没有未领取
            // 调接口，查询未领奖品列表
            getListYes(true);
        }
    });

    function initList(list, flag, cb) { //显示列表
        // 未领奖
        var tpl1 = '<li>' +
            '<img src="{{prizeImg}}">' +
            '<div><p>{{prizeName}}</p><p>中奖时间：<span>{{earnTime}}</span></p><p>领奖截止：<span>{{expireTime}}</span></p></div>' +
            '<img src="/v/hbqp-stageI/img/double/prize-line.png">' +
            '<input type="button" value="去领奖" key={{key}} class="unuseBtn">' +
            '</li>';
        // 已过期
        var tpl2 = '<li>' +
            '<img src="{{prizeImg}}" class="doubleGray">' +
            '<div><p>{{prizeName}}</p><p>中奖时间：<span>{{earnTime}}</span></p><p>领奖截止：<span>{{expireTime}}</span></p></div>' +
            '<img src="/v/hbqp-stageI/img/double/prize-line.png">' +
            '<img src="/v/hbqp-stageI/img/double/getted.png">' +
            '</li>';
        // 已领取
        var tpl3 = '<li>' +
            '<img src="{{prizeImg}}">' +
            '<div><p>{{prizeName}}</p><p>领奖时间：<span>{{userTime}}</span></p></div>' +
            '<img src="/v/hbqp-stageI/img/double/prize-line.png">' +
            '<input type="button" value="查看" key={{key}} class="useBtn">' +
            '</li>';
        if (flag == true) { //未领取界面
            for (var i = 0; i < list.length; i++) {
                var template = '';
                if (list[i].expireFlag == '1') { //兑奖截止标志，1为已过期，应置灰
                    template = tpl2.replace('{{prizeImg}}', list[i].prizeImg)
                        .replace('{{prizeName}}', list[i].prizeName)
                        .replace('{{earnTime}}', list[i].earnTime)
                        .replace('{{expireTime}}', list[i].expireTime);
                } else {
                    template = tpl1.replace('{{prizeImg}}', list[i].prizeImg)
                        .replace('{{prizeName}}', list[i].prizeName)
                        .replace('{{earnTime}}', list[i].earnTime)
                        .replace('{{expireTime}}', list[i].expireTime)
                        .replace('{{key}}', list[i].infoKey);
                }
                $('.doubleGetMore').before(template);
            }
            if ($('.doubleListDetailed>li').length >= 1) {
                $('.doubleListNone').css('display', 'none');
                $('.doubleListDetailed').css('display', 'block');
            } else {
                $('.doubleListNone').attr('src', '/v/hbqp-stageI/img/double/list-empty.png');
                $('.doubleListNone').css('display', 'block');
                $('.doubleListDetailed').css('display', 'none');
            }
        } else { //已领取界面
            for (var i = 0; i < list.length; i++) {
                var template = '';
                template = tpl3.replace('{{prizeImg}}', list[i].prizeImg)
                    .replace('{{prizeName}}', list[i].prizeName)
                    .replace('{{userTime}}', list[i].earnTime)
                    .replace('{{key}}', list[i].infoKey);
                $('.doubleGetMore').before(template);
            }
            if ($('.doubleListDetailed>li').length >= 1) {
                $('.doubleListNone').css('display', 'none');
                $('.doubleListDetailed').css('display', 'block');
            } else {
                $('.doubleListNone').attr('src', '/v/hbqp-stageI/img/double/list-none.png');
                $('.doubleListNone').css('display', 'block');
                $('.doubleListDetailed').css('display', 'none');
            }
        }
        clickEvent();
    }

    // 获取未领奖品列表，并显示
    function getListNo(flag) {
        if (flag == true) {
            $('.doubleListDetailed').empty();
            $('.doubleListDetailed').append('<p class="doubleGetMore"></p>');
        }
        currentPageYes = 1;
        var useStatus = 0;
        var req = {
            "openid": sessionStorage.openid,
            "unionid": sessionStorage.unionid,
            "hbopenid": sessionStorage.hbopenid,
            "vcodeActivityKey": doublePrize.doublePrizeActivityKey,
            "useStatus": useStatus, //1已领取，0未领取
            "currentPage": currentPageNo,
            "count": count
        };
        $.ajax({
            type: "POST",
            url: Port_QueryList,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        // 总扫码次数
                        $('.doubleListNum').text(jo.reply.scanNum);
                        initList(jo.reply.prizeRecordAry, true);
                        $('.doubleListNo').addClass('doubleActive');
                        $('.doubleListYes').removeClass('doubleActive');
                        $('.doubleList').show();
                        $('.double').show();
                        if (jo.reply.prizeRecordAry.length < count) {
                            $('.doubleGetMore').text('没有更多了');
                            $('.doubleGetMore').off('click');
                        } else {
                            $('.doubleGetMore').text('加载更多');
                            $('.doubleGetMore').on('click', function () {
                                currentPageNo++;
                                getListNo(false);
                            });
                        }
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    // 获取已领奖品列表，并显示
    function getListYes(flag) {
        if (flag == true) {
            $('.doubleListDetailed').empty();
            $('.doubleListDetailed').append('<p class="doubleGetMore"></p>');
        }
        currentPageNo = 1;
        var useStatus = 1;
        var req = {
            "openid": sessionStorage.openid,
            "unionid": sessionStorage.unionid,
            "hbopenid": sessionStorage.hbopenid,
            "vcodeActivityKey": doublePrize.doublePrizeActivityKey,
            "useStatus": useStatus, //1已领取，0未领取
            "currentPage": currentPageYes,
            "count": count
        };
        $.ajax({
            type: "POST",
            url: Port_QueryList,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        // 总扫码次数
                        $('.doubleListNum').text(jo.reply.scanNum);
                        initList(jo.reply.prizeRecordAry, false);
                        $('.doubleListYes').addClass('doubleActive');
                        $('.doubleListNo').removeClass('doubleActive');
                        $('.doubleList').show();
                        $('.double').show();
                        if (jo.reply.prizeRecordAry.length < count) {
                            $('.doubleGetMore').text('没有更多了');
                            $('.doubleGetMore').off('click');
                        } else {
                            $('.doubleGetMore').text('加载更多');
                            $('.doubleGetMore').on('click', function () {
                                currentPageYes++;
                                getListYes(false);
                            });
                        }
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    }

    //点击已领取按钮
    $('.doubleListYes').on('click', function () {
        getListYes(true);
    });
    // 点击未领取按钮
    $('.doubleListNo').on('click', function () {
		$('.doubleName').val('');
		$('.doubleAddress').val('');
		$('.doubleIdcard').val('');
		$('.doubleTel').val('');
		$('.doubleCode').val('');
		$('.zhang').css('display','none');
        getListNo(true);
    });
    // 返回按钮
    $('.doubleListBack').on('click', function () {
        $('.doubleList').hide();
        $('.double').hide();
    });
    // 列表页的活动说明
    $('.doubleListRuleP').on('click', function () {
        var req = {
            "openid": sessionStorage.openid,
            "vcodeActivityKey": doublePrize.doublePrizeActivityKey
        }
        $.ajax({
            type: "POST",
            url: Port_Rule,
            data: JSON.stringify(req),
            dataType: 'json',
            success: function (jo, status, xhr) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        $('#signContent').html(jo.reply.activityDesc);
                        $('.signRule').show();
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        });
    });

    function clickEvent() {
        for (var i = 0; i < document.getElementsByClassName('unuseBtn').length; i++) {
            (function (i) {
                $('.unuseBtn').eq(i).on('click', function () {
                    sessionStorage.prizeInfoKey = $('.unuseBtn').eq(i).attr('key');
                    $('.doubleList').hide();
                    $('.doubleInfo').show();
                    prizeSource = false;
                });
            })(i);
        }

        for (var k = 0; k < document.getElementsByClassName('useBtn').length; k++) {
            (function (k) {
                $('.useBtn').eq(k).on('click', function () {
                    var req = {
                        "openid": sessionStorage.openid,
                        "prizeInfoKey": $('.useBtn').eq(k).attr('key')
                    };
                    $.ajax({
                        type: "POST",
                        url: Port_FindPrize,
                        data: JSON.stringify(req),
                        dataType: 'json',
                        success: function (jo, status, xhr) {
                            if (jo.result.code === '0') {
                                if (jo.result.businessCode === '0') {
                                    $('.doubleListName').val(jo.reply.userName);
                                    $('.doubleListAddress').val(jo.reply.address);
                                    $('.doubleListIdcard').val(jo.reply.idCard);
                                    $('.doubleListTel').val(jo.reply.phoneNum);
                                    $('.doubleListAlert').show();
                                } else {
                                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                                }
                            } else { //code!='0'
                                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                            }
                        },
                        error: function (res, status, xhr) {
                            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        }
                    });
                });
            })(k);
        }
    }

    $('.doubleListAlertClose').on('click', function () {
        $('.doubleListAlert').hide();
    });

    // 关闭活动说明
    $('#signBack').on('click', function () {
        $('.signRule').hide();
    });
	// 关闭填写信息
	$('#infoBack').on('click', function () {
	    $('.double,.doubleInfo').hide();
	});
});