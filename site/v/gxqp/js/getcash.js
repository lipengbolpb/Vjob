//获取页面元素
var btn = document.querySelector('#bi');
var hbHead = document.querySelector('#hbHead');
var hbHeadUp = document.querySelector('#hbHeadUp');
//解析url
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null) return  decodeURIComponent(r[2]); 
     return null;
}

var args = vge.urlparse(location.href),
    codeContentUrl = args.codeContentUrl;
       


var openid = GetQueryString('openid');
var unionid = GetQueryString('unionid');
var currentMoney = GetQueryString('currentMoney');
var totalAccountMoney = GetQueryString('totalAccountMoney');
// var codeContentUrl = GetQueryString('codeContentUrl');

//点击事件
btn.addEventListener('click',function(){
	this.className='bi';
	hbHead.className='hbHead';
	hbHeadUp.className='hbHeadUp';
	setTimeout(function(){
		window.location.replace('http://'+vge.qpgx_cash+'/v/gxqp/more.html?openid='+openid+'&unionid='+unionid+'&currentMoney='+currentMoney+'&totalAccountMoney='+totalAccountMoney+'&codeContentUrl='+codeContentUrl);
	}, 1200)
});