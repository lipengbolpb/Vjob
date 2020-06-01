(function () {
    'use strict';
    var ONEPAGE_PORT = vge.csqp + '/DBTHuNanQPInterface/gifts/queryAllGiftsList';
    var SPACK_PORT = vge.csqp + '/DBTHuNanQPInterface/gifts/getGiftspack';

    var show = document.getElementById("show"),
        showjf = document.getElementById("showjf"),
        hidejf = document.getElementById("hidejf"),
        hide = document.getElementById("hide"),
        H = document.documentElement.clientHeight || document.body.clientHeight,
        dom_balance = document.getElementById("dom_balance"),
        add_money = document.getElementById("add_money"),
        no_list = document.getElementById("no_list"),
        mon_list = document.getElementById("mon_list"),
        no_list_jf = document.getElementById("no_list_jf"),
        mon_list_jf = document.getElementById("mon_list_jf"),
        itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
        itpl_onenote_jf = document.getElementById("onenote_tpl_jf").innerHTML,
        dom_more = document.getElementById("more"),
        dom_more_jf = document.getElementById("more_jf"),
        dom_num = document.getElementById('num'),
        dom_btn = document.getElementById('btn'),
        dom_mask = document.getElementById('mask'),
        dom_loading = document.getElementsByClassName('loading')[0];

    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid;
    sessionStorage.openid = openid;
    var currentpage = 1,
        currentpagejf = 1,
        next = true,
        nextjf = true,
        count = 10,
        flag = true,
        first = true,
        tx = true;


    $('#tomall').on('click',function (param) {
        window.location.replace('http://' + location.host + '/v/csqp/IntegralMall/index.html');
    }) 
    document.getElementsByClassName('liantong')[0].addEventListener('click',function(){
        window.location.href = 'https://m.10010.com/queen/qingdaobeer/qdbeer.html';
    });

    show.addEventListener('click', function () {
        hide.style.display = 'block';
        show.style.visibility = 'hidden';
        showjf.style.visibility = 'hidden';
        document.getElementsByClassName("mybag_top")[0].style.marginTop = -H + "px";
    }, false);

    hide.addEventListener("click", function () {
        hide.style.display = 'none';
        show.style.visibility = 'visible';
        showjf.style.visibility = 'visible';
        document.getElementsByClassName("mybag_top")[0].style.marginTop = 0 + "px";
    });

    showjf.addEventListener('click', function () {
        hidejf.style.display = 'block';
        show.style.visibility = 'hidden';
        showjf.style.visibility = 'hidden';
        document.getElementsByClassName("jf_bottom")[0].style.top = "0%";
    }, false);

    hidejf.addEventListener("click", function () {
        hidejf.style.display = 'none';
        show.style.visibility = 'visible';
        showjf.style.visibility = 'visible';
        document.getElementsByClassName("jf_bottom")[0].style.top = "100%";
    });

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
                                dom_more.innerHTML = '仅显示近30天的记录';
                                dom_more.style.fontSize = '0.6rem';
                                $('#more').unbind();
                                dom_more_jf.innerHTML = '仅显示近30天的记录';
                                dom_more_jf.style.fontSize = '0.6rem';
                                $('#more_jf').unbind();
                            }
                            var dom_total = Number(jo.reply.totalMoney);
                            var dom_gifts = Number(jo.reply.giftsMoney);
                            dom_total = dom_total.toFixed(2);
                            dom_gifts = dom_gifts.toFixed(2);
                            dom_balance.innerHTML = dom_total;
                            add_money.innerHTML = dom_gifts;
                            dom_num.innerHTML = jo.reply.total;
                            $('#totalVpoints').html('剩余积分:'+jo.reply.totalVpoints);
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
                            dom_more.innerHTML = '仅显示近30天的记录';
                            dom_more.style.fontSize = '0.6rem';
                            ('#more').unbind();
                            dom_more_jf.innerHTML = '仅显示近30天的记录';
                            dom_more_jf.style.fontSize = '0.6rem';
                            $('#more_jf').unbind();
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
                        dom_more.style.display = 'block';
                        no_list_jf.style.display = 'none';
                        dom_more_jf.style.display = 'block';
                        for (i = 0; i < l; ++i) {
                            mon_where = lst[i].giftsName;
                            params.color = '#fff699';
                            paramsjf.color = '#fff699';
                            if(lst[i].prizeType==1){
                                if (mon_where === '扫码中奖') {
                                    params.color = '#fff699';
                                    paramsjf.color = '#fff699';
                                    paramsjf.monwhere = mon_where;
                                    paramsjf.jf = '+' + lst[i].earnVpoints;
                                } else if (mon_where === '签到红包' || mon_where === '促销红包') {
                                    params.monwhere = mon_where;
                                    params.money = '+' + lst[i].earnMoney;
                                    params.color = '#fff699';
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
                                    params.color = '#ffffff';
                                }
                            }else if(lst[i].prizeType==2){
                                if (mon_where === '扫码中奖') {
                                    params.color = '#fff699';
                                    paramsjf.color = '#fff699';
                                    params.monwhere = mon_where;
                                    params.money = '+' + lst[i].earnMoney;
                                    paramsjf.monwhere = mon_where;
                                    paramsjf.jf = '+' + lst[i].earnVpoints;
                                } else if (mon_where === '签到红包' || mon_where === '促销红包') {
                                    params.monwhere = mon_where;
                                    params.money = '+' + lst[i].earnMoney;
                                    params.color = '#fff699';
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
                                    params.color = '#ffffff';
                                }
                            } else {
                                if (mon_where === '扫码中奖') {
                                    params.color = '#fff699';
                                    paramsjf.color = '#fff699';
                                    params.monwhere = mon_where;
                                    params.money = '+' + lst[i].earnMoney;
                                } else if (mon_where === '签到红包' || mon_where === '促销红包') {
                                    params.monwhere = mon_where;
                                    params.money = '+' + lst[i].earnMoney;
                                    params.color = '#fff699';
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
                                    params.color = '#ffffff';
                                }
                            }
                            
                            
                            params.gettime = lst[i].earnTime;
                            paramsjf.gettime = lst[i].earnTime;
                            if(lst[i].prizeType==1){
                                mon_list_jf.innerHTML += vge.renderTpl(itpl_onenote_jf, paramsjf);
                            }else if(lst[i].prizeType==2){
                                mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
                                mon_list_jf.innerHTML += vge.renderTpl(itpl_onenote_jf, paramsjf);
                            } else {
                                 mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
                            }
                            
                            
                        }
                        if (cb !== undefined) {
                            cb();
                        }
                        if (l < count) {
                            no_list.style.display = 'none';
                            dom_more.innerHTML = '仅显示近30天的记录';
                            dom_more.style.fontSize = '0.6rem';
                            $('#more').unbind();
                            no_list_jf.style.display = 'none';
                            dom_more_jf.innerHTML = '仅显示近30天的记录';
                            dom_more_jf.style.fontSize = '0.6rem';
                            $('#more_jf').unbind();
                            if(type=='hb'){
                                next = false;
                            }else if(type=='jf'){
                                next = false;
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
                        dom_num.innerHTML = '0';
                        if (first) {
                            dom_more.innerHTML = '仅显示近30天的记录';
                            dom_more.style.fontSize = '0.6rem';
                            $('#more').unbind();
                            mon_list.style.display = 'none';
                            no_list.style.display = 'block';
                            dom_more_jf.innerHTML = '仅显示近30天的记录';
                            dom_more_jf.style.fontSize = '0.6rem';
                            $('#more_jf').unbind();
                            mon_list_jf.style.display = 'none';
                            no_list_jf.style.display = 'block';
                            first = false;
                        } else {
                            no_list.style.display = 'none';
                            dom_more.innerHTML = '仅显示近30天的记录';
                            dom_more.style.fontSize = '0.6rem';
                            $('#more').unbind();
                            no_list_jf.style.display = 'none';
                            dom_more_jf.innerHTML = '仅显示近30天的记录';
                            dom_more_jf.style.fontSize = '0.6rem';
                            $('#more_jf').unbind();
                        }
                        if (cb !== undefined) {
                            cb();
                        }
                        if(type=='hb'){
                            next = false;
                        }else if(type=='jf'){
                            next = false;
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
        $('#more,#more_jf').on('click', function () {
            getm($(this).attr('type'));
        });
    
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

    $('#jw_icon').css('display', 'block');
    $('#jw_icon').on('click', function () {
        $('#jiuw_box').fadeIn(1, function () {
            $('#jiuw_box div').css('bottom', '0rem');
        });
        $('#jiuw_box .close').on('click', function () {
            $('#jiuw_box div').css('bottom', '-11rem');
            $('#jiuw_box').fadeOut(1);
        });
    });
    dom_mask.addEventListener('click', function () {
        dom_mask.style.display = 'none';
        window.location.reload();
    }, false);

    function give_spack() { //提现
        var javai = SPACK_PORT;
        var req = {
            "openid": openid,
            "hbopenid": hbopenid
        };
        vge.callJApi(javai, req,
            function (jo) {
                dom_loading.style.display = 'none';
                if (jo.result.code == '0') {
                    if (jo.result.businessCode === '0') {
                        dom_mask.style.display = 'block';
                        tx = false;
                    } else if (jo.result.businessCode === '1') { //1
                        title_tip('提 示', '您的红包金额不足，再喝几瓶攒够0.3元发红包！', '我知道了');
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
})();