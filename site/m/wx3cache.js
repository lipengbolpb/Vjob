'use strict';
// 2016-06-07 17:53:23 zsl
// key = appid_sceneid-keyname  eg. vjfappid_wxjsdk_ticket
// val = time_value
// appid or server.host ?

const memjs = require('memjs'),
      assert = require('assert');

var nmc;
if(process.env.MEMCACHE_SERVERS) { // sae online
    nmc = memjs.Client.create(process.env.MEMCACHE_SERVERS, {
        username: process.env.ACCESSKEY,
        password: process.env.SECRETKEY
    });
}else{
    nmc = memjs.Client.create(global.mc.nlocation);
}

exports.customer = (usr,pwd,cb)=>{
    assert(cb!==undefined);
    let k=`wx3customer_${usr}`;
    if(pwd===''){               // 查询
	    nmc.get(k, (e, d, i)=>{
            // console.log(d); // d 是 buffer 不是 string
		    if(!e) {
                // d===null 没有缓存
			    cb(d);
		    }else{
			    cb(null);
			    console.log('mcget memcached get err ',e,k);
		    }
	    });
    }else{                      // 写入
	    nmc.set(k, pwd, cb, 0);
    }
};

exports.customer8gh = (usr,appid,cb)=>{
    console.log('customer8gh:', usr, appid);
    let k=`customer8gh_${usr}`;
	nmc.get(k, (e, d, i)=>{// d 是 buffer 不是 string
		if(!e) {
            if(d===null) {// 没有缓存
                if(appid==='') { // 查询
                    assert(cb!==undefined);
                    cb(d);
                }else{           // 写入
                    if(cb===undefined) cb=mccb;
	                nmc.set(k, appid, cb, 0);
                }
            }else{               // 已有数据
                let old = d.toString().split(',,');
                if(appid==='') { // 查询
                    assert(cb!==undefined);
                    cb(old);
                }else{           // 写入
                    if(cb===undefined) cb=mccb;
                    old.push(appid);
	                nmc.set(k, old.join(',,'), cb, 0);
                }
            }
		}else{
			if(!!cb)cb(null);
			console.log('mcget memcached get err ',e,k);
		}
	});
};

function mccb(e,d,v){
    // console.log(`err:${e},result:${d},value:${v}`);
	if(e){
		console.log('memjs err',e);
	}
}

// common interface
exports.set=(k,v,cb,t)=>{
    t= t===undefined?0:t;
    if(cb===undefined) {
        cb = mccb;
    }
	nmc.set(k, v, cb, t);
};

exports.get=(k,cb)=>{
	nmc.get(k, (e, d, i)=>{
        // console.log(d); // 返回的是 buffer 不是 string
		if(!e) {
			cb(d);
		}else{
			cb(null);
			console.log('mcget memcached get err ',e,k);
		}
	});
};

exports.del=(k, cb)=>{
    if(cb===undefined) cb=mccb;
	nmc.delete(k, cb);
    // console.log('del', k);
};

exports.chkappend = (k,v,fun,t)=>{
    t = t===undefined?0:t;
    // 同时 取出 修改 写入，是否带来异步问题，造成漏写？
	nmc.get(k, (e, d, i)=>{
        // d 是 buffer 不是 string
		if(!e) {
            if(d===null) {      // 第一个值
	            nmc.set(k, v, mccb, t);
            }else{
                let ss = d.toString();
                if(fun!==undefined) { // 有检查函数,检查是否过期,新值换旧值
                    let arr = ss.split(',,'),
                        narr=[v],ret='',item='';
                    for(let i=0,l=arr.length;i<l;++i) {
                        item = fun(arr[i]);
                        if(item!=='') {
                            narr.push(item);
                        }
                    }
                    console.log('wx3cache check&append:', narr);
	                nmc.set(k, narr.join(',,'), mccb, t);
                }else{
                    let nv = [ss, v].join(',,');
                    console.log('wx3cache append:',nv);
	                nmc.set(k, nv, mccb, t);
                }
            }
		}else{
			console.log('append:mcget memcached get err ',e,k);
		}
	});
};

exports.get_appends = (k, cb)=>{
	nmc.get(k, (e, d, i)=>{     // d 是 buffer 不是 string
		if(!e) {
            if(d===null) {
                cb([]);
            }else{
                let arr = d.toString().split(',,');
                cb(arr);
            }
		}else{
			console.log('get_appends: mcget memcached get err ',e,k);
		}
	});
};

exports.del_appends = (k, v)=>{
	nmc.get(k, (e, d, i)=>{     // d 是 buffer 不是 string
		if(!e) {
            if(d!==null) {
                let rr = d.toString().split(',,'),
                    idx= rr.indexOf(v);
                if(idx!==-1) {
                    rr.splice(idx,1);
                    console.log('wx3cache del_appends:', rr, v);
	                nmc.set(k, rr.join(',,'), mccb, 0);
                }
            }
		}else{
			console.log('del_appends: mcget memcached get err ',e,k);
		}
	});
};

exports.incr = (k,v)=> {
    nmc.increment(k,v,mccb);
};

exports.decr = (k,v)=> {
    nmc.decrement(k,v,mccb);
};
