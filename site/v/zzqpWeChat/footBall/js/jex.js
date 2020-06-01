
/**
 * SCO的方法介绍
 * @module JG_API
 */

/**
   * <b>jex</b>介绍
   * <br>
   * jex主要针对于Jquery的应用扩展
   * <br>
   * 目前这里列出了大多数常用的方法及事件，如果在使用过程当中发现有缺失的函数可以提出需求
   * <br>
   * <br> 
   *  
   * <br>s 
   * <br>
   * @constructor
   * @class jQuery 
   * @example
   *
   *     var bar;
   *
   */




var ifmd=0,ot=0,ifgs=0,dragpagex=0;
var ui={upd:[],'ui':{a:{maxr:42,modifyd:1405868639640,x:1},all:{photo:{cid:"photo",ctn:"newvs|7",sx:0,galx:7,w:120,h:0,x:0,y:0,z:-1,s:7,marg:0,ncheck:0,cfun:"",ca:"立刻拍张图|takepht()`从手机中选择|takepic()`压缩并上传|uploadimg(0,this)",class0:"cent wei20 bd5 r5 x_gray",class1:"",class2:"",padd:6,cta:"",ccl:"",cret:"",ftxt:0,checksj:"",idpg:0,cxy:"",op:0},gxpic:{cid:"gxpic",ctn:"newvs|7",sx:0,galx:7,w:409,h:339,x:0,y:0,z:-1,s:0,marg:0,ncheck:0,cfun:"",ca:"||gx1`||gx2`||gx3`||gx4`||gx5",class0:"",class1:"",class2:"",padd:0,cta:"",ccl:"",cret:"append",ftxt:0,checksj:"",idpg:0,cxy:"x",op:0},logout:{cid:"logout",ctn:"newvs|7",sx:0,galx:7,w:104,h:44,x:0,y:0,z:-2,s:0,marg:0,ncheck:1,cfun:"",ca:"退出登录|dl.logouta()|`上传管理|showimg(1)|",class0:"x_noy cent yaheif wei20 x_btnfb",class1:"",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"1",op:0},loginok:{cid:"loginok",ctn:"newvs|7",sx:0,galx:7,w:98,h:48,x:0,y:0,z:0,s:0,marg:0,ncheck:0,cfun:"",ca:"登录||x_btnhs",class0:"x_noy cent yaheif wei20",class1:"",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"",op:0},btnzhuce:{cid:"btnzhuce",ctn:"newvs|7",sx:0,galx:7,w:98,h:48,x:0,y:0,z:0,s:0,marg:0,ncheck:0,cfun:"",ca:"注册||x_btnhs",class0:"x_noy cent yaheif wei20",class1:"",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"",op:0},fhsyb:{cid:"fhsyb",ctn:"newvs|7",sx:0,galx:7,w:164,h:67,x:0,y:0,z:0,s:0,marg:0,ncheck:0,cfun:"dl.builddl()",ca:"返回上一步||x_btnbg",class0:"x_noy yaheif wei25 cent",class1:"",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"",op:0},fpnav:{cid:"fpnav",ctn:"7|newvs",sx:0,galx:7,w:92,h:42,x:0,y:0,z:-1,s:0,marg:2,ncheck:1,cfun:"",ca:"通用",class0:"x_noy cent yaheif wei20 x_qdjl",class1:"",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"",op:0},msgb:{cid:"msgb",ctn:"7|newvs",sx:0,galx:7,w:60,h:54,x:0,y:0,z:-2,s:0,marg:0,ncheck:0,cfun:"j().cls()",ca:"||x_btnclose",class0:"x_noy",class1:"",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"",op:0},allui:{cid:"allui",ctn:"newvs",sx:0,galx:8,w:0,h:0,x:0,y:0,z:0,s:0,marg:0,ncheck:0,cfun:"",ca:"",class0:"",class1:"",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"",op:0},sngsle:{cid:"sngsle",ctn:"newvs",sx:0,galx:8,w:0,h:0,x:0,y:0,z:0,s:0,marg:0,ncheck:1,cfun:"",ca:"",class0:"rr5l nr x_gray bdc",class1:"x_check_radio leftm",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"",op:0},multisle:{cid:"multisle",ctn:"newvs",sx:0,galx:8,w:0,h:0,x:0,y:0,z:0,s:0,marg:0,ncheck:99,cfun:"",ca:"",class0:"x_gray bdc",class1:"x_check leftt",class2:"",padd:0,cta:"",ccl:"",cret:"html",ftxt:0,checksj:"",idpg:0,cxy:"",op:0}}}};sq={sq:{}};
 
var imgp=(imgp||('css/')); 
if((window.location+'').indexOf('http:')==0&&imgp=='css/')imgp='/css/';

