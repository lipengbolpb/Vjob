/**
 * 捆绑促销
 * 从sessionStorage获取数据
 */
// var result = {
//     "reply": {
//         "activityScanCount": 12,
//         "activityVersion": "1",
//         "batchName": "山西西安20180328test测试活动001-pm01",
//         "codeContentUrl": "http://img.vjifen.com:8000/images/xinym/kc.png",
//         "currentMoney": "0.23",
//         "currentVpoints": 0,
//         "dayScanNum": "6",
//         "earnTime": "2018-05-23 14:47:15",
//         "monthPrizeFlag": "0",
//         "newScanFlag": true,
//         "nickName": "当当",
//         "prizeType": "0",
//         "prizeVcode": "Y9D348Y7BQNC",
//         "promotionCogAry": [{
//             "activityDesc": "活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明",
//             "activityFinish": "1",
//             "activityName": "捆绑促销1",
//             "doubtRuleCoe": "50",
//             "doubtRuleType": "1",
//             "earnFlag": "1",
//             "earnMoney": "0.40",
//             "endDate": "2018-06-08",
//             "percent": "100%",
//             "periodType": "0",
//             "prizeGainType": "1",
//             "prizeUpperLimit": 5,
//             "promotionSkuCog": {
//                 "deleteFlag": "0",
//                 "signNum": 1,
//                 "signOperator": "3",
//                 "signRecord": "{\"1\":1,\"2\":5,\"3\":1}",
//                 "signType": "1",
//                 "skuKey": "241510936-004",
//                 "skuLogo": "/upload/skulogo/bottle_yechang.png",
//                 "skuName": "青岛啤酒004-经典8度004",
//                 "surplusSignNum": 0
//             },
//             "signinSkuCogLst": [],
//             "skuRelationPeriod": "1",
//             "skuRelationType": "0",
//             "startDate": "2018-05-21"
//         }, {
//             "activityDesc": "1.活动进行时间：2018年04月19日至2018年05月25日截止；\r\n2.活动期间扫青岛啤酒-清爽8度600*12箱啤100瓶",
//             "activityFinish": "0",
//             "activityName": "经典500*12，清爽8度500*9促销清爽8度600*12净水",
//             "doubtRuleRangeMax": "0.51",
//             "doubtRuleRangeMin": "0.44",
//             "doubtRuleType": "2",
//             "earnFlag": "0",
//             "endDate": "2018-05-25",
//             "percent": "0%",
//             "periodType": "2",
//             "prizeGainType": "1",
//             "prizeUpperLimit": 1000,
//             "promotionSkuCog": {
//                 "deleteFlag": "0",
//                 "signNum": 5,
//                 "signOperator": "3",
//                 "signType": "1",
//                 "skuKey": "241510936-003",
//                 "skuLogo": "/upload/skulogo/bottle_hongyun.png",
//                 "skuName": "青岛啤酒003-清爽8度600*12箱啤（净水）",
//                 "surplusSignNum": 5
//             },
//             "signinSkuCogLst": [{
//                 "continueFlag": "0",
//                 "signNum": 2,
//                 "signType": "1",
//                 "skuKey": "241510936-001",
//                 "skuLogo": "/upload/skulogo/pot_jingdian_500.png",
//                 "skuName": "青岛啤酒001青岛啤酒001青岛啤酒001青岛啤酒001",
//                 "surplusSignNum": 0
//             }, {
//                 "continueFlag": "0",
//                 "signNum": 2,
//                 "signType": "1",
//                 "skuKey": "241510936-002",
//                 "skuLogo": "/upload/skulogo/bottle_jingdian_500.png",
//                 "skuName": "青岛啤酒002-清爽8度600*9塑包",
//                 "surplusSignNum": 0
//             }, {
//                 "continueFlag": "0",
//                 "signNum": 2,
//                 "signType": "1",
//                 "skuKey": "241510936-003",
//                 "skuLogo": "/upload/skulogo/bottle_hongyun.png",
//                 "skuName": "青岛啤酒003-清爽8度600*12箱啤（净水）",
//                 "surplusSignNum": 0
//             }],
//             "skuRelationPeriod": "1",
//             "skuRelationType": "2",
//             "startDate": "2018-05-22"
//         }],
//         "promotionFlag": "1",
//         "promotionPopup": "0",
//         "scanTime": "2018-05-23 14:47:15",
//         "signCogAry": [{
//             "activityDesc": "说明说明",
//             "activityFinish": "1",
//             "activityName": "月签到SKU签到活动连续001*3天+002*3次",
//             "endDate": "2019-06-09",
//             "limitNum": 100,
//             "periodType": "1",
//             "prizeUpperLimit": 0,
//             "signEarnFlag": "0",
//             "signPercent": "100%",
//             "signinSkuCogLst": [{
//                 "continueFlag": "1",
//                 "signNum": 3,
//                 "signType": "0",
//                 "skuKey": "241510936-001",
//                 "skuLogo": "/upload/skulogo/pot_jingdian_500.png",
//                 "skuName": "青岛啤酒001青岛啤酒001青岛啤酒001青岛啤酒001",
//                 "surplusSignNum": 2
//             }, {
//                 "continueFlag": "0",
//                 "signNum": 3,
//                 "signType": "1",
//                 "skuKey": "241510936-002",
//                 "skuLogo": "/upload/skulogo/bottle_jingdian_500.png",
//                 "skuName": "青岛啤酒002-清爽8度600*9塑包",
//                 "surplusSignNum": 0
//             }],
//             "skuRelationType": "1",
//             "startDate": "2018-04-27"
//         }, {
//             "activityDesc": "       活动说明\r\n●  根据活动说明扫指定商品瓶盖二维码算做签到一次；\r\n●  每个用户每周内只获得一次签到红包，机会难得，不要错过；\r\n● 本期指定商品为青岛啤酒经典8度500ml*9，青岛经典8度600ml*9，青岛啤酒清爽8度330ml*6罐；\r\n● 本期签到红包将自动转入公众号账户余额，您可关注“陕西青啤”公众账号，进入“我的红包”提现；\r\n●   根据活动说明扫指定商品瓶盖二维码算做签到一次；\r\n●  每个用户每周内只获得一次签到红包，机会难得，不要错过；\r\n● 本期指定商品为青岛啤酒经典8度500ml*9，青岛经典8度600ml*9，青岛啤酒清爽8度330ml*6罐；\r\n● 本期签到红包将自动转入公众号账户余额，您可关注“陕西青啤”公众账号，进入“我的红包”提现；\r\n●  根据活动说明扫指定商品瓶盖二维码算做签到一次；\r\n\r\n●  每个用户每周内只获得一次签到红包，机会难得，不要错过；\r\n● 本期指定商品为青岛啤酒经典8度500ml*9，青岛经典8度600ml*9，青岛啤酒清爽8度330ml*6罐；\r\n● 本期签到红包将自动转入公众号账户余额，您可关注“陕西青啤”公众账号，进入“我的红包”提现；\r\n●  根据活动说明扫指定商品瓶盖二维码算做签到一次；\r\n●  每个用户每周内只获得一次签到红包，机会难得，不要错过；\r\n● 本期指定商品为青岛啤酒经典8度500ml*9，青岛经典8度600ml*9，青岛啤酒清爽8度330ml*6罐；\r\n● 本期签到红包将自动转入公众号账户余额，您可关注“陕西青啤”公众账号，进入“我的红包”提现；\r\n●  根据活动说明扫指定商品瓶盖二维码算做签到一次；\r\n●  每个用户每周内只获得一次签到红包，机会难得，不要错过；\r\n● 本期指定商品为青岛啤酒经典8度500ml*9，青岛经典8度600ml*9，青岛啤酒清爽8度330ml*6罐；",
//             "activityFinish": "0",
//             "activityName": "月签到活动003*4次数验证",
//             "endDate": "2018-07-12",
//             "limitNum": 8,
//             "periodType": "1",
//             "prizeUpperLimit": 0,
//             "signEarnFlag": "1",
//             "signEarnMoney": "0.20",
//             "signPercent": "100%",
//             "signinSkuCogLst": [{
//                 "continueFlag": "0",
//                 "signNum": 2,
//                 "signType": "1",
//                 "skuKey": "241510936-001",
//                 "skuLogo": "/upload/skulogo/pot_jingdian_500.png",
//                 "skuName": "青岛啤酒001青岛啤酒001青岛啤酒001青岛啤酒001",
//                 "surplusSignNum": 0
//             }, {
//                 "continueFlag": "0",
//                 "signNum": 2,
//                 "signType": "1",
//                 "skuKey": "241510936-002",
//                 "skuLogo": "/upload/skulogo/bottle_jingdian_500.png",
//                 "skuName": "青岛啤酒002-清爽8度600*9塑包",
//                 "surplusSignNum": 0
//             }, {
//                 "continueFlag": "0",
//                 "signNum": 2,
//                 "signType": "1",
//                 "skuKey": "241510936-003",
//                 "skuLogo": "/upload/skulogo/bottle_hongyun.png",
//                 "skuName": "青岛啤酒003-清爽8度600*12箱啤（净水）",
//                 "surplusSignNum": 0
//             }, {
//                 "continueFlag": "0",
//                 "signNum": 2,
//                 "signType": "1",
//                 "skuKey": "241510936-004",
//                 "skuLogo": "/upload/skulogo/bottle_yechang.png",
//                 "skuName": "青岛啤酒004-经典8度004",
//                 "surplusSignNum": 0
//             }, {
//                 "continueFlag": "0",
//                 "signNum": 2,
//                 "signType": "1",
//                 "skuKey": "241510936-005",
//                 "skuLogo": "/upload/skulogo/bottle_jingdian_1903_500.png",
//                 "skuName": "青岛啤酒005-经典8度005",
//                 "surplusSignNum": 0
//             }],
//             "skuRelationType": "2",
//             "startDate": "2018-04-26"
//         }],
//         "skukey": "241510936-002",
//         "totalAccountMoney": "0.23",
//         "totalVpoints": 0,
//         "useStatus": "2",
//         "vcodeActivityKey": "7e002d55-7fe8-4311-b827-c894f48a74d1",
//         "weekSignFlag": "1",
//         "weekSignPopup": "0"
//     },
//     "replyTime": 1527058037192,
//     "result": {
//         "batchFlage": false,
//         "businessCode": "0",
//         "code": "0",
//         "msg": "扫码成功",
//         "validFlage": true
//     }
// }

