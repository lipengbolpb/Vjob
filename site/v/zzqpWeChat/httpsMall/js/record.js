(function () {
    var recordList = [],
        i = 0,
        currentPage = 1,
        count = 10,
        html = '';

    sessionStorage.removeItem('recordList');
    $('#content').append('<p class="more">加载更多</p>');
    userInfo(currentPage);

    $('.more').on('click', function () {
        currentPage++
        userInfo(currentPage);
    });

    function userInfo(currentPage) { //获取商品数据
        var javai = vge.zzqpWeChat + '/DBTHNQPInterface/vpointsExchange/getExchangeRecord';
        var req = {
            "openid": sessionStorage.openid,
            "companyKey": sessionStorage.companyKey,
            "currentPage": currentPage,
            "count": 10
        };
        vge.callJApi(javai, req,
            function (jo) {
                console.log(jo);
                if (jo.result.code == '0') {
                    if (!jo.result.businessCode) {
                        recordList = jo.reply;
                        if (sessionStorage.recordList) {
                            sessionStorage.recordList = JSON.stringify(JSON.parse(sessionStorage.recordList).concat(recordList));
                        } else {
                            sessionStorage.recordList = JSON.stringify(recordList);
                        }
                        recordShow(recordList);
                    } else {
                        title_tip('尊敬的用户', '拉取失败！', '我知道了');
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
    }

    function recordShow(recordList) {
        if (recordList.length < 1) {
            if (currentPage < 2) {
                $('#content').html('');
                html = '<img src="img/err.png" class="err"/>';
            } else {
                html = '';
                $('.more').html('没有更多');
                $('.more').unbind();
            }
        } else {
            html = '';
            if (recordList.length < count) {
                $('.more').html('没有更多');
                $('.more').unbind();
            }
            for (i = 0; i < recordList.length; i++) {
                if (recordList[i].exchangeChannel == '2') { //抽奖
                    if (recordList[i].exchangeType == '1' || recordList[i].exchangeType == '2' || recordList[i].exchangeType == '3') {
                        //实物奖
                        html += `<div class="list" exchangeId="${recordList[i].exchangeId}">
                            <img src="${vge.zzqpWeChatimg}/DBTHNQPPlatform${recordList[i].goodsUrl.split(',')[0]}"/>
                            <p class="name">${recordList[i].goodsName}</p>
                            <span>${recordList[i].exchangeStatus==0?'已领取':'未领取'}</span>
                            <p class="date">${recordList[i].exchangeTime}</p>
                        </div>`;
                    } else if (recordList[i].exchangeType == '4') { //积分
                        html += `<div class="list" exchangeId="${recordList[i].exchangeId}">
                            <img src="https://${location.host}/v/zzqp20171214/IntegralMall/img/point.jpg"/>
                            <p class="name">${recordList[i].earnVpoints}积分</p>
                            <span>积分抽奖</span>
                            <p class="date">${recordList[i].exchangeTime}</p>
                        </div>`;
                    } else if (recordList[i].exchangeType == '5') { //现金
                        html += `<div class="list" exchangeId="${recordList[i].exchangeId}">
                            <img src="https://${location.host}/v/zzqp20171214/IntegralMall/img/hb.jpg"/>
                            <p class="name">${recordList[i].earnMoney/100}元</p>
                            <span>积分抽奖</span>
                            <p class="date">${recordList[i].exchangeTime}</p>
                        </div>`;
                    } else if (recordList[i].exchangeType == '6') { //谢谢惠顾
                        html += `<div class="list" exchangeId="${recordList[i].exchangeId}">
                            <img src="https://${location.host}/v/zzqp20171214/IntegralMall/img/null.jpg"/>
                            <p class="name">谢谢惠顾</p>
                            <span>积分抽奖</span>
                            <p class="date">${recordList[i].exchangeTime}</p>
                        </div>`;
                    } else if (recordList[i].exchangeType == '7') { //足球游戏
                        html += `<div class="list" exchangeId="${recordList[i].exchangeId}">
                            <img src="https://${location.host}/v/zzqp20171214/IntegralMall/img/football.png"/>
                            <p class="name">${recordList[i].earnVpoints}积分</p>
                            <span>足球游戏</span>
                            <p class="date">${recordList[i].exchangeTime}</p>
                        </div>`;
                    }
                } else {
                    html += `<div class="list" exchangeId="${recordList[i].exchangeId}">
                        <img src="${vge.zzqpWeChatimg}/DBTHNQPPlatform${recordList[i].goodsUrl.split(',')[0]}"/>
                        <p class="name">${recordList[i].goodsName}</p>
                        <span>${recordList[i].exchangeMsg}</span>
                        <p class="date">${recordList[i].exchangeTime}</p>
                    </div>`;
                }
            }
        }
        $('#content').append(html);
    }
    $('#content').on('click', '.list', function () {
        sessionStorage.exchangeId = $(this).attr('exchangeId');
        var record = '',
            recordList = JSON.parse(sessionStorage.recordList),
            cur = 0,
            j = 0;
        for (var i = 0; i < recordList.length; i++) {
            if (recordList[i].exchangeId == sessionStorage.exchangeId) {
                if (recordList[i].exchangeChannel == '2') {
                    if (recordList[i].exchangeType == '1') { //实物奖
                        if (recordList[i].exchangeStatus != '0') { //未领取
                            var reg1 = /^1[0-9]{10}$/,
                                reg2 = /^[1-9][0-9xX]{17}$/,
                                reg3 = /^[0-9]{4}$/;
                            $('#alert,.window_msg').css('display', 'block');
                            $('#cancel_msg').on('click', function () {
                                $('#alert,.window_msg').css('display', 'none');
                            });
                            $('#btn_msg').on('click', function () {
                                if ($('#name').val() === '' || $('#name').val().indexOf(' ') !== -1) {
                                    title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
                                } else if (!reg1.test($('#tel').val())) {
                                    title_tip('提 示', '请填写正确的手机号！~', '我知道了');
                                } else if (!reg2.test($('#idcard').val()) || !getIdcardValidateCode($('#idcard').val())) {
                                    title_tip('提 示', '请填写正确的身份证号！~', '我知道了');
                                } else if ($('#address').val() === '' || $('#address').val().indexOf(' ') !== -1) {
                                    title_tip('提 示', '请填写正确的收货地址！~', '我知道了');
                                } else {
                                    $('#btn_msg').unbind();
                                    $('#cancel_msg').unbind();
                                    var data = {
                                        "openid": sessionStorage.openid, //openid
                                        "prizeType": "", //奖品类型
                                        "sweepCode": "", //二维码
                                        "IDCard": $('#idcard').val(), //身份证
                                        "userName": $('#name').val(), //姓名
                                        "phoneNum": $('#tel').val(), //手机号
                                        "address": $('#address').val(), //地址
                                        "captcha": "", //验证码
                                        "exchangeId": recordList[i].exchangeId //主键ID
                                    };
                                    $.ajax({
                                        type: "POST",
                                        url: vge.zzqpWeChat + '/DBTHNQPInterface/myInfo/exchangePrize',
                                        data: JSON.stringify(data),
                                        dataType: 'json',
                                        success: function (res, status, xhr) {
                                            console.log(res);
                                            if (res.result.code == '0') {
                                                if (res.result.businessCode == '0') {
                                                    $('.window_msg').css('display', 'none');
                                                    $('.window_res').css('display', 'block');
                                                    setTimeout(() => {
                                                        window.location.reload();
                                                    }, 2000);
                                                }
                                            } else {
                                                title_tip('提 示', '系统开了个小差，请稍后重试', '我知道了');
                                            }
                                        },
                                        error: function () {
                                            title_tip('提 示', '系统开了个小差，请稍后重试', '我知道了');
                                        }
                                    });

                                }
                            });
                            return;
                        }
                    } else { //积分、红包
                        return;
                    }
                }
            }
        }
        $('#content').load('person.html #details', function () {
            for (j = 0; j < recordList.length; j++) {
                if (recordList[j].exchangeId == sessionStorage.exchangeId) {
                    cur = j;
                    record += `<div class="banner">
									<ul class="pic_box">
									</ul>
									<ul class="dot">
									</ul>
								</div>
								<p class="title"><span class="name">${recordList[j].goodsName}</span><span class="price_1">${recordList[j].exchangeVpoints}积分</span></p>
								`;
                    if (recordList[j].exchangeType == '2') {
                        record += `
								<div class="record">
									<p class="re_address">兑换券码：<span>${recordList[j].exchangeMsg}</span></p>
									<p class="re_date">兑换日期：<span>${recordList[j].exchangeTime}</span></p>
									<p class="re_num">订单编号：<span>${recordList[j].exchangeId}</span></p>
								</div>`;
                    } else if (recordList[j].exchangeType == '3') {
                        record += `
								<p class="price">${recordList[j].exchangeMsg}</p>
								<div class="record">
									<p class="re_address">手机号：<span>${recordList[j].phoneNum}</span></p>
									<p class="re_date">兑换日期：<span>${recordList[j].exchangeTime}</span></p>
									<p class="re_num">订单编号：<span>${recordList[j].exchangeId}</span></p>
								</div>`;
                    } else {
                        record += `<p class="price">${recordList[j].exchangeMsg}</p>
								<div class="record">
									<p class="re_name">收货人：<span>${recordList[j].realName} ${recordList[j].phoneNum}</span></p>
									<p class="re_address">收货地址：<span>${recordList[j].address}</span></p>
									<p class="re_date">兑换日期：<span>${recordList[j].exchangeTime}</span></p>
									<p class="re_num">订单编号：<span>${recordList[j].exchangeId}</span></p>
								</div>`;
                    }
                    record += `<div class="msg">
									<p class="title_msg">奖品说明</p>
									${recordList[j].goodsContent}
								</div>
								<div class="btn_box">
									<input type="button" name="" id="btn" value="返回首页"/>
								</div>
								`;
                }
            }
            $('#details').append(record);
            $('div.msg').find('*').attr('style', '');
            record = '';
            var picUrl = recordList[cur].goodsUrl,
                picArr = [];
            if (picUrl[picUrl.length - 1] == ',') {
                picUrl = picUrl.substring(0, picUrl.length - 2);
            }
            picArr = picUrl.split(',');
            $('.pic_box').append(`<li><img src="${vge.zzqpWeChatimg}/DBTHNQPPlatform${picArr[picArr.length-1]}" /></li>`);
            for (var i = 0; i < picArr.length; i++) {
                $('.pic_box').append(`<li><img src="${vge.zzqpWeChatimg}/DBTHNQPPlatform${picArr[i]}" /></li>`);
                $('.dot').append('<li></li>');
            }
            $('.pic_box').append(`<li><img src="${vge.zzqpWeChatimg}/DBTHNQPPlatform${picArr[0]}" /></li>`);
            $('.dot li').eq(0).addClass('cur');
            if ($('.dot li').size() < 2) {
                $('.dot').css('visibility', 'hidden');
            }
            $('#btn').on('click', function () {
                location.href = 'index.html';
            });
            //轮播图相关
            var newIndex = 1,
                w = $(document).width(),
                timer = null;
            var lbtlength = $('.pic_box li').size();
            $('.banner ul.pic_box').css({
                'transition': 'all 0s linear',
                'margin-left': -w + 'px',
                'width': w * lbtlength + 'px'
            });
            $('.banner ul.pic_box li').css({
                'width': w + 'px'
            });

            if (lbtlength > 3) {
                clearInterval(timer);
                timer = setInterval(function () {
                    lbt(newIndex, lbtlength);
                }, 5000);
                touchInit();
            }

            function lbt(idx, length, abs) {
                if (length < 4) {
                    return;
                }
                ++idx;
                if (idx >= length - 2) {
                    $('.banner ul.dot li').eq(0).addClass('cur').siblings().removeClass('cur');
                }
                if (idx >= length) {
                    idx = 1;
                    $('.banner ul.pic_box').css({
                        'transition': 'all 0s linear',
                        'margin-left': -w + 'px'
                    });
                } else {
                    if (abs) {
                        $('.banner ul.pic_box').css({
                            'transition': 'all 0.3s linear',
                            'margin-left': -idx * w + 'px'
                        });
                    } else {
                        $('.banner ul.pic_box').css({
                            'transition': 'all 0.8s linear',
                            'margin-left': -idx * w + 'px'
                        });
                    }
                }
                newIndex = idx;
                $('.pic_box').on('transitionend', function () {
                    var mlf = $('.pic_box').css('margin-left');
                    if (mlf.substring(0, mlf.length - 2) <= -(length - 1) * w) {
                        newIndex = 1;
                        $('.banner ul.pic_box').css({
                            'transition': 'all 0s linear',
                            'margin-left': -w + 'px'
                        });
                    } else if (mlf.substring(0, mlf.length - 2) >= 0) {
                        newIndex = length - 2;
                        $('.banner ul.pic_box').css({
                            'transition': 'all 0s linear',
                            'margin-left': -w * newIndex + 'px'
                        });
                    }
                });
                $('.banner ul.dot li').eq(idx - 1).addClass('cur').siblings().removeClass('cur');
            }

            function touchInit() {
                var _x = 0,
                    x = 0,
                    lf;
                $('.banner ul.pic_box').on('touchstart touchmove touchend', function (e) {
                    clearTimeout(timer);
                    e.preventDefault();
                    switch (e.type) {
                        case 'touchstart':
                            x = _x = e.originalEvent.targetTouches[0].pageX;
                            lf = $('.pic_box').css('margin-left').substring(0, $('.pic_box').css('margin-left').length - 2);
                            window.flag = true;
                            break;
                        case 'touchmove':
                            _x = e.originalEvent.targetTouches[0].pageX;
                            if (lf - (x - _x) < -w * lbtlength) {
                                lf = -w * lbtlength + (x - _x);
                            } else if (lf - (x - _x) > 0) {
                                lf = (x - _x);
                            } else {
                                lf = lf;
                            }
                            $('.banner ul.pic_box').css({
                                'transition': 'all 0s linear',
                                'margin-left': lf - (x - _x) + 'px'
                            });
                            window.flag = false;
                            break;
                        case 'touchend':
                            _x = e.originalEvent.changedTouches[0].pageX;
                            clearInterval(timer);
                            if (window.flag) {
                                console.log('点击');
                            } else {
                                if (Math.abs(x - _x) >= w * 0.2) {
                                    if (x - _x < 0) { //右划
                                        newIndex -= 2;
                                    } else { //左划
                                    }
                                    lbt(newIndex, lbtlength, 1);
                                } else { //当前
                                    newIndex = newIndex - 1;
                                    lbt(newIndex, lbtlength, 1);
                                }
                            }
                            timer = setInterval(function () {
                                lbt(newIndex, lbtlength);
                            }, 5000);
                            break;
                        default:
                            break;
                    }

                });

            }

        });
    });
})();