'use strict'

/*
    获取dom元素
*/
var dom_ulNorth = document.getElementById('ulNorth'),
    dom_ulSouth = document.getElementById('ulSouth'),
    dom_ulAll = document.getElementById('ulAll'),
    dom_rank = document.getElementById('rank'),
    dom_monthSon = document.getElementById('monthSon'),
    dom_moneySon = document.getElementById('moneySon'),
    dom_saleSon = document.getElementById('saleSon'),
    dom_scanSon = document.getElementById('scanSon'),
    dom_vpointsSon = document.getElementById('vpointsSon'),
    dom_itemDate = document.getElementById('itemDate'),
    dom_btnAll = document.getElementById('btnList').getElementsByTagName('input'),
    dom_detail = document.getElementById('detail'),
    dom_content = document.getElementById('contentSon'),
    dom_close = document.getElementsByClassName('close')[0],
    dom_back = document.getElementById('back'),
    dom_proviceName = document.getElementById('proviceName'),
    container = document.getElementById('container'),
    list = document.getElementById('freshList'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

/*
    接口地址
*/
var myhost = [
    'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getItemList.do?token=', //获取项目列表
    'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getItemData.do?itemValue=', //区域累计排行
    'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getMonthAllData.do' //月度看板单月数据
];

/*
    定义全局变量的参数和flag
*/
var provice = ''; //选择的省份标志（可变）
var proviceArr = []; //接口返回的省份对应value（不可变）
var proviceIndex = ''; //标志的下标
var allData; //区域累计排行接口返回的allData（可变）
var vjifenToken = localStorage.vjifenToken === undefined ? '' : localStorage.vjifenToken; //token
var skuArr = [];
var controlFlag = true;
var tickFlag = true; //一级页面的详情按钮，true代表第一次点击，false代表之后的点击
var showFlag = true; //一级页面的详情按钮，true代表显示列表，false代表隐藏列表
var clickSku = true;
var clickBord = true;
var clickFresh = true;
// var mapArr = [
//     '中国', //电商
//     '中国', //全麦白啤
//     '河北', //（包含天津）
//     '河南', //河南和湖北
//     '黑龙江',
//     '山西',
//     '山东',
//     '山东', //新银麦（山东）
//     '河北', //北销（包含北京）
//     '陕西',
//     '广东', //广东和海南
//     '浙江',
//     '广西',
//     '湖南',
//     '四川',
//     '福建',
//     '云南',
//     '江西',
//     '重庆'
// ];
var mapArr = [];
var mapName = [];
var timerloadSon; //二级页面5秒一次定时请求任务
var mySwiper;
/*
    公共方法
*/
//累计瓶数
var num9 = function (num) {
    if (num.toString().length >= 9) {
        return num;
    }
    var str = "";
    for (var i = num.toString().length; i < 9; i++) {
        str += "0";
    }
    return str + num.toString();
}
//消费者数
var num8 = function (num) {
    if (num.toString().length >= 8) {
        return num;
    }
    var str = "";
    for (var i = num.toString().length; i < 8; i++) {
        str += "0";
    }
    return str + num.toString();
}

/*
    1.详情按钮功能
*/
$('#detail').on('click', function () {
    tick();
});

function tick() {
    if (tickFlag) { //第一次点击
        tickFlag = false;
        $.ajax({
            async: false,
            type: "GET",
            url: myhost[0] + vjifenToken,
            data: '',
            success: function (data) {
                let jo = JSON.parse(data);
                console.log('获取项目列表getItemList:');
                console.log(jo);
                // 0全国 1北方 2南方
                for (let i = 0; i < jo[0].length; i++) { //全国
                    let dom_li = document.createElement('li');
                    dom_li.innerHTML = jo[0][i].itemName;
                    dom_li.className = 'liArr';
                    dom_ulAll.appendChild(dom_li);
                    proviceArr.push(jo[0][i].itemValue);
                    mapArr.push(jo[0][i].itemRmk);
                    mapName.push(jo[0][i].itemName + '地区');
                }
                for (let i = 0; i < jo[1].length; i++) { //北方
                    let dom_li = document.createElement('li');
                    dom_li.innerHTML = jo[1][i].itemName;
                    dom_li.className = 'liArr';
                    dom_ulNorth.appendChild(dom_li);
                    proviceArr.push(jo[1][i].itemValue);
                    mapArr.push(jo[1][i].itemRmk);
                    mapName.push(jo[1][i].itemName + '地区');
                }
                for (let i = 0; i < jo[2].length; i++) { //南方
                    let dom_li = document.createElement('li');
                    dom_li.innerHTML = jo[2][i].itemName;
                    dom_li.className = 'liArr';
                    dom_ulSouth.appendChild(dom_li);
                    proviceArr.push(jo[2][i].itemValue);
                    mapArr.push(jo[2][i].itemRmk);
                    mapName.push(jo[2][i].itemName + '地区');
                }
                console.log('省区简写数组:' + proviceArr);
                console.log('省区地图mapArr:' + mapArr);
                console.log('省区地图标题mapName:' + mapName);
                // 给父盒子设置高度
                document.getElementsByClassName('listAll')[0].style.height = Math.ceil(jo[0].length / 3) * 50 + 'px';
                document.getElementsByClassName('listNorth')[0].style.height = Math.ceil(jo[1].length / 3) * 50 + 'px';
                document.getElementsByClassName('listSouth')[0].style.height = Math.ceil(jo[2].length / 3) * 50 + 'px';
                //给省区list添加点击事件，显示对应省区二级页面
                var dom_liArr = document.getElementsByClassName('liArr');
                for (let i = 0; i < dom_liArr.length; i++) {
                    (function (i) {
                        $('.liArr').eq(i).bind('click', function () {
                            provice = proviceArr[i];
                            proviceIndex = i;
                            console.log('provice:' + provice);
                            console.log('proviceIndex:' + proviceIndex);
                            document.getElementsByClassName('wrap')[0].style.visibility = 'hidden';
                            document.getElementsByClassName('wrap')[0].style.position = 'absolute';
                            // $('.wrap').fadeOut();
                            showFlag = true;
                            $('#detailBox').fadeOut();
                            rank(); //区域累计排行和半月扫码量
                        });
                    })(i)
                }
            },
            error: function () {
                console.log('获取项目列表请求接口出错');
            }
        });
    }
    if (showFlag) {
        // 显示目录
        $('#detailBox').fadeIn();
        showFlag = false;
    } else {
        // 隐藏目录
        $('#detailBox').fadeOut();
        showFlag = true;
    }
}
/*
    2.返回按钮功能
*/
dom_back.addEventListener('click', function () { //返回按钮，重置所有参数
    proviceIndex = ''; //省区下标重置
    window.clearInterval(timerloadSon); //清楚定时请求任务
    // 清除子元素
    removeAllChild();
    // 清除点击事件
    unbindClick();
    document.getElementsByClassName('wrap')[0].style.visibility = 'visible';
    document.getElementsByClassName('wrap')[0].style.position = 'static';
    // $('.wrap').fadeIn();
    dom_itemDate.innerHTML = '';
}, false);

function removeAllChild() {
    mySwiper.destroy(false); //销毁swiper
    $('#freshList').empty();
    $("#freshList").removeAttr("style");
    $('#contentSon p').not('#all').each(function () { // "*"表示div.content下的所有元素
        $(this).remove();
    });
    $('#mapSon').empty();
    $('#mapSon').removeClass();
    $('#mapSon').removeAttr('style');
    $('#mapSon').removeAttr('_echarts_instance_');
}

function unbindClick() {
    $('#btnList input').unbind(); //月度看板按钮
    $('.myP').unbind(); //各省区的sku列表按钮
    $('#all').unbind(); //sku列表的‘全部’按钮
    $('#close').unbind(); //sku列表的x按钮
    dom_content.style.display = 'none';
    dom_close.style.transform = 'translate(-50%,-50%) rotate(0deg)';
    controlFlag = true;
    document.getElementById('end0').innerHTML = '';
    document.getElementById('end1').innerHTML = '';
    document.getElementById('end2').innerHTML = '';
    document.getElementById('end3').innerHTML = '';
    dom_moneySon.innerHTML = '0元';
    dom_saleSon.innerHTML = '0支';
    dom_scanSon.innerHTML = '0%' + '<span>&nbsp;&nbsp;(扫码支数/销量支数)</span>';
    dom_vpointsSon.innerHTML = '0%' + '<span>&nbsp;&nbsp;(兑出金额/销量支数)</span>';
    for (let i = 0; i < dom_btnAll.length; i++) {
        dom_btnAll[i].removeAttribute('class', 'active');
    }
}
/*
    3.rank,tick的callback函数
*/
function rank() {
    $.ajax({
        async: false,
        type: "GET",
        url: myhost[1] + provice + '&token=' + vjifenToken,
        data: '',
        success: function (data) {
            let jo = JSON.parse(data);
            console.log('该省区总体数据:');
            console.log(jo);
            sessionStorage.jo = jo; //缓存该省区的总体数据
            if (jo.allData != undefined) {
                allData = jo.allData; //月度看板数据
                board(); //月度看板
            }
            // if (jo.detailList.length != 0) {
            getSkuChart(jo); //区域累计扫码和半月扫码
            // }
            if (jo.freshList != undefined) {
                freshSon(jo.freshList); //开瓶新鲜度
            }
            mapSon(proviceIndex); //地图
            get_sku(jo); //sku选择器
            $('.close').bind('click', function () {
                if (controlFlag) {
                    dom_content.style.display = 'block';
                    dom_close.style.transform = 'translate(-50%,-50%) rotate(-45deg)';
                    controlFlag = false;
                } else {
                    dom_content.style.display = 'none';
                    dom_close.style.transform = 'translate(-50%,-50%) rotate(0deg)';
                    controlFlag = true;
                }
            });
        },
        error: function () {
            console.log('区域累计排行请求接口出错');
        }
    });
}

/*
    4.区域地图
*/
function mapSon(e) { //各省份地图
    var isShow = true;
    // 地图标题
    dom_proviceName.innerHTML = mapName[e];
    var mapProvinceValues = mapArr[e];

    if (mapName[e] == '华中地区' || mapName[e] == '河北地区' || mapName[e] == '北销地区' || mapName[e] == '华南地区') {
        var timer;
        var areaChart = []; //多省区时显示中国地图部分区域
        var mapData = []; //多省份时选中地区的颜色
        $.get('/v/BigScreen/map/china.json', function (chinaJson) {
            echarts.registerMap('china', chinaJson); // 注册地图
            var myChart = echarts.init(document.getElementById('mapSon'));
            if (mapName[e] == '河北地区') { //河北
                areaChart = [
                    [114.4668, 42.027],
                    [118.8828, 36.0791]
                ];
                mapData = [{
                        name: '衡水市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '保定市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '唐山市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '邢台市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '邯郸市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '秦皇岛市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '石家庄市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '张家口市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '承德市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '廊坊市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '沧州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '天津',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    }
                ];
            } else if (mapName[e] == '北销地区') { //北销
                areaChart = [
                    [113.4668, 42.627],
                    [119.8828, 36.0791]
                ];
                mapData = [{
                        name: '衡水市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '保定市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '唐山市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '邢台市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '邯郸市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '秦皇岛市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '石家庄市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '张家口市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '承德市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '廊坊市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '沧州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '北京',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    }
                ];
            } else if (mapName[e] == '华中地区') { //华中
                areaChart = [
                    [108.457, 36.3428],
                    [116.6309, 29.0479]
                ];
                mapData = [{
                        name: '三门峡市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '洛阳市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '郑州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '焦作市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '新乡市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '安阳市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '鹤壁市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '濮阳市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '开封市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '商丘市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '周口市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '许昌市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '平顶山市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '驻马店市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '漯河市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '南阳市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '信阳市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '济源市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '十堰市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '襄阳市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '随州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '孝感市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '武汉市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '黄冈市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '鄂州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '黄冈市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '咸宁市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '荆州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '荆门市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '宜昌市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '神农架区',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '恩施土家族苗族自治州',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '天门市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '仙桃市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '潜江市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    }
                ];
            } else if (mapName[e] == '华南地区') { //华南
                areaChart = [
                    [108.6328, 25.0322],
                    [116.334, 18.8055]
                ];
                mapData = [{
                        name: '韶关市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '清远市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '肇庆市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '云浮市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '茂名市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '湛江市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '阳江市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '江门市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '佛山市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '中山市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '珠海市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '广州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '东莞市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '深圳市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '惠州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '河源市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '汕尾市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '梅州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '汕头市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '潮州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '揭阳市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '海口市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '临高县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '澄迈县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '定安县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '文昌市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '三沙市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '琼海市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '屯昌县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '儋州市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '万宁市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '海口市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '琼中黎族苗族自治县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '白沙黎族自治县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '昌江黎族自治县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '东方市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '五指山市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '乐东黎族自治县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '保亭黎族苗族自治县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '陵水黎族自治县',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    },
                    {
                        name: '三亚市',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#00f0ff'
                                    }
                                },
                                areaColor: 'rgba(32,114,208,1)',
                                borderColor: '#183961',
                                borderWidth: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            }
                        }
                    }
                ];
            }
            var mydata = [];
            var geoCoordMap = {};
            //echarts3.0 地图散点函数
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            var option = {
                geo: {
                    type: 'map',
                    map: 'china',
                    itemStyle: { // 定义样式
                        normal: { // 普通状态下的样式
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#00f0ff'
                                }
                            },
                            areaColor: 'rgba(32,114,208,0)',
                            borderColor: 'rgba(32,114,208,0)',
                            borderWidth: 0
                        }
                    },
                    regions: mapData, //在地图中对特定的区域配置样式
                    roam: false,
                    silent: true,
                    boundingCoords: areaChart
                },
                series: [{
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: function (val) {
                        return val[2] / 7;
                    },
                    showEffectOn: 'render',
                    rippleEffect: { //涟漪特效
                        brushType: 'stroke',
                        scale: 4,
                        period: 3 //动画时间，默认4
                    },
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            color: '#00f0ff',
                            shadowBlur: 10,
                            shadowColor: '#00f0ff'
                        }
                    },
                    zlevel: 1
                }]
            }
            myChart.setOption(option);
            areaChart = [];

            function loadMonitorDataSon() { //5s一次
                var Data_star = [];
                $.ajax({
                    async: false,
                    type: "GET",
                    url: 'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getSkuRealData.do?itemValue=' + provice + '&token=' + vjifenToken,
                    data: '',
                    success: function (data) {
                        clearTimeout(timer);
                        var jo = JSON.parse(data);
                        console.log('获取当前扫码getSkuRealData:');
                        console.log(jo);
                        // 闪点
                        var option = myChart.getOption();
                        for (var i = 0; i < jo.dataList.length; i++) {
                            var n = i;
                            var obj = {
                                name: 'name' + i,
                                value: 60
                            };
                            mydata.push(obj);
                            eval('geoCoordMap.name' + i + '=[' + jo.dataList[i].lon + ',' + jo.dataList[i].lat + ']');
                        }
                        var stardata = convertData(mydata.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 10));
                        option.series[0].data = stardata;
                        myChart.setOption(option);
                        timer = setTimeout(function () {
                            option.series[0].data = [];
                            myChart.setOption(option);
                        }, 4200);
                        /*
                        1.先获取正确的数组
                        2.再获取目前第一行li中的数组
                        3.进行比较
                        4.不一样的生成li
                        5.填写这个li并插入ul
                        6.向上顶
                        7.删除上面这个li
                         */
                        // 消费者
                        //1.先获取正确的数组
                        var scan = num9(jo.realScan);
                        var bottleArr = [];
                        for (var i = 0; i < scan.length; i++) {
                            bottleArr.push(scan[i]);
                        }
                        //2.获取第一行所有的li
                        var dom_myList = document.getElementsByClassName('scanList');
                        var myArr = [];
                        for (var i = 0; i < dom_myList.length; i++) {
                            myArr[i] = $(".scanList").eq(i).find('li').eq(0).html();
                        }
                        //3.进行对比
                        var kArr = [];
                        for (var i = 0; i < myArr.length; i++) {
                            if (myArr[i] != bottleArr[i]) {
                                kArr.push(i);
                            }
                        }
                        //4.不一样的生成li
                        for (var i = 0; i < kArr.length; i++) {
                            var createLi = document.createElement('li');
                            //5.填写这个li并插入ul
                            createLi.innerHTML = bottleArr[kArr[i]];
                            dom_myList[kArr[i]].appendChild(createLi);
                        }
                        //6.不一样的往上顶
                        for (var i = 0; i < kArr.length; i++) {
                            $(".scanList").eq(kArr[i]).find('li').eq(0).css('marginTop', '-215%');
                        }
                        //7.删除上面这个li
                        setTimeout(function () {
                            for (var i = 0; i < kArr.length; i++) {
                                $(".scanList").eq(kArr[i]).find('li').eq(0).remove();
                            }
                            kArr = [];
                            myArr = [];
                            bottleArr = [];
                        }, 1000);
                        // 累计扫码
                        //1.获取正确数组
                        var users = num8(jo.realUser);
                        var userArr = [];
                        for (var i = 0; i < users.length; i++) {
                            userArr.push(users[i]);
                        }
                        //2.获取第一行所有的li
                        var dom_ulList = document.getElementsByClassName('userList');
                        var numArr = [];
                        for (var i = 0; i < dom_ulList.length; i++) {
                            numArr[i] = $(".userList").eq(i).find('li').eq(0).html();
                        }
                        //3.进行对比
                        var iArr = [];
                        for (var i = 0; i < numArr.length; i++) {
                            if (numArr[i] != userArr[i]) {
                                iArr.push(i);
                            }
                        }
                        //4.不一样的生成li
                        for (var i = 0; i < iArr.length; i++) {
                            var createLi = document.createElement('li');
                            //5.填写这个li并插入ul
                            createLi.innerHTML = userArr[iArr[i]];
                            dom_ulList[iArr[i]].appendChild(createLi);
                        }
                        //6.不一样的往上顶
                        for (var i = 0; i < iArr.length; i++) {
                            $(".userList").eq(iArr[i]).find('li').eq(0).css('marginTop', '-210%');
                        }
                        //7.删除上面这个li
                        setTimeout(function () {
                            for (var i = 0; i < iArr.length; i++) {
                                $(".userList").eq(iArr[i]).find('li').eq(0).remove();
                            }
                            iArr = [];
                            numArr = [];
                            userArr = [];
                        }, 1000);
                    },
                    error: function () {
                        console.log('实时数据请求接口出错');
                    }
                });
                return loadMonitorDataSon;
            }
            if (vjifenToken != '') {
                clearInterval(timerloadSon);
                timerloadSon = setInterval(loadMonitorDataSon(), 5000); //5s一次
            }
        });
    } else {
        areaChart = [];

        if (e == 0 || e == 1) {
            isShow = false;
        }
        var myChart;
        // 路径配置
        require.config({
            paths: {
                // echarts: 'http://echarts.baidu.com/build/dist'
                echarts: './echarts' //echarts文件夹，与上方网址相同
            }
        });
        // 使用
        require(
            [
                'echarts',
                'echarts/theme/macarons',
                'echarts/chart/map'
            ],
            function (ec) {
                //图表路径
                myChart = ec.init(document.getElementById('mapSon'));
                option = {
                    toolbox: {
                        show: false
                    },
                    dataRange: {
                        show: false,
                        min: 0,
                        max: '',
                        splitNumber: 0,
                        color: ['#09366a', '#4c88cd']
                    },
                    series: [{
                        name: '扫码热力',
                        type: 'map',
                        mapType: mapProvinceValues,
                        roam: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: isShow,
                                    textStyle: {
                                        color: "#00f0ff"
                                    }
                                },
                                borderColor: '#183961',
                                borderWidth: 1,
                                areaStyle: {
                                    color: '#2072d0'
                                }
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            }
                        },
                        data: [],
                        markPoint: {
                            symbol: 'emptyCircle',
                            symbolSize: function (v) {
                                return 3 + v / 5
                            },
                            effect: {
                                show: true,
                                shadowBlur: 0
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    color: '#00f0ff'
                                },
                                emphasis: {
                                    label: {
                                        position: 'top'
                                    }
                                }
                            },
                            data: []
                        }
                    }]
                };
                myChart.setOption(option);
            }
        );

        function loadMonitorDataSon() { //5s一次
            var Data_star = [];
            $.ajax({
                async: false,
                type: "GET",
                url: 'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getSkuRealData.do?itemValue=' + provice + '&token=' + vjifenToken,
                data: '',
                success: function (data) {
                    var jo = JSON.parse(data);
                    console.log('获取当前扫码getSkuRealData:');
                    console.log(jo);
                    // 闪点
                    var option = myChart.getOption();
                    for (var i = 0; i < jo.dataList.length; i++) {
                        Data_star[i] = {
                            name: '',
                            value: 10,
                            geoCoord: [jo.dataList[i].lon, jo.dataList[i].lat]
                        }
                    }
                    option.series[0].markPoint.data = Data_star;
                    myChart.setOption(option);
                    /*
                    1.先获取正确的数组
                    2.再获取目前第一行li中的数组
                    3.进行比较
                    4.不一样的生成li
                    5.填写这个li并插入ul
                    6.向上顶
                    7.删除上面这个li
                     */
                    // 消费者
                    //1.先获取正确的数组
                    var scan = num9(jo.realScan);
                    var bottleArr = [];
                    for (var i = 0; i < scan.length; i++) {
                        bottleArr.push(scan[i]);
                    }
                    //2.获取第一行所有的li
                    var dom_myList = document.getElementsByClassName('scanList');
                    var myArr = [];
                    for (var i = 0; i < dom_myList.length; i++) {
                        myArr[i] = $(".scanList").eq(i).find('li').eq(0).html();
                    }
                    //3.进行对比
                    var kArr = [];
                    for (var i = 0; i < myArr.length; i++) {
                        if (myArr[i] != bottleArr[i]) {
                            kArr.push(i);
                        }
                    }
                    //4.不一样的生成li
                    for (var i = 0; i < kArr.length; i++) {
                        var createLi = document.createElement('li');
                        //5.填写这个li并插入ul
                        createLi.innerHTML = bottleArr[kArr[i]];
                        dom_myList[kArr[i]].appendChild(createLi);
                    }
                    //6.不一样的往上顶
                    for (var i = 0; i < kArr.length; i++) {
                        $(".scanList").eq(kArr[i]).find('li').eq(0).css('marginTop', '-215%');
                    }
                    //7.删除上面这个li
                    setTimeout(function () {
                        for (var i = 0; i < kArr.length; i++) {
                            $(".scanList").eq(kArr[i]).find('li').eq(0).remove();
                        }
                        kArr = [];
                        myArr = [];
                        bottleArr = [];
                    }, 1000);
                    // 累计扫码
                    //1.获取正确数组
                    var users = num8(jo.realUser);
                    var userArr = [];
                    for (var i = 0; i < users.length; i++) {
                        userArr.push(users[i]);
                    }
                    //2.获取第一行所有的li
                    var dom_ulList = document.getElementsByClassName('userList');
                    var numArr = [];
                    for (var i = 0; i < dom_ulList.length; i++) {
                        numArr[i] = $(".userList").eq(i).find('li').eq(0).html();
                    }
                    //3.进行对比
                    var iArr = [];
                    for (var i = 0; i < numArr.length; i++) {
                        if (numArr[i] != userArr[i]) {
                            iArr.push(i);
                        }
                    }
                    //4.不一样的生成li
                    for (var i = 0; i < iArr.length; i++) {
                        var createLi = document.createElement('li');
                        //5.填写这个li并插入ul
                        createLi.innerHTML = userArr[iArr[i]];
                        dom_ulList[iArr[i]].appendChild(createLi);
                    }
                    //6.不一样的往上顶
                    for (var i = 0; i < iArr.length; i++) {
                        $(".userList").eq(iArr[i]).find('li').eq(0).css('marginTop', '-210%');
                    }
                    //7.删除上面这个li
                    setTimeout(function () {
                        for (var i = 0; i < iArr.length; i++) {
                            $(".userList").eq(iArr[i]).find('li').eq(0).remove();
                        }
                        iArr = [];
                        numArr = [];
                        userArr = [];
                    }, 1000);
                },
                error: function () {
                    console.log('实时数据请求接口出错');
                }
            });
            return loadMonitorDataSon;
        }
        if (vjifenToken != '') {
            clearInterval(timerloadSon);
            timerloadSon = setInterval(loadMonitorDataSon(), 5000); //5s一次
        }
    }
}