// sessionStorage.setItem('promotionCogAry', JSON.stringify(result.reply.promotionCogAry));
// var promotionFlag = '1';
// var promotionPopup = '0';
// var promotionCogAry = JSON.parse(sessionStorage.getItem('promotionCogAry'));


var promotionFlag = sessionStorage.promotionFlag == 'undefined' ? '0' : sessionStorage.promotionFlag, //是否开启1:开启、0或空:关闭
    promotionPopup = sessionStorage.promotionPopup == 'undefined' ? '0' : sessionStorage.promotionPopup, //1:弹出提示、0或空:不弹出
    promotionCogAry = JSON.parse(sessionStorage.getItem('promotionCogAry')); //活动列表

var imgUrl = '/v/bxqp-common/';
var _host = vge.bxqpimg + '/DBTBXQPPlatform';
//是否显示捆绑促销按钮
if (promotionFlag === '1') { //1为开启
    $('.hbGet,.open').one('click', function () {
        $('.hbGet,.open').unbind();
        setTimeout(function () {
            $('.get').fadeOut(600);
            $('.cash').fadeIn(600, function () {
                $('#sale_icon').css('display', 'block');
                //是否自动弹出
                if (promotionPopup === '1') { //1为自动弹出
                    setTimeout(function () {
                        $('.sale').css('display', 'block');
                    }, 500);
                } else {
                    $('.sale').css('display', 'none');
                }
            });
        }, 1000);
    });
    //生成页面结构
    //且
    var tpl1 = `
        <div class="saleAlsoList">
            <p class="saleAlsoListTitle">{{skuName}}</p>
            <img src="{{img}}" class="saleBeer">
            <div class="saleProgress">
                <div class="saleInner" style="width:{{width}};">
                    <div class="saleNum">
                        <p>{{signNum}}</p>
                    </div>
                </div>
            </div>
            <p class="saleAlsoListNum">{{total}}{{type}}</p>
        </div>
    `;
    //或（A）
    var tpl2 = `
        <div class="saleOrA">
            <div class="saleOrAList">
                <p class="saleOrAListTitle">{{skuName}}</p>
                <img src="{{img}}" class="saleBeer">
                <div class="saleProgress">
                    <div class="saleInner" style="width:{{width}};">
                        <div class="saleNum">
                            <p>{{signNum}}</p>
                        </div>
                    </div>
                </div>
                <p class="saleOrListNum">{{total}}{{type}}</p>
            </div>
            <img src="/v/bxqp-common/img/sale/A.png" class="saleIconA">
        </div>
        <img src="/v/bxqp-common/img/sale/add.png" class="saleAdd">
    `;
    //或（B）
    var tpl3 = `
    <div class="saleOrBList">
        <p class="saleOrBListTitle">{{skuName}}</p>
        <img src="{{img}}" class="saleBeer">
        <div class="saleProgress">
            <div class="saleInner" style="width:{{width}};">
                <div class="saleNum">
                    <p>{{signNum}}</p>
                </div>
            </div>
        </div>
        <p class="saleOrListNum">{{total}}{{type}}</p>
    </div>
    <img src="/v/bxqp-common/img/sale/or.png" class="saleSplit">
    `;
    var tpl4 = `
    <div class="saleOrBList">
        <p class="saleOrBListTitle">{{skuName}}</p>
        <img src="{{img}}" class="saleBeer">
        <div class="saleProgress">
            <div class="saleInner" style="width:{{width}};">
                <div class="saleNum">
                    <p>{{signNum}}</p>
                </div>
            </div>
        </div>
        <p class="saleOrListNum">{{total}}{{type}}</p>
    </div>
    `;
    //混合（A）
    var tpl5 = `
    <div class="saleMixA">
        <div class="saleMixAList">
            <p class="saleMixAListTitle">{{skuName}}</p>
            <img src="{{img}}" class="saleBeer">
            <div class="saleProgress">
                <div class="saleInner" style="width:{{width}};">
                    <div class="saleNum">
                        <p>{{signNum}}</p>
                    </div>
                </div>
            </div>
            <p class="saleMixListNum">{{total}}{{type}}</p>
        </div>
        <img src="/v/bxqp-common/img/sale/A.png" class="saleIconA">
    </div>
    <img src="/v/bxqp-common/img/sale/add.png" class="saleAdd">
    `;
    //混合（B）进度条
    var tpl6 = `
    <div class="saleMixBTitle">
        <p>进度</p>
        <div class="saleProgress">
            <div class="saleInner" style="width:{{width}};">
                <div class="saleNum">
                    <p>{{signNum}}</p>
                </div>
            </div>
        </div>
        <p class="saleMixListNum">{{total}}{{type}}</p>
    </div>
    <img src="/v/bxqp-common/img/sale/B.png" class="saleIconB">
    `;
    //混合（B）
    var tpl7 = `
    <div class="saleMixBList">
        <p>{{skuName}}</p>
        <img src="{{img}}" class="saleMixBeer">
    </div>
    `;
    for (var i = 0; i < promotionCogAry.length; i++) {
        var tpl = '';
        if (promotionCogAry[i].skuRelationType === '0') { //且
            var create = $('<div class="saleAlso" key="0"></div>');
            if (promotionCogAry[i].earnFlag === '0') { //未完成
                create.attr('flag', '0');
                create.attr('money', '0');
            } else if (promotionCogAry[i].earnFlag === '1') { //已领取
                create.attr('flag', '1');
                create.attr('money', promotionCogAry[i].earnMoney);
            } else if (promotionCogAry[i].earnFlag === '2') { //领取红包
                create.attr('flag', '2');
                create.attr('money', promotionCogAry[i].earnMoney);
            }
            if (promotionCogAry[i].activityFinish === '1') { //活动已结束
                create.attr('activityFinish', '1');
            } else if (promotionCogAry[i].activityFinish === '0') { //正常
                create.attr('activityFinish', '0');
            }
            create.attr('periodType', promotionCogAry[i].periodType);
            create.attr('prizeUpperLimit', promotionCogAry[i].prizeUpperLimit);
            if (promotionCogAry[i].skuRelationPeriod === '1') { //上期
                create.attr('skuRelationPeriod', '1');
            } else if (promotionCogAry[i].skuRelationPeriod === '0') { //本期
                create.attr('skuRelationPeriod', '0');
            }
            var l = promotionCogAry[i].signinSkuCogLst.length;
            if (l > 0) {
                var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                    total = promotionCogAry[i].promotionSkuCog.signNum,
                    signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                    width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                    beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                tpl = tpl1.replace('{{skuName}}', skuName)
                    .replace('{{signNum}}', signNum)
                    .replace('{{total}}', total)
                    .replace('{{width}}', width)
                    .replace('{{img}}', beer);
                if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                    tpl = tpl.replace('{{type}}', '天');
                } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                    tpl = tpl.replace('{{type}}', '瓶');
                }
                create.append(tpl);
                for (var k = 0; k < l; k++) {
                    var skuName = promotionCogAry[i].signinSkuCogLst[k].skuName,
                        total = promotionCogAry[i].signinSkuCogLst[k].signNum,
                        signNum = parseFloat(promotionCogAry[i].signinSkuCogLst[k].signNum) - parseFloat(promotionCogAry[i].signinSkuCogLst[k].surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                        beer = _host + promotionCogAry[i].signinSkuCogLst[k].skuLogo;
                    tpl = tpl1.replace('{{skuName}}', skuName)
                        .replace('{{signNum}}', signNum)
                        .replace('{{total}}', total)
                        .replace('{{width}}', width)
                        .replace('{{img}}', beer);
                    if (promotionCogAry[i].signinSkuCogLst[k].signType === '0') { //天??
                        tpl = tpl.replace('{{type}}', '天');
                    } else if (promotionCogAry[i].signinSkuCogLst[k].signType === '1') { //瓶??
                        tpl = tpl.replace('{{type}}', '瓶');
                    }
                    create.append(tpl);
                }
                var img = $('<img src="/v/bxqp-common/img/sale/over.png" class="saleOver">');
                create.append(img);
            } else {
                var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                    total = promotionCogAry[i].promotionSkuCog.signNum,
                    signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                    width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                    beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                tpl = tpl1.replace('{{skuName}}', skuName)
                    .replace('{{signNum}}', signNum)
                    .replace('{{total}}', total)
                    .replace('{{width}}', width)
                    .replace('{{img}}', beer);
                if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                    tpl = tpl.replace('{{type}}', '天');
                } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                    tpl = tpl.replace('{{type}}', '瓶');
                }
                create.append(tpl);
                var img = $('<img src="/v/bxqp-common/img/sale/over.png" class="saleOver">');
                create.append(img);
            }
            $('.saleContent').append(create);
        } else if (promotionCogAry[i].skuRelationType === '1') { //或
            var create = $('<div class="saleOr" key="1"></div>');
            if (promotionCogAry[i].earnFlag === '0') { //未完成
                create.attr('flag', '0');
                create.attr('money', '0');
            } else if (promotionCogAry[i].earnFlag === '1') { //已领取
                create.attr('flag', '1');
                create.attr('money', promotionCogAry[i].earnMoney);
            } else if (promotionCogAry[i].earnFlag === '2') { //领取红包
                create.attr('flag', '2');
                create.attr('money', promotionCogAry[i].earnMoney);
            }
            if (promotionCogAry[i].activityFinish === '1') { //活动已结束
                create.attr('activityFinish', '1');
            } else if (promotionCogAry[i].activityFinish === '0') { //正常
                create.attr('activityFinish', '0');
            }
            if (promotionCogAry[i].skuRelationPeriod === '1') { //上期
                create.attr('skuRelationPeriod', '1');
            } else if (promotionCogAry[i].skuRelationPeriod === '0') { //本期
                create.attr('skuRelationPeriod', '0');
            }
            create.attr('periodType', promotionCogAry[i].periodType);
            create.attr('prizeUpperLimit', promotionCogAry[i].prizeUpperLimit);
            var l = promotionCogAry[i].signinSkuCogLst.length;
            if (l > 0) {
                //1.添加A部分
                var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                    total = promotionCogAry[i].promotionSkuCog.signNum,
                    signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                    width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                    beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                tpl = tpl2.replace('{{skuName}}', skuName)
                    .replace('{{signNum}}', signNum)
                    .replace('{{total}}', total)
                    .replace('{{width}}', width)
                    .replace('{{img}}', beer);
                if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                    tpl = tpl.replace('{{type}}', '天');
                } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                    tpl = tpl.replace('{{type}}', '瓶');
                }
                create.append(tpl);
                //2.添加B部分
                var createB = $('<div class="saleOrB"></div>');
                var l = promotionCogAry[i].signinSkuCogLst.length;
                for (var k = 0; k < l; k++) {
                    var skuName = promotionCogAry[i].signinSkuCogLst[k].skuName,
                        total = promotionCogAry[i].signinSkuCogLst[k].signNum,
                        signNum = parseFloat(promotionCogAry[i].signinSkuCogLst[k].signNum) - parseFloat(promotionCogAry[i].signinSkuCogLst[k].surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                        beer = _host + promotionCogAry[i].signinSkuCogLst[k].skuLogo;
                    if (k === l - 1) { //最后一项
                        tpl = tpl4.replace('{{skuName}}', skuName)
                            .replace('{{signNum}}', signNum)
                            .replace('{{total}}', total)
                            .replace('{{width}}', width)
                            .replace('{{img}}', beer);
                        if (promotionCogAry[i].signinSkuCogLst[k].signType === '0') { //天??
                            tpl = tpl.replace('{{type}}', '天');
                        } else if (promotionCogAry[i].signinSkuCogLst[k].signType === '1') { //瓶??
                            tpl = tpl.replace('{{type}}', '瓶');
                        }
                    } else {
                        tpl = tpl3.replace('{{skuName}}', skuName)
                            .replace('{{signNum}}', signNum)
                            .replace('{{total}}', total)
                            .replace('{{width}}', width)
                            .replace('{{img}}', beer);
                        if (promotionCogAry[i].signinSkuCogLst[k].signType === '0') { //天??
                            tpl = tpl.replace('{{type}}', '天');
                        } else if (promotionCogAry[i].signinSkuCogLst[k].signType === '1') { //瓶??
                            tpl = tpl.replace('{{type}}', '瓶');
                        }
                    }
                    createB.append(tpl);
                }
                createB.append(`<img src="/v/bxqp-common/img/sale/B.png" class="saleIconB">`);
                create.append(createB);
                create.append(`<img src="/v/bxqp-common/img/sale/over.png" class="saleOver" style="top:30%">`);
            } else {
                var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                    total = promotionCogAry[i].promotionSkuCog.signNum,
                    signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                    width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                    beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                tpl = tpl1.replace('{{skuName}}', skuName)
                    .replace('{{signNum}}', signNum)
                    .replace('{{total}}', total)
                    .replace('{{width}}', width)
                    .replace('{{img}}', beer);
                if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                    tpl = tpl.replace('{{type}}', '天');
                } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                    tpl = tpl.replace('{{type}}', '瓶');
                }
                create.append(tpl);
                var img = $('<img src="/v/bxqp-common/img/sale/over.png" class="saleOver">');
                create.append(img);
                create.removeClass('saleOr');
                create.addClass('saleAlso');
            }
            $('.saleContent').append(create);
        } else if (promotionCogAry[i].skuRelationType === '2') { //混合
            var create = $('<div class="saleMix" key="2"></div>');
            if (promotionCogAry[i].earnFlag === '0') { //未完成
                create.attr('flag', '0');
                create.attr('money', '0');
            } else if (promotionCogAry[i].earnFlag === '1') { //已领取
                create.attr('flag', '1');
                create.attr('money', promotionCogAry[i].earnMoney);
            } else if (promotionCogAry[i].earnFlag === '2') { //领取红包
                create.attr('flag', '2');
                create.attr('money', promotionCogAry[i].earnMoney);
            }
            if (promotionCogAry[i].activityFinish === '1') { //活动已结束
                create.attr('activityFinish', '1');
            } else if (promotionCogAry[i].activityFinish === '0') { //正常
                create.attr('activityFinish', '0');
            }
            if (promotionCogAry[i].skuRelationPeriod === '1') { //上期
                create.attr('skuRelationPeriod', '1');
            } else if (promotionCogAry[i].skuRelationPeriod === '0') { //本期
                create.attr('skuRelationPeriod', '0');
            }
            create.attr('periodType', promotionCogAry[i].periodType);
            create.attr('prizeUpperLimit', promotionCogAry[i].prizeUpperLimit);
            var l = promotionCogAry[i].signinSkuCogLst.length;
            if (l > 0) {
                //1.添加A部分
                var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                    total = promotionCogAry[i].promotionSkuCog.signNum,
                    signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                    width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                    beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                tpl = tpl5.replace('{{skuName}}', skuName)
                    .replace('{{signNum}}', signNum)
                    .replace('{{total}}', total)
                    .replace('{{width}}', width)
                    .replace('{{img}}', beer);
                if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                    tpl = tpl.replace('{{type}}', '天');
                } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                    tpl = tpl.replace('{{type}}', '瓶');
                }
                create.append(tpl);
                //2.添加B部分进度条
                if (promotionCogAry[i].signinSkuCogLst.length > 0) {
                    var createB = $('<div class="saleMixB"></div>');
                    var skuName = promotionCogAry[i].signinSkuCogLst[0].skuName,
                        total = promotionCogAry[i].signinSkuCogLst[0].signNum,
                        signNum = parseFloat(promotionCogAry[i].signinSkuCogLst[0].signNum) - parseFloat(promotionCogAry[i].signinSkuCogLst[0].surplusSignNum),
                        width = parseFloat(signNum) / parseFloat(total) * 100 + '%';
                    tpl = tpl6.replace('{{signNum}}', signNum)
                        .replace('{{total}}', total)
                        .replace('{{width}}', width);
                    if (promotionCogAry[i].signinSkuCogLst.length > 0) {
                        if (promotionCogAry[i].signinSkuCogLst[0].signType === '0') { //天??
                            tpl = tpl.replace('{{type}}', '天');
                        } else if (promotionCogAry[i].signinSkuCogLst[0].signType === '1') { //瓶??
                            tpl = tpl.replace('{{type}}', '瓶');
                        }
                    }
                    createB.append(tpl);
                }
                //3.添加B部分
                var l = promotionCogAry[i].signinSkuCogLst.length;
                for (var k = 0; k < l; k++) {
                    var skuName = promotionCogAry[i].signinSkuCogLst[k].skuName,
                        beer = _host + promotionCogAry[i].signinSkuCogLst[k].skuLogo;
                    tpl = tpl7.replace('{{skuName}}', skuName).replace('{{img}}', beer);
                    createB.append(tpl);
                }
                create.append(createB);
                create.append(`<img src="/v/bxqp-common/img/sale/over.png" class="saleOver" style="top:30%">`);
            } else {
                var skuName = promotionCogAry[i].promotionSkuCog.skuName,
                    total = promotionCogAry[i].promotionSkuCog.signNum,
                    signNum = parseFloat(promotionCogAry[i].promotionSkuCog.signNum) - parseFloat(promotionCogAry[i].promotionSkuCog.surplusSignNum),
                    width = parseFloat(signNum) / parseFloat(total) * 100 + '%',
                    beer = _host + promotionCogAry[i].promotionSkuCog.skuLogo;
                tpl = tpl1.replace('{{skuName}}', skuName)
                    .replace('{{signNum}}', signNum)
                    .replace('{{total}}', total)
                    .replace('{{width}}', width)
                    .replace('{{img}}', beer);
                if (promotionCogAry[i].promotionSkuCog.signType === '0') { //天??
                    tpl = tpl.replace('{{type}}', '天');
                } else if (promotionCogAry[i].promotionSkuCog.signType === '1') { //瓶??
                    tpl = tpl.replace('{{type}}', '瓶');
                }
                create.append(tpl);
                var img = $('<img src="/v/bxqp-common/img/sale/over.png" class="saleOver">');
                create.append(img);
                create.removeClass('saleOr');
                create.addClass('saleAlso');
            }
            $('.saleContent').append(create);
        }
    }

    var key = '';
    var flag = '';
    var money = '';
    var type = '';
    var activityFinish = '';
    var skuRelationPeriod = '';
    var prizeUpperLimit = '';
    //默认是否显示按钮
    if ($('.saleContent').children().length > 1) {
        $('.saleNext').addClass('show');
    }
    //默认sku列表
    $('.saleContent').children().eq(0).css('display', 'block');
    key = $('.saleContent').children().eq(0).attr('key');
    flag = $('.saleContent').children().eq(0).attr('flag');
    money = $('.saleContent').children().eq(0).attr('money');
    type = $('.saleContent').children().eq(0).attr('periodType');
    activityFinish = $('.saleContent').children().eq(0).attr('activityFinish');
    skuRelationPeriod = $('.saleContent').children().eq(0).attr('skuRelationPeriod');
    prizeUpperLimit = $('.saleContent').children().eq(0).attr('prizeUpperLimit');
    init(type, key, flag, money, 0, activityFinish, skuRelationPeriod, prizeUpperLimit);
    // 默认活动说明
    sessionStorage.saleRule = promotionCogAry[0].activityDesc;
    //轮播
    var index = 0;
    $('.saleNext').on('click', function () {
        index++;
        //是否显示前进按钮
        if (index == $('.saleContent').children().length - 1) {
            $('.saleNext').removeClass('show');
            $('.salePrev').addClass('show');
        } else {
            $('.saleNext').addClass('show');
            $('.salePrev').addClass('show');
        }
        slide(index);
        key = $('.saleContent').children().eq(index).attr('key');
        flag = $('.saleContent').children().eq(index).attr('flag');
        money = $('.saleContent').children().eq(index).attr('money');
        type = $('.saleContent').children().eq(index).attr('periodType');
        activityFinish = $('.saleContent').children().eq(index).attr('activityFinish');
        skuRelationPeriod = $('.saleContent').children().eq(index).attr('skuRelationPeriod');
        prizeUpperLimit = $('.saleContent').children().eq(index).attr('prizeUpperLimit');
        init(type, key, flag, money, index, activityFinish, skuRelationPeriod, prizeUpperLimit);
    });
    $('.salePrev').on('click', function () {
        index--;
        //是否显示前进按钮
        if (index == 0) {
            $('.salePrev').removeClass('show');
            $('.saleNext').addClass('show');
        } else {
            $('.saleNext').addClass('show');
            $('.salePrev').addClass('show');
        }
        slide(index);
        key = $('.saleContent').children().eq(index).attr('key');
        flag = $('.saleContent').children().eq(index).attr('flag');
        money = $('.saleContent').children().eq(index).attr('money');
        type = $('.saleContent').children().eq(index).attr('periodType');
        activityFinish = $('.saleContent').children().eq(index).attr('activityFinish');
        skuRelationPeriod = $('.saleContent').children().eq(index).attr('skuRelationPeriod');
        prizeUpperLimit = $('.saleContent').children().eq(index).attr('prizeUpperLimit');
        init(type, key, flag, money, index, activityFinish, skuRelationPeriod, prizeUpperLimit);
    });

    function slide(index) {
        $('.saleContent').children().css('display', 'none');
        $('.saleContent').children().eq(index).css('display', 'block');
        sessionStorage.saleRule = promotionCogAry[index].activityDesc;
    }

    function init(type, key, flag, money, index, activityFinish, skuRelationPeriod, prizeUpperLimit) {
        if (flag === '1' || flag === '2') {
            $('.saleNoticeTop').html('恭喜你额外获得');
            $('.saleNoticeTop').css({
                'color': '#de0800',
                'fontSize': '0.65rem'
            });
            $('#saleMoney').text(money);
            $('.saleNoticeBottom').css('display', 'block');
            $('.saleContent').children().eq(index).find('.saleOver').attr('src', '/v/bxqp-common/img/sale/over.png');
            $('.saleContent').children().eq(index).find('.saleOver').css('display', 'block');
        } else if (flag === '0') {
            if (key === '0') { //且
                $('.saleNoticeTop').css({
                    'color': '#5a2d0c',
                    'fontSize': '0.75rem'
                });
                $('.saleNoticeTop').html('完成进度即送红包');
                $('.saleNoticeBottom').css('display', 'none');
            } else if (key === '1') { //或
                if (skuRelationPeriod === '1') { //上期
                    $('.saleNoticeTop').html('完成进度即送红包');
                } else {
                    $('.saleNoticeTop').html('A+<span style="color:#de0800;">B(任意一款)</span> 搭配着喝~');
                }
                $('.saleNoticeTop').css({
                    'color': '#5a2d0c',
                    'fontSize': '0.75rem'
                });
                $('.saleNoticeBottom').css('display', 'none');
            } else if (key === '2') { //混合
                if (skuRelationPeriod === '1') { //上期
                    $('.saleNoticeTop').html('完成进度即送红包');
                } else {
                    $('.saleNoticeTop').html('A+<span style="color:#de0800;">B(随意选)</span> 搭配着喝~');
                }
                $('.saleNoticeTop').css({
                    'color': '#5a2d0c',
                    'fontSize': '0.75rem'
                });
                $('.saleNoticeBottom').css('display', 'none');
            }
        }
        if (type === '0') { //周
            $('.saleType').val('本周进度');
        } else if (type === '1') { //月
            $('.saleType').val('本月进度');
        } else if (type === '2') { //天
            $('.saleType').val('当天进度');
        }
        if (activityFinish === '1') { //活动已结束
            $('.saleContent').children().eq(index).find('.saleOver').attr('src', '/v/bxqp-common/img/sale/over_2.png');
            $('.saleContent').children().eq(index).find('.saleOver').css('display', 'block');
        }
        if (prizeUpperLimit === '' || prizeUpperLimit === '0' || prizeUpperLimit === 'undefined' || prizeUpperLimit === undefined) { //无上限
            $('.saleNoticeOver1').css('display', 'none');
            $('.saleNoticeOver2').css('display', 'none');
        } else {
            $('.saleNoticeOver1').css('display', 'none');
            $('.saleNoticeOver2').css('display', 'none');
            if (flag === '0' || activityFinish === '1') {
                if (skuRelationPeriod === '1') { //上期
                    $('.saleNoticeOver2Num').html(prizeUpperLimit);
                    $('.saleNoticeOver2').css('display', 'block');
                    $('.saleNoticeOver1').css('display', 'none');
                } else if (skuRelationPeriod === '0') { //本期
                    $('.saleNoticeOver1Num').html(prizeUpperLimit);
                    $('.saleNoticeOver1').css('display', 'block');
                    $('.saleNoticeOver2').css('display', 'none');
                }
            }
        }
    }
    //添加事件
    $('#sale_icon').on('click', function () {
        $('.sale').css('display', 'block');
    });
    $('.saleClose').on('click', function () {
        $('.sale').css('display', 'none');
    });
    //查看活动规则
    $('.saleRule').on('click', function () {
        $('#signContent').html(sessionStorage.saleRule);
        $('.signRule').css('display', 'block');
    });
    $('#signBack').on('click', function () {
        $('#signContent').html('');
        $('.signRule').css('display', 'none');
    });
} else {
    $('#sale_icon').css('display', 'none');
}