'use strict';
console.log(`load once, module.id:${module.id}`);
const ejsq = require('../modules/ejsq'),
      // wx3cache = require(`${global.fsroot}/m/wx3cache`),
      wsck = require('./wsck');

exports.phome=post_index;

exports.preview = (req, res, uri)=> {
    let tpl=uri.query.tpl,      // 相对路径 /v/
        data={};
    ejsq.render(tpl, data, req, res);
};

exports.index = (req, res, uri)=> { // get root, index action
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
	res.end('<h4>liby</h4>');
};

function post_index(req, res, uri) { // post root
    let q = uri.query, bufs = [], size=0;
    console.log('post uri query:', q);

    req.on('data',function(chunk){
	    bufs.push(chunk);
        size += chunk.length;
	}).on('end', function() {
        let buf = Buffer.concat(bufs, size);
        let postData = buf.toString('utf8');
		// var fields = querystring.parse(postData);
        console.log(`post trunks: ${bufs.length}, length: ${size}`);
        console.log({postData});
     	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		// res.end(decodeURIComponent(postData));
        res.write(buf, 'utf8');
		res.end();
	});
}
