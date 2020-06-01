(function(){
	var dom_tip = document.getElementById("tip");
    var args = vge.urlparse(location.href),
    	batch = document.getElementById("batch"),
    	batchName = sessionStorage.batchName===undefined?'':sessionStorage.batchName,
        bizcode = args.bizcode;
    //1 - 该积分码不存在",2 - 该积分码已经被使用过,3 - 积分码已过期,4 - 活动未开始,5 - 活动已结束,6 - 积分码异常(通常为服务器报错)
    
    switch(bizcode){
    case '1':
        dom_tip.innerHTML='该二维码不存在';
        break;
    case '2':
        dom_tip.innerHTML='这个二维码<br />已经被扫过了';
        break;
    case '3':
        dom_tip.innerHTML='二维码已过期';
        break;
    case '4':
        dom_tip.innerHTML='活动还没<br />开始哦！';
        batch.innerHTML = batchName+'<br />服务热线：15652287347‬';
        break;
    case '5':
        dom_tip.innerHTML='活动已截止';
        break;
    case '6':
        dom_tip.innerHTML='红包在路上堵车了<br />稍后再试试吧';
        break;
    case '11':
        dom_tip.innerHTML='亲，红包已拆过了<br />再扫一瓶吧';
        break;    
    case '-1':
		dom_tip.innerHTML='系统升级中...';
        break;
    case '18'://扫码专员
    	dom_tip.style.display='none';
    	title_tip('尊敬的用户', '此码未被使用<br />活动批次：'+batchName, '我知道了',undefined,close);
        break;     
    default:
        title_tip('尊敬的用户', bizcode+':'+sessionStorage.msg, '我知道了');
        break;
    }
})();
