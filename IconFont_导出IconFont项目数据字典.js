// ==UserScript==
// @name         导出IconFont项目数据字典
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  用于编写数据字典, 便于在XAML中阅读
// @author       HowesDOMO
// @match        https://www.iconfont.cn/manage/index?manage_type=*
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/1.5.16/clipboard.min.js
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

		// Step 1 -- 向页面添加导出按钮 / 拷贝导出内容按钮(隐藏)
		var btnExportDict = "<input id='btnExportDict' type='button' value='导出数据字典(C#)' />";
		var lblCopyContent = "<input id='lblCopyContent' type='text' style='width:5px' />";
		var btnClipboard = "<button id='btnClipboard' data-clipboard-target='#lblCopyContent' style='display:none'>Clipboard</button>";

		// $("div .block-radius-btn-group clearfix")
		var matchDiv = $("div .block-radius-btn-group.clearfix");
		$(matchDiv[0]).append(btnExportDict);
		$(matchDiv[0]).append(lblCopyContent);
		$(matchDiv[0]).append(btnClipboard);

		var clipboard = new Clipboard('#btnClipboard');

		clipboard.on('success', function (e) {
// 			console.info('Action:', e.action);
// 			console.info('Text:', e.text);
// 			console.info('Trigger:', e.trigger);

			e.clearSelection();
		});

		clipboard.on('error', function (e) {
			console.error('Action:', e.action);
			console.error('Trigger:', e.trigger);
		});

		// Step 2 -- 导出事件逻辑
		$("#btnExportDict").click(function () {
			var match = $(".block-icon-list.clearfix");

			if (match.length <= 0) {
				console.error('异常 -- 找不到 .block-icon-list.clearfix');
				console.error(match);
				return;
			}
			var sb = "";
			console.log('待选共 ' + match[1].children.length + ' 项');
			console.log('正在计算, 请稍候...');
			// match 当前会命中2个元素, icon素材目前(2020-7-4)位于第二个位置
			$.each(match[1].children, function (i, v) {
				var name = v.children[1].innerText;
				var code = v.children[2].innerText;
				// console.log(name);
				// console.log(code);
				var total = '{"' + name + '", "' + code + '"}, ';
				sb = sb + "\r\n" + total;
			});
			console.log(sb);
			console.log('已完成计算');
			$("#lblCopyContent").val(sb);
			$("#btnClipboard").trigger("click");
            alert("已拷贝到系统粘贴板");
		});
	};
})();