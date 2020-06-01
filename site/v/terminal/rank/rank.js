var nowTime = '',year = 0,month = 0,date = 0,day=0;
		var app = new Vue({
			el:'#app',
			data:{
				showSignUpSuc:false,
				showIntroduction:false,
				tabId:2,
				month:'',
				weekStart:'',
				weekEnd:'',
				reqWeekStart:'',//接口
				havePrevious:true,
				haveNext:false,
				index:0,//当前是第几周
				rowNum:0,//我的排名
				largeArea:'',//报名大区
				isApply:0,//是否报名本期
				isApplyNow:0,//是否报名当期
				url:'/v/terminal/img/headimg.png',//我的头像
				totalScanCounts:0,//我的积分
				rankingRecordLst:'',//列表,
				weekPrevious:true,
				monthPrevious:true,
				weekNext:false,
				monthNext:false,
				isNowRank:true,
				isRankStart:''
			},
			methods:{
				tab(type){
					this.tabId = type;
					this.queryRank();
					if(this.tabId==2){//月
						this.havePrevious = this.monthPrevious;
						this.haveNext = this.monthNext;
					}else{
						this.havePrevious = this.weekPrevious;
						this.haveNext = this.weekNext;
					}
				},
				toRule(){
					location.href = 'rule.html';
				},
				previous(){//上翻
					if(this.tabId==1){//周
						this.index++;
						var weekStart = new Date(nowTime.getTime()-((day-1+7*(this.index))*24*3600*1000)),
							weekEnd = new Date(nowTime.getTime()+((7-day-7*(this.index))*24*3600*1000));
						this.reqWeekStart = weekStart.getFullYear()+'-'+(weekStart.getMonth()+1)+'-'+weekStart.getDate();	
						this.weekStart = ((weekStart.getMonth()<9?'0'+(weekStart.getMonth()+1):weekStart.getMonth()+1))+'.'+(weekStart.getDate()<10?'0'+weekStart.getDate():weekStart.getDate());
						this.weekEnd = ((weekEnd.getMonth()<9?'0'+(weekEnd.getMonth()+1):weekEnd.getMonth()+1))+'.'+(weekEnd.getDate()<10?'0'+weekEnd.getDate():weekEnd.getDate());
						this.haveNext = true;
						this.weekNext = true;
						if(this.index>14){
							this.havePrevious = false;
							this.weekPrevious = false;
						}else{
							this.weekPrevious = true;
						}
					}else{//月
						month = Number(month);
						month--;
						if(month==0){
							month=12;
							year--;
						}
						month=month<10?'0'+month:month;
						this.month = year+'年'+month+'月';
						this.haveNext = true;
						this.monthNext = true;
						if((new Date().getFullYear()-year)*12+(new Date().getMonth()+1-month)>=3){
							this.havePrevious = false;
							this.monthPrevious = false;
						}else{
							this.monthPrevious = true;
						}
					}
					this.queryRank();
				},
				next(){//下翻
					if(this.tabId==1){//周
						this.index--
						var weekStart = new Date(nowTime.getTime()-((day-1+7*(this.index))*24*3600*1000)),
							weekEnd = new Date(nowTime.getTime()+((7-day-7*(this.index))*24*3600*1000));
						this.reqWeekStart = weekStart.getFullYear()+'-'+(weekStart.getMonth()+1)+'-'+weekStart.getDate();	
						this.weekStart = ((weekStart.getMonth()<9?'0'+(weekStart.getMonth()+1):weekStart.getMonth()+1))+'.'+(weekStart.getDate()<10?'0'+weekStart.getDate():weekStart.getDate());
						this.weekEnd = ((weekEnd.getMonth()<9?'0'+(weekEnd.getMonth()+1):weekEnd.getMonth()+1))+'.'+(weekEnd.getDate()<10?'0'+weekEnd.getDate():weekEnd.getDate());
						this.havePrevious = true;
						this.weekPrevious = true;
						if(this.index<1){
							this.haveNext = false;
							this.weekNext = false;
						}else{
							this.weekNext = true;
						}
					}else{//月
						month = Number(month);
						month++;
						if(month==13){
							month=1;
							year++;
						}
						month=month<10?'0'+month:month;
						this.month = year+'年'+month+'月';
						this.havePrevious = true;
						this.monthPrevious = true;
						if(month-1>=new Date().getMonth()&&year>=new Date().getFullYear()){
							this.haveNext = false;
							this.monthNext = false;
						}else{
							this.monthNext = true;
						}
					}
					this.queryRank();
				},
				signUp(){//报名
					if(this.isApply==1){
						return false;
					}
					var javai = vge.terminal + '/DBTVMTSInterface/userRank/applyRanking';
					var req = {
						"openid": sessionStorage.openid
					};
					vge.callJApi(javai, req, (jo)=> {
						console.log(jo)
						if(jo.result.code == '0') {
							if(jo.result.businessCode == '0') {
								this.showSignUpSuc = true;
								this.queryRank();
							} else {
								title_tip('尊敬的用户', jo.result.msg?jo.result.msg:'系统开了个小差', '我知道了');
							}
						} else { //code!='0'
							title_tip('尊敬的用户',jo.result.msg?jo.result.msg:'呜呜，系统开了个小差，请稍后重试！', '我知道了');
						}
					});
				},
				queryRank(){
					var javai = vge.terminal + '/DBTVMTSInterface/userRank/queryMonthRank';
					var req = {
						"openid": sessionStorage.openid,
						"currPage":1,
						"pageSize":100
					};
					if(this.tabId==2){//月
						req.monthYear = this.month.replace('年','').replace('月','');
						req.weekStartTime = '';
					}
					if(this.tabId==1){//周
						req.weekStartTime = this.reqWeekStart;
						this.monthYear = '';
					}
					vge.callJApi(javai, req, (jo)=> {
						if(this.tabId==1){
							var weekStart = new Date(nowTime.getTime()-((day-1)*24*3600*1000));
							if(req.weekStartTime == weekStart.getFullYear()+'-'+(weekStart.getMonth()+1)+'-'+weekStart.getDate()){
								this.isNowRank = true;
							}else{
								this.isNowRank = false;
							}
						}
						if(this.tabId==2){
							if(req.monthYear.replace(/0/g,'')==(new Date().getFullYear()+''+(new Date().getMonth()+1)).replace(/0/g,'')){//是否是当期
								this.isNowRank = true;
							}else{
								this.isNowRank = false;
							}
						}
						if(jo.result.code == '0') {
							if(jo.result.businessCode == '0') {
								this.url = jo.reply.headImgUrl;
								this.rowNum = jo.reply.rowNum;
								this.totalScanCounts = jo.reply.totalScanCounts;
								this.largeArea = jo.reply.largeArea;
								if(this.largeArea.indexOf('大区')!=-1){
									this.largeArea = this.largeArea.replace('大区','赛区');
								}
								this.isApply = jo.reply.isApply;
								this.rankingRecordLst = jo.reply.rankingRecordLst;
								this.isRankStart = jo.reply.isRankStart;
								if(jo.reply.isRankStart==2&&this.isNowRank&&this.tabId==1){
									title_tip('尊敬的用户', '本周积分排名活动已结束', '我知道了');	
								}else if(jo.reply.isRankStart==3&&this.isNowRank&&this.tabId==2){
									title_tip('尊敬的用户', '本月积分排名活动已结束', '我知道了');	
								}
							} else {
								this.url = jo.reply.headImgUrl;
								this.rowNum = jo.reply.rowNum;
								this.totalScanCounts = jo.reply.totalScanCounts;
								this.largeArea = jo.reply.largeArea;
								this.isRankStart = jo.reply.isRankStart;
								if(this.largeArea.indexOf('大区')!=-1){
									this.largeArea = this.largeArea.replace('大区','赛区');
								}
								title_tip('尊敬的用户', jo.result.msg?jo.result.msg:'系统开了个小差', '我知道了');
							}
						} else { //code!='0'
							title_tip('尊敬的用户',jo.result.msg?jo.result.msg:'呜呜，系统开了个小差，请稍后重试！', '我知道了');
						}
					});
				}
			},
			mounted() {
				nowTime = new Date();
				year = nowTime.getFullYear();
				month = nowTime.getMonth()<9?'0'+(nowTime.getMonth()+1):nowTime.getMonth()+1;
				date = nowTime.getDate();
				day = nowTime.getDay()==0?7:nowTime.getDay();
				var weekStart = new Date(nowTime.getTime()-((day-1)*24*3600*1000)),
					weekEnd = new Date(nowTime.getTime()+((7-day)*24*3600*1000));
				this.month = year+'年'+month+'月';
				this.reqWeekStart = weekStart.getFullYear()+'-'+(weekStart.getMonth()+1)+'-'+weekStart.getDate();
				this.weekStart = ((weekStart.getMonth()<9?'0'+(weekStart.getMonth()+1):weekStart.getMonth()+1))+'.'+(weekStart.getDate()<10?'0'+weekStart.getDate():weekStart.getDate());
				this.weekEnd = ((weekEnd.getMonth()<9?'0'+(weekEnd.getMonth()+1):weekEnd.getMonth()+1))+'.'+(weekEnd.getDate()<10?'0'+weekEnd.getDate():weekEnd.getDate());
				this.queryRank();
			},
			computed:{
				
			},
			filters:{
				toThounds(num){//千分符
					if(num){
						if(num.toString().lastIndexOf('.')!=-1){
							return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')[0]+'.'+num.toString().split('.')[1]
						}else{
							return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')[0]
						}
					}else{
						return 0
					}
				},
				telPrivacy(tel){
					if(tel){
						return tel.substr(0,3) + "****" + tel.substr(7)
					}else{
						return ''
					}
				}
			}
		})