(function () {
    'use strict';
    var PROJECT = 'hbqp-stageI';
    var APPID = vge.hbqpappid;
    var ONEPAGE_PORT = vge.hbqp + '/DBTHBQPInterface/gifts/queryAllGiftsList';
    var SPACK_PORT = vge.hbqp + '/DBTHBQPInterface/gifts/getGiftspack'; //提现

    var show = document.getElementById("show"),
        hide = document.getElementById("hide"),
        H = document.documentElement.clientHeight || document.body.clientHeight,
        dom_balance = document.getElementById("dom_balance"),
        add_money = document.getElementById("add_money"),
        keep_points = document.getElementById("keep_points"),
        no_list = document.getElementById("no_list"),
        mon_list = document.getElementById("mon_list"),
        no_list_jf = document.getElementById("no_list_jf"),
        jf_list = document.getElementById("jf_list"),
        itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
        itpl_onenote_jf = document.getElementById("onenote_tpl_jf").innerHTML,
        hb_more = document.getElementById("more"),
        jf_more = document.getElementById("more_jf"),
        // dom_num = document.getElementById('num'),
        dom_btn = document.getElementById('btn'),
        dom_mask = document.getElementById('mask'),
        dom_loading = document.getElementsByClassName('loading')[0];

    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid;

    var currentpage = 1,
        currentpagejf = 1,
        next = true,
        nextjf = true,
        count = 10,
        flag = true,
        first = true,
        tx = true;

    show.addEventListener('click', function () {
        document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
    }, false);

    hide.addEventListener("click", function () {
        document.getElementsByClassName("mybag_top")[0].style.marginTop = 0 + "px";
    });

    $('.list_box').css('height', $('body').height() - $('#hide').height() - parseInt($('#hide').css('marginTop')) * 2 -
		20 + 'px');
    $('.list_jf,.list_hb').css('height', $('.list_box').height() - $('.tab').height() + 'px');
    // 红包&积分列表切换
	$('.tab_hb').on('click', function() {
		$(this).addClass('cur');
		$('.tab_jf').removeClass('cur');
		$('.list_hb').css('display', 'block');
		$('.list_jf').css('display', 'none');
	});
	$('.tab_jf').on('click', function() {
		$(this).addClass('cur');
		$('.tab_hb').removeClass('cur');
		$('.list_hb').css('display', 'none');
		$('.list_jf').css('display', 'block');
    });

    document.getElementsByClassName('lq-btn')[0].addEventListener('click', function () {
        window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
    }, false);
    document.getElementsByClassName('xc-btn')[0].addEventListener('click', function () {
        window.location.href = 'https://contents.ctrip.com/activitysetupapp/mkt/index/qingdao190403?popup=close&allianceid=1048845&sid=1760938&pushcode=nn415';
    }, false);

    attentioned();

    function attentioned() {
        onepage_note(currentpage);

        function onepage_note(currentpage,type,cb) {
            var javai = ONEPAGE_PORT;
            var req = {
                "openid": openid,
                "hbopenid": hbopenid,
                "currentPage": currentpage,
                "count": count
            };
            vge.callJApi(javai, req, function (jo) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        if (currentpage == 1) {
                            if (jo.reply.objList.length < count) {
                                hb_more.innerHTML = '仅显示近30天的记录';
                                hb_more.style.fontSize = '0.6rem';
                                // hb_more.unbind();
                                hb_more.removeEventListener('click', getm, false);
                                jf_more.innerHTML = '仅显示近30天的记录';
                                jf_more.style.fontSize = '0.6rem';
                                $('#more_jf').unbind();
                                // jf_more.removeEventListener('click', getm, false);
                            }
                            var dom_total = Number(jo.reply.totalMoney);
                            var dom_gifts = Number(jo.reply.giftsMoney);
                            var dom_points = jo.reply.totalVpoints;

                            dom_total = dom_total.toFixed(2);
                            dom_gifts = dom_gifts.toFixed(2);
                            dom_balance.innerHTML = dom_total;
                            add_money.innerHTML = dom_gifts;
                            keep_points.innerHTML = dom_points;
                            // dom_num.innerHTML = jo.reply.total;
                            if (dom_total < 1) {
                                dom_btn.style.backgroundColor = '#d2d2d2';
                                dom_btn.style.color = '#ffffff';
                                dom_btn.disabled = true;
                            }
                        }
                        var i = 0,
                            lst = jo.reply.objList,
                            l = lst.length;
                        if (l === 0 || lst === undefined) {
                            hb_more.innerHTML = '仅显示近30天的记录';
                            hb_more.style.fontSize = '0.6rem';
                            // hb_more.unbind();
                            hb_more.removeEventListener('click', getm, false);
                            jf_more.innerHTML = '仅显示近30天的记录';
                            jf_more.style.fontSize = '0.6rem';
                            $('#more_jf').unbind();
                            // jf_more.removeEventListener('click', getm, false);
                            if (first) {
                                mon_list.style.display = 'none';
                                no_list.style.display = 'block';
                                first = false;
                            } else {
                                no_list.style.display = 'none';
                            }
                            if(type=='hb'){
                                next = false;
                            }else if(type=='jf'){
                                nextjf = false;
                            }
                            if (cb !== undefined) {
                                cb();
                            }
                            return;
                        }
                        first = false;
                        var params = {},
                            paramsjf = {},
                            hs = [],
                            mon_where = '';
                        no_list.style.display = 'none';
                        hb_more.style.display = 'block';
                        no_list_jf.style.display = 'none';
                        jf_more.style.display = 'block';
                        for (i = 0; i < l; ++i) {
                            mon_where = lst[i].giftsName;
                            params.color = '#d9231f';
                            paramsjf.color = '#d9231f';
                            if(lst[i].prizeType==1){
                                if (mon_where === '扫码中奖') {
                                    params.color = '#d9231f';
                                    paramsjf.color = '#d9231f';
                                    paramsjf.monwhere = mon_where;
                                    paramsjf.jf = '+' + lst[i].earnVpoints;
                                }else if (mon_where === '签到红包' || mon_where === '促销红包') {
                                    params.monwhere = mon_where;
                                    params.money = '+' + lst[i].earnMoney;
                                    params.color = '#d9231f';
                                } else {
                                if (lst[i].extractStatus == '0') {
                                    params.monwhere = '提现成功';
                                    params.money = '-' + lst[i].earnMoney;
                                } else if (lst[i].extractStatus == '1') {
                                    params.monwhere = '提现失败_金额已退还';
                                    params.money = lst[i].earnMoney;
                                } else if (lst[i].extractStatus == '2') {
                                    params.monwhere = '提现处理中';
                                    params.money = '-' + lst[i].earnMoney;
                                }
                                params.color = '#000000';
                            }
                        } else if(lst[i].prizeType==2){
                            if (mon_where === '扫码中奖') {
                                params.color = '#d9231f';
                                paramsjf.color = '#d9231f';
                                params.monwhere = mon_where;
                                params.money = '+' + lst[i].earnMoney;
                                paramsjf.monwhere = mon_where;
                                paramsjf.jf = '+' + lst[i].earnVpoints;
                            } else if (mon_where === '签到红包' || mon_where === '促销红包') {
                                params.monwhere = mon_where;
                                params.money = '+' + lst[i].earnMoney;
                                params.color = '#d9231f';
                            } else {
                                if (lst[i].extractStatus == '0') {
                                    params.monwhere = '提现成功';
                                    params.money = '-' + lst[i].earnMoney;
                                } else if (lst[i].extractStatus == '1') {
                                    params.monwhere = '提现失败_金额已退还';
                                    params.money = lst[i].earnMoney;
                                } else if (lst[i].extractStatus == '2') {
                                    params.monwhere = '提现处理中';
                                    params.money = '-' + lst[i].earnMoney;
                                }
                                params.color = '#000000';
                            }
                        } else {
                            if (mon_where === '扫码中奖') {
                                params.color = '#d9231f';
                                paramsjf.color = '#d9231f';
                                params.monwhere = mon_where;
                                params.money = '+' + lst[i].earnMoney;
                            } else if (mon_where === '签到红包' || mon_where === '促销红包') {
                                params.monwhere = mon_where;
                                params.money = '+' + lst[i].earnMoney;
                                params.color = '#d9231f';
                            } else {
                                if (lst[i].extractStatus == '0') {
                                    params.monwhere = '提现成功';
                                    params.money = '-' + lst[i].earnMoney;
                                } else if (lst[i].extractStatus == '1') {
                                    params.monwhere = '提现失败_金额已退还';
                                    params.money = lst[i].earnMoney;
                                } else if (lst[i].extractStatus == '2') {
                                    params.monwhere = '提现处理中';
                                    params.money = '-' + lst[i].earnMoney;
                                }
                                params.color = '#000000';
                            }
                        }

                        params.gettime = lst[i].earnTime;
                        paramsjf.gettime = lst[i].earnTime;
                        if(lst[i].prizeType==1){
                            jf_list.innerHTML += vge.renderTpl(itpl_onenote_jf, paramsjf);
                        }else if(lst[i].prizeType==2){
                            mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
                            jf_list.innerHTML += vge.renderTpl(itpl_onenote_jf, paramsjf);
                        } else {
                            mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
                        }
                    } 
                    if (cb !== undefined) {
                        cb();
                    }
                    if (l < count) {
                        no_list.style.display = 'none';
                        hb_more.innerHTML = '仅显示近30天的记录';
                        hb_more.style.fontSize = '0.6rem';
                        // hb_more.unbind();
                        hb_more.removeEventListener('click', getm, false);
                        no_list_jf.style.display = 'none';
                        jf_more.innerHTML = '仅显示近30天的记录';
                        jf_more.style.fontSize = '0.6rem';
                        $('#more_jf').unbind();
                        // jf_more.removeEventListener('click', getm, false);
                        if(type=='hb'){
                            next = false;
                        }else if(type=='jf'){
                            nextjf = false;
                        }
                        if (cb !== undefined) {
                            cb();
                        }
                        return;
                    }
                } else if (jo.result.businessCode === '2') { //无红包记录
                        dom_btn.removeEventListener('click', mytx, false);
                        dom_btn.style.backgroundColor = '#d2d2d2';
                        dom_btn.style.color = '#ffffff';
                        dom_balance.innerHTML = '0.00';
                        add_money.innerHTML = '0.00';
                        keep_points.innerHTML = '0';
                        // dom_num.innerHTML = '0';
                        if (first) {
                            hb_more.innerHTML = '仅显示近30天的记录';
                            hb_more.style.fontSize = '0.6rem';
                            // hb_more.unbind();
                            hb_more.removeEventListener('click', getm, false);
                            mon_list.style.display = 'none';
                            no_list.style.display = 'block';

                            jf_more.innerHTML = '仅显示近30天的记录';
                            jf_more.style.fontSize = '0.6rem';
                            $('#more_jf').unbind();
                            // jf_more.removeEventListener('click', getm, false);
                            jf_list.style.display = 'none';
                            no_list_jf.style.display = 'block';
                            first = false;
                        } else {
                            no_list.style.display = 'none';
                            hb_more.innerHTML = '仅显示近30天的记录';
                            hb_more.style.fontSize = '0.6rem';
                            // hb_more.unbind();
                            hb_more.removeEventListener('click', getm, false);
                           
                            no_list_jf.style.display = 'none';
                            jf_more.innerHTML = '仅显示近30天的记录';
                            jf_more.style.fontSize = '0.6rem';
                            $('#more_jf').unbind();
                            // jf_more.removeEventListener('click', getm, false);
                        }
                        if (cb !== undefined) {
                            cb();
                        }
                        if(type=='hb'){
                            next = false;
                        }else if(type=='jf'){
                            nextjf = false;
                        }
                        return;
                    } else { //businessCode:1失败
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    }
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            });
        }
        // on   bind
        $('#more,#more_jf').on('click', function () {
            getm($(this).attr('type'));
        });
        // dom_more.addEventListener('click', getm, false);
        function getm(type) {
            if (type == 'hb') {
                if (next) {
                    ++currentpage;
                    onepage_note(currentpage,type);
                }
            } else if (type == 'jf') {
                if (nextjf) {
                    ++currentpagejf;
                    onepage_note(currentpagejf,type);
                }
            }
        }
    }

    dom_btn.addEventListener('click', mytx, false);

    function mytx() {
        if (tx) {
            tx = false;
            dom_loading.style.display = 'block';
            give_spack();
        }
    }

    dom_mask.addEventListener('click', function () {
        // dom_mask.style.display = 'none';
        // window.location.reload();
        ifremeber();
    }, false);

    function give_spack() { //提现
        var javai = SPACK_PORT;
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                vge.clog('errmsg啦啦啦啦', [JSON.stringify(jo)]);
                dom_loading.style.display = 'none';
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        dom_mask.style.display = 'block';
                        tx = false;
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几支攒够1元发红包！', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '2') { //1
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '4') { //1
                        title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '3') { //1
                        title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '-1') { //-1
                        title_tip('提 示', '系统升级中...', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '-2') { //-1
                        title_tip('提 示', '提现操作过于频繁', '我知道了');
                        tx = true;
                    } else if (jo.result.businessCode === '5') { //5
                        title_tip('尊敬的用户', jo.result.msg, '我知道了');
                        tx = true;
                    } else {
                        title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                        tx = true;
                    }
                } else if (jo.result.code == '-1') {
                    title_tip('尊敬的用户', '系统升级中...', '我知道了');
                    tx = true;
                } else { //code!='0'
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                }
            });
    }

    function ifremeber() {
        var requrl = 'http://' + vge.o3host + '/wx3/uinfo2?openid=' + openid + '&appid=' + APPID;
        vge.ajxget(requrl, 5000, function (r) {
            try {
                var o = JSON.parse(r);
                if (o.subscribe == '0') { //未关注
                    window.location.replace('http://' + location.host + '/v/' + PROJECT + '/attention.html');
                } else { //已关注用户
                    window.location.reload();
                }
            } catch (e) {
                vge.clog('errmsg', [requrl, e]);
            }
        }, function (err) {
            vge.clog('errmsg', [requrl, err]);
        });
    }

// 积分商城
    $('.shopIcon').click(function(){
        $('.shadow').css('display','block');
    })
    $('.closeToast').click(function(){
        $('.shadow').css('display','none');
    })
})();