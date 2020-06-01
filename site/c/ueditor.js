'use strict';
console.log(`load once, module.id:${module.id}`);
// 页面编辑器插件 http://ueditor.baidu.com/


exports.do = (req, res, uri)=> {
    let md = req.method.toLowerCase();
    if(md==='get') {
        console.log(uri.query);
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end('{}');
    }else if(md==='post') {
        let bufs = [], size=0;
        req.on('data',function(chunk){
	        bufs.push(chunk);
            size += chunk.length;
	    }).on('end', function() {
            let buf = Buffer.concat(bufs, size);
            let ss = buf.toString();
            console.log(ss);
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end('{}');
        });
    }
};
