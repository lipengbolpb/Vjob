'use strict';
console.log(`load once, module.id:${module.id}`);
const ejsq = require('../modules/ejsq'),
    urlencode = encodeURIComponent;

exports.t = (req, res, uri) => {
    let tpl = `${uri.cat1}/${uri.cat3}.html`, // 相对路径 /v/
        data = {};
    ejsq.render(tpl, data, req, res);
};

exports.to = (req, res, uri, appid) => {
    let tpl = `${uri.cat1}/${uri.cat3}.html`;
    if (uri.query.openid) {
        let data = {};
        ejsq.render(tpl, data, req, res);
    } else if (ejsq.chktpl(tpl, res)) {
        let url = `http://${req.headers.host}${uri.path}`, //可添加重定向带参;
            authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid}&scope=snsapi_base&url=${urlencode(url)}`;
        res.writeHead(302, {
            'Cache-Control': 'no-cache',
            'location': authurl
        });
        res.end();
    }
};

exports.too = (req, res, uri, appid, appid2) => { // 获取两个 openid
    // uri.path 带参数, uri.pathname 不带参数
    let tpl = `${uri.cat1}/${uri.cat3}.html`;
    if (uri.query.openid) {
        if (uri.query.hbopenid) { // 用于微信支付 appid2
            let data = {};
            ejsq.render(tpl, data, req, res);
        } else {
            let url = `http://${req.headers.host}${uri.pathname}`; //url = `http://${req.headers.host}${uri.pathname}`
            url += `&hbopenid=${uri.query.openid}`; // 需要的 URL 参数
            if (url.indexOf('?') === -1) {
                url = url.replace('&', '?');
            }
            let authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid}&scope=snsapi_base&url=${urlencode(url)}`;
            res.writeHead(302, {
                'Cache-Control': 'no-cache',
                'location': authurl
            });
            res.end();
        }
    } else if (ejsq.chktpl(tpl, res)) { // 获取第一个openid: hbopenid 用于微信支付
        let url = `http://${req.headers.host}${uri.path}`,
            authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid2}&scope=snsapi_base&url=${urlencode(url)}`;
        res.writeHead(302, {
            'Cache-Control': 'no-cache',
            'location': authurl
        });
        res.end();
    }
};

exports.vo = (req, res, uri, appid) => { //显式授权
    let tpl = `${uri.cat1}/${uri.cat3}.html`;
    if (uri.query.openid) {
        let data = {};
        ejsq.render(tpl, data, req, res);
    } else if (ejsq.chktpl(tpl, res)) {
        let url = `http://${req.headers.host}${uri.path}`, //可添加重定向带参;
            authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid}&scope=snsapi_userinfo&url=${urlencode(url)}`;
        console.log('base_get_appid:' + appid + ':' + authurl);
        res.writeHead(302, {
            'Cache-Control': 'no-cache',
            'location': authurl
        });
        res.end();
    }
};

exports.voo = (req, res, uri, appid, appid2) => { // 获取两个 openid
    // uri.path 带参数, uri.pathname 不带参数
    let tpl = `${uri.cat1}/${uri.cat3}.html`;
    if (uri.query.openid) {
        if (uri.query.hbopenid) { // 用于微信支付 appid2
            let data = {};
            ejsq.render(tpl, data, req, res);
        } else {
            let url = `http://${req.headers.host}${uri.pathname}`;
            url += `&hbopenid=${uri.query.openid}`; // 需要的 URL 参数
            if (url.indexOf('?') === -1) {
                url = url.replace('&', '?');
            }
            let authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid}&scope=snsapi_userinfo&url=${urlencode(url)}`;
            res.writeHead(302, {
                'Cache-Control': 'no-cache',
                'location': authurl
            });
            res.end();
        }
    } else if (ejsq.chktpl(tpl, res)) { // 获取第一个openid: hbopenid 用于微信支付
        let url = `http://${req.headers.host}${uri.path}`,
            authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid2}&scope=snsapi_base&url=${urlencode(url)}`;
        res.writeHead(302, {
            'Cache-Control': 'no-cache',
            'location': authurl
        });
        res.end();
    }
};

exports.tyo = (req, res, uri, appid, appid2) => { // 获取两个 openid
    // uri.path 带参数, uri.pathname 不带参数
    let tpl = `${uri.cat1}/${uri.cat3}.html`;
    if (uri.query.openid) {
        if (uri.query.hbopenid) { // 用于微信支付 appid2
            let data = {};
            ejsq.render(tpl, data, req, res);
        } else {
            let url = `http://${req.headers.host}${uri.path}`; //url = `http://${req.headers.host}${uri.path}`
            url += `&hbopenid=${uri.query.openid}`; // 需要的 URL 参数
            if (url.indexOf('?') === -1) {
                url = url.replace('&', '?');
            }
            let authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid}&scope=snsapi_base&url=${urlencode(url)}`;
            res.writeHead(302, {
                'Cache-Control': 'no-cache',
                'location': authurl
            });
            res.end();
        }
    } else if (ejsq.chktpl(tpl, res)) { // 获取第一个openid: hbopenid 用于微信支付
        let url = `http://${req.headers.host}${uri.path}`,
            authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid2}&scope=snsapi_base&url=${urlencode(url)}`;
        res.writeHead(302, {
            'Cache-Control': 'no-cache',
            'location': authurl
        });
        res.end();
    }
};

exports.tvo = (req, res, uri, appid, appid3) => { // 获取两个 openid
    // uri.path 带参数, uri.pathname 不带参数
    let tpl = `${uri.cat1}/${uri.cat3}.html`;
    if (uri.query.openid) {
        if (uri.query.vjifenOpenid) { // 用于微信支付 appid3
            let data = {};
            ejsq.render(tpl, data, req, res);
        } else {
            let url = `http://${req.headers.host}${uri.path}`; //url = `http://${req.headers.host}${uri.pathname}`
            url = url.replace('openid','vjifenOpenid');
            if (url.indexOf('?') === -1) {
                url = url.replace('&', '?');
            }
            let authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid}&scope=snsapi_base&url=${urlencode(url)}`;
            res.writeHead(302, {
                'Cache-Control': 'no-cache',
                'location': authurl
            });
            res.end();
        }
    } else if (ejsq.chktpl(tpl, res)) { // 获取第一个openid: hbopenid 用于微信支付
        let url = `http://${req.headers.host}${uri.path}`,
            authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid3}&scope=snsapi_base&url=${urlencode(url)}`;
        res.writeHead(302, {
            'Cache-Control': 'no-cache',
            'location': authurl
        });
        res.end();
    }
};

exports.tro = (req, res, uri, appid, appid3) => { // 获取两个 openid
    // uri.path 带参数, uri.pathname 不带参数
    let tpl = `${uri.cat1}/${uri.cat3}.html`;
    if (uri.query.openid) {
        if (uri.query.vjifenOpenid) { // 用于微信支付 appid3
            let data = {};
            ejsq.render(tpl, data, req, res);
        } else {
            let url = `http://${req.headers.host}${uri.path}`; //url = `http://${req.headers.host}${uri.pathname}`
            // url = url.replace('openid', 'qyOpenid');
            if (url.indexOf('?') === -1) {
                url = url.replace('&', '?');
            }
            let authurl = `http://${global.o3host}/wx3/u2mpTro?appid=${appid3}&scope=snsapi_base&url=${urlencode(url)}`;
            res.writeHead(302, {
                'Cache-Control': 'no-cache',
                'location': authurl
            });
            res.end();
        }
    } else if (ejsq.chktpl(tpl, res)) { // 获取第一个openid: hbopenid 用于微信支付
        let url = `http://${req.headers.host}${uri.path}`,
            authurl = `http://${global.o3host}/wx3/u2mpTro?appid=${appid}&scope=snsapi_base&url=${urlencode(url)}`;
        res.writeHead(302, {
            'Cache-Control': 'no-cache',
            'location': authurl
        });
        res.end();
    }
};

