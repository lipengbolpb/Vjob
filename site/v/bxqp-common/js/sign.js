// var weekSignFlag = '1';
// var weekSignPopup = '1';
// var signCogAry = [{
//     signPercent: "50%",
//     signEarnFlag: "0",
//     signEarnMoney: "88.88",
//     activityName: "活动名称",
//     periodType: "0",
//     skuRelationType: "0", //SKU限制关系：0并且、1或者、2混合
//     activityDesc: "活动描述",
//     signinSkuCogLst: [{
//         skuName: "SKU名称",
//         skuLogo: "SKU图标",
//         signType: "0", //签到类型:0天、1次
//         signNum: "3", //签到达成天/次数
//         surplusSignNum: "5", //相差签到达成天/次数
//         continueFlag: "0", //连续签到标志：0：否；1：是
//     }, {
//         skuName: "SKU名称",
//         skuLogo: "SKU图标",
//         signType: "0", //签到类型:0天、1次
//         signNum: "3", //签到达成天/次数
//         surplusSignNum: "5", //相差签到达成天/次数
//         continueFlag: "0", //连续签到标志：0：否；1：是
//     }]
// }, {
//     signPercent: "50%",
//     signEarnFlag: "1",
//     signEarnMoney: "88.88",
//     activityName: "活动名称",
//     periodType: "0",
//     skuRelationType: "1", //SKU限制关系：0并且、1或者、2混合
//     activityDesc: "活动描述",
//     signinSkuCogLst: [{
//         skuName: "SKU名称",
//         skuLogo: "SKU图标",
//         signType: "0", //签到类型:0天、1次
//         signNum: "3", //签到达成天/次数
//         surplusSignNum: "5", //相差签到达成天/次数
//         continueFlag: "0", //连续签到标志：0：否；1：是
//     }, {
//         skuName: "SKU名称",
//         skuLogo: "SKU图标",
//         signType: "0", //签到类型:0天、1次
//         signNum: "3", //签到达成天/次数
//         surplusSignNum: "5", //相差签到达成天/次数
//         continueFlag: "0", //连续签到标志：0：否；1：是
//     }]
// }, {
//     signPercent: "50%",
//     signEarnFlag: "2",
//     signEarnMoney: "88.88",
//     activityName: "活动名称",
//     periodType: "0",
//     skuRelationType: "2", //SKU限制关系：0并且、1或者、2混合
//     activityDesc: "活动描述",
//     signinSkuCogLst: [{
//         skuName: "SKU名称",
//         skuLogo: "SKU图标",
//         signType: "0", //签到类型:0天、1次
//         signNum: "3", //签到达成天/次数
//         surplusSignNum: "5", //相差签到达成天/次数
//         continueFlag: "0", //连续签到标志：0：否；1：是
//     }, {
//         skuName: "SKU名称",
//         skuLogo: "SKU图标",
//         signType: "0", //签到类型:0天、1次
//         signNum: "3", //签到达成天/次数
//         surplusSignNum: "5", //相差签到达成天/次数
//         continueFlag: "0", //连续签到标志：0：否；1：是
//     }]
// }];
// sign();

var openid = sessionStorage.openid;
var APPID = vge.bxqpappid;
var PROJECT = 'bxqp-common';
var imgUrl = '/v/bxqp-common/';
var _host = vge.bxqpimg + '/DBTBXQPPlatform';
var iconFlag = true;
var weekSignFlag = sessionStorage.weekSignFlag == 'undefined' ? '0' : sessionStorage.weekSignFlag,
    weekSignPopup = sessionStorage.weekSignPopup == 'undefined' ? '0' : sessionStorage.weekSignPopup,
    signCogAry = JSON.parse(sessionStorage.getItem('signCogAry'));
   
if (weekSignFlag == '1') {
    $('.hbGet,.open').one('click', function () {
        $('.hbGet,.open').unbind();
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
                sign();
            });
        }, 1000);
    });
}

