// ==UserScript==
// @name         虾米音乐 - 歌词大只字 - VN7
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  虾米音乐歌词变大
// @author       HowesDOMO
// @match        *://www.xiami.com/play?*
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @run-at       document-end
// @namespace undefined
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){

        var $ = $ || window.$;
        console.log("****************** Hello Tampermonkey ******************");

        // 修改底图颜色
        var J_mainWrap = $("#J_mainWrap");
        J_mainWrap.css("background", "#e1dfd0");

        // 修改歌词字体大小
        var div_Lrc = $("#J_playerLrc");
        div_Lrc.css("font-size", "30px");

        var J_tab = $("#J_tab");
        J_tab.css("display", "none");

        // J_tab.hide();

        // 修改布局 凸显歌词
        var width_Css_Min = { "width" : "0px" };
        var width_Css = { "width" : "800px" };

        var J_albumCover = $("#J_albumCover");
        J_albumCover.css("display", "none");

        var J_playerCover = $("#J_playerCover");
        J_playerCover.css("display", "none");

        var J_lrcWrap = $("#J_lrcWrap");
        J_lrcWrap.css(width_Css);

        var J_lyricScrollWrap = $("#J_lyricScrollWrap");
        J_lyricScrollWrap.css(width_Css);
        J_lyricScrollWrap.css("top", "25px");

        // 自动开启高品质
        var J_playerHQ = $("#J_playerHQ");
        J_playerHQ.click();

        // 隐藏 开启高品质 提示
        var J_playerHQ_tip = $("#J_playerHQ-tip");
        J_playerHQ_tip.css("display", "none");


    }, 1000);

})();