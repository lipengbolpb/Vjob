'use strict';

var ONEPAGE_PORT = vge.common + '/vjifenInterface/gifts/queryAllGiftsList'; //扫码记录接口
var SPACK_PORT = vge.common + '/vjifenInterface/gifts/getGiftspack'; //提现接口

var itpl_onenote = document.getElementById("onenote_tpl").innerHTML;
var args = vge.urlparse(location.href),
    openid = args.openid,
    hbopenid = args.hbopenid;

var currentpage = 1,
    next = true,
    count = 10,
    first = true,
    tx = true;
function loading() {
    $('#loading').css('display', 'block');
}
function loaded() {
    $('#loading').css('display', 'none');
}
function give_spack() {
    var url = SPACK_PORT;
    var req = {
        "openid": openid,
        "hbopenid": hbopenid,
        "projectServerName":"hainan",
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(req),
        dataType: 'json',
        success: function (res, status, xhr) {
            console.log(res);
            loaded();
            if (res.result.code == '0') {
                if (res.result.businessCode === '0') {
                    $('.mask').css('display', 'block');
                    tx = false;
                } else if (res.result.businessCode === '1') { //1
                    title_tip('提 示', '您的红包金额不足，再喝几瓶攒够1元发红包！', '我知道了');
                    tx = true;
                } else if (res.result.businessCode === '2') { //1
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                } else if (res.result.businessCode === '4') { //1
                    title_tip('提现处理中，请稍后查看详细记录', '我知道了');
                    tx = true;
                } else if (res.result.businessCode === '3') { //1
                    title_tip('尊敬的用户', '<p style="text-align:left;padding:0 12px;">根据国家法规对支付服务实名制的要求，请到微信中进行实名认证。</p><br /><p style="text-align:left;padding:0 12px;">实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。</p>', '我知道了');
                    tx = true;
                } else if (res.result.businessCode === '-1') { //-1
                    title_tip('提 示', '系统升级中...', '我知道了');
                    tx = true;
                } else if (res.result.businessCode === '-2') { //-1
                    title_tip('提 示', '提现操作过于频繁', '我知道了');
                    tx = true;
                } else if (res.result.businessCode === '5') { //5
                    title_tip('尊敬的用户', res.result.msg, '我知道了');
                    tx = true;
                } else {
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                    tx = true;
                }
            } else if (res.result.code == '-1') { //code!='0'
                title_tip('尊敬的用户', '系统升级中...', '我知道了');
                tx = true;
            } else {
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                tx = true;
            }
        },
        error: function (res, status, xhr) {
            console.log(res);
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            tx = true;
        }
    });
}
function onepage_note(currentpage, cb){
    var url = ONEPAGE_PORT;
    var req = {
        "openid": openid,
        "hbopenid": hbopenid,
        "currentPage": currentpage,
        "count": count,
        "projectServerName":"hainan",
    };
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(req),
        dataType: 'json',
        success: function(jo, status, xhr){
            console.log(jo);
            if (jo.result.code === '0') {
                if (jo.result.businessCode === '0') {
                    if (currentpage == 1) {
                        if (jo.reply.objList.length < count) {
                            $('#more').unbind();
                            $('#more').html('仅显示近30天的记录');
                            $('#more').css('fontSize', '0.6rem');
                        }
                        var dom_total = (Number(jo.reply.totalMoney)).toFixed(2);
                        var dom_gifts = (Number(jo.reply.giftsMoney)).toFixed(2);
                        $('#dom_balance').html(dom_total);
                        $('#add_money').html(dom_gifts);
                        $('#num').html(jo.reply.total);
                        if (dom_total < 1) {
                            $('#btn').css({
                                'backgroundColor': '#d2d2d2',
                                'color': '#ffffff'
                            });
                            $('#btn').attr('disabled', true);
                        }
                    }
                    var i = 0,
                        lst = jo.reply.objList,
                        l = lst.length;
                    if (l === 0 || lst === undefined) {
                        $('#more').unbind();
                        $('#more').html('仅显示近30天的记录');
                        $('#more').css('fontSize', '0.6rem');
                        if (first) {
                            $('#mon_list').css('display', 'none');
                            $('#no_list').css('display', 'block');
                            first = false;
                        } else {
                            $('#no_list').css('display', 'none');
                        }
                        next = false;
                        if (cb !== undefined) {
                            cb();
                        }
                        return;
                    }
                    first = false;
                    var params = {},
                        hs = [],
                        mon_where = '';
                    $('#more').css('display', 'block');
                    $('#no_list').css('display', 'none');
                    for (i = 0; i < l; ++i) {
                        mon_where = lst[i].giftsName;
                        if (mon_where === '扫码中奖') {
                            params.monwhere = mon_where;
                            params.money = '+' + lst[i].earnMoney;
                            params.color = '#fbc735';
                        } else if (mon_where === '签到红包') {
                            params.monwhere = mon_where;
                            params.money = '+' + lst[i].earnMoney;
                            params.color = '#fbc735';
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
                        params.gettime = lst[i].earnTime;
                        $('#mon_list').append(vge.renderTpl(itpl_onenote, params));
                        // mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
                    }
                    if (cb !== undefined) {
                        cb();
                    }
                    if (l < count) {
                        $('#no_list').css('display', 'none');
                        $('#more').unbind();
                        $('#more').html('仅显示近30天的记录');
                        $('#more').css('fontSize', '0.6rem');
                        next = false;
                        if (cb !== undefined) {
                            cb();
                        }
                        return;
                    }
                } else if (jo.result.businessCode === '2') { //无红包记录
                    $('#btn').unbind();
                    $('#btn').css({
                        'background-color': '#d2d2d2',
                        'color': '#ffffff'
                    });
                    $('#dom_balance').html('0.00');
                    $('#add_money').html('0.00');
                    $('#num').html('0');
                    if (first) {
                        $('#more').unbind();
                        $('#more').html('仅显示近30天的记录');
                        $('#more').css('fontSize', '0.6rem');
                        $('#mon_list').css('display', 'none');
                        $('#no_list').css('display', 'none');
                        first = false;
                    } else {
                        $('#no_list').css('display', 'none');
                        $('#more').unbind();
                        $('#more').html('仅显示近30天的记录');
                        $('#more').css('fontSize', '0.6rem');
                    }
                    if (cb !== undefined) {
                        cb();
                    }
                    next = false;
                    return;
                } else { //businessCode:1失败
                    title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
                }
            } else { //code!='0'
                title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
            }
        }
    });

}

window.onload = function() {
    var H = document.documentElement.clientHeight || document.body.clientHeight;
    //提现
    $('#btn').on('click', function() {
        if (tx) {
            loading();
            give_spack();
        }
    });
    //提现成功后判断关注
    $('.mask').on('click', function () {
        $('.mask').css('display', 'none');
        window.location.reload();
    });
    //查看详情记录
    $('#show').on('click', function() {
        $('.mybag_top').css('marginTop', -H + 'px');
    });
    //返回
    $('#hide').on('click', function() {
        $('.mybag_top').css('marginTop', 0);
    });
    onepage_note(currentpage);
    //加载更多
    $('#more').on('click', function() {
        if (next) {
            ++currentpage;
            onepage_note(currentpage);
        }
    });
}