function sign() { //混合签到功能
    var tpl_1 = `
        <div class="swiper">
            <p class="signTotal" style="display:{{display}};">本次活动，红包总计{{total}}个，先到先得</p>
            <img src="${imgUrl}/img/sign/hb.png" class="signHb" style="display: block;">
        </div>
    `;
    var tpl_2 = `
        <div class="swiper">
            <p class="signTotal" style="display:{{display}};">本次活动，红包总计{{total}}个，先到先得</p>
            <div class="more" style="display: block;">
                <p>恭喜你获得</p>
                <span>¥</span>
                <span>{{money}}</span>
                <span>元</span>
            </div>
        </div>
    `;
    var tpl_3 = `
        <div class="swiper">
            <div class="less">
                <p>恭喜你获得</p>
                <span>¥</span>
                <span>{{money}}</span>
                <span>元</span>
                <input type="button" value="存入零钱包" class="signBtn">
            </div>
        </div>
    `;
    //1个sku模板
    var tpl_4 = `
        <div class="skuList">
            <div class="detailsLeft">
                <span>{{name}}</span>
                <img src="{{skuLogo}}">
                <span>×{{type}}</span>
            </div>
            <div class="detailsRight">
                <input type="button" value="差{{diff}}">
            </div>
        </div>
    `;
    //多个sku模板
    var tpl_5 = `
        <div class="skuLine">
            <span class="line"></span>
            <span class="txt">{{logic}}</span>
            <span class="line"></span>
        </div>
        <div class="skuList">
            <div class="detailsLeft">
                <span>{{name}}</span>
                <img src="{{skuLogo}}">
                <span>×{{type}}</span>
            </div>
            <div class="detailsRight">
                <input type="button" value="差{{diff}}">
            </div>
        </div>
    `;
    //混合模式
    var tpl_6 = `
        <div class="skuList">
            <div class="detailsLeft">
                <img src="/v/bxqp-common/img/sign/title_left.png" class="signTitleLeft">
                <span class="signNum">{{num}}</span>
                <img src="/v/bxqp-common/img/sign/title_right.png" class="signTitleRight">
            </div>
            <div class="detailsRight">
                <input type="button" value="差{{diff}}">
            </div>
        </div>
        <p class="signNotice">喝指定产品得红包，参与产品详见活动说明</p>
    `;
    if (weekSignFlag === '1') { //开启签到功能，则显示开关按钮
        $('#sign_logo').css('display', 'block');
        for (var i = 0; i < signCogAry.length; i++) {
            //默认图标为已领取，只要有一个活动是[未达标,扫码中]，则替换为领取红包的图标
            if (signCogAry[i].signEarnFlag == '0') {
                //未达标
                $('#sign_logo').css('background-image', 'url("' + imgUrl + 'img/sign/sign_logo.png?v=1")');
                iconFlag = false;
            } else if (signCogAry[i].signEarnFlag == '2') {
                //本次扫码中了签到红包
                $('#sign_logo').css('background-image', 'url("' + imgUrl + 'img/sign/sign_logo.png?v=1")');
                iconFlag = false;
            }
        }
        if (weekSignPopup === '1') { //自动弹出
            setTimeout(function () {
                $('.sign').css('display', 'block');
                var H = document.getElementsByClassName('slider')[0].offsetHeight; //0
                $('.signMask').css('height', H + 'px');
            }, 500);
        } else { //不自动弹出
            $('.sign').css('display', 'none');
        }
        $('#sign_logo').on('click', function () {
            $('.sign').css('display', 'block');
            var H = document.getElementsByClassName('slider')[0].offsetHeight; //0
            $('.signMask').css('height', H + 'px');
        });
        $('.signClose').on('click', function () {
            if (iconFlag) {
                $('#sign_logo').css('background-image', 'url("' + imgUrl + 'img/sign/sign_logo_2.png?v=1")');
            } else {
                $('#sign_logo').css('background-image', 'url("' + imgUrl + 'img/sign/sign_logo.png?v=1")');
            }
            $('.sign').css('display', 'none');
        });
        //生成子元素，建立dom结构
        for (var i = 0; i < signCogAry.length; i++) {
            var tpl = '';
            var tpl_sku = '';
            if (signCogAry[i].signEarnFlag == '0') { //未达成
                if (signCogAry[i].prizeUpperLimit == '0' || signCogAry[i].prizeUpperLimit == 'undefined' || signCogAry[i].prizeUpperLimit == '' || signCogAry[i].prizeUpperLimit == undefined) {
                    tpl = tpl_1.replace('{{display}}', 'none');
                } else {
                    tpl = tpl_1.replace('{{total}}', signCogAry[i].prizeUpperLimit)
                        .replace('{{display}}', 'block');
                }
            } else if (signCogAry[i].signEarnFlag == '1') {
                if (signCogAry[i].prizeUpperLimit == '0' || signCogAry[i].prizeUpperLimit == 'undefined' || signCogAry[i].prizeUpperLimit == '' || signCogAry[i].prizeUpperLimit == undefined) {
                    tpl = tpl_2.replace('{{money}}', signCogAry[i].signEarnMoney)
                        .replace('{{display}}', 'none');
                } else {
                    tpl = tpl_2.replace('{{money}}', signCogAry[i].signEarnMoney)
                        .replace('{{total}}', signCogAry[i].prizeUpperLimit)
                        .replace('{{display}}', 'block');
                }
            } else if (signCogAry[i].signEarnFlag == '2') {
                tpl = tpl_3.replace('{{money}}', signCogAry[i].signEarnMoney);
            }
            var createSlider = $('<div class="slider slider_' + i + '"></div>');
            if (signCogAry[i].skuRelationType == '2') { //混合模式
                tpl_sku = tpl_6
                    .replace('{{num}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].signNum + '天' : signCogAry[i].signinSkuCogLst[0].signNum + '次')
                    .replace('{{diff}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].surplusSignNum + '天' : signCogAry[i].signinSkuCogLst[0].surplusSignNum + '次');
            } else {
                if (signCogAry[i].signinSkuCogLst.length == 1) {
                    tpl_sku = tpl_4
                        .replace('{{name}}', signCogAry[i].signinSkuCogLst[0].skuName)
                        .replace('{{skuLogo}}', _host + signCogAry[i].signinSkuCogLst[0].skuLogo)
                        .replace('{{type}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].signNum + '天' : signCogAry[i].signinSkuCogLst[0].signNum + '次')
                        .replace('{{diff}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].surplusSignNum + '天' : signCogAry[i].signinSkuCogLst[0].surplusSignNum + '次');
                } else {
                    tpl_sku = tpl_4
                        .replace('{{name}}', signCogAry[i].signinSkuCogLst[0].skuName)
                        .replace('{{skuLogo}}', _host + signCogAry[i].signinSkuCogLst[0].skuLogo)
                        .replace('{{type}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].signNum + '天' : signCogAry[i].signinSkuCogLst[0].signNum + '次')
                        .replace('{{diff}}', signCogAry[i].signinSkuCogLst[0].signType === '0' ? signCogAry[i].signinSkuCogLst[0].surplusSignNum + '天' : signCogAry[i].signinSkuCogLst[0].surplusSignNum + '次');
                    for (var j = 1; j < signCogAry[i].signinSkuCogLst.length; j++) {
                        tpl_sku += tpl_5
                            .replace('{{name}}', signCogAry[i].signinSkuCogLst[j].skuName)
                            .replace('{{skuLogo}}', _host + signCogAry[i].signinSkuCogLst[j].skuLogo)
                            .replace('{{type}}', signCogAry[i].signinSkuCogLst[j].signType === '0' ? signCogAry[i].signinSkuCogLst[j].signNum + '天' : signCogAry[i].signinSkuCogLst[j].signNum + '次')
                            .replace('{{diff}}', signCogAry[i].signinSkuCogLst[j].signType === '0' ? signCogAry[i].signinSkuCogLst[j].surplusSignNum + '天' : signCogAry[i].signinSkuCogLst[j].surplusSignNum + '次')
                            .replace('{{logic}}', signCogAry[i].skuRelationType === '0' ? '且' : '或');
                    }
                }
            }
            createSlider.append(tpl_sku);
            $('.signMiddle').append(tpl);
            $('.mainBottom').append(createSlider);
        }
        //设置父元素和子元素的宽度
        $('.signMiddle').css('width', signCogAry.length * 100 + '%');
        $('.swiper').css('width', 100 / signCogAry.length + '%');
        //默认是否显示前进按钮
        if (signCogAry.length >= 2) {
            $('.signRight').css('display', 'block');
        }
        //默认底部sku列表
        $('.slider_0').css('display', 'block');
        //默认进度条
        $('.inner').css('width', signCogAry[0].signPercent);
        $('.progressTitle').css('left', (Number(signCogAry[0].signPercent.replace('%', '')) - 10) + '%');
        $('.progressTitle p').text(signCogAry[0].signPercent);
        //默认是否显示遮罩层
        if (signCogAry[0].activityFinish == '1') { //已截止
            $('.signMask').find('img').attr('src', '/v/bxqp-common/img/sign/mask_over.png?v=1');
            $('.signMask').css('display', 'block');
        } else { //进行中
            $('.signMask').find('img').attr('src', '/v/bxqp-common/img/sign/mask.png?v=1');
            if (signCogAry[0].signEarnFlag == '0') { //未达成
                $('.signMask').css('display', 'none');
            } else if (signCogAry[0].signEarnFlag == '1') {
                $('.signMask').css('display', 'block');
            } else if (signCogAry[0].signEarnFlag == '2') {
                $('.signMask').css('display', 'block');
            }
        }
        //默认本周还是本月签到
        if (signCogAry[0].periodType == '0') { //周
            $('.bgTop').attr('src', imgUrl + 'img/sign/bg_top.png');
        } else if (signCogAry[0].periodType == '1') { //月
            $('.bgTop').attr('src', imgUrl + 'img/sign/bg_top_2.png');
        }
        //默认的活动说明内容
        sessionStorage.rule = signCogAry[0].activityDesc;
        //轮播
        var start = 0;
        var index = 0;
        $('.signRight').on('click', function () {
            index++;
            //轮播
            var S = (start - index) * 100 + '%';
            $('.signMiddle').css('marginLeft', S);
            //是否显示前进按钮
            if (index == signCogAry.length - 1) {
                $('.signRight').css('display', 'none');
                $('.signLeft').css('display', 'block');
            } else {
                $('.signLeft').css('display', 'block');
                $('.signRight').css('display', 'block');
            }
            slide(index);
        });
        $('.signLeft').on('click', function () {
            index--;
            //轮播
            var S = (start - index) * 100 + '%';
            $('.signMiddle').css('marginLeft', S);
            //是否显示后退按钮
            if (index == 0) {
                $('.signLeft').css('display', 'none');
                $('.signRight').css('display', 'block');
            } else {
                $('.signLeft').css('display', 'block');
                $('.signRight').css('display', 'block');
            }
            slide(index);
        });

        function slide(index) {
            $('.slider').css('display', 'none');
            $('.slider').eq(index).css('display', 'block');
            //进度条切换
            $('.inner').css('width', signCogAry[index].signPercent);
            $('.progressTitle').css('left', (Number(signCogAry[index].signPercent.replace('%', '')) - 10) + '%');
            $('.progressTitle p').text(signCogAry[index].signPercent);
            //重置遮罩层高度
            var H = document.getElementsByClassName('slider_' + index)[0].offsetHeight; //0
            $('.signMask').css('height', H + 'px');
            if (signCogAry[index].activityFinish == '1') { //已截止
                $('.signMask').find('img').attr('src', '/v/bxqp-common/img/sign/mask_over.png?v=1');
                $('.signMask').css('display', 'block');
            } else if (signCogAry[index].activityFinish == '0') { //进行中
                $('.signMask').find('img').attr('src', '/v/bxqp-common/img/sign/mask.png?v=1');
                if (signCogAry[index].signEarnFlag == '0') { //未达成
                    $('.signMask').css('display', 'none');
                } else if (signCogAry[index].signEarnFlag == '1') {
                    $('.signMask').css('display', 'block');
                } else if (signCogAry[index].signEarnFlag == '2') {
                    $('.signMask').css('display', 'block');
                }
            }
            //周签到or月签到
            if (signCogAry[index].periodType == '0') { //周
                $('.bgTop').attr('src', imgUrl + 'img/sign/bg_top.png');
            } else if (signCogAry[index].periodType == '1') { //月
                $('.bgTop').attr('src', imgUrl + 'img/sign/bg_top_2.png');
            }
            sessionStorage.rule = signCogAry[index].activityDesc;
        }

        // // 初始化手指坐标点
        // var startPoint = 0;
        // var startEle = 0;
        // var dom_signContent = document.getElementsByClassName('signContent')[0];
        // var dom_signMiddle = document.getElementsByClassName('signMiddle')[0];
        // var aLiWidth = $('.signMiddle').width();
        // var aLi = document.querySelectorAll(".swiper");
        // //手指按下
        // dom_signContent.addEventListener("touchstart", function (e) {
        //     startPoint = e.changedTouches[0].pageX;
        //     startEle = dom_signMiddle.offsetLeft;
        // });
        // // //手指滑动
        // dom_signContent.addEventListener("touchmove", function (e) {
        //     var currPoint = e.changedTouches[0].pageX;
        //     var disX = currPoint - startPoint;
        //     var left = startEle + disX;
        //     dom_signMiddle.style.transition = 'all 0s linear';
        //     dom_signMiddle.style.marginLeft = left + 'px';
        // });
        // //当手指抬起的时候，判断图片滚动离左右的距离，当
        // dom_signContent.addEventListener("touchend", function (e) {
        //     var left = dom_signMiddle.offsetLeft;
        //     // 判断正在滚动的图片距离左右图片的远近，以及是否为最后一张或者第一张
        //     var currNum = Math.round(-left / aLiWidth);
        //     // console.log(currNum);
        //     currNum = currNum >= (aLi.length - 1) ? aLi.length - 1 : currNum;
        //     currNum = currNum <= 0 ? 0 : currNum;
        //     console.log(currNum);
        //     dom_signMiddle.style.transition = 'all 0.3s linear';
        //     dom_signMiddle.style.marginLeft = -currNum * dom_signContent.offsetWidth + 'px';
        //     index = currNum;
        //     if (index == 0) {
        //         $('.signLeft').css('display', 'none');
        //         $('.signRight').css('display', 'block');
        //     } else if (index == signCogAry.length - 1) {
        //         $('.signRight').css('display', 'none');
        //         $('.signLeft').css('display', 'block');
        //     } else {
        //         $('.signLeft').css('display', 'block');
        //         $('.signRight').css('display', 'block');
        //     }
        //     slide(index);
        // })


        //绑定存入我的零钱包事件
        if ($('.signBtn').length > 0) {
            $('.signBtn').on('click', function () {
                ifremeber();
                /* 判断关注 */
                function ifremeber() {
                    var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
                    vge.ajxget(requrl, 5000, function (r) {
                        try {
                            var o = JSON.parse(r);
                            if (o.subscribe == '0') { //未关注
                                window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
                            } else { //已关注用户
                                window.location.replace('http://' + location.host + '/' + PROJECT + '/too/mybag');
                            }
                        } catch (e) {
                            vge.clog('errmsg', [requrl, e]);
                        }
                    }, function (err) {
                        vge.clog('errmsg', [requrl, err]);
                    });
                }
            });
        }
        //查看活动规则
        $('.signCk').on('click', function () {
            $('#signContent').html(sessionStorage.rule);
            $('.signRule').css('display', 'block');
            // window.location.replace('http://' + location.host + '/v/bxqp-common/signRule.html');
        });
        $('#signBack').on('click', function () {
            $('#signContent').html('');
            $('.signRule').css('display', 'none');
        });
    } else if (weekSignFlag === '' || weekSignFlag === '0') { //关闭签到功能，则不显示开关按钮
        $('#sign_logo').css('display', 'none');
    }
}