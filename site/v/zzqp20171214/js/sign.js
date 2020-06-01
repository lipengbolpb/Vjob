'use strict'

$(document).ready(function () {
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode;
    var weekSignFlag = sessionStorage.weekSignFlag === undefined ? '' : sessionStorage.weekSignFlag, //是否开户自然周签到1:开启、0或空:关闭
        weekSignPopup = sessionStorage.weekSignPopup === undefined ? '' : sessionStorage.weekSignPopup, //自然周签到弹出提示
        weekSignDays = sessionStorage.weekSignDays === undefined ? '' : sessionStorage.weekSignDays, //当前周已签到周几集合
        weekSignEarnFlag = sessionStorage.weekSignEarnFlag === undefined ? '' : sessionStorage.weekSignEarnFlag, //周签到红包是否已领取0未领取、1:已领取、2:领取签到红包
        weekSignEarnMoney = sessionStorage.weekSignEarnMoney === undefined ? '' : sessionStorage.weekSignEarnMoney, //周签到红包金额
        weekSignLimitDay = sessionStorage.weekSignLimitDay === undefined ? '' : sessionStorage.weekSignLimitDay, //周签到天数限制
        weekSignDiffDay = sessionStorage.weekSignDiffDay === undefined ? '' : sessionStorage.weekSignDiffDay, //周签到还差天数
        weekSignPercent = sessionStorage.weekSignPercent === undefined ? '' : sessionStorage.weekSignPercent; //周签到完成百分比

    var init = function () {
        $('.scale').text((weekSignLimitDay - weekSignDiffDay) + '/' + weekSignLimitDay);
        $('.inner').css('width', weekSignPercent + '%');

        if (weekSignEarnFlag == '2') { //签到目标达成，未领取
            $('#money').text(Number(weekSignEarnMoney) / 100);
            $('.signtitle').attr('src', '/v/zzqp20171214/img/sign-title-get.png?v=1');
            $('.complete').css('display', 'block');
            $('.notice').css('display', 'block');
        } else if (weekSignEarnFlag == '1') { //签到目标达成，已领取
            $('#money').text(Number(weekSignEarnMoney) / 100);
            $('.signtitle').attr('src', '/v/zzqp20171214/img/sign-title-get.png?v=1');
            $('.used').css('display', 'block');
            $('.complete').css('display', 'block');
            $('.notice').css('display', 'block');
        } else { //签到目标未达成，还差xx天
            $('.signtitle').attr('src', '/v/zzqp20171214/img/sign-title-progress.png?v=1');
            $('.day').text(weekSignDiffDay);
            $('.rough').css('display', 'block');
        }

        if (weekSignDays != '') {
            weekSignDays = weekSignDays.split(',').sort();
        }
        if (weekSignDays.length > 0) {
            for (var i = 0; i < weekSignDays[weekSignDays.length - 1]; i++) { //x
                var img = $('<img src="">');
                img.attr('src', '/v/zzqp20171214/img/no.png');
                $('.select').eq(i).append(img);
            }
        }
        for (var j = 0; j < weekSignDays.length; j++) { //√
            $('.select').eq(weekSignDays[j] - 1).empty();
            var img = $('<img src="">');
            img.attr('src', '/v/zzqp20171214/img/yes.png');
            $('.select').eq(weekSignDays[j] - 1).append(img);
        }
    }
    init();

    var musicStart = function () {
        $('.audio').addClass('running');
        document.getElementById('bgm').play();
    }

    var musicStop = function () {
        $('.audio').removeClass('running');
        document.getElementById('bgm').pause();
    }

    $('.audio').on('click', function () {
        if ($('.audio').hasClass('running')) {
            musicStop();
        } else {
            musicStart();
        }
    });
    $('.back').on('click', function () {
        document.location.replace('http://' + location.host + '/v/zzqp20171214/getcash.html?bizcode=' + bizcode);
    });
});