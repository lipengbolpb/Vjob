var info = {
    URL_POST: vge.zzqp + '/DBTHNQPInterface/user/integralLottery',
    EXCHANGE_POST: vge.zzqp + '/DBTHNQPInterface/myInfo/exchangePrize',
    openid: sessionStorage.openid
}
var reg1 = /^1[0-9]{10}$/,
    reg2 = /^[1-9][0-9xX]{17}$/,
    reg3 = /^[0-9]{4}$/;
var luck = {
    index: 0, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: 20, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1, //中奖位置
    init: function (id) {
        if ($("#" + id).find(".border").length > 0) {
            $luck = $("#" + id);
            $units = $luck.find(".border");
            this.obj = $luck;
            this.count = $units.length;
            $luck.find(".border-" + this.index).addClass("active"); //初始化，第index个为起点
        };
    },
    roll: function () {
        var index = this.index;
        var count = this.count;
        var luck = this.obj;
        $(luck).find(".border-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        };
        $(luck).find(".border-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop: function (index) {
        this.prize = index;
        return false;
    }
};

var click = true;
window.onload = function () {
    luck.init('luck');
    $(".btn").click(function () {
        if (click) {
            click = false;
            luck.speed = 100;
            $('.result').attr('src', '');
            var data = {
                "openid": info.openid,
                "longitude": "", //经度
                "latitude": "" //纬度
            };
            $.ajax({
                type: "POST",
                url: info.URL_POST,
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (res, status, xhr) {
                    console.log(res);
                    if (res.result.code == '0') {
                        if (res.result.businessCode == '0') {
                            var end = null;
                            var imgEnd = null;
                            sessionStorage.exchangeId = res.reply.exchangeId; //兑换记录主键
                            switch (res.reply.prizeType) {
                                case '9': //足球
                                    if (parseInt(10 * Math.random()) <= 4) {
                                        end = 2;
                                    } else {
                                        end = 6;
                                    }
                                    imgEnd = 2;
                                    $('.line1').html('恭喜你抽中<span id="prize">定制足球1个</span>');
                                    $('.line2').html('请到"中奖记录"里面查看并领奖');
                                    break;
                                case '6': //世界杯门票
                                    end = 0;
                                    imgEnd = 0;
                                    $('.line1').html('恭喜你抽中<span id="prize">世界杯门票1张</span>');
                                    $('.line2').html('请到"中奖记录"里面查看并领奖');
                                    break;
                                case '0': //现金红包
                                    if (res.reply.earnMoney / 100 == 6.6) { //6.6红包
                                        end = 1;
                                        imgEnd = 1;
                                        $('.line1').html('恭喜你抽中<span id="prize">红包6.6元</span>');
                                    } else if (res.reply.earnMoney / 100 == 8.8) { //8.8红包
                                        if (parseInt(10 * Math.random()) <= 4) {
                                            end = 3;
                                        } else {
                                            end = 5;
                                        }
                                        imgEnd = 3;
                                        $('.line1').html('恭喜你抽中<span id="prize">红包8.8元</span>');
                                    } else {
                                        end = 3;
                                        imgEnd = 3;
                                        $('.line1').html('恭喜你抽中<span id="prize">红包6.6元</span>');
                                    }
                                    $('.line2').html('请到"我的红包"里面查看并提现');
                                    break;
                                case '10': //积分红包
                                    end = 7;
                                    imgEnd = 6;
                                    $('#prize').html(res.reply.earnVpoints + '积分');
                                    $('.line1').html('恭喜你抽中<span id="prize">' + res.reply.earnVpoints + '积分</span>');
                                    $('.line2').html('请到"我的红包"里面查看');
                                    break;
                                case '12': //谢谢惠顾
                                    end = 9;
                                    imgEnd = 7;
                                    $('.line1').html('很遗憾！您未抽中大奖。');
                                    $('.line2').html('再试一次吧！');
                                    break;
                                case '15': //定制水杯
                                    if (parseInt(10 * Math.random()) <= 4) {
                                        end = 4;
                                    } else {
                                        end = 8;
                                    }
                                    imgEnd = 4;
                                    $('.line1').html('恭喜你抽中<span id="prize">定制水杯1个</span>');
                                    $('.line2').html('请到"中奖记录"里面查看并领奖');
                                    break;
                            }
                            roll();

                            function roll() {
                                $('.window').css('display', 'none');
                                luck.times += 1;
                                luck.roll();
                                if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
                                    clearTimeout(luck.timer);
                                    luck.prize = -1;
                                    luck.times = 0;
                                    $('.result').attr('src', '/v/zzqp20171214/game1/img/_0' + imgEnd + '.png');
                                    setTimeout(function () {
                                        $('.alert').fadeIn();
                                    }, 500);
                                    $('.close').on('click', myclick);

                                    function myclick() {
                                        click = true;
                                        $('.close').unbind();
                                        $('#btn_msg').unbind();
                                        $('#cancel_msg').unbind();
                                        $('.alert').fadeOut();
                                        console.log(res.reply.prizeType);
                                        if (res.reply.prizeType == '6' || res.reply.prizeType == '9' || res.reply.prizeType == '15') {
                                            $('#info').fadeIn();
                                            $('.window_msg').fadeIn();
                                            $('#cancel_msg').on('click', function () {
                                                $('#info').fadeOut();
                                            });
                                            $('#btn_msg').on('click', function () { //提交信息
                                                if ($('#name').val() === '' || $('#name').val().indexOf(' ') !== -1) {
                                                    title_tip('提 示', '请输入正确的姓名哦！~', '我知道了');
                                                } else if (!reg1.test($('#tel').val())) {
                                                    title_tip('提 示', '请填写正确的手机号！~', '我知道了');
                                                } else if ($('#address').val() === '' || $('#address').val().indexOf(' ') !== -1) {
                                                    title_tip('提 示', '请填写正确的收货地址！~', '我知道了');
                                                } else {
                                                    var data = {
                                                        "openid": info.openid, //openid
                                                        "prizeType": res.reply.prizeType, //奖品类型
                                                        "sweepCode": "", //二维码
                                                        "idcard": "", //身份证
                                                        "userName": $('#name').val(), //姓名
                                                        "phoneNum": $('#tel').val(), //手机号
                                                        "address": $('#address').val(), //地址
                                                        "captcha": "", //验证码
                                                        "exchangeId": res.reply.exchangeId //主键ID
                                                    };
                                                    $.ajax({
                                                        type: "POST",
                                                        url: info.EXCHANGE_POST,
                                                        data: JSON.stringify(data),
                                                        dataType: 'json',
                                                        success: function (res, status, xhr) {
                                                            sessionStorage.realName = $('#name').val();
                                                            sessionStorage.address = $('#address').val();
                                                            sessionStorage.phoneNum = $('#tel').val();
                                                            $('.window_msg').css('display', 'none');
                                                            $('.window_res').css('display', 'block');
                                                            setTimeout(function() {
                                                                $('#info').fadeOut();
                                                            }, 2000);
                                                        },
                                                        error: function () {
                                                            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                                                        }
                                                    })
                                                }
                                            });
                                        }
                                    }
                                } else {
                                    if (luck.times < luck.cycle) {
                                        luck.speed -= 10;
                                    } else if (luck.times == luck.cycle) {
                                        // var index = Math.random() * (luck.count) | 0;
                                        luck.prize = end; //最终中奖位置
                                    } else {
                                        if (luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
                                            luck.speed += 110;
                                        } else {
                                            luck.speed += 20;
                                        }
                                    }
                                    if (luck.speed < 40) {
                                        luck.speed = 40;
                                    };
                                    luck.timer = setTimeout(roll, luck.speed);
                                }
                                return false;
                            }
                        } else if (res.result.businessCode == '2') {
                            title_tip('尊敬的用户', '您的积分不足', '我知道了');
                        } else if (res.result.businessCode == '3') {
                            title_tip('尊敬的用户', '今日抽奖次数已达上限，请明日再试', '我知道了');
                        } else if(res.result.businessCode == '4'){
                            title_tip('尊敬的用户', '敬请期待!', '我知道了');
                        } else {
                            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        }
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                },
                error: function (res, status, xhr) {
                    console.log(res);
                }
            });
            return false;
        }
    });
    $('.iknow').click(function () {
        $('.rule').fadeOut();
    });
    $('#link').click(function () {
        $('.rule').fadeIn();
    });
    $('.back').click(function () {
        window.location.replace('http://' + location.host + '/v/zzqp20171214/IntegralMall/index.html');
    });
    var flag = true;
    setInterval(function () {
        if (flag) {
            flag = false;
            $('.slogan').attr('src', 'http://' + location.host + '/v/zzqp20171214/game1/img/slogan-2.png');
        } else {
            flag = true;
            $('.slogan').attr('src', 'http://' + location.host + '/v/zzqp20171214/game1/img/slogan-1.png');
        }
    }, 500);
};