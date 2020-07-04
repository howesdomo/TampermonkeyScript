// ==UserScript==
// @name         IconFont 全选按钮
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  当图标素材很多的时候, 你就会发现这她(btn)的美好
// @author       HowesDOMO
// @match        https://www.iconfont.cn/collections/detail*
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// @grant        none
// @run-at document-end
// ==/UserScript==


(function () {
	'use strict';

	console.log('请先在素材较少的项目尝试本功能, 注意素材较多时请耐心等待.');
	console.log('howe@enpot.com.cn');

	var timer1 = null;

	window.onload = function () {
		console.log('加载完毕window.onload');
		start();
	};

	var start = function () {
		if (timer1)
			return;
		console.log("start");
		timer1 = setInterval(function () {
			try {
				method();
			}
			finally {
				end();
			}
		}, 5000);
	}

	var end = function () {
		console.log("end");
		if (timer1) {
			clearInterval(timer1);
			timer1 = null;
		}
	}

	var method = function () {
		
		// Step 1 -- 向页面添加模拟点击按钮
		var btn = "<input id='btnSelectAll' type='button' value='模拟点击全部素材' />";

		// $("div .block-radius-btn-group clearfix")
		var matchDiv = $("div .block-radius-btn-group.clearfix");
		$(matchDiv[0]).append(btn);

		// Step 2 -- 注册点击事件逻辑
		$("#btnSelectAll").click(function () {
			var match = $(".block-icon-list.clearfix");
			
			if (match.length <= 0) {
				console.error('异常 -- 找不到 .block-icon-list.clearfix');
				console.error(match);
				return;
			}

			console.log('待选共 ' + match[1].children.length + ' 项');
			console.log('正在选中, 请稍候...');
			// match 当前会命中2个元素, icon素材目前(2020-7-4)位于第二个位置
			$.each(match[1].children, function (i, v) {
				$(v.children[2].children[0]).trigger("click"); // 模拟触发点击
			});
			console.log('已完成选中');
		});
	};
})();