/*
    5.开平新鲜度
*/
function freshSon(r) { //开瓶新鲜度轮播
    var n = Math.ceil(r.length / 4);
    for (let i = 0; i < n; i++) {
        var divson = document.createElement('div');
        divson.className = 'swiper-slide freshDiv echarts' + i;
        list.appendChild(divson);
    }
    var myDiv = list.getElementsByClassName('freshDiv');

    if (n >= 2) {
        mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
        $('#prev').css('opacity', '1');
        $('#next').css('opacity', '1');
    } else {
        mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
        $('#prev').css('opacity', '0.5');
        $('#next').css('opacity', '0.5');
    }
    // 触碰时停止，2.5s后继续
    var containerFlag = true;
    $('#container').bind('click', function () {
        mySwiper.stopAutoplay();
        if (containerFlag) {
            containerFlag = false;
            setTimeout(function () {
                mySwiper.startAutoplay();
                containerFlag = true;
            }, 2500);
        }
    });

    //获取数据
    let dom_freshNum = []; //新鲜度
    let dom_freshName = []; //sku名字
    let dom_freshNameArr = [];
    let dom_freshColor = ['#00f0ff', '#079eff', '#7cbfea', '#6654ca', '#00f0ff', '#079eff', '#7cbfea', '#6654ca', '#00f0ff', '#079eff', '#7cbfea', '#6654ca', '#00f0ff', '#079eff', '#7cbfea', '#6654ca'];
    let option_freshSon = {
        calculable: false,
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#ffffff',
            textStyle: {
                color: '#000000',
                align: 'left'
            },
            triggerOn: 'click',
            confine: true,
            // formatter:'{b}月<br/><span style="width:10px;height:10px;backgroundcolor:red;"><span/>{a0}:{c0}<br/>{a1}:{c1}<br/>{a2}:{c2}<br/>{a3}:{c3}'
            formatter: function (params) {
                var content = '';
                //两个for将params中需要的参数嵌入HTML代码块字符串content中
                for (var i = 0; i < params.length; i++) {
                    if (params[i].name) {
                        content += "<div class='charts-tipc'><p class='charts-p'>" + params[i].name + "月</p>";
                        break;
                    }
                }
                for (var i = 0, key = {}; i < params.length; i++) {
                    key = params[i];
                    if (key.value == '')
                        key.value = '0';
                    content += "<p class='charts-p'><div class='charts-r' style='background-color: " + key.color + " ;margin-right:5px;margin-top:6px;width:10px;height:10px;float:left;'></div> " + key.seriesName + " : " + key.value + "天</p>";
                }
                content += '</div>';
                //return出去后echarts会调用html()函数将content字符串代码化
                return content;
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '15%',
            bottom: '10%'
        },
        legend: {
            type: 'plain',
            itemWidth: 15,
            itemHeight: 15,
            data: []
        },
        xAxis: [{
            name: '月',
            nameTextStyle: {
                color: '#3e91d7',
                fontSize: 12
            },
            type: 'category',
            boundaryGap: false,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#3e91d7'
                }
            },
            boundaryGap: true,
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(128, 128, 128, 0)'
                    // type:'dotted'
                }
            }
        }],
        yAxis: [{
            name: '天',
            nameTextStyle: {
                color: '#3e91d7',
                fontSize: 12
            },
            type: 'value',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#3e91d7'
                }
            },
            splitArea: {
                show: true,
                interval: 1,
                areaStyle: {
                    color: ['#101535', '#151e3b']
                }
            },
            splitLine: {
                show: false
            }
        }],
        series: []
    };

    function getData(k) {
        // 获取第一个月份
        let firstMonth = Number(r[k][0].month);
        if (firstMonth != 1) {
            for (let i = 0; i < firstMonth - 1; i++) {
                dom_freshNum.push('');
            }
            for (let i = 0; i < 12 - firstMonth + 1; i++) {
                if (r[k][i] == undefined) {
                    dom_freshNum.push('');
                } else {
                    dom_freshNum.push(Number(r[k][i].batchDays));
                }
            }
        } else {
            for (let i = 0; i < 12; i++) {
                if (r[k][i] == undefined) {
                    dom_freshNum.push('');
                } else {
                    dom_freshNum.push(Number(r[k][i].batchDays));
                }
            }
        }
        var itemLegend = {
            name: dom_freshNameArr[k],
            // 强制设置图形为方形。
            icon: 'rect',
            // 设置文本为红色
            textStyle: {
                fontStyle: 14,
                color: dom_freshColor[k]
            }
        }
        var item = {
            name: dom_freshNameArr[k],
            type: 'line',
            itemStyle: {
                normal: {
                    type: 'default',
                    color: dom_freshColor[k],
                    label: {
                        show: false
                    }
                }
            },
            areaStyle: {
                normal: {
                    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: dom_freshColor[k] // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#101535' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
            data: dom_freshNum
        }
        option_freshSon.legend.data.push(itemLegend);
        option_freshSon.series.push(item);
        dom_freshNum = [];
    }

    if (n == 1) {
        for (var k in r) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (var k in r) {
            getData(k);
        }
        echarts.init(myDiv[0]).setOption(option_freshSon);
        option_freshSon.series = [];
        option_freshSon.legend.data = [];
        dom_freshNameArr = [];
    } else if (n == 2) {
        for (let k = 0; k < 4; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 0; k < 4; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts0')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
        option_freshSon.legend.data = [];
        for (let k = 4; k < r.length; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 4; k < r.length; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts1')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
        option_freshSon.legend.data = [];
        dom_freshNameArr = [];
    } else if (n == 3) {
        for (let k = 0; k < 4; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 0; k < 4; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts0')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
        for (let k = 4; k < 8; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 4; k < 8; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts1')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
        for (let k = 8; k < r.length; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 8; k < r.length; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts2')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
    } else if (n == 4) {
        for (let k = 0; k < 4; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 0; k < 4; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts0')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
        for (let k = 4; k < 8; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 4; k < 8; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts1')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
        for (let k = 8; k < 12; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 8; k < 12; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts2')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
        for (let k = 12; k < r.length; k++) {
            dom_freshNameArr.push(r[k][0].mainSkuName);
        }
        for (let k = 12; k < r.length; k++) {
            getData(k);
        }
        echarts.init(document.getElementsByClassName('echarts3')[0]).setOption(option_freshSon);
        option_freshSon.series = [];
    }
}

/*
    6.月度看板
*/
function toPoint(percent) { //百分数转小数
    var str = percent.replace("%", "");
    str = (str / 100).toFixed(2);
    return str;
}

function board() { //月度看板
    boardInit();
    // 添加点击事件
    $('#btnList input').eq(0).bind('click', function () {
        boardInit();
    });
    for (let i = 1; i < Number(allData.monthDay) + 1; i++) {
        $('#btnList input').eq(i).bind('click', function () {
            if (clickBord == true) {
                boardAjax(i);
            }
        });
    }
}

function boardInit() { //月度看板初始化
    /*
        进入页面时展示累计
        进入页面已有月份按钮点亮并添加事件
    */
    document.getElementById('end0').innerHTML = '(截至' + allData.monthDay + '月)';
    document.getElementById('end1').innerHTML = '(截至' + allData.monthDay + '月)';
    document.getElementById('end2').innerHTML = '(截至' + allData.monthDay + '月)';
    document.getElementById('end3').innerHTML = '(截至' + allData.monthDay + '月)';
    dom_btnAll[0].setAttribute('class', 'active');
    for (let i = Number(allData.monthDay) + 1; i < 13; i++) {
        dom_btnAll[i].setAttribute('class', 'nohaved');
    }
    for (let i = 1; i < Number(allData.monthDay) + 1; i++) {
        dom_btnAll[i].removeAttribute('class', 'active');
    }
    dom_moneySon.innerHTML = parseFloat(allData.allVpoints).toLocaleString() + '元';
    dom_saleSon.innerHTML = parseFloat(allData.allSales).toLocaleString() + '支';
    dom_scanSon.innerHTML = allData.scanP + '<span>&nbsp;&nbsp;(扫码支数/销量支数)</span>';
    dom_vpointsSon.innerHTML = toPoint(allData.vpointsP) + '元/支<span>&nbsp;&nbsp;(兑出金额/销量支数)</span>';
    dom_itemDate.innerHTML = allData.itemDate;
}

function boardAjax(i) { //月度看板请求数据
    clickBord = false;
    $.ajax({
        async: false,
        type: "GET",
        url: myhost[2] + '?itemValue=' + provice + '&monthDay=' + i + '&token=' + vjifenToken,
        data: '',
        success: function (data) {
            let jo = JSON.parse(data);
            console.log('月度看板数据getMonthAllData:');
            console.log(jo);
            for (let i = 0; i < Number(allData.monthDay) + 1; i++) {
                dom_btnAll[i].removeAttribute('class', 'active');
            }
            dom_btnAll[i].setAttribute('class', 'active');
            if (jo.allSales == undefined) {
                document.getElementById('end0').innerHTML = '(' + i + '月)';
                document.getElementById('end1').innerHTML = '(' + i + '月)';
                document.getElementById('end2').innerHTML = '(' + i + '月)';
                document.getElementById('end3').innerHTML = '(' + i + '月)';
                dom_moneySon.innerHTML = parseFloat(jo.allVpoints).toLocaleString() + '元';
                dom_saleSon.innerHTML = '0支';
                dom_scanSon.innerHTML = '0%' + '<span>&nbsp;&nbsp;(扫码支数/销量支数)</span>';
                dom_vpointsSon.innerHTML = '0.00元/支' + '<span>&nbsp;&nbsp;(兑出金额/销量支数)</span>';
            } else {
                document.getElementById('end0').innerHTML = '(' + i + '月)';
                document.getElementById('end1').innerHTML = '(' + i + '月)';
                document.getElementById('end2').innerHTML = '(' + i + '月)';
                document.getElementById('end3').innerHTML = '(' + i + '月)';
                dom_moneySon.innerHTML = parseFloat(jo.allVpoints).toLocaleString() + '元';
                dom_saleSon.innerHTML = parseFloat(jo.allSales).toLocaleString() + '支';
                dom_scanSon.innerHTML = jo.scanP + '<span>&nbsp;&nbsp;(扫码支数/销量支数)</span>';
                dom_vpointsSon.innerHTML = toPoint(jo.vpointsP) + '元/支<span>&nbsp;&nbsp;(兑出金额/销量支数)</span>';
            }
        },
        error: function () {
            console.log('获取项目列表请求接口出错');
        }
    });
    clickBord = true;
}

/*
    7.区域累计和半月扫码
*/
function get_sku(jo) { //获取该区域所有sku并布局
    /*
    1.获取sku个数
    2.在80deg内进行等分获取等分的角度
    3.将每个sku旋转该角度，平移半径距离，在旋转该角度(60_-20之间)
     */
    var myList = jo.skuList;
    console.log(myList);
    if (myList) {
        for (var i = 0; i < myList.length; i++) {
            var createP = document.createElement('p');
            createP.className = 'myP';
            createP.innerHTML = myList[i].skuName;
            dom_content.appendChild(createP);
            skuArr[i] = myList[i].skuKey;
        }
        var myP = document.getElementsByClassName('myP');
        var myN = myP.length;
        var average = 120 / myN;
        var initNum = 60;
        for (var i = 0; i < myP.length; i++) {
            myP[i].classList.add('events');
            if (initNum == 60) {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-4rem) rotateZ(' + (-initNum) + 'deg)';
            } else if (initNum < 0) {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-3.8rem) rotateZ(' + (-initNum) + 'deg)';
            } else {
                myP[i].style.transform = 'rotateZ(' + initNum + 'deg) translate(-3.9rem) rotateZ(' + (-initNum) + 'deg)';
            }
            initNum = initNum - average;
            (function (i) { //闭包
                $('.myP').eq(i).bind('click', function () {
                    if (clickSku == true) {
                        var myskuKey = skuArr[i];
                        var requrl = 'http://59.110.53.118:9008/DBTMainEntStats/screenAction/getItemSkuData.do?itemValue=' + provice + '&skuKey=' + myskuKey + '&token=' + vjifenToken;
                        myajax(requrl);
                    }
                });
            })(i);
        }
    }
    $('#all').bind('click', function () {
        $.ajax({
            async: false,
            type: "GET",
            url: myhost[1] + provice + '&token=' + vjifenToken,
            data: '',
            success: function (data) {
                let jo = JSON.parse(data);
                getSkuChart(jo);
            },
            error: function () {
                console.log('区域累计排行请求接口出错');
            }
        });
    });
}

function myajax(requrl) {
    clickSku = false;
    $.ajax({
        async: false,
        type: "GET",
        url: requrl,
        data: '',
        success: function (data) {
            let jo = JSON.parse(data);
            console.log('区域累计排行的各sku:');
            console.log(jo);
            getSkuChart(jo);
        },
        error: function () {
            console.log('区域累计排行请求接口出错');
        }
    });
}

function getSkuChart(jo) {
    if (jo.detailList == undefined) {
        return;
    }
    let n = jo.detailList.length;
    let dataArr = [],
        scanData = [], //当日开瓶扫码量
        customerData = []; //当日消费者
    if (n == 0) {
        scanData = [0];
        customerData = [0];
    } else {
        for (let i = 0; i < n; i++) {
            let cityName = jo.detailList[i].city;
            if (i < n - 3 && cityName.length > 4) {
                cityName = cityName[0] + cityName[1] + cityName[2] + cityName[3];
            }
            if (i == n - 1) {
                cityName = '未知';
            }
            dataArr.push(cityName);
            jo.detailList[i].scanCounts = jo.detailList[i].scanCounts.replace(/,/g, ""); //取消字符串中出现的所有逗号
            scanData.push(jo.detailList[i].scanCounts);
            jo.detailList[i].userCounts = jo.detailList[i].userCounts.replace(/,/g, "");
            customerData.push(jo.detailList[i].userCounts);
        }
    }
    let dataRe = dataArr.reverse(),
        scanRe = scanData.reverse(),
        userRe = customerData.reverse();

    //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    let resizeexcel = function () {
        dom_rank.style.width = dom_rank.parentNode.style.width;
        dom_rank.style.height = '80%';
    };
    //设置容器高宽
    resizeexcel();
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(dom_rank);
    // 指定图表的配置项和数据
    let option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#ffffff',
            textStyle: {
                color: '#000000',
                align: 'left'
            },
            triggerOn: 'click',
            confine: true
        },
        grid: {
            left: '5%',
            right: '6%',
            bottom: '0',
            top: '40',
            containLabel: true,
            backgroundColor: '#979797'
        },
        xAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#3e91d7'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 9
                    }
                },
                splitLine: {
                    show: false
                },
                axisPointer: false
            },
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#3e91d7'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 9
                    }
                },
                splitLine: {
                    show: false
                },
                axisPointer: false
            }
        ],
        yAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: {
                lineStyle: {
                    color: '#3e91d7'
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 12
                }
            },
            axisTick: {
                alignWithLabel: true
            },
            axisPointer: false,
            data: dataRe
        },
        color: ['#00fef5', '#079eff'],
        series: [{
                name: '累计扫码量',
                type: 'line',
                data: scanRe,
                xAxisIndex: 1,
                markPoint: {
                    animation: false
                }
            },
            {
                name: '累计消费者',
                type: 'bar',
                barWidth: '15',
                data: userRe,
                markPoint: {
                    animation: false
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //用于使chart自适应高度和宽度
    window.onresize = function () {
        //重置容器高宽
        resizeexcel();
        myChart.resize();
    };

    // 基于准备好的dom，初始化echarts实例
    let monthSonChart = echarts.init(dom_monthSon);
    //半月扫码量
    let Data_monthSon = [],
        Data_numSon = [];
    if (jo.monthList.length == 0) {
        function GetDateStr(AddDayCount) { //获取当前日期前后N天的方法
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //获取当前月份的日期 
            var d = dd.getDate();
            return y + "-" + m + "-" + d;
        }
        for (let i = 0; i < 14; i++) {
            Data_monthSon[i] = GetDateStr(-i).slice(5);
            Data_numSon[i] = 0;
        }
        Data_monthSon.reverse();
    } else {
        for (let i = 0; i < jo.monthList.length; i++) {
            if (jo.monthList[i].reportDate[5] == '0') {
                Data_monthSon[i] = jo.monthList[i].reportDate.substr(6, jo.monthList[i].reportDate.length);
            } else {
                Data_monthSon[i] = jo.monthList[i].reportDate.substr(5, jo.monthList[i].reportDate.length);
            }
            Data_numSon[i] = jo.monthList[i].scanCounts;
        }
    }
    let option_monthSon = {
        calculable: true,
        grid: {
            left: '8%',
            right: '5%',
            top: '15%',
            bottom: '15%'
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: Data_monthSon,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#3e91d7'
                }
            },
            boundaryGap: true
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#3e91d7'
                }
            },
            splitArea: {
                show: true,
                interval: 1,
                areaStyle: {
                    color: ['#101535', '#151e3b']
                }
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
            name: '月扫码量',
            type: 'line',
            stack: '总量',
            itemStyle: {
                normal: {
                    type: 'default',
                    color: '#22f5c1',
                    label: {
                        show: true
                    }
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#0e6c7c'
                        },
                        {
                            offset: 1,
                            color: '#0f2140'
                        }
                    ])
                }
            },
            data: Data_numSon
        }]
    };
    monthSonChart.setOption(option_monthSon);
    clickSku = true;
}