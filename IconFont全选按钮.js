// ==UserScript==
// @name         IconFont 全选按钮
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  当图标素材很多的时候, 你就会发现这她(btn)的美好
// @author       HowesDOMO
// @match        https://www.iconfont.cn/collections/detail?cid=*
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// @grant        none
// @run-at document-end
// ==/UserScript==

(function () {
	'use strict';

	console.log('请先在素材较少的项目尝试本功能, 注意素材较多时请耐心等待.');
    console.log('howe@enpot.com.cn');

	var btn = "<input id='btnSelectAll' type='button' value='select All'onClick='' />";
	$("body").append(btn);
	$("#btnSelectAll").click(function () {
		// var match = $("ul .block-icon-list.clearfix");
        var match = $(".block-icon-list.clearfix");
        console.log(match);
		if (match.length <= 0) {
			console.error('失败');
            console.error(match);
			return;
		}

		console.log('成功找到');
		// 开始正式的逻辑
        //// 成功点击选中第一个 icon
		//         var temp = match[1].children[0].children[2].children[0];
		//         console.log(temp);
		//         $(temp).trigger("click");

		// match 当前会命中2个元素, icon素材目前(2020-7-4)位于第二个位置
		$.each(match[1].children, function(i, v)
		{
            $(v.children[2].children[0]).trigger("click"); // 模拟触发点击
        });
	});
})();