jqueryex={sclick:"onclick",
ifmd:0,dragpagex:0,
cssls:',',
white:['','c','fff','fff','a7a7a7','fff','f2f2f2','555'],
brown: ['', 'c', 'a67337', '8a5520', 'fff', '8a5520', '5c3a19', 'fff'],
gray: ['', 'c', 'fafafa', 'f1f1f1', '2f3e46', 'e1e1e1', 'ccc', '222'],
yellow: ['', 'c', 'd1d744', 'bbbf39', 'fff', 'dadd50', 'c0c442', 'fff'],
blue: ['', 'c', '4db5fe', '3c9be2', 'fff', '3795D8', '002F50', 'fff'],
blue2: ['', 'c', '46cad9', '46cad9', 'fff', '007483', '008696', 'fff'],
blue3: ['', 'c', 'fff', 'fff', '46cad9', '46cad9', '46cad9', 'fff'],
black: ['', 'c', '3c3c3c', '111', 'fff', '272727', '585858', 'fff'],
red: ['', 'c', 'd74444', 'c43a3a', 'fff', 'e25c5c', 'cc4646', 'fff'],
red2: ['', 'c', 'ff7878', 'ff7878', 'fff', 'ea5c5c', 'ea5c5c', 'fff'],
rede: ['', 'c', '', '', 'ff7878', 'ff7878', 'ff7878', 'fff'],
orange: ['','c','f79f1c','D68635','fff','C4811E','8D5706','fff'],
orange2: ['','c','f08a62','f08a62','fff','e85521','e85521','fff'],
orange3: ['','c','c33e02','c33e02','fff','e85521','e85521','fff'],
orange4: ['','c','fff','fff','FB8C47','FB8C47','FB8C47','fff'],
green:['','c','8dd845','6fbb31','fff','fb6334','A03414','fff'],
pink:['','c','d745a4','bd368d','fff','ea6abd','bd368d','fff'],
purple:['','c','9246d7','8339c2','fff','a35de6','7733be','fff'],
empty:['','c','','','fff','fff','f2f2f2','555'],
emptywx:['','c','','','fff','','','555']
};
jQuery.fn.extend({
strlen:function(str){ return str.replace(/[^\x00-\xff]/g,"rr").length; }, 
/**
 * @method getall
 * @description 用于div列表生成
 * @param  {[json]} s         div标签，兼容旧方法，可以直接用JSON对象，直接包含以下对象
 * @param  {[type]} pid       父DIV的ID
 * @param  {[type]} cid       [description]
 * @param  {[type]} sjjson    数据的JSON对象
 * @param  {[type]} tablename 对象中的主表名
 * @param  {[type]} st        [description]
 * @param  {[type]} sid       [description]
 * @param  {[type]} dragdiv   拖拽DIV的ID
 * @param  {[type]} isappend  是否添加
 * @param  {[type]} nowrite  是否渲染
 * @return {[type]}           [description]
 * @example
 *<br> var ym = '\'<div id="ym_#id#" onclick=showDetail(#id#) style="padding: 0px 20px;background-color:#fff;border-bottom:1px solid #aaa;height: 70px;color:#3D3D3D"><div class="yahei f22" style="overflow: hidden;padding-top:5px;">#ctn#</div><div class="r8 fright yahei f18 cent" style="width:80px; height:29px;background:green;color:#fff" id="jzMess_#id#">未接种</div><div class="yahei f18 fright" style="margin-right: 10px;" id="cmm_#id#">#ifr#月龄</div></div> \'';
 *<br>		j().getall(ym,'ymmain','ymlist',json,'cm','','','');
 */
getall:function(s,pid,cid,sjjson,tablename,st,sid,dragdiv,isappend,nowrite){//st子表，sid外键名
	//s,pid,cid,sjjson,tablename,st,sid,dragdiv,isappend,nowrite
	var gjson;
	if(typeof(s)=="object"){ 
		gjson={
		       s:s.s||'',
	           pid:s.pid||'',
			   cid:s.cid||{},
			   sjjson:s.sjjson||{},
			   tablename: s.tablename||'',
			   st: s.st||'',
			   sid: s.sid||'',
			   dragdiv: s.dragdiv||'', 
			   isappend: s.isappend||false,
			   nowrite: s.nowrite || false,
			 };
		
	}else{
		gjson={
		       s:s||'',
	           pid:pid||'',
			   cid:cid||{},
			   sjjson:sjjson||{},
			   tablename: tablename||'',
			   st: st||'',
			   sid: sid||'',
			   dragdiv: dragdiv||'', 
			   isappend: isappend||false,
			   nowrite: nowrite||false,
			 }; 
	}
	 
	if(gjson.sjjson.sqajax){
		 db.sqajax(gjson.sjjson.sqajax, "", gjson.sjjson.swhe||"", function (k, jsona) {
				 var sfunc='';
				 if(gjson.sjjson.func)sfunc=gjson.sjjson.func;
				 gjson.sjjson=jsona;
				 if(!gjson.nowrite)jQuery().getalls(gjson);
				 if(sfunc)db.dofunc(sfunc,{});
		 },gjson.sjjson.option||'&option=011');
	}else{
		
			if(!gjson.nowrite)jQuery().getalls(gjson);
	}
},	
getalls:function(gjson){//st子表，sid外键名
    //s,pid,cid,json,tablename,st,sid,dragdiv,isappend
	var tempjson={ "cid": gjson.cid,"w": 0, "h": 0, "x": 0, "y": 0, "z": 0, "s": 0, "marg": 3, "ncheck": -2, "cfun": "", "ca":[], "class0": " ", "class1": "", "class2": "", "padd": 0, "cta": "", "ccl": "", "cret": "html",cxy:(gjson.dragdiv)?'y0':'' }; 
	if(typeof(gjson.cid)=='string'){
	 	ui.ui.all[gjson.cid] = tempjson;
	}else{
		 ui.ui.all[gjson.cid.cid]=jQuery().jcopy(ui.ui.all[gjson.cid.fid]||tempjson);
 		jQuery.each(gjson.cid,function(i,n){
			 ui.ui.all[gjson.cid.cid][i]=n;
		});
		gjson.cid=gjson.cid.cid;
	}
	var s=(gjson.s+'');
	 var sind=s.indexOf('{');
	 if(sind>0&&s.indexOf('function')==0){s=s.substring(sind+1);s=s.substring(0,s.length-1);}
	 var sida=gjson.sid.split(',');
	 jQuery.each(gjson.tablename.split(','),function (itable, tn) {
		var ind=0; 
	  jQuery.each(gjson.sjjson[tn].all, function (i, n) {
		  	var str=s;
			 jQuery.each(n,function(ii,nn){
				 var strii=ii.replace(/\(/gi,'\\(').replace(/\)/gi,'\\)').replace(/\*/gi,'\\*');
				 var reg=new RegExp("#"+strii+"#","g"); 
		  		 str=str.replace(reg,nn);
				 reg=new RegExp("\{"+strii+"\}","g"); 
		  		 str=str.replace(reg,grid.inp(tn,ii,'',i,nn+''));
			 });
			 var reg=new RegExp("#i#","g");
			 str=str.replace(reg,ind); 	
			 ind++;
			 jQuery.each(gjson.st.split(','),function(ii,ta){
				 if(gjson.sjjson[ta]){
				  var strid='idus';
				 if(ta.indexOf('us')!=0&&ta.indexOf('vs')!=0)strid='id'+tn; 
 				 if(sida[ii])strid=sida[ii];
				 if(tn=='cm')if(n.idus==db.idus&&n.usid>1000&&n.typ==2)strid='usid';
	        	//var
				var ns=gjson.sjjson[ta].all[n[strid]];
				if(ta=='fi') ns=jQuery(gjson.sjjson[ta].all).jgrep(strid,i,'json0');
				if(ns)
				jQuery.each(ns,function(iii,nnn){
					 var reg=new RegExp("#"+ta+'.'+iii+"#","g"); 
		  		 	 str=str.replace(reg,nnn);
					 reg=new RegExp("{"+ta+'.'+iii+"}","g"); 
		  		 	 str=str.replace(reg,grid.inp(ta,iii,'',ns.id,nnn+''));
			 	});
				 }
	   		 });
			ui.ui.all[gjson.cid].ca.push(jQuery().gv(str));
	  });
	 });
	 var sstr= jQuery().geta(ui.ui.all[gjson.cid]);
	 if(gjson.isappend=='prepend'){
		 jQuery('#'+gjson.cid).prepend(sstr);
	 }else if(gjson.isappend){
		 jQuery('#'+gjson.cid).append(sstr);
	 }else{
		 jQuery('#'+gjson.pid).html( '<div dragf='+(gjson.dragdiv||'0')+' id='+gjson.cid+' class="tablestyle">'+'</div>');
   	     jQuery().getaa(gjson.cid); 
	 }
	

},
/**
 * @method ui
 * @description 用于按钮的生成，具体用法参考UI界面
 * @param  {[type]} json     [description]
 * @param  {[type]} noreturn [description]
 * @return {[type]}          [description]
 */
ui:function(json,noreturn){
	var json1={"w": 120, "h": 40, "x": 0, "y": 0, "z": -1, "s": 5, "marg": 0, "ncheck": 1, "cfun": "", "class0": "x_c_gray _f_22 cent _r_5__bbb", "cret": "html"};
	if(json.w<=80&&json.w>10){
		if(!json.h){json1.h=30;} 
		json1.class0="x_c_gray _f_18 cent _r_5__ccc";
	}
	json.cid=json.cid||'btn'+db.getrd(4);
	 ui.ui.all[json.cid]=jQuery().jcopy(ui.ui.all[json.fid]||json1);
	 
	jQuery.each(json,function(i,n){
		 ui.ui.all[json.cid][i]=n;
	});
	if(noreturn)return;
	return jQuery('#'+json.cid).geta(ui.ui.all[json.cid]);
},

/**
 * @method jcopy
 * @description 复制json数据
 * @param  {[json]} json [description]
 * @return {[json]}      [description]
 */
jcopy:function(json){
	var rjson={};
	jQuery.each(json,function(i,n){
		 rjson[i]=n;
	});
	return rjson;
}, 
/**
 * @method gv
 * @description 获得值,容错方式字符串的函数值
 * @param  {[type]} str 函数值
 * @return {[type]}     [description]
 * @example
 * j().getv("1+1");
 */
gv:function(str,mrz){//db.sj['tj@tj'].all[idtj];//db.sj.tj.all.id
    var aa=mrz||"。";
    try{
        aa=eval(str);
    }catch(ex){
      aa=str.substring(1,str.length-1);
    }
    return aa;
},
//restyle，样式生成
/**
 * @method recss
 * @description 动态生成样式，具体百度recss
 * @param  {[type]} cssn [description]
 * @return {[type]}      [description]
 */
recss:function(cssn){
	jQuery.each(cssn.split(','),function(i,n){
		jQuery().recssa(n);
	});
},
recssa:function(cssn){	
	if(jqueryex.cssls.indexOf(','+cssn+',')>-1){return}
	jqueryex.cssls+=cssn+',';
	var json={};
	var cca=cssn.split('_');
	var ifpre=[];//是否要厂商
	var cssyz='';
	if(cssn.indexOf('x_')==0)cssyz=',.'+cssn.replace('x_','y_')+',.'+cssn.replace('x_','z_');
	var cn='.'+cssn+cssyz;
	
	if(cca[1]=='s'){  //_s_color_incolor_0_2_6
		var ss='';
		if(cca[2])ss=(cca[4]||'0')+' '+(cca[5]||'3px')+' '+(cca[6]||'6px')+' #'+cca[2];
		if(cca[3])if(cca[3].indexOf('in')==0)ss+=(ss.length>0?',':' ')+'inset '+(cca[4]||'0')+' '+(cca[5]||'2px')+' '+(cca[6]||'4px')+' #'+cca[3].substring(2);
		json[cn]={'box-shadow':ss};
 		if(navig_pre)ifpre=[navig_pre];
	}else if(cca[1]=='f'){  //_f_18_b
		json[cn]={'font-size':(cca[2].indexOf('vw')>-1?(cca[2].substring(0,cca[2].length-2)+'vw'):(cca[2]+'px')),'font-weight':cca[3]=='b'?'bold':'normal'};
		if(cca[4])json[cn]['line-height']=cca[4].indexOf('p')>0?(cca[4]+'x'):(cca[4]+'%');
	}else if(cca[1]=='w'){  //_w_40_40
		json[cn]={'display':'block','width':cca[2]+'px','height':cca[3]+'px'};
	}else if(cca[1]=='sk'){  //_sk_-40
		json[cn]={'transform':'skew('+cca[2]+'deg)'};
	if(navig_pre)ifpre=[navig_pre];
	
	}else if(cca[1]=='ro'){  // _ro_-40
		json[cn]={'transform':'rotate('+cca[2]+'deg)'};
		if(navig_pre)ifpre=[navig_pre];
	}else if(cca[1]=='r'){  //-r-[9]-[tr]-color-[1]
		json[cn]={};
		var ss='';
		 if(cca[4]){
			if(cca[3]){
			  if(cca[3].indexOf('t')>-1)json[cn]['border-top']='solid #'+cca[4]+' '+(cca[5]||'1')+'px';
			  if(cca[3].indexOf('b')>-1)json[cn]['border-bottom']='solid #'+cca[4]+' '+(cca[5]||'1')+'px'; 
			  if(cca[3].indexOf('r')>-1)json[cn]['border-right']='solid #'+cca[4]+' '+(cca[5]||'1')+'px'; 
			  if(cca[3].indexOf('l')>-1)json[cn]['border-left']='solid #'+cca[4]+' '+(cca[5]||'1')+'px'; 
			}else{
				json[cn]['border']='solid #'+cca[4]+' '+(cca[5]||'1')+'px';
			}
		}
		var rav=cca[2].length>3?(cca[2].substring(0,2)+'%'):(cca[2]+'px');
		if(cca[2].indexOf('p')>0)rav=cca[2].replace(/p/g,'px ');
		if(cca[2])json[cn]['border-radius' ]=rav;
		/*if(cca[4]){
			json[cn]['border'+ss]='solid #'+cca[4]+' '+(cca[5]||'1')+'px';
		}*/
		if(cssyz!=''){
			json[cssyz.substring(1)]={};
			if(cca[7]){
			  if(cca[6].indexOf('t')>-1)json[cssyz.substring(1)]['border-top']='solid #'+cca[7]+' '+(cca[5]||'1')+'px';
			  if(cca[6].indexOf('b')>-1)json[cssyz.substring(1)]['border-bottom']='solid #'+cca[7]+' '+(cca[5]||'1')+'px'; 
			  if(cca[6].indexOf('r')>-1)json[cssyz.substring(1)]['border-right']='solid #'+cca[7]+' '+(cca[5]||'1')+'px'; 
			  if(cca[6].indexOf('l')>-1)json[cssyz.substring(1)]['border-left']='solid #'+cca[7]+' '+(cca[5]||'1')+'px'; 
			}else{
				json[cssyz.substring(1)]['border']='solid #'+cca[7]+' '+(cca[5]||'1')+'px';
			}
				 
		}
		if(navig_pre)ifpre=[navig_pre];
	} else if(cca[1]=='b'||cca[1]=='bl'||cca[1]=='c'){
		if(cca[1]=='c')cca=jqueryex[cca[2]];
		var qzs='linear-gradient('+(cca[1]=='bl'?'left,':'');
		 var va=[qzs+'#'+cca[2]+',#'+cca[3]+')'];
		 if(navig_pre) va[1]='-'+navig_pre+'-'+qzs+'#'+cca[2]+',#'+cca[3]+')';
		json[cn]={'background-color':'#'+cca[3],'background-image':va,'color':'#'+cca[4]};
		if(navig_pre=='ms')json[cn]={'background-color':'#'+cca[3],'color':'#'+cca[4]};
		if(cssyz!=''){
			va=[qzs+'#'+cca[5]+',#'+cca[6]+')'];
			if(navig_pre) va[1]='-'+navig_pre+'-'+qzs+'#'+cca[5]+',#'+cca[6]+')';
			json[cssyz.substring(1)]={'background-color':'#'+cca[6],'background-image':va,'color':'#'+cca[7]};
			if(navig_pre=='ms')json[cssyz.substring(1)]={'background-color':'#'+cca[6],'color':'#'+cca[7]};
		}
	} else if(cca[1]=='d'){  //_d_[次数(默认循环)]_[周期时间]_[贝塞尔曲线(默认ease)]_[延时时间] ：例子：_d_1_2__1
		json[cn]={};
        json[cn]['animation-iteration-count']=cca[2] || 'infinite';   //次数 （默认循环）
        json[cn]['animation-duration']=(cca[3] || '2')+'s';                //周期（默认2s）
        json[cn]['animation-timing-function']=cca[4] || 'ease';       //贝塞尔曲线（默认ease）
        json[cn]['animation-delay']=(cca[5] || '0')+'s';                   //延时（默认0s）
        if(navig_pre)ifpre=[navig_pre];
	}
	if(window.restyle)restyle(json,ifpre);
},
 getaa:function(strid){
	var strt='';
	jQuery.each(strid.split(','),function(i,n){
		 strt=jQuery('#'+n).geta(ui.ui.all[n]);
	});
	return strt;
},
  geta:function(json){
	  if(!json){return;}
		var stra=new Array();
		var ifyh='';//是否在参数加引号
		 
		var cid=json.cid;	
		  if(json.cta){stra=json.csj[json.cta].all;ifyh="'";}
	 
		 if(json.ca)stra=json.ca;
		 stra=(typeof(stra)=="string")?stra.split('`'):stra;
		 if(json.ftxt){
		 	if(jQuery(this).children().length==(json.s?2:1)*stra.length){
				jQuery.each(stra,function(i,n){
					var na=(typeof(n)=="string")?n.split('|'):n;
		 			jQuery("#"+cid+"_"+i+"_0").text(na[0]);
				});
				return;
		 	}
		 }
		
		var tag=json.tag||'div';//默认子元素为div
		
		if(cid.indexOf("td")==0)tag="td";
		var bg=json.cbg||'';
		var strdivs="",s1="",sleft="",sright="";	
		var w=json.w||0;
		var hh=json.h||0;
		
		if(w==0&&cid.indexOf('week')>-1)w=Math.max(66,Math.floor(jQuery(this).width()/7)-3);
		if(w!=0)if(w<-1){s1+=" width:"+(-w)+"%;";}else{s1+=" width:"+w+"px;";}
		if(hh!=0)if(hh<-1){s1+=" height:"+(-hh)+"%;";}else{s1+=" height:"+hh+"px;";}
		 
		
		var z=json.z||0;
		var y=json.y||0;
		var x=json.x||0;
		var s = json.s || 0;
		var op = json.op || 1;
		var marg=json.marg||0;
		var class0=json.class0||'';
		var class1=json.class1||'';
		var class2=json.class2||'';
		if((class0+' '+class1+' '+class2).indexOf('_')>-1){
			jQuery.each((class0+' '+class1+' '+class2).split(' '),function(i,n){
				
				jQuery().recss(n);
			});
		}
		
		var maxi=-2;
		if(json.maxi!=undefined)maxi=json.maxi; //不能用|| 考虑 0的情况
		var cxy=json.cxy||'';
		var yclass0=class0.replace(/x_/gi,"y_");
		var yclass1=class1.replace(/x_/gi,"y_");
		var yclass2=class2.replace(/x_/gi,"y_");
 		if(z>0||z<-2){
			
			if(x<0 && y<0){
				s1+="right:"+(-(x+1))+((x+'').indexOf('%')>0?"":"px")+";bottom:"+(y+1)+((y+'').indexOf('%')>0?"":"px")+";";
			}else{
				s1+="left:"+x+((x+'').indexOf('%')>0?"":"px")+";top:"+y+((y+'').indexOf('%')>0?"":"px")+";";
			}
			s1+="z-index:"+z+";position:absolute;";
		}else{
			if(z!=0)s1+="float:"+(z==-1?"left":"right")+";";
			s1 += "position:relative;";
		}
		 
		var padd=json.padd||0;
		if(padd>0) s1+="padding:"+padd+"px;";
		if(padd<0) s1+="margin-right:"+padd+"px;";
		if(marg)s1+="margin:"+marg+"px;";
		if(class1){
			if(class1.indexOf('topc')>-1){s1+="padding-top:27px;";}
			if(class1.indexOf('top2c')>-1){s1+="padding-top:23px;";}
			if(class1.indexOf('top')==-1){s1+="padding-left:27px;";}
			if(class1.indexOf('_check_radio')>-1){
				class1=json.ncheck==1?class1.replace(/_check_radio/,"_radio"):class1.replace(/_check_radio/,"_check");
			}
		}
		//if(class2.indexOf('rightm')>-1){s1+="padding-right:35px;";}
		//if (class1 || class2||marg) {  };
		
		if (op != 1) { s1 += "alpha(opacity = " + 100 * op + ");opacity:" + op + ";" };
		 var idx=0;
		 if(json.cret=='append'){idx=this.children('[id^="'+cid+'"]').length;} 
		var sfunc=json.cfun||'';	
		var tgt='';
		var shref='';
		if(sfunc.indexOf('[')==0){ if(cid.indexOf("aa")==0)tag="a";//根据cid命名判断子元素是否更改
			tgt=sfunc.split(']')[0].substring(1);
			
			shref=sfunc.split(']')[1];
			if(windowjs||jQuery().getv('aid','')!=''){}else{
				if(tgt.indexOf("_")!=0 )if(document.getElementById(tgt)==null)tgt="_blank";
				shref=shref.replace('file:\/\/\/sdcard\/.cyt7\/','http:\/\/'+window.domain+"\/")
			}
		}
		var sclicktt=jqueryex.sclick;
 		if(cxy!="")sclicktt="onclick";
		 
		var ifignore=0;//是否忽略 maxi
		
		jQuery.each(stra,function(i,n){
			if(ifignore==0){
			var nclass0=class0;nclass1=class1;nclass2=class2;
			if(json.checksj){
				if(json.checksj.all[i]){
				 	nclass0=yclass0;nclass1=yclass1;nclass2=yclass2;}
			}
			if(class0.indexOf('{')>-1){
				fieldn=	class0.split('{')[1].split('}')[0];
				  var reg=new RegExp("{"+fieldn+"}","g");    
				nclass0=nclass0.replace(reg,n[fieldn]);
			}
			if(nclass0.indexOf('rr')>-1){
				if(idx==0)nclass0=nclass0.replace(/rr/gi,"r");
				if(nclass0.indexOf('rr5t')>-1){
					if(idx==stra.length-1)nclass0=nclass0+(z==-1?" r5tr":" r5tl");
				}else{
					if(idx==stra.length-1)nclass0=nclass0+(z==-1?" r5r":" r5l");
				}
			}
			if(idx==stra.length-1)nclass0=nclass0.replace(/nr/gi,"").replace(/nl/gi,"");
				
 			
 			var s2="",sattr='';
			var na=(typeof(n)=="string")?n.split('|'):(typeof(n)=="number")?(i+'['+n+']').split('|'):n;
			var ncid=cid+'_'+i;
			var strtemp='<'+tag+' id="'+ncid+'" i="'+i+'" ';
			var na0=(na[0]||na['inhtml']||'&nbsp;')+'';
			 
			if(na0.indexOf('<bR>')>-1){ 
				strtemp="<div style='height:"+json.h+"px;padding:"+(padd+1)+"px;' id=br_"+cid+"_"+idx+">"+na0+"</div>"; 
			}else{	 
		 		if(json.cta)sattr+=" t='"+json.cta+"' ";
				if(json.ccl)sattr+=" en='"+json.ccl+"' ";
				
				if(na.length>1||json.cfun){ 
					if(!iftouch){sattr+=" onmouseover=\"jQuery(this).ccss(this,"+x+",'"+bg+"')\""; }
					
					na1=na[1]||''; 
					//if(oper==1)na1=na[1]+"["+code.vsrole[na[2]]+"]"||''; 
					if(sfunc||na1){
						if(sfunc.indexOf('[')==0){
							
							sshref=shref+(na.length>1?na[1]:(ifyh+i+ifyh));//4.5 调测苹果的时候，把"'"+i+"'"改成""+i+""
							if((windowjs||jQuery().getv('aid','')!='')&&lurl.indexOf('http:')!=0){
								sattr+=" "+sclicktt+"=\"if(jQuery().funmd('"+ncid+"')){jqueryex.ifmd='"+ncid+"';window.js.httpurl('"+tgt+"','"+sshref +"');setTimeout('jqueryex.ifmd=0',500)}\"";
							}else{
								sattr+=' target="'+tgt+ '" href="'+sshref+'"';
							}
						}						 	
						if((na1+'').indexOf('(')>0||sfunc.indexOf('(')>0)
							sattr+=" "+sclicktt+"=\"if(jQuery().funmd('"+ncid+"')){jQuery(this).mdown(event,this,"+json.ncheck+");"+((na1+'').indexOf('(')>0?na1:'')+";"+(sfunc.indexOf('[')==0?"":sfunc)+"}\" ";
 						if(sclicktt=='onclick'&&jQuery().iftouch()) sattr+=" ontouchend=\"javascript:jQuery('#"+cid+"').attr('touchid','"+ncid+"');\" ";
					}
					s2+="cursor:pointer;";
				}else{
					s2+='cursor:default;';
				}			
				if(na.length>2&&na[2]!=''){ 
					 if(json.class1&&nclass0.indexOf(' 2 ')==-1){
						 nclass1=nclass1+" "+na[2];
					 }else{
						nclass0=nclass0+" "+na[2];
					}
					 
				}
				var na3='';
				if(na.length>3){ 
					 na3=na[3];
				}
				//添加背景图片
				if(na.length>4){
					s2+=" background-image:url("+na[4]+");";	
				}
				
				if(bg.indexOf('-')>0){
					na0=grid.rb(cid,i,bg,json.h,na0,class0);
				}
				if(bg.indexOf('x/')==0){
					s2+=" background-image:url("+bg+imgext+");";
				}
				if(class0.indexOf('numimg')>-1){
					na0=jQuery().getnum(na0);
				 }
				if(json.w||json.h){na0='<span id='+cid+'_'+i+'_0 class=b style="overflow:hidden;white-space: nowrap;'+(json.h>700?'height:100%;':'')+'">'+na0+'</span>';
				}else{
					na0='<span id='+cid+'_'+i+'_0>'+na0+'</span>';
					 
				}
			if(json.class1){sleft='<span id='+cid+'_'+i+'_1 class=" '+(nclass1.indexOf('ic_')==-1?'x_ic ':'')+nclass1+'" ></span>';}
			if(json.class2){sright='<span style="line-height:100%;'+(json.class2.indexOf('topl')>-1?"":"padding:2px;")+'" class="'+nclass2+'" id='+cid+'_'+i+'_2>'+na3+'</span>';}		 
				strtemp+=' class="'+nclass0+'" style="overflow:visible;'+s1+s2+'" '+sattr+' >'+sleft+na0+sright+"</"+tag+">";
				
			}
			
			strdivs+=strtemp;
			if(s>0){
				if(z==-1||z==-2){
					strdivs+='<div style="width:'+json.s+'px;'+(json.h>0?"height:"+json.h+"px;":"")+' float:'+(z==-1?"left":"right")+'" id=s_'+cid+'_'+i+'>&nbsp;</div>';
				}
				if(z==0){
					strdivs+='<div style="height:'+json.s+'px;'+(json.w>0?"width:"+json.w+"px;":"")+'" id=s_'+cid+'_'+i+'></div>';
				}
			}
			 idx=idx+1;
			}
			if(maxi!=-2){if(maxi==i)ifignore=1;}
		});
		if(jQuery(this).length>0){
			if(json.cret=='html')if(this.html()!=strdivs)this.html(strdivs);
			if(json.cret=='append')this.append(strdivs);
 			if(cxy.indexOf("x")==0 || cxy.indexOf("y")==0 ) jQuery(this).drags(cxy);//预先初始化确保cfun中的this有效
 			jQuery(this).attr('n',idx);
		}
		return strdivs;

  },
 funmd: function(did){
	 if(jqueryex.ifmd==did||jqueryex.ifmd=='msgb_0') return 0;
	 return 1;
 },

drags:function(xy,func){
      var oxy=xy;
	  xy=xy.substring(0,1);
      var sp=0;//开始位置
      var ssd=0;//开始时间
      var lt=(xy=="x")?"left":"top";
	  var id=jQuery(this).attr('id');  
	  var oldp=0;
	  if(windowjs&&xy=="x"){
		  var tpix=jQuery("#"+id).offset()['top'];
		 // window.js.setfanw(tpix,tpix+Math.max(jQuery("#"+id).height(),40));
		 
		}
      jQuery(this).draggable({
		  axis: xy.substring(0,1),
          start: function(event, ui) { 
              ssd = new Date().getTime();
              sp=jQuery("#"+id).position()[lt];
			  oldp=jQuery("#"+id).vali(lt);
			  if(jQuery(this).attr('dragf')!='')	jqueryex.dragpagex=event.pageX;
          },
		  drag:function(event, ui){
			  if(jqueryex.dragpagex!=0){
				  var jobj=jQuery('#'+jQuery(this).attr('dragf'));
				  if(jobj.length>0){
			  	if((event.pageX-jqueryex.dragpagex)>100){jqueryex.dragpagex=0;jobj.anim(jobj.vali()-1,1);}
			  	if((event.pageX-jqueryex.dragpagex)<-100){jqueryex.dragpagex=0;jobj.anim(jobj.vali()+1,1);}
				  }
			 
			  }
		  },
          stop: function() {
              var  esd = new Date().getTime();//结束时间
              var  ep=jQuery("#"+id).position()[lt];//结束位置
			  var touchid=jQuery('#'+id).attr('touchid');
               var p=jQuery("#"+id).vali(lt);
				 
               var v = (ep - sp)/(esd - ssd);//滑动速度
              if(Math.abs(v)>1 && Math.abs(ep - sp)>100)p-=Math.round(v*2);
  			if(oldp==p){p=(v>0)?(p-1):(p+1)}
			//if(lt=='top')p=Math.floor(p/Math.floor((jQuery("#"+id+'').width()/jQuery("#"+id+'_0').width())));
			 
			 
			var iffunc=1; 
			if((esd - ssd)<150&&(Math.abs(ep - sp))<50&&jQuery('#'+touchid).length==1){ 
				if(touchid.indexOf('_')>0)p=parseInt(touchid.split('_')[1]);  
				  /*var ssclick=jQuery('#'+touchid).attr('onclick');
				 if(ssclick!=undefined) ssclick=ssclick.replace(/this/gi,'document.getElementById(\"'+touchid+'\")');
				    jQuery('#sznum').html( ssclick);
				  
 				  func=function(){ eval(ssclick);	}
				 	 
				  jQuery('#nir2').html(' '+p+ssclick+lt);*/
				  
			 }else{
			 	// jQuery('#vsn0').html('d'+p);
				if(ui.ui.all[id].cfun.indexOf('jpn()')==-1)iffunc=0;
		 	 }
			 
			 jQuery("#"+id).anim(p,iffunc,lt,(oxy.indexOf('0')==1?2:0));
              //jQuery(jQuery("[id^='"+id+"_']" )[p]).setme();
          }
      });	
},
anim:function(i,iffunc,lto,iftb){//iftb 默认需要贴边对齐 =2不贴边
	var maxn=jQuery(this).son().length; 
	if(i>maxn-1)i=maxn-1;
	if(i<0)i=0;  
	if(iftb)if(i!=0&&i!=(maxn-1))return;
	var pw=jQuery(this).parent().width()*0.5;   
	var jobj=jQuery(jQuery(this).son()[i]);
	var sw=(jobj.outerWidth()*0.5+ui.ui.all[jQuery(this).attr('id')].marg);
	var lt='top';
	if(jobj.css('float')=='left'||jobj.css('float')=='right')lt='left';
	if(lto)lt=lto;  
	if(lt=='top'){
		pw=jQuery(this).parent().height()*0.5;
	   sw=(jobj.outerHeight()*0.5+ui.ui.all[jQuery(this).attr('id')].marg);
	}
	 var ixy=jobj.position()[lt];
	  if(Math.round(pw/sw)%2==0)ixy=ixy-sw;
	 var ltpx=pw-ixy-sw;
	 
	 //拉到最下的时候回位
	 var jobjmax=jQuery(jQuery(this).son()[maxn-1]);
	 var maxnpx=jobjmax.position()[lt]+(lt=='top'?jobjmax.outerHeight():jobjmax.outerWidth());
	
	 if(ltpx<-( maxnpx )+1*pw)ltpx=-(maxnpx )+1*pw;
	 if(ltpx>0) ltpx=0;
	 ltpx=parseInt(ltpx);
  
	 var aniJson=eval("({"+lt+":"+ltpx+"})");
 	if(iffunc){  
		jQuery(this).animate(aniJson,500,function(){
			
			jobj.click();
	    }); //try{}catch(ex){jQuery().jalert(ex);}
	}else{
		jQuery(this).animate(aniJson,500);
	}
},  
alphable: function (op) {
  jQuery(this).animate({ opacity: op }, 0);
},
 
cls:function(clas){
	clas=clas||'mishu';
 	//setTimeout(function(){
   		//jQuery('#mishudiv,#msgdiv,#guide'+clas).fadeOut(100,function(){
	jQuery('#mishudiv,#msgdiv,#guide'+clas).hide(); 
	setTimeout(function(){
	 	jQuery('#divzhezao,#divzhezao1,#divzhezao2,#divzhezao3,#divdianwo').hide(); 
	},100);
 		//});
	//},400);
	
	
},
gettx:function(cidus,usid,ifurl,ifr,w){//头像
//if(windowjs)return 'url("mytx.jpg") no-repeat center';
if(cidus==db.idus&&usid>1000)cidus=usid;
  var pathd=Math.floor(cidus/1000);
	 
	var oidvs=db.sj.vs.all[cidus];
	var w=w||50;
	if(oidvs){
		
			if(oidvs.ps>0){//其他用户没有us对象
				str= 'url(http:\/\/' + domain +'/pg/us/'+pathd+'/'+cidus+'.png) no-repeat center';
				if(galx==9)str= 'url(http:\/\/' + domain +'/pg/us/'+pathd+'/'+cidus+'.png) no-repeat center';
			}else{
				str= 'url('+(imgp)+'face'+oidvs.sex+oidvs.role+'.png) no-repeat center';
				if(galx==9)str='url('+(imgp)+'testtx.png) no-repeat center';
			}
			if(ifurl)return str;
			if(galx==9){
				return '<div class="r5 x_gray" onclick="ga.showUserInfo()" id="'+cidus+'" style="background: '+str+';width: 100%;height: 0px;border-radius: 50%;background-size: contain;padding-bottom: 100%;"></div>';
			}else{
				return '<div class="'+((cidus==db.idus&&ifr)?'fright':'fleft')+' r5 x_gray fleft" onclick=xxex_go('+cidus+') id=pp'+cidus+' style="border:1px solid #fff;background:'+str+';width:'+w+'px;height:'+w+'px;"></div>';
			}
	}
	return '';
},
/**
 * @method jaler
 * @description 弹出系统对话框
 * @param  {[string]} res  弹出内容，可以HMTL
 * @param  {[null]} topy null
 * @param  {[type]} btn  按钮事件
 * @param  {[type]} ifgb 是否有关闭按钮0，1
 * @param  {[type]} clas 样式
 * @param  {[type]} json
 * @return {[type]}      [description]
 * @example
 * <br>var userCenter="<div>ssssss</div>";
 * <br>j().jaler(userCenter,null,"密码找回|ga.findPassword()|`切换登录|dl.build();|"); 
 */
jaler: function (res, topy, btn, ifgb, clas, json) {
	var cjson=json||{};
	var cbdcol=cjson.bdcol||"",cembg=cjson.embg||"";
    if (btn) if (btn != '' && btn.indexOf('javascript') == -1) {
        btn = jQuery().ui({ "cid": "tempbtn",w:130,h:36, ca: btn,class0:'_f_18__200 cent _r_5__ff7878_1 x_c_rede',cxy:'1' });
    }
    if (clas == 0) {
		var msg='';
        if(galx==8)msg+='<div id="divalertop" style="position: fixed;z-index: 999;left: 50%;top:0px;margin-left: -270px; height: 68px; background-color: rgb(241, 91, 92);width: 540px;"><div style="border-radius: 50%; width: 100px; height: 90px; position: absolute; left: 220px; top: 2px; background-color: rgb(241, 91, 92);"></div><span onClick="jQuery(\'#guide'+clas+'\').hide()" style="position:absolute;left:20px;top:17px;background-image:url(/css8/p-btn.png?1);width:89px;height:30px;background-size:100%;'+(ifgb?'':'display:none;')+'"></span><span id="backht" onClick="backht()" style="position:absolute;right:15px;top:3px;width:60px;height:60px;cursor: pointer;display:none;" class="yaheif f27"><img src="/css8/61c-houtai.png" width="100%"/></span></div><div id="divalertopb" style="height:80px;width:0px;"></div>';
		 msg +=  res + (btn ? '<div style="clear:both;height:45px;width:' + (btn.split('mdown').length > 2 ? (btn.split('mdown').length > 3 ?324:284) : 145) + 'px">' + btn + '</div>' : '');
        jQuery().getdiv('guide' + clas, null, '#fff', -jQuery().getcw(), jQuery().getch(), 0, 0, 99997, msg, '', 0);

    } else {
        jQuery().jalert(res + (btn ? '<div style="clear:both;height:45px;width:' + (btn.split('mdown').length > 2 ? (btn.split('mdown').length > 3 ?324:284) : 145) + 'px">' + btn + '</div>' : ''), null, { clas: clas || 'ggk', ifgb: ifgb, ifms: '-2', bdcol:cbdcol, embg:cembg,ifclick:1}, (jQuery().getcw() - (clas=="blackclas"?471:461)) * 0.5, jQuery(document).scrollTop() + (topy || (res.length < 300 ? 290 : 180)));
    }
},
/**
 * @method inpstyle
 * @description 自定义input，textarea输入框样式
 * @param  {[json]} json  对样式的设置等json传参包含宽w，高h，背景图路径img，输入框默认提示tip，输入框id，父元素conid，字颜色col，表单类别type
 * @example 
 * <br>日期时间：j().inpstyle({type:"datetime-local",w:276,h:55,tip:j().getdatetime(db.gett(),null,1).replace(" ","T"),id:"movedate",col:"#fff",clas:"_r_1__9b2d86_2 fleft _f_22",img:"/css/opa.png"});<br>输入框：inpstyle({w:460,h:52,tip:jg_gettxt(4),id:"moven",img:jg_getpng(11),col:"#C28D0B"})<br>编辑框：inpstyle({type:"textarea",w:460,h:90,tip:jg_gettxt(7),id:"movecjj",col:"#fff"}) 
 */
inpstyle: function(json){
	var cjson = json || {};
	var sw = cjson.w || 100;
	var sh = cjson.h || 36;
	var simg = cjson.img || "";
	var stip = cjson.tip || "";
	var sid = cjson.id || "";
	var conid = cjson.conid || "";
	var col = cjson.col || "#000";
	var type = cjson.type || "text";
	var clas = cjson.clas || "";
	var clasinp = cjson.clasinp || "";
	var evnt = cjson.evnt || "if(j(this).val()==\'"+stip+"\'){j(this).val(\'\')}";
	var evnt1 = cjson.evnt1 || "";
	var evnt2 = cjson.evnt2 || "";
	var evnt3 = cjson.evnt3 || "";
	var cproperty = cjson.cproperty || "";
	var str = '<div class="'+clas+'" style="width:'+sw+'px;height:'+sh+'px;'+(simg!=""?"background-image:url("+simg+");":"")+'background-size: contain;"><'+(type=="textarea"?type:"input")+' id="'+sid+'" class="'+clasinp+'" type="'+type+'" '+cproperty+' onfocus="'+evnt+'" onchange="'+evnt1+'" onblur="'+evnt2+'" onkeyup="'+evnt3+'" style="width:'+(sw*.95)+'px;height:'+(sh*.9)+'px;font-size: 16px;font-weight: bold;'+((simg==""&&clas=="")?"":"background:transparent;border: none;-webkit-border: none;outline: none;")+'color:'+col+'" value="'+stip+'"'+(type=="textarea"?">"+stip+"</textarea>":" />")+'</div>';
	if(conid!=""){
		j("#"+conid).html(str);
	}else{
		return str;
	}
},

/**
 * @method jalert
 * @description 弹出系统对话框
 * @param  {[string]} msg  弹出内容，可以HMTL
 * @param  {[null]} ifzz null,此处无意义
 * @param  {[json]} json  对样式的设置等{clas: 'ggk',imgp:'g/2048/2048/', titl: '用户登录', ifms:'-2'}
 * @param  {[type]} xx 设置位置
 * @param  {[type]} yy 设置位置
 * @return {[type]}   [description]
 * @example 
 * <br>j().jalert('<div style="line-height:2;width:340px;">ssss</div>', null, {}, (j().getcw() - 480) * 0.5, j(document).scrollTop() - 60); 
 */
jalert:function(msg,ifzz,json,xx,yy){
	json=json||{};
	msg=msg.replace(/erxxror/gi,'出错了');
	var msgid=json.msgid||''; 
 
	var ifgb=json.ifgb||1;
	var ifms=json.ifms||1;
	var clas=json.clas||(galx==7?'mishu':'ggk');
	var titl=json.titl||'';
	var alerw=json.alerw||'433px';
	var alerh=json.alerh||'100%';
	var bdcol=json.bdcol||'#6B6B6B';
	var embg=json.embg||'url(/css/opa11.png)';
	var ifclick=json.ifclick||0;			//参数传入ifclick，用于强制改变弹出框关闭按钮事件为onclick
	var strgb="";
	var sfd=jQuery().cookie.get('bzxs'+msgid);
	if(sfd=='1')return;
	var x=xx||(jQuery().getsl()+(jQuery().getcw()-(clas=='mishu'?407:(clas=='blackclas'?470:461)))*0.5);
	if(xx==0) x=xx;
	var y=yy||(jQuery().getst()+(jQuery().getch()-173)*0.5);
	if(jQuery(this).length>0){
		jQuery().zhezao(jQuery(this).attr('id')); 
 	  	 	x=jQuery(this).mtx()+jQuery(this).width()-130;
	   		y=jQuery(this).mty()+jQuery(this).height()-130;
			if(y>420)y=jQuery(this).mty()-360;
			if(x>100)x=100;
 			 
	}
	if(ifzz)jQuery().zhezao('1'); 

	 if(ifgb==1){
		 ui.ui.all['msgb'].cfun="jQuery().stoppp();jQuery().cls('"+clas+"');";
		 if(json.gbfun)ui.ui.all['msgb'].cfun+=json.gbfun;
		 strgb='<div style="width:3px;'+((clas!="mishu")?"margin-top:-45px":"margin-top:-35px")+';overflow:visible">'+jQuery().ui({ca: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||x_btnclose"+clas,ccl: "",cfun: ui.ui.all['msgb'].cfun,checksj: "",cid: "msgb",class0: "x_noy",ftxt: 0,h: 54,w: 60,z: -2,cxy:(ifclick==1?"-2":"")})+'</div>';//jQuery().geta(ui.ui.all['msgb'])
	 }
	var did='msgdiv';
	if(clas!='mishu') did='msgdiv_'+clas;
	var fons=json.fons||'yaheif wei18';
	var titlcol=json.titlcol||'#fff';
	 if(clas=='ggk') fons='f22 cent';
	 if(clas=='ui3b') {
		 fons='f22 cent';
		 titlcol='#ff7878';
	 }
	 if(clas=='emp'){//08.21增加黑灰风格框
		 msg='<div id="'+did+'" style="width:'+alerw+';height:'+alerh+';background:'+embg+';border:4px solid '+bdcol+';-webkit-border:4px solid '+bdcol+';border-radius:10px;-webkit-border-radius:10px;color:'+titlcol+';padding:41px 10px 20px;position:relative;background-size: cover;">'+(ifgb==1?"<div class='cent' style='position:absolute;top:0px;right:8px;width:60px;height:50px;cursor: pointer;font-weight: bold;color:#FF5454;font-size: 35px;' "+(ifclick==1?"onclick":sclick)+"=j().cls('emp')>ㄨ</div>":"")+'<div style="font-size:20px;margin-top:-27px;" class="cent">'+titl+'</div><div id="msg_'+clas+'" style="min-width: 240px;" class="cent">'+msg+'</div></div>';
	 }else{
		msg='<div id='+did+' style="position:absolute; line-height:20%"><div class="cent yaheif _f_20" style="margin-bottom:-48px;z-indexof:1;position:relative;color:'+titlcol+'">'+titl+'</div><img src="'+imgp+clas+'top.png" style="top:1px;position:relative;"><table width="'+(navig.ie?'480px':'100%')+'" border="0" cellspacing="0" cellpadding="0"><tr><td width=4px style="background:url('+imgp+clas+'kl.png) 0%;"></td><td style="background:url('+imgp+clas+'.jpg) #f3e5c2;line-height: 140%;" ><div id=msg_'+clas+' style="min-width: 240px;" class="'+fons+' ">'+msg+'</div></td><td style="background:url('+imgp+clas+'kr.png) 100%;" width=4px valign=top>'+strgb+'</td></tr></table><img src="'+imgp+clas+'bot.png"></div>';
		/*msg='<div style="position:absolute;top:200px;"><div id=msgdiv style="position:absolute;"><div class='+clas+'t >&nbsp;'+strgb+'</div><div class="ry '+clas+'m" style="width:407px;background-size:462px 9px" ><div id=msg style="padding-left:25px;padding-right:25px" class="yaheif wei16 ">'+msg+'</div></div><div class='+clas+'b ></div></div></div>';
		*/
	 }
	var yjh=33;
	 if(ifms==1){
		  var fse='1';
		  var yj='<div id=yanjing style="background:url('+imgp+'kp/xs07.png);margin-top:80px;margin-left:97px;height:33px;width:53px;"></div>';
		  if(db.vs)if(db.vs.all[db.idus])if(db.vs.all[db.idus].sex==0){
			  fse='';yjh=25;
			  yj='<div id=yanjing style="background:url('+imgp+'kp/xs08.png);margin-top:37px;overflow:hidden;margin-left:85px;height:25px;width:48px;"></div>';
		  }
		  if(galx!=7)yj='';
		  msg='<div id=mishudiv  class="mishu'+fse+'" style="position:absolute;margin-left:105px;margin-top:-58px;" >'+yj+'</div><div style="position:absolute;top:230px;">'+msg+'</div>';
 }
 var z=99999;
	 //if(clas!='mishu'&&clas!='ggk'&&clas!='emp')z=99998;

	jQuery().getdiv('guide'+clas,null,'',407,0,x,y,z,msg,'',0);
	if(json.jobj)json.jobj.appendTo("#msg_"+clas);
	 
 	 
},
vali:function(lt){
	lt=lt||'left';
	var pw=jQuery(this).parent().width()*0.5;
 	if(lt=='top'){
	  pw=jQuery(this).parent().height()*0.5;
 	}
	var ixy=jQuery(this).position()[lt];
 	var marg=ui.ui.all[jQuery(this).attr('id')].marg;
	 
	if(ixy>pw&&ixy<2*pw) return -1;
	var jsobj= jQuery(this).children('[id^="'+jQuery(this).attr('id')+'"]');
	var jg=jsobj.length;
 	jsobj.each(function(i,n){
		 var dtemp=jQuery(this).position()[lt];
		 var sw=jQuery(this).outerWidth();
		 if(lt=='top'){
 			sw=jQuery(this).outerHeight();
		  }
		  if(Math.round(pw*2/sw)%2==0){
		 	if((dtemp+ixy<=pw+sw*0.5+marg)) jg= i;
		  }else{
		 	if((dtemp+ixy<=pw)) jg= i;
		  }
	 });
	 return jg;
	 
},


	stoppp:function(e){
           var evt = e|| window.event; if(evt) evt.stopPropagation ?evt.stopPropagation() : (evt.cancelBubble=true);
	},
	ccss:function(obj,cx,bg){ 
		var classno=obj.className,bg=bg||'';
		if(classno.indexOf('-noz')>-1){return;}
		if(classno.indexOf('x_')>-1){
			obj.className=obj.className.replace(/x_/gi,"z_");
			var jobjs=jQuery(obj).children();
			jobjs.each(function(){
						this.className=this.className.replace(/x_/gi,"z_");
			});
			obj.onmouseout=function(){
				if(this.className.indexOf('y_')==-1)this.className=this.className.replace(/z_/gi,"x_");
				jobjs.each(function(){
						if(this.className.indexOf('y_')==-1)this.className=this.className.replace(/z_/gi,"x_");
				});
			}
		}
	},
	/**
	 * @method jgrepa
	 * @description json数据的过滤，用于查询出来的数据进行过虑使用，返回的是过滤后的数组对象["id1","id2"]，条件是and
	 * @param  {Function} fn  第一个过滤字段
	 * @param  {[type]}   fv  第一个过滤值 
	 * @param  {[type]}   ret 需要过滤的JSON数据
	 * @param  {[type]}   fn2 第二个字段
	 * @param  {[type]}   fv2 第二个值 
	 * @param  {[type]}   fn3 第三个字段
	 * @param  {[type]}   fv3 第三个值 
	 * @param  {[type]}   fn4 第四个字段
	 * @param  {[type]}   fv4 第四个值 
	 * @return {array}    数组对象["id1","id2"],第一个是汇总数据              
	 *  
	 */
	jgrepa:function(fn,fv,ret,fn2,fv2,fn3,fv3,fn4,fv4){
		 //json josn过滤，返回字符串数组值
 		 return this.jgrep(fn,fv,ret,fn2,fv2,fn3,fv3,fn4,fv4).split(',');
	},
	topr:function(n){
		var rn=0;
		var retn=this[0];
		if(this[0].sx){
			if(this[0].sx[n]==0){
				retn= this[0]['d']||{};
			}else{
			retn= this[0][this[0].sx[n]];}
		}else{
		j.each(this[0],function(iii,nnn){
			if(rn==n){retn=nnn;}
			rn++
		});	
		}
		return retn;
	},
	jsortj:function ( sk, st) {//db.js的排序
        var arrJson = new Array();
		j.each(this[0], function (k, v) {
			arrJson.push(v);
			if(v['id']==undefined)v['id']=k;
		});
         
        function AscSort(n1, n2) {
            return  n1[sk] == n2[sk] ? 0 : (n1[sk] > n2[sk] ? 1 : -1);
        };
        function DescSort(n1, n2) {
            return  n1[sk] == n2[sk] ? 0 : (n1[sk] > n2[sk] ?-1: 1 );
        };
        if (st == 0) {
            arrJson= arrJson.sort(AscSort);
        } else {
            arrJson= arrJson.sort(DescSort);
        }
		 var sxArr=[];
		for(var i=0;i<arrJson.length;i++){
			sxArr.push(arrJson[i].id);
		}
		this[0].sx=sxArr;
    },
    jsort:function (sk, st) { //JSON数据过滤  sk根据排列的键,st:排序方式:0升 1降 fk:JSON数据的过滤字段 fv:过滤的值
 
        function AscSort(n1, n2) {
            return  n1[sk] == n2[sk] ? 0 : (n1[sk] > n2[sk] ? 1 : -1);
        };
        function DescSort(n1, n2) {
            return  n1[sk] == n2[sk] ? 0 : (n1[sk] > n2[sk] ? -1 : 1);
        };
        if (st == 0) {
            return  this.sort(AscSort);
        } else {
            return  this.sort(DescSort);
        }

    },
	jjoin:function(ja,jb){
		var retjson={};
		jQuery.each(ja,function(iii,nnn){
			retjson[iii]=nnn; 
		});
		j.each(jb,function(iii,nnn){
			retjson[iii]=nnn; 
		});
		retjson['sx']=ja.sx.concat(jb.sx);
		return retjson;
	},
	ifequ:function(njson,fn,fv){
		if(njson[fn]==fv){
			if(njson[fn]===""&&fv==0){
			  return 0;
			}else{
			  return 1;
			}
		}
		fv=(fv+'');
		if(fv.indexOf('>')==0||fv.indexOf('<')==0||fv.indexOf('!')==0){
			if(eval(njson[fn]+''+fv)){return 1;}else{return 0;}
		}
		if(fn==fv)return 1;
		return 0;
	},
	/**
	 * @method jgrep
     * @description json数据的过滤，用于查询出来的数据进行过虑使用，返回的是过滤后的JSON对象，条件是and
	 * @param  {Function} fn  第一个过滤字段
	 * @param  {[type]}   fv  第一个过滤值 
	 * @param  {[type]}   ret 需要过滤的JSON数据
	 * @param  {[type]}   fn2 第二个字段
	 * @param  {[type]}   fv2 第二个值 
	 * @param  {[type]}   fn3 第三个字段
	 * @param  {[type]}   fv3 第三个值 
	 * @param  {[type]}   fn4 第四个字段
	 * @param  {[type]}   fv4 第四个值 
	 * @param {json} 返回过滤后的JSON
	 */
	jgrep:function(fn,fv,ret,fn2,fv2,fn3,fv3,fn4,fv4){
		//json josn过滤 返回过滤后的json
		var str="";renumb=0;
		var retjson={};
		j.each(this[0],function(iii,nnn){
			var f2=1;
			var f3=1;
			var f4=1;
			if(fn2)if(jQuery().ifequ(nnn,fn2,fv2)==0)f2=0;
			if(fn3)if(jQuery().ifequ(nnn,fn3,fv3)==0)f3=0;
			if(fn4)if(jQuery().ifequ(nnn,fn4,fv4)==0)f4=0;
			if(jQuery().ifequ(nnn,fn,fv)&&f2&&f3&&f4){				
				 if(ret){
					 if(ret=='json0'){
						 retjson= nnn;
						 return false;
					 }else if(ret=='json'){
						 retjson[iii]=nnn;
						 if(retjson['sx']==null)retjson['sx']=[];
						 retjson['sx'].push(iii);
						 //str+=','+iii;
					 }else{
					 if(typeof(nnn[ret])=='number'){renumb=renumb+nnn[ret]}
					 str+=','+nnn[ret];
					 }
				 }else{
				 	str+=','+iii;
				 }
				 				 
			}
		 });
		 if(ret=='json'||ret=='json0'){
			 //if(str)retjson['sx']=str.substring(1).split(',');
			 return retjson;
		}
		 return renumb+str;
	},
	/**
	 * @method ifcheck
	 * @description 返回DIV按钮是否被选择，基本j().ui实现的
	 * @return {[int]} 0,1
	 */
	ifcheck:function(){
		//div按钮是否已选择
		if(this.attr('class').indexOf('y_')>-1)return 1;
		return 0;
	},
	 mdown:function(e,obj,ncheck){
		 jqueryex.ifmd=jQuery(obj).attr('id');
 		 setTimeout('jqueryex.ifmd=0',500); 
		var classno=obj.className;this.blur();
		ncheck=ncheck||(classno.indexOf('radio')>-1?1:99);
		if(ncheck==-1)return;
 				if(jQuery(obj).attr('menuqx')=='no'){ alert('您无权使用本功能！');return;}
				if(jQuery().mye(e).button==2){
					document.oncontextmenu=function(){return false;};
					if(obj.title=='')return; 
 				}
 					var cobjid=this.parent().children('[class*="y_"]').vale('id');	
				if(ncheck==1||ncheck==-2){
 					if(cobjid!='')jQuery('#'+cobjid).uncheckd();
					this.checkd();
 				}
				if(ncheck==-2){
					setTimeout(function(){
						var cobjid=jQuery(obj).parent().children('[class*="y_"]').vale('id');
						 jQuery('#'+cobjid).uncheckd();},500);
				}
				 if(ncheck>1){
					
					 if(obj.className.indexOf('y_')>-1){
						this.uncheckd();
					 }else{
						 if(cobjid.split(',').length>=ncheck){j().jalert('最多只能选择'+ncheck+'个！');return;} 
						this.checkd();
					 }
				}
 		 
	 
 },
    /**
	 * @method uncheckd
	 * @description 取消按钮的选择状态，基本j().ui实现的
	 * @return {[int]} 0,1
	 * @example
	 * j("#sss_0").uncheckd();
	 */
 uncheckd:function(){
	 //div按钮取消选择
	 if(this.attr('class'))this.attr('class',this.attr('class').replace(/y_/gi,"x_").replace(/z_/gi,"x_"));
	  this.find("[class*='_']").each(function(){
		  this.className=this.className.replace(/y_/gi,"x_").replace(/z_/gi,"x_");
	   });
 },
 /**
 * @method checkd
 * @description 选择按钮，基本j().ui实现的
 * @return {[int]} 0,1
 * @example
 * j("#sss_0").checkd();
 */
  checkd:function(){
	   //div按钮选择
	var oclass=this.attr('class');
	if(oclass){
		if(oclass.indexOf('_noy')>-1){
			this.attr('class',this.attr('class').replace(/x_/gi,"z_"));
			this.attr('class',this.attr('class').replace("x_noy","y_noy").replace("z_noy","y_noy"));
		   this.find("[class*='_']").each(function(){
				   this.className=this.className.replace("x_noy","y_noy").replace("z_noy","y_noy").replace(/x_/gi,"z_");
			});
		}else{
			  this.attr('class',this.attr('class').replace(/z_/gi,"y_").replace(/x_/gi,"y_"));
		   this.find("[class*='_']").each(function(){
				   this.className=this.className.replace(/z_/gi,"y_").replace(/x_/gi,"y_");
			});
		}
	}
 },

 week:function(s,bn,rn,cid){
	var dat0=dat=new Date(db.gett());  
	if(s){ dat=new Date(parseFloat(s)); }else{s=dat.getTime()}
	var bd=dat;
	if(bn){bd=new Date((parseFloat(s)+bn*7*24*3600*1000));
	}else{
		bd=new Date((parseFloat(s)-(dat.getDate()+7)*24*3600*1000));
	}
	
	var day=bd.getDay();
	var bs=0,es=0;
	var cajson={};
	var sf=-1;
	for(var r=1;r<rn;r++){
		
		for(var i=0;i<7; i++){
			var news=bd.getTime()-(day-i-7*r)*24*3600*1000;
			var cd=new Date(news);
			var strd=cd.getFullYear()+'-'+(cd.getMonth()+1)+'-'+cd.getDate();
			//if(jQuery('[i="'+strd+'"]').length==0){
				if(es==0)bs=news-24*3600*1000;
				es=news+24*3600*1000;
				strc="";
				if(cd.getFullYear()==dat.getFullYear()&&cd.getMonth()==dat.getMonth()){
					if(cd.getDate()==dat.getDate()){
						strc=(galx==9?"hd hdlk hdtbx":'hd hdlk yaheif');
					}else{
						strc=(galx==9?"hdtbx":'yaheif');
					}
					sf=0;
				}else{
				    if (sf == 0) sf = 1;
				    strc = 'hdtb';
				}
				var na0=cd.getDate();
				//if(na0==1)na0=(cd.getMonth()+1)+'月'+na0;
				cajson[strd]=[na0,'jQuery(this).dclk(\''+news+'\',\''+cid+'\','+rn+','+sf+')',strc];
			//}
		 
		}
	}
	if(es!=0)jQuery('#'+cid).attr('bs',bs).attr('es',es);
	 return cajson;
 },
 dclk:function(s,cid,rn,sf){
	ui.ui.all[cid].ca=jQuery('#').week(s,null,rn,cid);
	var dat=new Date(parseFloat(s));
	var sdat=dat.getFullYear()+'-'+(dat.getMonth()+1)+'-';
 	var firstd=jQuery('#'+cid).children()[0];
	var curm=parseInt(jQuery('#'+cid).attr('month'));
	if(curm!=dat.getMonth()+1){
		jQuery('#'+cid).children('.x_yellow,.z_yellow').removeClass('x_yellow').removeClass('z_yellow');
	}
	var mfd=0;
	if(sf!=-1)mfd=jQuery('[i="'+sdat+'1"]').offset().top-jQuery(firstd).offset().top-jQuery(firstd).height();
	if(sf==0){
		
		if(curm!=dat.getMonth()+1)jQuery('#'+cid).children('[i^="'+sdat+'"]').addClass('x_yellow');		
		jQuery("#"+cid).animate({'top':-mfd},400);
	}else{
		jQuery('#'+cid).children('[i^="'+sdat+'"]').addClass('x_yellow');
	}
	
	if(sf==-1){
		
		jQuery('#'+cid).prepend(jQuery('#'+cid).geta(ui.ui.all[cid]));
		jQuery("#"+cid).css({'top':-jQuery(firstd).offset().top});
		jQuery("#"+cid).animate({'top':0},400,function(){
			
		});
	}
 	if(sf==1){
		 
		 
		jQuery('#'+cid).append(jQuery('#'+cid).geta(ui.ui.all[cid]));
		jQuery("#"+cid).animate({'top':-mfd},400,function(){
			
		});
	}
	jQuery('#'+cid).attr('month',(dat.getMonth()+1));
	this.checkd();
 }, 
 /**
  * @method fix
  * @description div固定(position:fixed)
  * @param  {[json]} p [description]
  * @param  {[json]} p.r 右边距（窗口右边距，不写为靠左浮动）
  * @param  {[json]} p.l 左边距（距离父级对象的左边距） "r"和"l"只能有其中一个参数
  * @param  {[json]} p.t 上边距（默认贴着底边，0是贴着顶边）
  * @param  {[json]} p.f 1表示固定（不写或者0表示滚动）
  * @return {[type]}   [description]
  * @example
  * j("#vvv").fix({r:50,f:1})
  */
 fix:function(p){
		if(this.length!=1)return false;
		/*
		p=json参数说明	
	 
		r：右边距（窗口右边距，不写为靠左浮动）
		l：左边距（距离父级对象的左边距） "r"和"l"只能有其中一个参数
		t：上边距（默认贴着底边，0是贴着顶边）
		f：1表示固定（不写或者0表示滚动）
		*/
		 var d = document, dd = d.documentElement, db = d.body, w = window, o = jQuery(this).get(0), ie6 = /msie 6/i.test(navigator.userAgent), style, timer;
		 if (o) {
		  cssPub = ";position:fixed;"+(p.t!=undefined?'top:'+p.t+'px;':'bottom:0;');
		  if (p.r != undefined && p.l == undefined) {
 		   o.style.cssText += cssPub + ('right:'+p.r+'px;');
		   if(o.style.left!=null)o.style.left=null;
		  } else {
		   o.style.cssText += cssPub + ('left:'+p.l+'px;');
		  }
		   
		 }
		
	},
	showa:function(){
		jQuery(this).css('width','240px').show();
		if(document.getElementById('ltd3')==null)return;
		var wt=26;
		if(document.getElementById('ltd1').style.display!='none')wt+=240;
		if(document.getElementById('ltd2').style.display!='none')wt+=240;
		if(document.getElementById('ltd3').style.display!='none'){wt+=280;
			if(tk.cityxn>2)wt+=220;
		}
		
		jQuery('#rtable').css({'width':wt+'px'});
		jQuery('#rtable').fix({ r:0, t:49, f:1});	
		//jQuery(this).animate({width:'220px'},300).show();
	},
	hidea:function(){
		var wt=26;
		jQuery(this).css({width:'0px'}).hide();
		jQuery('#rtable').css({'width':wt+'px'});
		jQuery('#rtable').fix({ r:0, t:49, f:1});		
		 
	},
	/**
	 * @method vale
	 * @description 获得DOM对象的值
	 * @param  {[type]} attrn [description]
	 * @param  {[type]} c     [description]
	 * @param  {[type]} sep   [description]
	 * @return {[type]}       [description]
	 * @example
	 * j("#ddd").vale()
	 */
   vale:function(attrn,c,sep){ 
   
  	if(this.length==0)return '';
  	if(this.length>1){
		var se='';
		var  sen=0;
		this.each(function(){if(attrn){ 
								if(c){ sen+=parseFloat(jQuery(this).attr(attrn));}else{ 
								   if(jQuery(this).attr(attrn))se+=(sep||',')+(jQuery(this).attr(attrn));
								}
							 }else{  
							 	  se+=(sep||',')+jQuery(this).vale(); 
								if(c){ sen+=parseFloat(jQuery(this).vale()); }
							 } 
		  });
		if(c)return sen;
		return se.substring(1);
  	}else{
		var rets='';
		if(attrn){
			return this.attr(attrn);
		}else if(this.attr('contenteditable')){
			rets=this.html();
		}else if(this.val()||this.is('input')||this.is('textarea')){
			var d=this.val();
			if(this.attr('v')){d=this.attr('v');}
			rets=(d);
		}else{
			rets=this.html();
		}; 
		return jQuery.trim(rets)
	}
  }, 
  mtsetid:function(){
 	if(jQuery(this).attr('id')==''){
		var tid='mt'+(Math.random()*99999999+'').split('.')[0];
		jQuery(this).attr('id',tid);
 	}
	return jQuery(this).attr('id');
 },
 /**
  * @method mtx
  * @description 获得div的X坐标，相当于LEFT，精准度高
  * @return {[int]} 返回一个值
  * @example
  * j("#ddd").mtx();
  */
 mtx:function(){
	 return jQuery(this).offset().left;
 },
  /**
  * @method mty
  * @description 获得div的y坐标，相当于top，精准度高
  * @return {[int]} 返回一个值
  * @example
  * j("#ddd").mty();
  */
 mty:function(){
	 return jQuery(this).offset().top;
 },
  /**
  * @method mtxr
  * @description 获得div的xr坐标，相当于rigth，精准度高
  * @return {[int]} 返回一个值
  * @example
  * j("#ddd").mtxr();
  */
 mtxr:function(){
	 return jQuery(this).offset().left+jQuery(this).outerWidth();
 },
 /**
  * @method mtyb
  * @description 获得div的yb坐标，相当于bottom，精准度高
  * @return {[int]} 返回一个值
  * @example
  * j("#ddd").mtyb();
  */
 mtyb:function(){
	 return jQuery(this).offset().top+jQuery(this).outerHeight();
 },
 heightsum:function(){
	 var w=0;	  
	 jQuery(this).children().each(function(){				  				  
  		w+=jQuery(this).outerHeight();
	}); 
	return w;
 },
 widthsum:function(){
	 var w=0;	  
	 jQuery(this).children().each(function(){				  				  
  		w+=jQuery(this).outerWidth();
	}); 
	return w;
 },
 delev:function(strv,strd){
 	var s="";
	j.each(strv.split("，"),function(i,n){
						if(n!=strd) s+="，"+n;		
			 });
 	 if(s!='')s=s.substring(1);
	 return s;
},
/**
 * @method getv
 * @description 获得浏览器URL地址的参数值
 * @param  {[string]} name   参数名
 * @param  {[obj]} mrz    默认值 
 * @param  {[string]} source 地址源，默认当前URL
 * @return {[string]}        返回参数值
 * @example
 * var i=j().getv('idcm',-1);
 * if(i!=-1)alert('ddd')
 * 
 */
 getv:function(name,mrz,source) {
	 var shref=source||(window.location+"").replace(/;amp;/g,'&');
	if(shref.indexOf(name+'=')==-1&&jQuery('#jg-0').attr('uri')){
		shref=jQuery('#jg-0').attr('uri');
	}
 
	shref=shref.replace(/&amp;/gi,'&');
	if(shref.indexOf('#')>0){
		var shrefa=shref.split('#');
		if(shrefa[1].indexOf('=')==-1)shref=shrefa[0];
		if(shref.indexOf('#rd')>0)shref=shref.replace(/#rd/g,"&");
	}
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");  
	if (reg.test(shref)){ress=RegExp.$2;if(ress!=""&&ress!="null"&&ress!='undefined') mrz = RegExp.$2; }
	if(shref.indexOf('shouhushuijing')>-1&&name=='idc') mrz = '守护水晶_旋转' ;
	if(shref.indexOf('shouhushuijing')>-1&&name=='eg') mrz = 1;
	if(shref.indexOf('xiongmaopashu')>-1&&name=='idc') mrz = '熊猫爬树_图标';
	if(shref.indexOf('xiongmaopashu')>-1&&name=='eg') mrz = 1;
	
	if((mrz+'').indexOf('%')>-1) mrz = decodeURI(mrz);
	
	return mrz;  	 
},
getas:function(n,uictn){
	ui.ui.all[uictn].ca='';
	for (var i = 0; i < n; i++) {
		ui.ui.all[uictn].ca+=(i>0?'`||':'||');
	}
	return	jQuery().geta(ui.ui.all[uictn]);
},
getnum:function(n,marg1,marg2){
		var cmarg1=marg1||18;
		var cmarg2=marg2||-5;
        var cnum = n + "";
		var strt='';
         for (var i = 0; i < cnum.length; i++) {
            var nums = cnum.charAt(i);
            strt+=('<span class="num num' + nums + ' fleft" style="margin-left:'+(i>0?cmarg2:(cnum.length==2?0:cmarg1))+'px;"></span>');
        }
		return strt;
     
},
/**
 * @method getUrl
 * @description 添加或者替换URL参数，有修改无添加
 * @param  {[type]} refername 参数名
 * @param  {[type]} v         值
 * @param  {[type]} source    源地址
 * @return {[type]}           修改后的URL地址
 * @example
 * var shlink=j().getUrl('tidus',db.idus,lurl);
 */
getUrl:function(refername,v,source) {
	var shref=window.location+'';
	//if($('divmain'))if(jQuery('#divmain').attr('surl')!='')shref=jQuery('#divmain').attr('surl');
	if(source) shref=source;
 	if(refername.indexOf("||")>0){
			refernamea=refername.split("||");
			shref=refernamea[0];
			refername=refernamea[1];
	}
 	 myArray = refername.split(",");
 	 vArray = (v+'').split(",");
	 if(myArray.length==1){vArray[0]=v}
	jQuery.each(myArray,function(i,n){
		var bc = shref.indexOf(n+"=");
        if (bc > 0){
            band =shref.indexOf("&", bc) ;
            shref = shref.substring(0, bc) + n + "=" + vArray[i] + (band>0?shref.substring(band, shref.length):"");
         }else{
			 var jh='';
			if(shref.indexOf('#')>-1){var shrefa=shref.split('#'); shref=shrefa[0]; jh='#'+shrefa[1];} 
            shref += (shref.indexOf("?") > -1?"&":"?") + n + "=" + vArray[i]+jh;
         }			 
							 
	  });     
    return shref;
},
/**
 * @method getcw
 * @description 获得当前浏览器的宽度
 * @return {[type]} [description]
 * @example
 * var cw=j().getcw()
 */
getcw:function(){
	var rv=document.documentElement.clientWidth;
	//if(jQuery("canvas").length>0)rv=Math.max(jQuery("canvas").width(),rv); 
	return rv;
	
	
},
/**
 * @method getcwd
 * @description 获得当前的宽度,适应PC及手机
 * @return {[type]} [description]
 * @example
 * var str='<div style="width:'+j().getcwd+'px;><canvas id="gameCanvas" width="480" height="'+j().getch()+'"></canvas></div>';
 */
getcwd:function(){
  var rv=Math.min(540,j().getcw());	
  /*if(j().isMobile()){
	  rv=j().getcw();  
  }*/
  return rv;
},
/**
 * @method getSM
 * @description 返回各种引擎的缩放模式
 * @param {[number]} [typ] 1 cocos 2 egret
 * @return {[type]} [description]
 * @example
 * //egret
 * context.stage.scaleMode=j().getSM(2)
 * //cocos
 * cc.view.setDesignResolutionSize(540, 900, j().getSM(1));
 */
getSM:function(typ){
  var w=j().getcwd();	
   if(j().isMobile()||w<540){
      if(typ==1){
      	return cc.ResolutionPolicy.FIXED_HEIGHT;
      }else if(typ==2){
      	return egret.StageScaleMode.SHOW_ALL;
      } 
   }else{
      if(typ==1){
      	 return cc.ResolutionPolicy.FIXED_HEIGHT;
      }else if(typ==2){
      	 return egret.StageScaleMode.SHOW_ALL;
      }  
   }
},


/**
 * @method getch
 * @description 获得当前浏览器的高度
 * @return {[type]} [description]
 * @example
 * var cw=j().getch()
 */
getch:function(){return document.documentElement.clientHeight;},
getsl:function(){return jQuery(document).scrollLeft();},
getst:function(){return jQuery(document).scrollTop();},
strzm:'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
eachs:function(func){
	var id=jQuery(this).attr('id');
	if(func!=undefined)jQuery(this).children('[id^="'+id+'_"]').each(func);
	return jQuery(this).children('[id^="'+id+'_"]');
},
son:function(){
	var id=jQuery(this).attr('id');
	return jQuery(this).children('[id^="'+id+'_"]');
},

sson:function(){
	var id=jQuery(this).attr('id');
	return jQuery(this).children('[id^="s_'+id+'_"]');
},
son0:function(){
	var id=jQuery(this).attr('id');
	return jQuery(this).son().children('[id^="'+id+'_"][id$="_0"]');
},
son1:function(){
	var id=jQuery(this).attr('id');
	return jQuery(this).son().children('[id^="'+id+'_"][id$="_1"]');
},
son2:function(){
	var id=jQuery(this).attr('id');
	return jQuery(this).son().children('[id^="'+id+'_"][id$="_2"]');
},
chdate:function(sdate){
	 
	var newsdate=sdate.replace(/-0/gi,'-');
	 
	var da1=newsdate.split(/[-\s:]/);
		
		 if(da1.length>3){//alert(sdate+da1[3])
			 if(da1.length>5){
				 
				return new Date(da1[0],parseInt(da1[1])-1,da1[2],da1[3],da1[4],da1[5]); 
			 }else{
			 	return new Date(da1[0],parseInt(da1[1])-1,da1[2],da1[3],da1[4],"00"); 
			 }
		 }else{
			 return new Date(da1[0],parseInt(da1[1])-1,da1[2],"00","00","00"); 
		 }
		
},
datedel:function(sdate,s){
	
    var dat= new Date(Date.parse(jQuery().chdate(sdate))-s*1000);
   	return dat.getFullYear()+'-'+(dat.getMonth()+1)+'-'+ dat.getDate();
},
/**
 * 获得剩余时长
 * @param  {[int]} sec  剩余时间多少秒
 * @param  {[int]} op   默认是0，或者不传；大于0返回xx时xx分xx秒
 * @return {[string]}   返回换算后的时间
 */
getshenyu:function(sec, op){
	var sec = Math.floor(sec);
	var op  = op||0;
	if(op==0){
		if(sec>60&&sec<3600)return Math.floor(sec/60)+'分'+(sec%60)+'秒';
		if(sec>3600&&sec<3600*24)return Math.floor(sec/3600)+'小时'+Math.floor((sec%3600)/60)+'分';
		if(sec>3600*24)return Math.floor(sec/(24*3600))+'天'+Math.floor((sec%(24*3600))/3600)+'小时';
		return sec+'秒';
	}
	if(op>0){
		return Math.floor((sec)/3600)+'小时'+Math.floor((sec%3600)/60)+'分'+Math.floor(sec%60)+'秒';
	}
},
setRightBar:function(condiv, json){
	var barJson = {1:{code:"0",url:"http:\/\/shang.qq.com/wpa/qunwpa?idkey=907dbc3457cd88c4555c8d1aa9197a1819f78bc2a4b8221a39a7f23e8b023b76",pic1:"/css/kx01.jpg",pic2:"/css/kxx01.jpg",func:"",id:"sidebar1"},2:{code:"1",url:"",pic1:"/css/kx02.jpg",pic2:"/css/kxx02.jpg",func:"",id:"sidebar2"},3:{code:"0",url:"http:\/\/tieba.baidu.com/f?kw=%E5%BC%80%E5%BF%83%E6%8E%A8&qq-pf-to=pcqq.c2c",pic1:"/css/kx03.jpg",pic2:"/css/kxx03.jpg",func:"",id:"sidebar3"},4:{code:"0",url:"",pic1:"/css/kx04.jpg",pic2:"/css/kxx04.jpg",func:"j('html,body').animate({scrollTop:0},600);",id:"sidebar4"}};
	if(typeof(json)!="undefined"){
		barJson = json;
	}
	var barStr = "<ul style='margin:0;padding:0;'>";
	j.each(barJson,function(k, n){
		if(n.code=="1"){
			barStr += '<li class="sideBarli"><a style="height: 49px;float: right;display: block;min-width: 47px;max-width: 131px;" target="_blank" class="weixin" '+(n.url.length>0?'href="'+n.url+'"':'')+' '+(typeof(n.func)!="undefined"?('onclick='+n.func):'')+'><img id="'+n.id+'_1" width="47" height="49" class="b" style="float:right;"><img id="'+n.id+'_2" width="145" height="240" class="h" style="float: right; display: none;"></a></li>';
		}else{
			barStr += '<li class="sideBarli"><a style="height: 49px;float: right;display: block;min-width: 47px;max-width: 131px;" target="_blank" '+(n.url.length>0?'href="'+n.url+'"':'')+' '+(typeof(n.func)!="undefined"?('onclick='+n.func):'')+'><img id="'+n.id+'_1" width="131" height="49" class="h" style="margin-right: -143px; float: right; display: none;"><img id="'+n.id+'_2" width="47" height="49" class="b" style="float: right; display: block;"></a></li>';
		}
	});
	barStr += "</ul>";
	j("#"+condiv).html(barStr);
	j("#"+condiv+" a").hover(function(){

        if(j(this).prop("className")=="weixin"){
            j(this).children("img.h").show();
        }else{
            j(this).children("img.h").show();
            j(this).children("img.b").hide();
            j(this).children("img.h").animate({marginRight:'0px'},'slow'); 
        }
    },function(){ 
        if(j(this).prop("className")=="weixin"){
            j(this).children("img.h").hide('slow');
        }else{
            j(this).children("img.h").animate({marginRight:'-143px'},'slow',function(){j(this).hide();j(this).next("img.b").show();});
        }
    });
},
setRightService:function(){
	var curtime=db.gett();
	var today=curtime-(curtime%86400000);
	var is911=((today+36000000)<curtime&&(today+54000000)>curtime)?1:0;
	
	var serviceStr = '<div id="serviceBox" class="service-box" style="font-size: 14px; width: 180px;position: fixed;top: 50%;margin-top: -270px; right: -180px;z-index: 214748364643;transition:right 1s;-webkit-transition: right 1s; text-align: center;background: #fff;box-shadow: inset 0px 0px 4px #999;box-sizing: border-box;padding:20px 20px;">'+
					'<div id="btnService" class="btn-consult" style="cursor: pointer; width: 40px;height: 120px;background: #fff;box-sizing: border-box;box-shadow: inset 0px 0px 2px #999 ;color: #f39800;position: absolute;left: -40px;top:0;">'+
						'<p style="font-size:14px;line-height:20px; text-align: center;width: 20px;margin: 6px 0 0 10px;">在线咨询</p>'+
						'<i class="arrow-left" style="position: absolute;left: 15px;bottom: 10px;width:0; height:0; border-top:8px solid transparent;border-bottom:8px solid transparent; border-right:8px solid #f39800;"></i>'+
					'</div>'+
					'<div id="btnService2" class="btn-consult" style="cursor: pointer; width: 40px;height: 120px;background: #fff;box-sizing: border-box;box-shadow: inset 0px 0px 2px #999 ;color: #f39800;position: absolute;left: -40px;top:130px;">'+
						'<p style="font-size:14px;line-height:19px; text-align: center;width: 20px;margin: 2px 0 0 10px;">付费定制服务</p>'+
					'</div>'+
					'<div id="detail1" class="h1"><img src="/g/www/img/ico-dh.png"><br>'+
					'<p style="font-size:14px;background: #fff;color: #f39800;line-height: 30px;height: 30px;margin: 3px 0;">&nbsp;18818804183&nbsp;<br>微信同此号</p><br>'+
					'<p style="font-size:14px;color: #f39800;">09:00~23:00</p><br>'+
				 
					'<p style="font-size:14px;background: #fff;color: #f39800;line-height: 30px;height: 30px;margin: 3px 0;">QQ：1452668373</p>'+        	        	
				 	'<p style="font-size:14px;background: #fff;color: #f39800;line-height: 30px;height: 30px;margin: 3px 0;">QQ：568427768</p>'+			
					'<br>'+  					 
					'<a style="font-size:14px;display: inline-block;width: 100%;height: 30px;line-height: 30px;background: #f39800;color: #fff;margin-top: 10px;" class="btn-service" target="_blank" href="http:\/\/jingyan.baidu.com\/article\/63f2362820e7120208ab3de7.html?qq-pf-to=pcqq.c2c">制作教程</a>'+
					 
					'<div class="serviceCode"></div></div>'+
					'<div id="detail2"  class="h1"><img src="/g/www/img/ico-dh.png"><br>'+
					'<p style="font-size:14px;background: #fff;color: #f39800;line-height: 30px;height: 30px;margin: 3px 0;">&nbsp;18818804183&nbsp;<br>微信同此号</p><br>'+
					'<p style="margin-top: 10px;"><img src="/g/www/img/ico-qq.png"></p>'+
					'<p style="font-size:14px;background: #fff;color: #f39800;line-height: 30px;margin: 3px 0;">QQ：1452668373<br>QQ：568427768<br>QQ：2778940123<br></p>'+  
					'</div>'+
				'</div>';
	j("body").append(serviceStr);
    j("#btnService").click(function(){
    	if(j("#serviceBox").css("right")=="0px" && j("#detail1").css("display")!="none"){
    		j("#serviceBox").css("right","-180px");
    	}else{
    		j("#serviceBox").css("right","0px");
    		j("#detail1").show();
    		j("#detail2").hide();
    	}
    });
    j("#btnService2").click(function(){
    	if(j("#serviceBox").css("right")=="0px" && j("#detail2").css("display")!="none"){
    		j("#serviceBox").css("right","-180px");
    	}else{
    		j("#serviceBox").css("right","0px");
    		j("#detail2").show();
    		j("#detail1").hide();
    	}
    });
},
/**
 * @method gettimestamp
 * @description 获得时间戳
 * @param  {[string]} dt 日期时间，默认当前时间xxxx-xx-xx 00:00:00或xxxx-xx-xxT00:00:00
 * @return {[int]}  返回当时间戳
 */
 gettimestamp:function(dt){
 	var dt = dt || j().getdatetime();
 	if(dt.indexOf("T", "")>-1)
 		dt = dt.replace("T", " ");
 	return new Date(dt).getTime();
 },
/**
 * @method getdatetime
 * @description 获得时间字符串
 * @param  {[int]} s   时间参数13位数据,默认当前时间
 * @param  {[int]} msf 是否需要返回秒
 * @param  {[int]} ifz 是否自动补零
 * @return {[type]}     [description]
 * @example
 * j().getdatetime(db.gett())
 */
getdatetime:function(s,msf,ifz){
	//时间 获得当前日期，字符串
	var dta=new Date();
	
	if(s){
		if((s+'').length<9)s=dta.getTime()+s*1000;
		s=parseInt(s);
		dta=new Date(s);
	}
	var sss='';
	if(msf)sss=':'+dta.getSeconds();
	if(ifz){
		return dta.getFullYear()+'-'+(dta.getMonth()+1)+'-'+ dta.getDate()+' '+dta.getHours()+':'+dta.getMinutes()+sss;  
	}
		var month = dta.getMonth() + 1 < 10 ? "0" + (dta.getMonth() + 1) : dta.getMonth() + 1;
        var currentDate = dta.getDate() < 10 ? "0" + dta.getDate() : dta.getDate();
		var currentHours = dta.getHours() < 10 ? "0" + dta.getHours() : dta.getHours();
		var currentMinutes = dta.getMinutes() < 10 ? "0" + dta.getMinutes() : dta.getMinutes();
		if(msf)sss = ':'+(dta.getSeconds() < 10 ? "0" + dta.getSeconds() : dta.getSeconds());
        return dta.getFullYear() + "-" + month + "-" + currentDate+' '+currentHours+':'+currentMinutes+sss;
	
},
/**
 * @method getDayOfWeek
 * @description 返回第几天
 * @param  {[int]} dt 13位时间，默认当前时间
 * @return {[int]}  返回当前第几天,周日为0，周一为1
 */
getDayOfWeek:function(dt){
    var dt=dt||db.gett(); 
    return new Date(dt).getDay(); 
},
/**
 * @method getWeekStartDate
 * @description 获得本周开始时间
 * @param  {[int]} dt    13位时间，默认当前时间 
 * @return {[int]}      返回13位日期，如果需要字符串类型，可以用j().getdatetime(dt)再次获取，在使用SQL时，应该注意日期要大于等于返回值
 */
getWeekStartDate:function(dt){
   var dt=dt||db.gett(); 
   var dta=new Date(dt);
    if(dta.getDay()==0){
	  return new Date(dta.getFullYear(), dta.getMonth(), (dta.getDate()-7-dta.getDay())).getTime()+24*60*60*1000; 
   }else{
      return new Date(dta.getFullYear(), dta.getMonth(), (dta.getDate() - dta.getDay())).getTime()+24*60*60*1000;   
   }
},
/**
 * @method getMonthStartDate
 * @description 获得本月开始时间
 * @param  {[int]} dt    13位时间，默认当前时间 
 * @return {[int]}      返回13位日期，如果需要字符串类型，可以用j().getdatetime(dt)再次获取，在使用SQL时，应该注意日期要大于等于返回值
 */
getMonthStartDate:function(dt){
   var dt=dt||db.gett(); 
   var dta=new Date(dt);
   return new Date(dta.getFullYear(), dta.getMonth(),1).getTime();   
},
/**
 * @method getMonthEndDate
 * @description 获得本月结束时间
 * @param  {[int]} dt    13位时间，默认当前时间 
 * @return {[int]}      返回13位日期，如果需要字符串类型，可以用j().getdatetime(dt)再次获取，在使用SQL时，应该注意日期要大于等于返回值
 */
getMonthEndDate:function(dt){
   var dt=dt||db.gett(); 
   var dta=new Date(dt);
   return new Date(dta.getFullYear(), dta.getMonth()+1,1).getTime()-24*60*60*1000;   
},
/**
 * @method getWeekEndDate
 * @description 获得本周结束时间
 * @param  {[int]} dt    13位时间，默认当前时间 
 * @return {[int]}      返回13位日期，如果需要字符串类型，可以用j().getdatetime(dt)再次获取，在使用SQL时，应该注意日期要小于返回值
 */
getWeekEndDate:function(dt){
   var dt=dt||db.gett(); 
   var dta=new Date(dt);
   if(dta.getDay()==0){
	  return new Date(dta.getFullYear(), dta.getMonth(), (dta.getDate()-dta.getDay())).getTime()+24*60*60*1000; 
   }else{
      return new Date(dta.getFullYear(), dta.getMonth(), (dta.getDate()+7-dta.getDay())).getTime()+24*60*60*1000;   
   }
},
/**
 * @method getdatetimeago
 * @description 过去了多少时间(N个月前)
 * @param  {[int]} ts   时间参数13位数据,默认当前时间
 * @param  {[int]} isdayd 是否返回为多少岁
 * @return {[type]}     [description]
 * @example
 * j().getdatetimeago(db.gett()-24*3600000)
 */
getdatetimeago:function(ts,isdayd){
 //时间  获得过去多少时间
 var nts = db.gett();
 var dfts=nts-ts;
 if(dfts<0)return "";
 var ye=dfts/(86400000*30*12);
 var mc=dfts/(86400000*30);
 var wc=dfts/(86400000*7);
 var dc=dfts/86400000;
 var hc=dfts/3600000;
 var mic=dfts/60000;
 var result="";
 if(isdayd){
	 if(ye>=3){
        result=parseInt(ye) + "周岁";
		var v=dfts%(86400000*30*12)/(86400000*30);
		if(v>1){
	      result+=parseInt(v) + "个月";
		} 
     }else if(mc>1){
		result=parseInt(mc) + "个月";
		var v=dfts%(86400000*30)/(86400000);
		if(v>10){
			 result+=parseInt(v) + "天";
		}else{
		   result+="零"+parseInt(v) + "天";	
		}
		 
	 }
	 else{
	    if(dc>=1){
			result="出生"+parseInt(dc) + "天";
		}else{
			result="0天";
		}
	 
	 }
	 
 }else{
 if(mc>=1){
    result=parseInt(mc) + "个月前";
 }
 else if(wc>=1){
   result= parseInt(wc) + "周前";
 }
 else if(dc>=1){
   result=parseInt(dc) +"天前";
 }
 else if(hc>=1){
   result=parseInt(hc) +"小时前";
 }
 else if(mic>=1){
    result=parseInt(mic) +"分钟前";
 }else{
    result="刚刚";
  }
 }
 return result;
	
},
mye:function(e){return e ? e: (window.event ? window.event : null);},
e$:function(e){return mye(e).srcElement ? mye(e).srcElement : mye(e).target;},
getex:function(e){return mye(e).clientX+getsl();},
getey:function(e){return mye(e).clientY+getst();},
getiframe:function(id,src,h){
	//生成一个ifram
	h=h||'648px';
	//alert(src);
	return '<iframe id='+id+' name='+id+'  src="'+src+'" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" style="width:100%; height:'+h+'" ></iframe>';
},

getdiv:function(divid,p,bg,w,h,xx,yy,z,innerh,classn,pad){
	var newdiv;
	if(document.getElementById(divid)){ 
		newdiv=document.getElementById(divid);
 	}else{
	 	newdiv= document.createElement("div");
		newdiv.id=divid;
		if(p==null)document.body.appendChild(newdiv);
	}
  	if(p!=null){if(newdiv.parentNode!=p)p.appendChild(newdiv);}
 	var ns= (newdiv.style); 
		if(w==0&&h==0){
			ns.overflow='visible';
 		}else{
			if(w<0){w=-w;ns.overflow='hidden';}
			if(w>0)ns.width=w+'px';
			if(h>0)ns.height=h+'px';
 		}
 		 ns.position='absolute';
		if(xx!=-1)ns.left=xx+'px';
		if(yy!=-1)ns.top=yy+'px';
		if(ns.zIndex!=z)ns.zIndex=z;
 		if(pad>0)ns.paddingTop=ns.paddingLeft=pad+'px';
		if(newdiv.innerHTML!=innerh&&innerh!='keep')newdiv.innerHTML=innerh;
		if(ns.display=='none')ns.display='block';
		if(classn)newdiv.className=classn;
 		bg=bg+'';
		 
		if(bg!=""){
			if(bg.substring(0,1)=="#"){
				ns.background=bg;
			}else{
				if(bg.substring(0,1)!='_'&&bg.substring(0,1)!='-'){
					ns.backgroundImage='url('+imgp+bg+')';
				}else{
					ns.backgroundImage='url('+imgp+'_'+bg.substring(1)+'.gif)';
					newdiv.onmouseover=function(){
						if(ns.backgroundImage.indexOf('-')==-1)ns.backgroundImage='url('+imgp+bg.substring(1)+'.png)';	
						this.onmouseout=function(){
							if(ns.backgroundImage.indexOf('-')==-1)ns.backgroundImage='url('+imgp+'_'+bg.substring(1)+'.png)';
						};
						if(bg.substring(0,1)=='-'){
							this.onmouseup=function(){
								ns.backgroundImage='url('+imgp+(ns.backgroundImage.indexOf('-')>0?'_':'-')+bg.substring(1)+'.png)';	
							}
						}
					}
				}
				
			}
		}
	 
 	 return newdiv;
 },
 zhezao:function(objid){
	 //生成遮罩层
	 var w=Math.max(jQuery().getcw(),jQuery(document).width())-3;
	 var h=Math.max(jQuery().getch(),jQuery(document).height());
	 var jobj=jQuery('#'+objid);
	 if(jobj.length>0){
		var skw=jobj.outerWidth();skh=jobj.outerHeight();skx=jobj.mtx();sky=jobj.mty();
		if(skx<0||sky<0)return;
		if(skx==0)skx=1;
    	jQuery().getdiv('divzhezao',null,'',w,sky,0,0,99990,'','opa11',0);
		jQuery().getdiv('divzhezao1',null,'',Math.max(1,w-skx-skw),skh,skx+skw,sky,99990,'','opa11',0);
		jQuery().getdiv('divzhezao2',null,'',w,Math.max(1,h-sky-skh),0,sky+skh,99990,'','opa11',0);
		jQuery().getdiv('divzhezao3',null,'',skx,skh,0,sky,99990,'','opa11',0);
		jQuery().getdiv('skdiv0',null,'#f00',skw,3,skx,sky,99990,'','opa11',0);
 		jQuery().getdiv('skdiv2',null,'#f00',skw,3,skx,sky+skh-3,99990,'','opa11',0);
		jQuery('#divzhezao1').css('border-left','#f00 2px solid');
		jQuery('#divzhezao3').css('border-right','#f00 2px solid');
	 }else{
		 if(objid=='1')
	 	 jQuery().getdiv('divzhezao',null,'',w,h,0,0,99995,'','opa11',0,'');

	 }
 
	},
	anima:function (cid,x){
			jQuery('#'+cid).css('display','block').addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			  jQuery(this).removeClass(x + ' animated');
			});
	},
	 
	/**
	 * @method unselect
	 * @description 禁止DIV或者页面不能选择
	 * @param  {[string]} tg div的ID如果不传表示禁止整个document选择
	 * @return {[type]}    [description]
	 * @example
	 * j().unselect();
	 */
	unselect:function(tg){
		//禁卡页面选择事件
		if(tg){
		   jQuery("#"+tg).bind("contextmenu",function(){return false;});
		   jQuery("#"+tg).bind("selectstart",function(){return false;});
		}else{
		   jQuery(document).bind("contextmenu",function(){return false;});
		   jQuery(document).bind("selectstart",function(){return false;});
		}
	},
	iftouch:function(){
		var bool = "orientation" in window || "orientation" in window.screen || "mozOrientation" in window.screen || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || "ontouchstart" in document.documentElement;
		if (bool) {
			bool = bool && this.isMobile();
		}
		return bool || window.location.search.indexOf("touch") >= 0;
	},
	resizeWinow:{
		resizer:null,
		init:function(gjson){
			//调用时，先初始化再进行bind操作
			var gjson={
				el:gjson.el||"viewport2",
				delay:gjson.delay||50,
				bw:gjson.bw||480,//原设计宽度
				bh:gjson.bh||800,//原设计高度
			}; 
			this.resizer=new Resizer({
				element:document.getElementById(gjson.el),
				delay: gjson.delay,
				baseWidth: gjson.bw,
				baseHeight: gjson.bh,
				onResize: function() {
					window.scrollTo(0, 1);
				}
			});	 
		},
		bind:function(el,evt){
			var el=document.getElementById(el)||window;
			var evt=evt||"resize orientationchange";
			var splits = evt.split(" ");
            for (var i in splits) {
                el.addEventListener(split[i], jQuery().resizeWinow.getDimensionsAndResize, false)
            }
			
		},
		getDimensionsAndResize:function(){
			 var w = window.innerWidth;
			 var h = window.innerHeight;
			 if (jQuery().iftouch()) {
				w *= .85;
				h *= .85
			 }
			 this.resizer.needsResize(w, h)
		}
		
	}, 
	/*DOM操作*/
	
	/*操作系统判断*/
	_agent:navigator.userAgent.toLowerCase(),
	isTizen:function(){
	   return this._agent.indexOf("tizen") >= 0;
	},
	/**
	 * @method isWindowsMobile
	 * @description 返回是否为WindowsMobile浏览器
	 * @return {Boolean} [description]
	 * @example
	 * j().isWindowsMobile();
	 */
	isWindowsMobile: function() {
		return this._agent.indexOf("windows") >= 0 && this._agent.indexOf("mobile") >= 0 || this._agent.indexOf("iemobile") >= 0;
	},
	/**
	 * @method isIOS
	 * @description 返回是否为ISO浏览器
	 * @return {Boolean} [description]
	 * @example
	 * j().isIOS();
	 */
	isIOS:function() {
		return this._agent.indexOf("ios") >= 0 || this._agent.indexOf("ipod") >= 0 || this._agent.indexOf("ipad") >= 0 || this._agent.indexOf("iphone") >= 0;
	}, 
	isIPAD:function(){
		return this._agent.indexOf("ipad") >= 0;
	},
	/**
	 * @method isFirefoxOS
	 * @description 返回是否为FirefoxOS浏览器
	 * @return {Boolean} [description]
	 * @example
	 * j().isFirefoxOS();
	 */
	isFirefoxOS:function() {
		return !this.isAndroid() && this._agent.indexOf("firefox") >= 0 && this._agent.indexOf("mobile") >= 0;
	},
	/**
	 * @method isAndroid
	 * @description 返回是否为isAndroid浏览器
	 * @return {Boolean} [description]
	 * @example
	 * j().isAndroid();
	 */
	isAndroid: function() {
		return this._agent.indexOf("android") >= 0;
	},
	/**
	 * @method isMobile
	 * @description 返回是否为Mobile浏览器
	 * @return {Boolean} [description]
	 * @example
	 * j().isMobile();
	 */
	isMobile: function() {
		return this.isAndroid() || this.isFirefoxOS() || this.isWindowsMobile() || this.isIOS();
	},
	isWeixin:function(){
	   return (this._agent.match(/MicroMessenger/i)=="micromessenger"?true:false);
	},
	/**
	 * @method isCardNo
	 * @description 返回是否为身份证号
	 * @return {Boolean} [description]
	 * @example
	 * j().isCardNo();
	 */
	isCardNo: function(code) {
		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
	   //var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
	   //if(reg.test(card) === false){   
		   //return  0;  
	   //} else{
		   //return  1;
	   //}
	    var city=[11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91];
	    var tip = "";
	    var pass= true;
	    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
	        pass = false;
	    }
	    else if(!city.indexOf(code.substr(0,2))){
	        pass = false;
	    }
	    else{
	        if(code.length == 18){
	            code = code.split('');
	            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
	            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
	            var sum = 0;
	            var ai = 0;
	            var wi = 0;
	            for (var i = 0; i < 17; i++)
	            {
	                ai = code[i];
	                wi = factor[i];
	                sum += ai * wi;
	            }
	            var last = parity[sum % 11];
	            if(parity[sum % 11] != code[17]){
	                pass =false;
	            }
	        }
	    }
	    return pass;
	},
	//判断text参数是否是手机格式
	//返回值为0，则不是手机格式
	//返回值为1，则是移动手机号码
	//返回值为2，则是联通手机号码
	//返回值为3，则是电信手机号码
	IsMobileNum: function(text){
		var _emp=/^\s*|\s*$/g;
		var text=text||"";
		text=text.replace(_emp,"");
		var _d=/^1(3[3])|(8[019])\d{8}$/;
		var _l=/^1(3[0-2]|5[56]|8[56]|4[5]|7[6]|6[6])\d{8}$/;
		var _y=/^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/;
		if(_d.test(text)){
			return 3;
		}else if(_l.test(text)){
		    return 2;
		}else if(_y.test(text)){
		    return 1;
		}
		if(text.length==11){
		   //加入判断 
		   if(text.indexOf("153")==0||text.indexOf("177")==0)return 3;
		}
		return 0;
	},
	/**
	 * @method isCardNo
	 * @description 检测手机号码等的归属地及运营商类别
	 * @param  json  
	 * @param  json.ctel 电话号码
	 * @param  json.func 回调
	 * @param  json.op 0无须进行匹配检测，1根据内容进行判断
	 * @param  json.lx 0,不判断结果，1检测是否为移动，2检测联通，3检测是否为电信号码，默认0
	 * @param  json.cma 需匹配的区域名，默认为空，不检测，"广东" "北京" "广东市"，省（直辖市）为两个字，如果是省下级市，直接输入三个字，“广州市” 
	 * @return json 返回数据，{result:1,lx:0,data:{}}  返回数据，result:表示检测结果（符合条件或者不符合,-1表示没有数据返回），lx:0未知，1移动，2联通，3电信，data:表示从数据库中获得的数据
	 * @example
	 * j().isCardNo();
	 */
    IsMobileNumSer:function(jsons){
    	var ctel=jsons.ctel||"";
    	var iflx=jsons.lx||0;
    	var cma=jsons.cma||"";
    	if(ctel.length<7){
    		alert("手机号码不正确");
    		return;
    	}
    	var querCtel=ctel.substring(0,7);
    	db.sajax("mobiles|mobilessp","all|all","cmb='"+querCtel+"'|mb="+querCtel+" or mb="+ctel,"",function(i,json){
    		var result=-1;
			var presult=-1; 
			if(json['mobilessp']&&json['mobilessp'].a.maxr>0){
			    presult=json['mobilessp'].a.maxr;
			}
            if(json['mobiles']&&json['mobiles'].a.maxr>0){
                var idmobile=json['mobiles'].all.sx[0];
                var obj=json['mobiles'].all[idmobile];
                if(cma!=""){
                	if(obj.cma.indexOf(cma)>-1){
                		result=1;
                	}else{
                		result=0;
                	}
                }
                if(iflx!=-1){
                   var newlx=0;
                   var cmt=obj.cmt; 
                   if(cmt.indexOf("电信")>-1){
                   	  newlx=3;
                   }else if(cmt.indexOf("联通")>-1){
                   	  newlx=2;
                   }else if(cmt.indexOf("移动")>-1){
                   	  newlx=1;
                   } 
                   if(iflx>0){
                      //需要判断结果
                      if(result==1||result==-1){
                      	 if(iflx==newlx){
	                      	result=1;
	                      }else{
	                      	result=0;
	                      }
                      }  
                   }  
                } 
                db.dofunc(jsons.func,{result:result,presult:presult,lx:newlx,data:obj});

            }else{
                db.dofunc(jsons.func,{result:-1,lx:0,presult:presult,data:{}});
            } 
    	});
             
    },
	/**
	 *
	 *
	 */
	 getWeekNumber:function(d){
		 d = new Date(d);
		 d.setHours(0,0,0);
		
		 d.setDate(d.getDate() + 4 - (d.getDay()||7));
		
		 var yearStart = new Date(d.getFullYear(),0,1);
		
		 var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
		
		 var getFullYear = d.getFullYear();
		 var getWeekNo = weekNo;
		 return getWeekNo;
	 },
	/**
	 * 07.11   翻页控件：点击操作
	 * index 当前第几页
	 * page_count 每页显示多少记录
	 */
	 pagelistov:function(index,page_count,totalrecord,theLink){
		var page=index||0;
		var theLink=theLink||"/gset.jsp";
		var fuhao = theLink.indexOf("?")>-1?"&":"?";
		var page_offset	=(page==1)?0:(page-1)*page_count;
		var prvPage		=(page_offset==0)?0:(page*1-1);
		var nxtPage		=(page_offset + page_count >= totalrecord)?page:(page*1+1);
		var TotalPage	=Math.ceil(totalrecord/page_count);
		TotalPage	=(TotalPage==0)?1:TotalPage;
		var pageHTML="";
		
		if(prvPage<1)
		{
			tmpLink = theLink;
		}
		else
		{
			tmpLink = theLink+fuhao+"pn="+prvPage;
		}
		if(page==0 || 1==TotalPage)
			pageHTML+="上一页";
		else
			pageHTML+="<a title='上一页' href='"+theLink+fuhao+"pn="+(page*1-1)+"'>上一页</a>";
		if(TotalPage<=6)
		{
			var offset_left=1;
			var offset_right=TotalPage; 
		}
		else 
		{
			if(page-3<1)
			{
				var offset_left=1;
				var offset_right=6; 
			}
			else
			{ 
				if((page*1+2)>TotalPage)
				{
					var offset_left=TotalPage-5;
					var offset_right=TotalPage;
				}
				else
				{
					var offset_left=page-3;
					var offset_right=page*1+2; 	
				}
			}
		}
		for(var i=offset_left;i<=offset_right;i++)
		{
			jc=i-1;
			if(0==jc)
			{
				tmpLink = theLink;
			}
			else
			{
				tmpLink = theLink+fuhao+"pn="+jc;
			}
			if(page==jc) 
				pageHTML+='<a href="#" class="current" >'+i+'</a>';
			else
				pageHTML+="<a href='"+tmpLink+"'>"+i+"</a>";
		}
		tempPage = nxtPage;
		if(TotalPage==nxtPage || TotalPage==1) //nxtPage
			pageHTML+="下一页";
		else
			pageHTML+="<a title='下一页' href='"+theLink+fuhao+"pn="+(page*1+1)+"'>下一页</a>";
		tempPage = TotalPage-1;
		if(TotalPage==page || TotalPage==1)
			pageHTML+="最后一页";
		else
			pageHTML+="<a href='"+theLink+fuhao+"pn="+(TotalPage*1-1)+"'>最后一页</a>";
		
		return pageHTML; 
	 },
	/**
	  * 删除某个传参
	  */
	 delParam:function(url,paramKey){
		var urlParam = url.substr(url.indexOf("?")+1);
		var beforeUrl = url.substr(0,url.indexOf("?"));
		var nextUrl = "";
		 
		var arr = new Array();
		if(urlParam!=""){
			var urlParamArr = urlParam.split("&");
		  
			for(var i=0;i<urlParamArr.length;i++){
				var paramArr = urlParamArr[i].split("=");
				if(paramArr[0]!=paramKey){
					arr.push(urlParamArr[i]);
				}
			}
		}
		 
		if(arr.length>0){
			nextUrl = "?"+arr.join("&");
		}
		if(beforeUrl!='')url = beforeUrl+nextUrl;
		return url;
	},
	/*操作系统判断*/
	/*数字类*/
	/**
	 * @method randombt
	 * @description 范围内随机数据
	 * @param  {[int]} min 最小值
	 * @param  {[int]} max 最大值
	 * @return {[int]}     [description]
	 * @example
	 * j().randombt(0,5);
	 */
	randombt:function(min,max){
		//范围内两者随机，换括最大值和最小值
		return Math.floor(min+Math.random()*(max-min)); 
	},
	/*数字类*/
	
	/*本地存储*/
	 cookie:{
		set: function(name, value, ttl) {
			if (ttl == undefined) ttl = 1e3 * 3600 * 24 * 365;
			document.cookie = name + "=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
			var expires = new Date;
			expires.setTime(expires.getTime() + ttl);
			document.cookie = [name + "=" + value + "; ", "expires=" + expires.toGMTString() + "; ", "path=/"].join("");
		},
		get: function(name) {
			var cookie = document.cookie.split("; ");
			for (var i in cookie) {
				if(typeof(cookie[i])=='string'){
				var spl = cookie[i].split("=");
				if (spl.length == 2 && spl[0] == name) {
					return spl[1];
				}
				}
			}
			return undefined;
		},
		remove:function(name){
			var expires = new Date;
			expires.setTime(expires.getTime() -1);
			document.cookie = name + "=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
		}
     },
	 //本地存储数据
	 storage: window.localStorage ? {
            getItem: function(item) {
                try {
                    return window.localStorage.getItem(item)
                } catch (e) {
                    return null;
                }
            },
            setItem: function(item, value) {
                try {
                    window.localStorage.setItem(item, value);
                } catch (e) {
                    console.log("Local storage issue: " + e);
                }
            },
			removeItem:function(item){
			  window.localStorage.removeItem(item);	
			}
        } : {
			  getItem: function(item) {
				return jQuery().cookie.get(item);
			  },
			  setItem: function(item, value) {
				jQuery().cookie.set(item, value);
			  },
			  removeItem:function(item){
			    jQuery().cookie.remove(item);	
			  }
        },
		
	/*本地存储*/
	/*数组类*/
	/**
	 * @method arrayUnique
	 * @description 去除数组中重复的对象
	 * @param  {[Array]} a 需要去重的数组
	 * @return {[Array]}  返回去重后的数组
	 * @example
	 * j().arrayUnique([1,2,3,2,1]);
	 */
	 arrayUnique: function(a) {
		    //数据去重复
            for (var i = 0; i < a.length; i++) {
                var j1 = i + 1;
                while (a[j1]) {
                    if (a[i] == a[j1]) {
                        a.splice(j1, 1);
                    } else {
                        j1++;
                    }
                }
            }
        },
	/*数组类*/
	replaceAll:function(s,s1,s2){
		return s.replace(new RegExp(s1, "gm"), s2);
	},

	/**
	 * @method setStars
	 * @description 星数评级
	 * @param  {[int]} num 星数
	 * @return {[String]}  返回生成的静态str
	 */
	 setStars:function(num){
	 	var num = num || 0;
	 	var starStr = '';
	 	for(var i = 1;i <= num;i ++){
	 		starStr += '<img src="/css/xing.png" width="16%" style="margin:0 2%;"/>';
	 	}
	 	return starStr;
	 },

	//解码
	html_decode:function(str)	{
		var s = "";
		if (str.length == 0) return "";
		s = str.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&amp;/g, "&");
		s = s.replace(/&nbsp;/g, "");
		return s;
	}

}); 

