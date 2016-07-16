/**
 * location: 浏览器对象
 * location.href = ''    跳转页面重定向方法(常用)
 * location.replace()    跳转页面重定向(并且不能回到当前页面)
 * location.reload()     重新加载当前页面(尝试在缓存中获取)
 * location.reload(true) 强制重新加载当前页面(向服务器重新获取)
 * location.search   获取？q=javascript
 * location.hash     获取#index
 * location.port     获取端口号
 * history: 历史记录对象
 * history.go()      页面前进(1)/后退(-1)/刷新(0)
 * navigator: 浏览器信息对象（用于检测浏览器类型，以便做兼容处理）
 * navigator.plugins 检测浏览器的插件数组(IE无效)
 * screen: 客户端屏幕描述对象
 * screen.availHeight/screen.availWidth 屏幕宽高减去系统部件后的宽高
 * screen.height/width                  屏幕宽高
 * 用户代理字符串: var ua = navigator.userAgent;
 * WebKit 的用户代理字符串中的"AppleWebKit/版本号"是独一无二的
 * 五大呈现引擎： IE、 Gecko、 KHTML、 WebKit 和 Opera
 * 检测Opera版本号  window.opera.version();
 * 检测WebKit版本号 /AppleWebKit\/(\S+)/.test(ua) === true ? RegExp['$1'] : false;
 * 检测KHTML版本号  /KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua) === true ? RegExp['$1'] : false;
 * 检测Gecko版本号  /rv:([^\)]+)\) Gecko\/\d{8}/.test(ua) === true ? RegExp['$1'] : false;
 * 检测IE版本号     /MSIE ([^;]+)/.test(ua) === true ? RegExp['$1'] : false;
 */

/**
 * 检测浏览器引擎名称/版本号
 */
var client = function () {
    var engine = {  //呈现引擎
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //具体的版本号
        ver: null
    };
    var browser = { //呈现浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        //具体的版本
        ver: null
    };
    var system = {  //呈现平台
        win: false,
        mac: false,
        x11: false
    };
    var ua = navigator.userAgent;
    //检测浏览器引擎名称/版本号
    if (window.opera) {
        engine.ver = window.opera.version();
        engine.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
    } else if (/KHTML\/(\S+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.khtml = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.ie = parseFloat(engine.ver);
    }
    //检测浏览器名称/版本号
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
        //确定是 Chrome 还是 Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            //近似地确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
        //确定是不是 Firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }
    //检测平台名称
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p.indexOf("X11") == 0) || (p.indexOf("Linux") == 0);
    return {
        engine: engine,
        browser: browser,
        system: system
    };
}();


(function () {

    'use strict';

    /* 兼容浏览器 (获取视口大小) */
    function viewportSize() {
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return {
            w: w,
            h: h
        };
    }

    /* 使用 timeout 实现间歇调用(实现间歇调用的最佳方案) */
    function timeoutCoutFn(onNum, offNum) {
        var countNum = function () {
            if (onNum <= offNum) {
                console.log(onNum++);
                setTimeout(countNum, 500);
            }
        };
        return setTimeout(countNum, 500);
    }

})();
/**
 * window: 浏览器全局对象
 * document: 文档对象
 * location: 保存着当前文档的信息,以及提供一些导航功能
 */
console.log(document.location === window.location); //true

/* 跳转到一个URL 通常浏览器会阻止跳转 */
//等同于< a href="http://www.wrox.com" target="topFrame"></a>
window.open("http://www.wrox.com/", "topFrame", 'location = no');

/* Opera 和 IE7（及更高版本）中默认禁用 只在window下使用 */
//将窗口移动到(200,300)
window.moveTo(200, 300);
//将窗口向左移动 50 像素(相对于当前尺寸调整)
window.moveBy(-50, 0);
//调整到 100× 100
window.resizeTo(100, 100);
//调整到 200× 150(相对于当前尺寸调整)
window.resizeBy(100, 50);

/* 浏览器视口（viewport）大小 */
// IE6-
console.log(document.body.clientWidth);
console.log(document.body.clientHeight);
// IE、 Firefox、 Safari、 Opera 和 Chrome
console.log(document.documentElement.clientWidth);
console.log(document.documentElement.clientHeight);
// IE9+、 Firefox、 Safari、 Opera 和 Chrome
console.log(window.innerWidth);
console.log(window.innerHeight);

/* 系统对话框 */
alert(1); //警告框
confirm('1'); //选择型警告框
prompt('message', 'defaultValue'); //提示框

/* 间歇调用和超时调用 */
//设置超时调用
var timeoutId = setTimeout(function () {
    alert(1000 + 'ms');
}, 1000);
//取消超时调用
clearTimeout(timeoutId);
//设置间歇调用(最好避免使用)
var count = 0;
setInterval(function () {
    count++;
    console.log(count);
}, 5000);
//累加到 max 自动关闭计时器
var intervalID = function () {
    var count = 0,
        max = 10;
    return setInterval(function () {
        if (count === max - 1) {
            clearInterval(intervalID);
        }
        console.log(++count);
    }, 1000);
}();
//取消间歇调用
clearInterval(intervalID);

//使用 timeout 实现间歇调用(实现间歇调用的最佳方案)
var timeoutCount = function () {
    var count = 0,
        max = 10;

    function countNum() {
        if (count < max) {
            console.log(++count);
            setTimeout(countNum, 500);
        }
    }

    return setTimeout(countNum, 500);
}();


