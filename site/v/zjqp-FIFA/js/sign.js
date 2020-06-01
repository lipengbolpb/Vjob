/* 定义各项参数 */
var PROJECT = 'zjqp-FIFA';
var weekSignFlag = sessionStorage.weekSignFlag === 'undefined' ? '0' : sessionStorage.weekSignFlag, //是否开户自然周签到，1:开启、0或空:关闭
    weekSignDays = sessionStorage.weekSignDays === 'undefined' ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
    weekSignEarnFlag = sessionStorage.weekSignEarnFlag === 'undefined' ? '0' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取，1:已领取、0未领取  2领取签到红包
    weekSignEarnMoney = sessionStorage.weekSignEarnMoney === 'undefined' ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
    weekSignLimitDay = sessionStorage.weekSignLimitDay === 'undefined' ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
    weekSignDiffDay = sessionStorage.weekSignDiffDay === 'undefined' ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
    weekSignPopup = sessionStorage.weekSignPopup === 'undefined' ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示，1:弹出提示、0或空:不弹出"
    weekSignPercent = sessionStorage.weekSignPercent === 'undefined' ? '' : sessionStorage.weekSignPercent; //周签到完成百分比
var totalAccountMoney = sessionStorage.totalAccountMoney === undefined ? '' : sessionStorage.totalAccountMoney;
var args = vge.urlparse(location.href),
    // bizcode = args.bizcode,
    bizcode = sessionStorage.bizcode,
    again = sessionStorage.again;
if (bizcode == 11 || again == 'true') {
    sign();
} else {
    // document.getElementsByClassName('foam')[0].addEventListener('animationend', sign);
    setTimeout(function () {
        sign();
    }, 3200);
}

function sign() {
    if (weekSignFlag == '1') {
        $('.sign_logo').css('display', 'block'); //签到按钮
        if (weekSignEarnFlag == 1) { //已领取
            $('.sign_title').attr('src', '/v/' + PROJECT + '/img/sign/sign_title_2.png');
            $('.sign_logo').css({
                'background': 'url(/v/' + PROJECT + '/img/sign/sign_ed.png) no-repeat right',
                '-webkit-background-size': ' auto 100%'
            });
        } else {
            $('.light').css('visibility', 'visible');
            $('#weekSignEarnMoney').css('display', 'none');
            $('.sign_tip').html('本周签到达' + weekSignLimitDay + '天，可额外获得红包1个！');
            $('.sign_cash').css({
                'background': 'url(/v/' + PROJECT + '/img/sign/sign_cash.png) no-repeat bottom',
                '-webkit-background-size': '100% auto'
            });
        }
        if (weekSignPopup == 1 && weekSignEarnFlag != 1) { //需要弹出提示且未领取状态
            if (weekSignEarnFlag == 2) { //领取签到红包
                $('#sign,.getSignCash').css('display', 'block');
                $('.getSignCash').on('touchstart', function () {
                    weekSignEarnFlag = '1'; //已领取
                    $('#sign,.light,.getSignCash').css('display', 'none');
                    $('.content').css('display', 'block');
                    $('.sign_title').attr('src', '/v/' + PROJECT + '/img/sign/sign_title_2.png');
                    $('.sign_logo').css({
                        'background': 'url(/v/' + PROJECT + '/img/sign/sign_ed.png) no-repeat right',
                        '-webkit-background-size': ' auto 100%'
                    });
                    $('.sign_tip,#weekSignEarnMoney').css('display', 'block');
                    $('.sign_cash').css({
                        'background': 'url(/v/' + PROJECT + '/img/sign/sign_cash_open.png) no-repeat bottom',
                        '-webkit-background-size': '100% auto'
                    });
                });
            } else {
                $('#sign,.sign_alert').css('display', 'block');
            }
        }
        if (bizcode == 0) {
            //进度条
            $('.progress').html((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
            $('#progress2').css('width', weekSignPercent * 7.8 / 100 + 'rem');
            $('.days').html(weekSignLimitDay - weekSignDiffDay + '天');
            $('#weekSignEarnMoney').html(weekSignEarnMoney + '元');
            $('.weekSignEarnMoney').html('<span>' + weekSignEarnMoney + '</span>元');
            if (weekSignDays != '') {
                weekSignDays = weekSignDays.split(',').sort();
            }
            var weeks = new Date();
            weeks = (weeks.getDay() + 6) % 7;
            for (var i = 0; i < weeks; i++) { //打钩打叉
                document.getElementsByClassName('checks')[i].style.backgroundImage = 'url(/v/' + PROJECT + '/img/sign/frok.png)';
            }
            for (var j = 0; j < weekSignDays.length; j++) { //打√
                document.getElementsByClassName('checks')[weekSignDays[j] - 1].style.backgroundImage = 'url(/v/' + PROJECT + '/img/sign/check.png)';
            }
        }
        $('.sign_logo').on('touchstart', function () {
            $('#sign,.content').css('display', 'block');
        });
        $('.sign_alert').on('touchstart', function () { //签到天数提醒
            $(this).css('display', 'none');
            $('.content').css('display', 'block');
        });
        $('.close').on('touchstart', function (event) {
            $('#sign').css('display', 'none');
            event.stopPropagation();
        });
    }
}