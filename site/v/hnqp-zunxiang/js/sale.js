(function () {
    var args = vge.urlparse(location.href),
        bizcode = args.bizcode,
        again = sessionStorage.again;

    var promotionFlag = sessionStorage.promotionFlag == 'undefined' ? '0' : sessionStorage.promotionFlag, //是否开启1:开启、0或空:关闭
        promotionPopup = sessionStorage.promotionPopup == 'undefined' ? '0' : sessionStorage.promotionPopup, //1:弹出提示、0或空:不弹出
        promotionCogAry = JSON.parse(sessionStorage.getItem('promotionCogAry')); //活动列表
    var PROJECT = 'hnqp-zunxiang';
    var imgUrl = '/v/hnqp-zunxiang/';
    var _host = vge.hnqpimg + '/DBTAHQPplatform';
    sale();

    function sale() {
        //是否显示捆绑促销按钮
        if (promotionFlag == '1') { //1为开启
            if (bizcode == 11 || again == 'true') {
                $('.sale').css('display', 'none');
            } else {
                $('.open').one('click', function () {
                    $('.open').unbind();
                    $('.get').fadeOut(600);
                    $('.cash').fadeIn(600, function () {
                        $('#sale_icon').css('display', 'block');
                        //是否自动弹出
                        if (promotionPopup === '1') { //1为自动弹出
                            // setTimeout(function () {
                            $('.sale').css('display', 'block');
                            // }, 500);
                        } else {
                            $('.sale').css('display', 'none');
                        }
                    });
                });
            }
            //生成页面结构
            //且
            var tpl1 = '<div class="saleAlsoList">' +
                '<p class="saleAlsoListTitle">{{skuName}}</p>' +
                '<img src="{{img}}" class="saleBeer">' +
                '<div class="saleProgress">' +
                '<div class="saleInner" style="width:{{width}};">' +
                '<div class="saleNum">' +
                '<p>{{signNum}}</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<p class="saleAlsoListNum">{{total}}{{type}}</p>' +
                '</div>';
            //或（A）
            var tpl2 =
                '<div class="saleOrA">' +
                '<div class="saleOrAList">' +
                '<p class="saleOrAListTitle">{{skuName}}</p>' +
                '<img src="{{img}}" class="saleBeer">' +
                '<div class="saleProgress">' +
                '<div class="saleInner" style="width:{{width}};">' +
                '<div class="saleNum">' +
                '<p>{{signNum}}</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<p class="saleOrListNum">{{total}}{{type}}</p>' +
                '</div>' +
                '<img src="/v/' + PROJECT + '/img/sale/A.png" class="saleIconA">' +
                '</div>' +
                '<img src="/v/' + PROJECT + '/img/sale/add.png" class="saleAdd">';
            //或（B）
            var tpl3 =
                '<div class="saleOrBList">' +
                '<p class="saleOrBListTitle">{{skuName}}</p>' +
                '<img src="{{img}}" class="saleBeer">' +
                '<div class="saleProgress">' +
                '<div class="saleInner" style="width:{{width}};">' +
                '<div class="saleNum">' +
                '<p>{{signNum}}</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<p class="saleOrListNum">{{total}}{{type}}</p>' +
                '</div>' +
                '<img src="/v/' + PROJECT + '/img/sale/or.png" class="saleSplit">';
            var tpl4 =
                '<div class="saleOrBList">' +
                '<p class="saleOrBListTitle">{{skuName}}</p>' +
                '<img src="{{img}}" class="saleBeer">' +
                '<div class="saleProgress">' +
                '<div class="saleInner" style="width:{{width}};">' +
                '<div class="saleNum">' +
                '<p>{{signNum}}</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<p class="saleOrListNum">{{total}}{{type}}</p>' +
                '</div>';
            //混合（A）
            var tpl5 =
                '<div class="saleMixA">' +
                '<div class="saleMixAList">' +
                '<p class="saleMixAListTitle">{{skuName}}</p>' +
                '<img src="{{img}}" class="saleBeer">' +
                '<div class="saleProgress">' +
                '<div class="saleInner" style="width:{{width}};">' +
                '<div class="saleNum">' +
                '<p>{{signNum}}</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<p class="saleMixListNum">{{total}}{{type}}</p>' +
                '</div>' +
                '<img src="/v/' + PROJECT + '/img/sale/A.png" class="saleIconA">' +
                '</div>' +
                '<img src="/v/' + PROJECT + '/img/sale/add.png" class="saleAdd">';
            //混合（B）进度条
            var tpl6 =
                '<div class="saleMixBTitle">' +
                '<p>进度</p>' +
                '<div class="saleProgress">' +
                '<div class="saleInner" style="width:{{width}};">' +
                '<div class="saleNum">' +
                '<p>{{signNum}}</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<p class="saleMixListNum">{{total}}{{type}}</p>' +
                '</div>' +
                '<img src="/v/' + PROJECT + '/img/sale/B.png" class="saleIconB">';
            //混合（B）
            var tpl7 =
                '<div class="saleMixBList">' +
                '<p>{{skuName}}</p>' +
                '<img src="{{img}}" class="saleMixBeer">' +
                '</div>';
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
                        var img = $('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver">');
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
                        var img = $('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver">');
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
                        createB.append('<img src="/v/' + PROJECT + '/img/sale/B.png" class="saleIconB">');
                        create.append(createB);
                        create.append('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver" style="top:30%">');
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
                        var img = $('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver">');
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
                        create.append('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver" style="top:30%">');
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
                        var img = $('<img src="/v/' + PROJECT + '/img/sale/over.png" class="saleOver">');
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
                    $('.saleContent').children().eq(index).find('.saleOver').attr('src', '/v/' + PROJECT + '/img/sale/over.png');
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
                    $('.saleContent').children().eq(index).find('.saleOver').attr('src', '/v/' + PROJECT + '/img/sale/over_2.png');
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
            $('#sale_icon').on('click', function (event) {
                $('.sale').css('display', 'block');
                event.stopPropagation();
            });
            $('.saleClose').on('click', function (event) {
                $('.sale').css('display', 'none');
                event.stopPropagation();
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
    }
})();