function Resizer(options) {
        this.delay = options.delay || 0;
        this.element = options.element || null;
        this.baseWidth = options.baseWidth;
        this.baseHeight = options.baseHeight;
        this.onResize = options.onResize;
        this.enabled = true;
        this.scale = 1;
        this.resizeTimeout = null
    }
Resizer.prototype = {
	needsResize: function(maxWidth, maxHeight) {
		clearTimeout(this.resizeTimeout);
		if (this.enabled) {
			this.maxWidth = maxWidth;
			this.maxHeight = maxHeight;
			this.resizeTimeout = setTimeout(this.resize.bind(this), this.delay)
		}
	},
	resize: function() {
		this.resizeTimeout = null;
		var dimensions = this.getFittingDimensions(this.maxWidth, this.maxHeight);
		this.element.style.width = dimensions.width + "px";
		this.element.style.height = dimensions.height + "px";
		if (this.onResize) {
			this.onResize.call(this)
		}
	},
	scaleX: function() {
		var rect = this.element.getBoundingClientRect();
		return rect.width / this.baseWidth || 1
	},
	scaleY: function() {
		var rect = this.element.getBoundingClientRect();
		return rect.height / this.baseHeight || 1
	},
	getFittingDimensions: function(maxWidth, maxHeight) {
		var availableRatio = maxWidth / maxHeight;
		var baseRatio = this.baseWidth / this.baseHeight;
		var ratioDifference = Math.abs(availableRatio - baseRatio);
		var width, height;
		if (ratioDifference <= .17) {
			width = maxWidth;
			height = maxHeight
		} else if (availableRatio <= baseRatio) {
			width = maxWidth;
			height = width / baseRatio
		} else {
			height = maxHeight;
			width = height * baseRatio
		}
		return {
			width: width,
			height: height
		}
	}
};
var sclick="onclick";
if(jQuery().iftouch()) jqueryex.sclick=sclick="onclick";//lwf 2016-08-16，经过讨论后废止 ontouchend的方式。
