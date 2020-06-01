'use strict';
console.log(`load once, module.id:${module.id}`);
// 1 服务启动时向三方平台注册 {ghid, ip}
// 2 三方平台重启时，根据注册服务列表回连
// 3 连接、断开、数据 三个事件的处理函数
// 问题： 多台负载均衡的三方服务器，需要全部连接
// 直接在三方服务器程序做模块化开发方便， 日志用 模块名前缀
// thelog(data){console.log(time, module.id, data);};

function onconnect(conn){
}

function ondata(data){
}

function onend(){
}

function onerror(err){
}

const net = require('net');

exports.init = ()=>{
    let option = {
        host:'',
        port: global.cfg.netport
    };
    let conn = net.connect();
    netc.connect( {host:'', port: global.cfg.netport}, (conn)=>{
        conn.send( {ghid:global.cfg.ghid, ip:global.ip});
    });
};