exports.tuo = (req, res, uri, appid, appid3) => { // 获取两个 openid
    // uri.path 带参数, uri.pathname 不带参数
    let tpl = `${uri.cat1}/${uri.cat3}.html`;
    if (uri.query.openid) {
        if (uri.query.vjifenOpenid) { // 用于微信支付 appid3
            let data = {};
            ejsq.render(tpl, data, req, res);
        } else {
            let url = `http://${req.headers.host}${uri.path}`; //url = `http://${req.headers.host}${uri.pathname}`
            url = url.replace('openid','vjifenOpenid');
            if (url.indexOf('?') === -1) {
                url = url.replace('&', '?');
            }
            let authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid}&scope=snsapi_userinfo&url=${urlencode(url)}`;
            res.writeHead(302, {
                'Cache-Control': 'no-cache',
                'location': authurl
            });
            res.end();
        }
    } else if (ejsq.chktpl(tpl, res)) { // 获取第一个openid: hbopenid 用于微信支付
        let url = `http://${req.headers.host}${uri.path}`,
            authurl = `http://${global.o3host}/wx3/u2mp?appid=${appid3}&scope=snsapi_base&url=${urlencode(url)}`;
        res.writeHead(302, {
            'Cache-Control': 'no-cache',
            'location': authurl
        });
        res.end();
    }
};