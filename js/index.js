	// js文件中要大量使用变量 特别是echarts初始化 为防止变量冲突每个模块采用立即执行函数 (function(){})();

	// tab栏切换 监控模块
	(function() {
		$(".tabs>a").on("click", function() {
			$(this).addClass("active").siblings("a").removeClass("active")
			$(".content").eq($(this).index()).show().siblings(".content").hide()
		})
	})();

	// 点位分布图模块 饼状图
	(function() {
		var myChart = echarts.init(document.querySelector(".pie-left"))
		option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			color: ["#006cff", "#60cda0", "#ed8884", "#ff9f7f", "#0096ff", "#9fe6b8", "#32c5e9", "#1d9dff"],
			series: [{
				name: '点位统计',
				type: 'pie',
				radius: ['10%', '70%'],
				center: ['50%', '50%'],
				roseType: 'radius',
				data: [{
						value: 20,
						name: '云南'
					},
					{
						value: 26,
						name: '北京'
					},
					{
						value: 24,
						name: '山东'
					},
					{
						value: 25,
						name: '河北'
					},
					{
						value: 20,
						name: '江苏'
					},
					{
						value: 25,
						name: '浙江'
					},
					{
						value: 30,
						name: '四川'
					},
					{
						value: 42,
						name: '湖北'
					}
				],
				// 设置文字和引导线长度 防止缩放时文字被遮挡
				label: {
					fontSize: 10
				},
				labelLine: {
					length: 6,
					length2: 8
				}
			}]
		};
		myChart.setOption(option)

		// 浏览器缩放时 图表等比例缩放
		window.addEventListener("resize", function() {
			// 屏幕变化是 图表调用resize
			myChart.resize()
		})
	})();

	// 全国用户统计模块 柱状图
	(function() {
		// 用于设置中间三个柱形的样式
		var barCss = {
			value: 1200,
			// 修改该柱形样式
			itemStyle: {
				color: '#254065'
			},
			// 鼠标悬停时不想要高亮
			emphasis: {
				itemStyle: {
					color: '#254065'
				}
			},
			// 鼠标悬停时不要提示框
			tooltip: {
				extraCssText: 'opacity:0'
			}
		}
		var myChart = echarts.init(document.querySelector(".bar-left"))

		var option = {
			color: new echarts.graphic.LinearGradient(
				// (x1,y1)到(x2,y2)之间进行渐变
				0,
				0,
				0,
				1,
				[{
						offset: 0,
						color: "#00fffb"
					}, //起始颜色
					{
						offset: 1,
						color: "#0061ce"
					}, //结束颜色
				]
			),
			tooltip: {
				trigger: 'item',
			},

			grid: {
				left: '0%',
				right: '3%',
				bottom: '3%',
				top: '3%',
				containLabel: true,
				show: true,
				borderColor: 'rgba(0,240,255,0.3)'
			},
			xAxis: [{
				type: 'category',
				data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
				axisTick: {
					alignWithLabel: false,
					show: false
				},
				axisLabel: {
					color: '#4c9bfd'
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(0,240,255,0.3)'
					}
				}
			}],
			yAxis: [{
				type: 'value',
				axisTick: {
					show: false,
				},
				axisLabel: {
					color: '#4c9bfd'
				},
				splitLine: {
					lineStyle: {
						color: 'rgba(0,240,255,0.3)'
					}
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(0,240,255,0.3)'
					}
				}
			}],
			series: [{
				name: '',
				type: 'bar',
				barWidth: '60%',
				data: [2100, 1900, 1700, 1560, 1400, barCss, barCss, barCss, 900, 750, 600, 488, 240]
			}]
		};
		myChart.setOption(option)
		window.addEventListener("resize", function() {
			myChart.resize()
		})

	})();


	// 订单模块
	(function() {
		$(".tab").on("click", "span", function() {
			$(".data").eq($(this).index()).show().siblings(".data").hide()
			$(this).addClass("active").siblings("span").removeClass("active")
		})
	})();


	// 销售统计模块
	(function() {
		var datas = [{
			YQ: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
			SJ: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
		}, {
			YQ: [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
			SJ: [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
		}, {
			YQ: [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
			SJ: [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
		}, {
			YQ: [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
			SJ: [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
		}]
		var data = datas[0]
		lineEcharts(data)

		function lineEcharts(data) {
			var myChart = echarts.init(document.querySelector(".lineChart"))
			var option = {
				color: ['#00f2f1', '#ed3f35'],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['预期销售额', '实际销售额'],
					right: '10%',
					textStyle: {
						color: '#4c9bfd'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '18%',
					show: true,
					borderColor: '#012f4a',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12 月'],
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#4c9bfd'
					},
					axisLine: {
						show: false
					}
				},
				yAxis: {
					type: 'value',
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#4c9bfd'
					},
					splitLine: {
						lineStyle: {
							color: '#012f4a'
						}
					}
				},
				series: [{
						name: '预期销售额',
						type: 'line',
						stack: '总量',
						data: data.YQ,
						// 折线修饰为圆滑曲线
						smooth: true
					},
					{
						name: '实际销售额',
						type: 'line',
						stack: '总量',
						data: data.SJ,
						smooth: true
					}
				]
			};
			myChart.setOption(option)
			window.addEventListener("resize", function() {
				myChart.resize()
			})
		}
		// tab栏点击切换
		$(".sales span").on("click", function() {
			$(this).addClass("current").siblings("span").removeClass("current")
			data = datas[$(this).index() - 1]
			lineEcharts(data)
			index = $(this).index() - 1
		})

		// tab栏自动切换
		var index = 0;
		var spans = $(".sales span")
		var timer = setInterval(function() {
			index++;
			if (index >= 4) {
				index = 0
			}
			spans.eq(index).click()
		}, 1500)

		// 鼠标经过sales 停止计时器
		// $(".sales").on("mouseenter",function(){
		// 	clearInterval(timer)
		// 	timer = null;
		// })
		// $(".sales").on("mouseleave",function(){
		// 	timer =	setInterval(function(){
		// 		index++;
		// 		if(index >= 4){
		// 			index = 0
		// 		}
		// 		spans.eq(index).click()
		// 	},1500)
		// })
		$(".sales").hover(function() {
			clearInterval(timer)
			timer = null;
		}, function() {
			timer = setInterval(function() {
				index++;
				if (index >= 4) {
					index = 0
				}
				spans.eq(index).click()
			}, 1500)
		})

	})();

	// 渠道分布模块 雷达图
	(function() {
		var myChart = echarts.init(document.querySelector(".radar"))
		var data = [
			[90, 19, 56, 11, 34, 76],
		];
		var option = {
			tooltip: {
				show: true,
				position: ['60%', '10%']
			},
			radar: {
				center: ['50%', '50%'],
				radius: '60%',
				indicator: [{
						name: '机场',
						max: 100
					},
					{
						name: '商场',
						max: 100
					},
					{
						name: '火车站',
						max: 100
					},
					{
						name: '汽车站',
						max: 100
					},
					{
						name: '地铁',
						max: 100
					},
				],
				shape: 'circle',
				splitNumber: 4,
				name: {
					textStyle: {
						color: '#4C9BFD'
					}
				},
				splitLine: {
					lineStyle: {
						color: 'rgba(255,255,255,0.5)'
					}
				},
				splitArea: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255, 255, 255, 0.5)'
					}
				}
			},
			series: [{
				name: '北京',
				type: 'radar',
				lineStyle: {
					normal: {
						width: 1,
						opacity: 0.5,
						color: '#fff'
					}
				},
				data: data,
				symbol: 'circle',
				symbolSize: 3,
				itemStyle: {
					color: '#Fff'
				},
				label: {
					show: true,
					fontSize: 10,
					color: '#fff'
				},
				areaStyle: {
					color: 'rgba(238,197,102,0.6)'
				}
			}]
		};
		myChart.setOption(option)
		window.addEventListener("resize", function() {
			myChart.resize()
		})
	})();

	// 季度进度模块
	(function() {
		var myChart = echarts.init(document.querySelector(".zhihen-chart"))

		var option = {
			series: [{
				name: '销售季度模块',
				type: 'pie',
				radius: ['50%', '70%'],
				labelLine: {
					show: false
				},
				hoverOffset: 0,
				startAngle: 180,
				radius: ['130%', '150%'],
				center: ['48%', '80%'],
				data: [{
						value: 100,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#00c9e0'
								},
								{
									offset: 1,
									color: '#005fc1'
								}
							])
						}
					},
					{
						value: 100,
						itemStyle: {
							color: '#12274d'
						}
					},
					{
						value: 200,
						itemStyle: {
							color: 'transparent'
						}
					},

				]
			}]
		};

		myChart.setOption(option)
		window.addEventListener("resize", function() {
			myChart.resize()
		})
	})();
	(function() {
		var hotData = [{
				city: "北京", // 城市
				sales: "25, 179", // 销售额
				flag: true, //  上升还是下降
				brands: [
					//  品牌种类数据
					{
						name: "可爱多",
						num: "9,086",
						flag: true
					},
					{
						name: "娃哈哈",
						num: "8,341",
						flag: true
					},
					{
						name: "喜之郎",
						num: "7,407",
						flag: false
					},
					{
						name: "八喜",
						num: "6,080",
						flag: false
					},
					{
						name: "小洋人",
						num: "6,724",
						flag: false
					},
					{
						name: "好多鱼",
						num: "2,170",
						flag: true
					}
				]
			},
			{
				city: "河北",
				sales: "23,252",
				flag: false,
				brands: [{
						name: "可爱多",
						num: "3,457",
						flag: false
					},
					{
						name: "娃哈哈",
						num: "2,124",
						flag: true
					},
					{
						name: "喜之郎",
						num: "8,907",
						flag: false
					},
					{
						name: "八喜",
						num: "6,080",
						flag: true
					},
					{
						name: "小洋人",
						num: "1,724",
						flag: false
					},
					{
						name: "好多鱼",
						num: "1,170",
						flag: false
					}
				]
			},
			{
				city: "上海",
				sales: "20,760",
				flag: true,
				brands: [{
						name: "可爱多",
						num: "2,345",
						flag: true
					},
					{
						name: "娃哈哈",
						num: "7,109",
						flag: true
					},
					{
						name: "喜之郎",
						num: "3,701",
						flag: false
					},
					{
						name: "八喜",
						num: "6,080",
						flag: false
					},
					{
						name: "小洋人",
						num: "2,724",
						flag: false
					},
					{
						name: "好多鱼",
						num: "2,998",
						flag: true
					}
				]
			},
			{
				city: "江苏",
				sales: "23,252",
				flag: false,
				brands: [{
						name: "可爱多",
						num: "2,156",
						flag: false
					},
					{
						name: "娃哈哈",
						num: "2,456",
						flag: true
					},
					{
						name: "喜之郎",
						num: "9,737",
						flag: true
					},
					{
						name: "八喜",
						num: "2,080",
						flag: true
					},
					{
						name: "小洋人",
						num: "8,724",
						flag: true
					},
					{
						name: "好多鱼",
						num: "1,770",
						flag: false
					}
				]
			},
			{
				city: "山东",
				sales: "20,760",
				flag: true,
				brands: [{
						name: "可爱多",
						num: "9,567",
						flag: true
					},
					{
						name: "娃哈哈",
						num: "2,345",
						flag: false
					},
					{
						name: "喜之郎",
						num: "9,037",
						flag: false
					},
					{
						name: "八喜",
						num: "1,080",
						flag: true
					},
					{
						name: "小洋人",
						num: "4,724",
						flag: false
					},
					{
						name: "好多鱼",
						num: "9,999",
						flag: true
					}
				]
			},
		]
		// 声明一个空字符串 
		var dataLeftHtml = '';
		$.each(hotData, function(index, obj) {
			// var upOrDown = ''
			// if(obj.flag){
			// 	upOrDown = "icon-up"
			// } else{
			// 	upOrDown = "icon-down"
			// }

			// 字符串拼接 遍历结束后  是五个li
			// dataLeftHtml += `<li class="row"><span>${obj.city}</span><span>${obj.sales}<i class=${upOrDown}></i></span>`
			// 在判断和后面的小图标时 可以用上面的加一个if判断 也可以直接在class后面${三元表达式}
			dataLeftHtml +=
				`<li><span>${obj.city}</span><span>${obj.sales}<i class=${obj.flag?"icon-up":"icon-down"}></i></span>`

		})
		// html可以识别标签
		$(".main-data-left").html(dataLeftHtml)

		//鼠标进入data-left 当前小li 高亮显示
		$(".main-data-left>li").on("mouseenter", function(e) {
			index = $(this).index()
			render($(this), $(this).index())
		})

		function render(obj) {
			obj.addClass("active").siblings("li").removeClass("active")
			// 遍历hotData里面的brands对象
			var dataRightHtml = '';
			$.each(hotData[obj.index()].brands, function(index, obj) {
				dataRightHtml +=
					`<li><span>${obj.name}</span><span>${obj.num}<i class=${obj.flag?"icon-up":"icon-down"}></i></span>`
			})
			$(".main-data-right").html(dataRightHtml)
		}

		// 默认第一个
		$(".main-data-left>li").eq(0).mouseenter()


		// 自动
		var index = 0;
		var timer = setInterval(function() {
			index++;
			if (index >= $(".main-data-left>li").length) {
				index = 0
			}
			render($(".main-data-left>li").eq(index), index)
		}, 2000)

		$(".main-data-left").hover(function() {
			clearInterval(timer)
			timer = null
		}, function() {
			timer = setInterval(function() {
				index++;
				if (index >= $(".main-data-left>li").length) {
					index = 0
				}
				render($(".main-data-left>li").eq(index))
			}, 2000)
		})

		//BUG 鼠标离开触发mouseenter mouseter清除定时器 造成定时器卡住
		// 解决方案使用遍历渲染 可以把前面的代码封装成一个函数

	})();



