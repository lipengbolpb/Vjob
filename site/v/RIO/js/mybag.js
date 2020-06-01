(function () {
    var args = vge.urlparse(location.href),
        openid = args.openid,
        hbopenid = args.hbopenid,
        itpl_onenote = document.getElementById("onenote_tpl").innerHTML,
        dom_more = document.getElementById("more"),
        mon_list = document.getElementById("mon_list");

    var currentpage = 1,
        next = true,
        count = 10,
        flag = true,
        first = true,
        tx = true;

    $('.content_box').css('height', Number($('#box').height()) - Number($('img.title').height() * 3.5) + 'px');
    attentioned();

    function attentioned() {
        onepage_note(currentpage);

        function onepage_note(currentpage, cb) {
            var javai = vge.rio + '/DBTRioInterface/gifts/queryAllGiftsList';
            var req = {
                "openid": openid,
                "hbopenid": hbopenid,
                "currentPage": currentpage,
                "count": count
            };
            vge.callJApi(javai, req, function (jo) {
                if (jo.result.code === '0') {
                    if (jo.result.businessCode === '0') {
                        var i = 0,
                            lst = jo.reply.objList,
                            l = lst.length;
                        if (l === 0 || lst === undefined) {
                            dom_more.style.display = 'none';
                            dom_more.removeEventListener('click', getm, false);
                            if (first) {
                                mon_list.style.display = 'none';
                                first = false;
                            } else {}
                            next = false;
                            if (cb !== undefined) {
                                cb();
                            }
                            return;
                        }
                        first = false;
                        var params = {},
                            hs = [],
                            mon_where = '',
                            mon_prizeType = '';
                        dom_more.style.display = 'block';
                        for (i = 0; i < l; ++i) {
                            mon_prizeType = lst[i].prizeType;
                            if (mon_prizeType === 'H') {
                                params.monwhere = '5元无门槛券';
                            } else if (mon_prizeType === 'I') {
                                params.monwhere = '69减10元券';
                            }
                            if (lst[i].useStatus == 2) { //未领取
                                params.btntxt = '';
                                params.classname = 'ss';
                            } else if (lst[i].useStatus == 1) {
                                params.btntxt = '已领取';
                                params.classname = '';
                            } else {
                                params.classname = '';
                                params.btntxt = '';
                            }
                            params.prizeType = lst[i].prizeType;
                            params.gettime = lst[i].earnTime;
                            params.prizeVcode = lst[i].prizeVcode;
                            params.useStatus = lst[i].useStatus;
                            mon_list.innerHTML += vge.renderTpl(itpl_onenote, params);
                        }
                        $('.ss').on('click', getPrize);
                        if (cb !== undefined) {
                            cb();
                        }
                        if (l < count) {
                            dom_more.style.display = 'none';
                            dom_more.removeEventListener('click', getm, false);
                            next = false;
                            if (cb !== undefined) {
                                cb();
                            }
                            return;
                        }
                    } else if (jo.result.businessCode === '2') { //无红包记录
                        if (first) {
                            dom_more.style.display = 'none';
                            dom_more.removeEventListener('click', getm, false);
                            first = false;
                        } else {
                            dom_more.style.display = 'none';
                            dom_more.removeEventListener('click', getm, false);
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
            });
        }
        dom_more.addEventListener('click', getm, false);

        function getm() {
            if (next) {
                ++currentpage;
                onepage_note(currentpage);
            }
        }


        function getPrize() {
            $(this).unbind();
            setTimeout(function () {
                $('.ss').on('click', getPrize);
            }, 1000);
            console.log($(this).attr('usestatus'));
            if ($(this).attr('usestatus') == 2) {
                if ($(this).attr('prizeType') === 'H') {
                    getCoupon5($(this).attr('prizeVcode'));
                } else if ($(this).attr('prizeType') === 'I') {
                    getCoupon10($(this).attr('prizeVcode'));
                }
            } else {
                return;
            }
        }
    }

    function getCoupon5(prizeVcode) { //5元
        var japi = vge.rio + '/DBTRioInterface/gifts/getCoupon';
        var req = {
            "openid": openid,
            "prizeVcode": prizeVcode
        };
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cbk);
    }

    function cbk(jo) {
        if (jo.result.code == '0') {
            if (jo.result.businessCode == '0') {
                location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=ew5dylkv';
            } else {
                title_tip('尊敬的用户', jo.result.msg, '我知道了');
            }
        } else if (jo.result.code == '-1') { //code !=0;
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }

    function getCoupon10(prizeVcode) { //10元
        var japi = vge.rio + '/DBTRioInterface/gifts/getCoupon';
        var req = {
            "openid": openid,
            "prizeVcode": prizeVcode
        };
        vge.clog('debug', [japi, JSON.stringify(req)]);
        vge.callJApi(japi, req, cbk2);
    }

    function cbk2(jo) {
        if (jo.result.code == '0') {
            if (jo.result.businessCode == '0') {
                location.href = 'https://h5.youzan.com/v2/ump/promocard/fetch?alias=1gnxwp7bj';
            } else {
                title_tip('尊敬的用户', jo.result.msg, '我知道了');
            }
        } else if (jo.result.code == '-1') { //code !=0;
            title_tip('尊敬的用户', '系统升级中，请稍后再试！', '我知道了');
        } else {
            title_tip('尊敬的用户', '呜呜，系统开了个小差，请稍后重试！', '我知道了');
        }
    }

})();