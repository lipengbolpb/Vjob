'use strict';
console.log('模块加载时只执行一次？wsck');

const crypto = require('crypto'),
      cryptojs = require('crypto-js'); // crypto-js 与 node-crypto 不兼容
      // wx3cache = require(`${global.fsroot}/m/kvdb`),

exports.home = home;
exports.getseckey = getseckey;

var seckeys={};                 // 一次性的随机key，共享变量，放在中央缓存中

let decipherjs = (jo, ws)=>{          // 第三方模块 crypto-js
    var des = cryptojs.AES.decrypt(jo.aes, jo.pwd);
    var result= des.toString(cryptojs.enc.Utf8); // 必须指定编码
    ws.brocast('后台:'+result);
};

function home(ws, req) {
    console.log('处理数据',req);
    
    if(req.md5!==undefined) {
        let md5 = crypto.createHash('md5').update(req.src,'utf8').digest('hex');
        ws.brocast([req.src, md5].join(' : '));
    }else if(req.aes!==undefined) {
        decipherjs(req, ws);
    }
}

function getseckey(ws, req) {
    console.log('getseckey', req);
    // promise : key, value
    let p1 = new Promise((resolve,reject)=>{
        crypto.randomBytes(8, (err, buf) => {
            if (err) {
                console.log('randomBytes err:',err);
            }else{
                console.log(`${buf.length}bytes random str:${buf.toString('hex')}`);
                resolve(buf.toString('hex'));
            }
        });
    });
    let p2 = new Promise((resolve,reject)=>{
        crypto.randomBytes(8, (err, buf) => {
            if (err) {
                console.log('randomBytes err:',err);
            }else{
                console.log(`${buf.length}bytes random str:${buf.toString('hex')}`);
                resolve(buf.toString('hex'));
            }
        });
    });
    
    Promise.all([p1,p2]).then((data)=>{
        // cache.pushseckey(key, val);
        seckeys[data[0]] = data[1];
        // 可以用 ws 做 index console.log(ws.socket._handle.fd); 会变
        ws.send(`seckey\r\n${data[0]}\r\n${data[1]}`);
    });
}

function md5(src) {
    return crypto.createHash('md5').update(src,'utf8').digest('hex');
}
