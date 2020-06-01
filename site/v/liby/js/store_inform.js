(function () {
	"use strict";
    ini_wxshare(vge.libyappid);
	var inform_box=document.getElementById('inform_box'),
		inform_ipts=inform_box.getElementsByTagName('input'),
		dom_btn=document.getElementById('btn'),
		dom_area=document.getElementById('area');
    var args = vge.urlparse(location.href),
        latitude, longitude, accuracy,
        openid = args.openid;
	var caneditor=true, storekey='', locationed=false;
	var reg1 = /^(\w|[\u4E00-\u9FA5])*$/;
	init();
	wx.ready(function() {
        wx.getLocation({        // 获取位置信息
            type: 'wgs84',// 默认为wgs84的gps坐标
            complete: function (res) {   //接口调用完成执行回调，无论成功失败
                latitude = res.latitude;  // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180
                accuracy = res.accuracy;  // 位置精度
                locationed = true;
            }
        });
    });

	function init (){
        var japi = vge.liby + '/DBTLBInterface/activity/getStoreInfo';
        var data = {
	        "openid": openid
        };
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
                if(obj.reply) {
                    inform_ipts[0].value=obj.reply.storeName;
                    inform_ipts[1].value=obj.reply.businessLicenseNo;
                    inform_ipts[2].value=obj.reply.ownerName;
                    inform_ipts[3].value=obj.reply.phoneNumber;
                    inform_ipts[4].value=obj.reply.province+' '+obj.reply.city+' '+obj.reply.district;
                    inform_ipts[5].value=obj.reply.address;
                    storekey=obj.reply.infoKey;
                }else{
                    // 无数据
                    inform_ipts[0].value='';
                    inform_ipts[1].value='';
                    inform_ipts[2].value='';
                    inform_ipts[3].value='';
                    inform_ipts[4].value='';
                    inform_ipts[5].value='';                    
                }
                break;
            case '1':
                toptip('加载失败:'+obj.result.msg,5000);
                break;
            case '2':           // 未注册
                location.replace('/liby/to2/scan_reg?reg=1&bopenid='+openid);
                break;
            default:
                toptip('error:'+obj.result.code + ','+obj.result.businessCode+','+obj.result.msg,5000);
            }            
        }, 'debug');
    }

	dom_btn.addEventListener("click",function () {
		if (caneditor) {//点击编辑
            // if(storekey==='') location.replace('/liby/t/scan_reg?openid='+openid);
			caneditor=false;
			dom_btn.innerHTML="保存";
			inform_ipts[0].readOnly=false;
			inform_ipts[1].readOnly=false;
			inform_ipts[2].readOnly=false;
			inform_ipts[5].readOnly=false;
			dom_area.className="enter";
		} else{//点击保存
	        if (!reg1.test(inform_ipts[0].value)||inform_ipts[0].value === "") {
	            toptip("请填写正确的店铺名称！",5000);
	        } else if (!reg1.test(inform_ipts[2].value)||inform_ipts[2].value === "") {
	            toptip("请填写正确的店主姓名！",5000);
	        } else if (inform_ipts[4].value === "") {
	            toptip("请选择店铺所在城市！",5000);
	        } else if (!reg1.test(inform_ipts[5].value)||inform_ipts[5].value === "") {
	            toptip("填写正确的地址信息！",5000);
	        } else{//信息格式正确
                // locationed = true;
	        	if (locationed) {
	        		var citys=inform_ipts[4].value.split(" ");
					sub_inform(citys[0],citys[1],citys[2]);
	        	} else{
	            	toptip("正在取得位置信息，稍后重试！",5000);
	        	}
	        }
		}
	},false);
    
    function sub_inform (a,b,c) {
        var japi = vge.liby + '/DBTLBInterface/activity/saveStoreInfo';
        var data={
	        "operType":'update', // "操作类型 新增=create|编辑=update",
	        "openid": openid,
	        "infoKey":storekey,
	        "storeName":inform_ipts[0].value,
	        "ownerName":inform_ipts[2].value,
	        "phoneNumber":inform_ipts[3].value,
	        "businessLicenseNo":inform_ipts[1].value,
	        "province":a,
	        "city":b,
	        "district":c,
	        "address":inform_ipts[5].value,
	        "longitude":longitude,
	        "latitude":latitude,
	        "veriCode":""
        };
        // data.longitude = data.latitude = '12345';
        vge.callJApi(japi, data, function(obj){
            switch(obj.result.businessCode) {
            case '0':
				caneditor=true;
				dom_btn.innerHTML="编辑";
				inform_ipts[0].readOnly=true;
				inform_ipts[1].readOnly=true;
				inform_ipts[2].readOnly=true;
				inform_ipts[5].readOnly=true;
				dom_area.className="";
                break;
            case '1':
                toast('保存失败:'+obj.result.msg);
                break;
            default:
                toast('error:'+obj.result.businessCode+','+obj.result.msg);
            }
        },'debug');
    }
    
})();
