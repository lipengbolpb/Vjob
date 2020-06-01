$(document).ready(function () {
    // 接口
    var Port_Check = vge.common + '/vjifenInterface/user/getCaptcha'; //获取验证码接口
    var Port_Sub = vge.common + '/vjifenInterface/user/savePrize'; //大奖提交接口
    var Port_QueryList = vge.common + '/vjifenInterface/gifts/queryPrizeList'; //大奖列表查询接口
    var Port_FindPrize = vge.common + '/vjifenInterface/user/findPrize'; //一等奖查询接口

    var dom_get = document.getElementsByClassName('doubleYz')[0];

    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid;

    var currentPageNo = 1;
    var currentPageYes = 1;
    var count = 10;

    // 点击活动按钮
    getListYes(true);
    //点击已领取按钮
    $('.doubleListYes').on('click', function () {
        getListYes(true);
    });
    // 点击未领取按钮
    $('.doubleListNo').on('click', function () {
        getListNo(true);
    });

    $('.doubleListAlertClose').on('click', function () {
        $('.doubleListAlert').hide();
    });

    function initList(list, flag) { //显示列表
        // 未领奖
        var tpl1 = '<li>' +
            '<img src="{{prizeImg}}">' +
            '<div><p>{{prizeName}}</p><p>中奖时间：<span>{{earnTime}}</span></p><p>领奖截止：<span>{{expireTime}}</span></p></div>' +
            '<img src="/v/hbqp-common2.0/img/double/prize-line.png">' +
            '<input type="button" value="去领奖" key={{key}} class="unuseBtn">' +
            '</li>';
        // 已过期
        var tpl2 = '<li>' +
            '<img src="{{prizeImg}}" class="doubleGray">' +
            '<div><p>{{prizeName}}</p><p>中奖时间：<span>{{earnTime}}</span></p><p>领奖截止：<span>{{expireTime}}</span></p></div>' +
            '<img src="/v/hbqp-common2.0/img/double/prize-line.png">' +
            '<img src="/v/hbqp-common2.0/img/double/getted.png">' +
            '</li>';
        // 已领取
        var tpl3 = '<li>' +
            '<img src="{{prizeImg}}">' +
            '<div><p>{{prizeName}}</p><p>领奖时间：<span>{{userTime}}</span></p></div>' +
            '<img src="/v/hbqp-common2.0/img/double/prize-line.png">' +
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
                $('.doubleListNone').attr('src', '/v/hbqp-common2.0/img/double/list-empty.png');
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
                $('.doubleListNone').attr('src', '/v/hbqp-common2.0/img/double/list-none.png');
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
        var req = { "projectServerName": "huanan",
            "openid": openid,
            "unionid": '',
            "hbopenid": hbopenid,
            "vcodeActivityKey": '',
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
        var req = { "projectServerName": "huanan",
            "openid": openid,
            "unionid": '',
            "hbopenid": hbopenid,
            "vcodeActivityKey": '',
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
                    var req = { "projectServerName": "huanan",
                        "openid": openid,
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

    var first = true;
    var reg1 = /^1[0-9]{10}$/, //验证手机号
        reg2 = /^[1-9][0-9xX]{17}$/, //验证身份证号
        reg3 = /^[0-9]{4}$/;
    var countdowntimer = null;
    $('.doubleYz').on('click', function () {
        getYzcode();
        return false;
    });

    $('.doubleInfoBtn').on('click', function () {
        if (first) {
            first = false;
            send();
            return false;
        }
    });
    // 提交信息成功后点击确定按钮
    $('.doubleSuccessBtn').on('click', function () {
        $('.doubleSuccess').hide();
        window.location.reload();
    });

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
            if (i === 0) {
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
        var req = { "projectServerName": "huanan",
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
        var req = { "projectServerName": "huanan",
            "openid": openid,
            "unionid": '', //广西、浙江
            "hbopenid": hbopenid, //广西、浙江
            "address": $('.doubleAddress').val(),
            "username": $('.doubleName').val(),
            "idcard": 'idcard',
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
                        $('.doubleInfo').hide();
                        $('.doubleSuccess').show();
                        $('.doubleName').val('');
                        $('.doubleAddress').val('');
                        $('.doubleIdcard').val('');
                        $('.doubleTel').val('');
                        $('.doubleCode').val('');
                        clearInterval(countdowntimer);
                        $('.doubleYz').val('获取验证码');
                        first = false;
                    } else if (jo.result.businessCode == '1') { //1
                        title_tip('提 示', '验证码已失效', '我知道了');
                        first = true;
                    } else if (jo.result.businessCode == '2') { //2
                        title_tip('提 示', '您填写的验证码有误', '我知道了');
                        first = true;
                    } else if (jo.result.businessCode == '-1') {
                        title_tip('提 示', '系统升级中...', '我知道了');
                        first = true;
                    } else if (jo.result.businessCode == '4') {
                        title_tip('提 示', '兑奖截止时间已过期', '我知道了');
                        first = true;
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        first = true;
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    first = true;
                }
            },
            error: function (res, status, xhr) {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                first = true;
            }
        });
    }
});