(function () {
	"use strict";
	var  top_con=document.getElementById('top_con'),
		s_loading=document.getElementById('s_loading'),
		// no_reb=document.getElementById('no_reb'),
		my_reb=document.getElementById('my_reb'),
		code_sum=document.getElementById('code_sum'),
		money_sum=document.getElementById('money_sum'),
		date_sum=document.getElementById('date_sum'),
		hav_reblist=document.getElementById('hav_reblist'),
		reb_list=document.getElementById('reb_list'),
		all_reblist=document.getElementById('all_reblist'),
		no_reblist=document.getElementById('no_reblist'),
		rebate_btn=document.getElementById('rebate_btn'),
		money_btn=document.getElementById('money_btn'),
		tel_fare=document.getElementById('tel_fare'),
		three_btn=document.getElementById('three_btn');
    var args = vge.urlparse(location.href),
        openid = args.openid;
    
	var timer=null,patricularname='',url0='',url1='';
	var first=true,change=true,nomarket=true;
	var mydate = new Date(),
		mymonth=mydate.getMonth()+1,
		myday=mydate.getDate(),
		lastsecond=mydate.getTime()-24*60*60*1000,
		newdate = new Date(lastsecond),
		lastmonth=newdate.getMonth()+1,
		lastday=newdate.getDate();
	var today=mymonth+'月'+myday+'日',
		yesterday=lastmonth+'月'+lastday+'日';

	change_height();
	function change_height () {
		var h=0;
		change=false;
		timer=setInterval(function (argument) {
			h+=3;
			top_con.style.height=h+'px';
			if (h>150) {
				s_loading.style.display='block';
			}
			if (h>350) {
				clearInterval(timer);
				timer=null;

			    if(openid) {
					getrebeatsum(openid);
			    }
			}
		},5);
	}
	function getrebeatsum (openid) {
		var japi = vge.liby + '/DBTLBInterface/gifts/queryMyWallet';
        var data={
	        "openid": openid,
	        "currentPage": 1,
            "count": 5
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0'://加载成功
				s_loading.style.display='none';
				top_con.style.height="auto";
	            if (obj.reply.totalVpoints==0&&obj.reply.totalMoney==0) {
					three_btn.style.display="block";
					// hav_reblist.style.display="block";
					// hav_reblist.style.display="none";
					no_reblist.style.display="block";

                    code_sum.innerHTML='0';
	            	money_sum.innerHTML='0.0';

					// my_reb.style.display="none";
					my_reb.style.display="block";
	            } else{
	            	code_sum.innerHTML=obj.reply.totalVpoints;
	            	money_sum.innerHTML=obj.reply.totalMoney;
					three_btn.style.display="block";
					hav_reblist.style.display="block";
					date_sum.innerHTML=obj.reply.yesterdayVpoints;
					var thelist=obj.reply.objList, hs='';
					for (var i = 0; i < thelist.length; i++) {
						hs+='<li><p>'+thelist[i].skuName.substr(0,15)+'...</p><p>'+thelist[i].earnMoney+'</p></li>';//<li><p>立白洗衣粉500g</p><p>5.00元</p></li>
					};
					reb_list.innerHTML=hs;
					no_reblist.style.display="none";
					my_reb.style.display="block";
	            }
                break;
            case '1':
                toptip('加载失败:'+obj.result.msg);
                break;
            default:
                toptip('error:'+obj.result.businessCode+','+obj.result.msg);
            }
        });
	}
    
	tel_fare.addEventListener("click",function () { // 充话费
		location.href="/liby/t/recharge?openid="+openid;
	},false);
	money_btn.addEventListener("click",function () { // 提现
		location.href="/liby/t/withdrawal?openid="+openid;
	},false);
	all_reblist.addEventListener("click",function () { // 获奖记录
		location.href="/liby/to2/my_record?bopenid="+openid;
	},false);
    
	// rebate_btn.addEventListener("click",function () { // 积分夺宝
	// 	location.href="/liby/t/jf_indiana?openid="+openid;
	// },false);

})();
