/**
 * Event事件处理对象
 * 捕获--处于--冒泡 （捕获先于冒泡）
 * 事件监听  addEventListener(); and attachEvent();
 * 事件绑定  box.onclick = function(e){};
 * 事件代理  最适合采用事件委托技术的事件包括:
 *         (click、mousedown、mouseup、keydown、keyup 和 keypress)
 * 事件删除  ele.onclick = null;
 *
 * 事件模拟  可自定义事件，通过ele.dispatchEvent(事件对象); 触发事件
 *          创建事件：  var event = document.createEvent("Events");
 *          初始化事件: event.initEvents('自定义事件名称', 是否冒泡, 是否可被取消);
 *                    event.view = document.defaultView;
 *          绑定事件：  addEvent(ele, '自定义事件名称', fn);
 *          触发事件：  ele.dispatchEvent(event);
 *
 * 属性：
 * .eventPhase         --- 事件阶段，返回（1捕获，2处于，3冒泡）
 * .preventDefault();  --- 阻止默认事件
 * event.returnValue = false; (IE中阻止默认事件)
 * .stopPropagation(); --- 阻止冒泡/捕获
 * event.cancelBubble = true;  (IE中阻止冒泡/捕获)
 * .target             --- 当前触发事件的对象
 * event.srcElement;           (IE中当前触发事件的对象)
 * .currentTarget      --- 绑定事件时的对象
 * .type               --- 被触发事件的类型  例如：'click'
 * 事件类型：
 * 1、UI事件
 * load          DOM加载完成时事件
 * unload        DOM卸载完成时事件
 * resize        窗口(overflow)框架(iframe)改变时事件
 * select        选择文本框内文本时事件
 * scroll        滚动 带滚动条元素时事件
 * abort         下载未完成终止时事件
 * error         发生错误时事件
 * 2、焦点事件
 * focus         获得焦点时事件(不冒泡)
 * blur          失去焦点时事件(不冒泡)
 * focusin       获得焦点时事件(会冒泡)
 * focusout      失去焦点时事件(会冒泡)
 * 3、鼠标与滚轮事件
 * click         鼠标点击事件
 * dblclick      鼠标双击事件
 * mouseenter    鼠标移入时事件(不冒泡)
 * mouseleave    鼠标移出时事件(不冒泡)
 * mouseout      鼠标移入时事件(会冒泡)
 * mouseover     鼠标移出时事件(会冒泡)
 * mousemove     鼠标移动事件
 * mousedown     鼠标点下时事件
 * mouseup       鼠标释放时事件
 * e.clientX     获得相对元素的可视窗口横坐标
 * e.clientY     获得相对元素的可视窗口纵坐标
 * e.pageX       获得鼠标光标的相对文档页面的横坐标(IE8之前不支持)
 * e.pageY       获得鼠标光标的相对文档页面的纵坐标(IE8之前不支持)
 * e.screenX     获取相对显示器的横坐标
 * e.screenY     获取相对显示器的纵坐标
 * mousewheel    鼠标滚轮事件
 * e.wheelDelta  滚轮向前返回120的倍数，滚轮向后返回-120是倍数
 * 4、修改键
 * e.shiftKey e.ctrlKey e.altKey e.metaKey (布尔值, 是否按下)
 * 5、相关元素 (事件触发时的元素)
 * e.relatedTarget  IE8之前不支持
 * e.toElement      IE8支持 获得移入前最后一个触碰的元素
 * e.fromElement    IE8支持 获得移出时第一个触碰到的元素
 * 6、键盘与文本事件 (keydown -> keypress -> keyup)
 * keypress         按下字符键时事件(不松手，会重复触发)先执行keydown再执行keypress最后keyup
 * keydown          按下任意键时事件(不松手，会重复触发)
 * keyup            释放键盘按键时事件
 * textInput        文本事件(文本插入文本框之前触发)用于显示之前做处理 IE9+
 * e.data           获得文本输入时按下的字符
 * event.inputMethod表示输入文本的方式是什么，返回数字(查手册)
 * 键码属性:          e.keyCode;
 * 字符键码属性:      e.charCode; (只在 keypress 事件中存在)
 * 7、HTML5事件
 * contextmenu      上下文菜单事件(属于鼠标事件，右键菜单)
 * DOMContentLoaded DOM树加载完成时事件(类似jQuery中的.ready事件) IE9+
 * readystatechange 提供文档或元素加载时的状态信息，document.readyState
 * beforeunload     卸载前时事件(指定event.returnValue = '值用于提示用户')
 *
 * window.scrollBy(100, 100); 滚动条偏移  100，100
 * window.scrollTo(0, 0);     滚动条移动到 0，0
 */

/**
 * Event运行区
 */
window.onload = function () {

    'use strict';

    var butGoTop = document.getElementById('go-top'),
        content  = document.querySelectorAll('.content')[0];
    var nes = document.querySelectorAll('.nes');
    var span1 = nes[1].querySelectorAll('span')[0],
        span2 = nes[0].querySelectorAll('span')[0],
        span3 = content.querySelectorAll('span')[0];
    var loop0 = nes[1].querySelector('p.loop');

    /**
     * 右键菜单
     */
    (function () {
        var onMenu = function(e) {
            e = EventUtil.getEvent(e);
            EventUtil.preventDefault(e);
            var rightMenu = document.getElementById('rightMenu');
            rightMenu.style.left = e.clientX + 'px';
            rightMenu.style.top = e.clientY + 'px';
            rightMenu.style.display = 'block';
        };
        EventUtil.addEvent(span3.parentNode, 'contextmenu', onMenu);
        EventUtil.addEvent(document, 'click', function () {
            document.getElementById('rightMenu').style.display = 'none';
        });
    })();

    /**
     * //事件代理(委托)
     * //处理一个模块下多元素同事件绑定
     * //与动态加载DOM时给子元素添加事件绑定
     */
    (function () {
        var onAgent = function(e) {
            e = EventUtil.getEvent(e);
            var target = EventUtil.getTarget(e);
            target.style.color = '#fff';
            switch (target.innerText) {
                case '1':
                    target.style.background = '#E74C3C';
                    break;
                case '2':
                    target.style.background = '#9B59B6';
                    break;
                case '3':
                    target.style.background = '#1ABC9C';
                    break;
            }
        };
        EventUtil.addEvent(span3.parentNode, 'click', onAgent);
    })();

    /**
     * 滚动条事件(过渡置顶按钮功能)
     */
    EventUtil.addEvent(window, 'scroll', function () {
        if (document.documentElement.scrollTop || document.body.scrollTop) {
            butGoTop.onclick = goTop;
            butGoTop.style.display = 'block';
        } else {
            butGoTop.onclick = null;
            butGoTop.style.display = 'none';
        }
    });

    /**
        //事件监听
        var testAlert = function() {
            console.log(this.className);
        };
        EventUtil.addEvent(loop0, 'click', testAlert);
        EventUtil.addEvent(loop0, 'click', function(e) {
            e = EventUtil.getEvent(e);
            console.log(e);
        }, false);
        EventUtil.removeEvent(loop0, 'click', testAlert);
    */

    /**
        //绑定多个事件
        var handler = function (e) {
              e = EventUtil.getEvent(e);
              switch(e.type) {
                  case 'mouseover':
                      EventUtil.getTarget(e).style.backgroundColor = '#E74C3C';
                      span1.parentNode.style.backgroundColor = '#3498DB';
                      console.log(EventUtil.getRelatedTarget(e));
                      break;
                  case 'click':
                      span2.parentNode.style.backgroundColor = '#2ECC71';
                      EventUtil.stopPropagation(e);
                      break;
                  case 'mouseout':
                      EventUtil.stopPropagation(e);
                      break;
              }
          };
        loop0.onmouseover = handler;
        loop0.onmouseout = handler;
        loop0.onclick = handler;
        span3.parentNode.onclick = function() {
              this.style.backgroundColor = '#27AE60';
          };
        span1.parentNode.onmouseout = function (e) {
              e = EventUtil.getEvent(e);
              span3.parentNode.style.backgroundColor = '';
              span2.parentNode.style.backgroundColor = '';
              span1.parentNode.style.backgroundColor = '';
              loop0.style.backgroundColor = '';
              console.log(EventUtil.getRelatedTarget(e));
              EventUtil.stopPropagation(e);
          };
     */

    /**
        //阻止事件冒泡
        EventUtil.addEvent(span1.parentNode, 'click', function(e) {
            e = EventUtil.getEvent(e);
            console.log(EventUtil.getTarget(e));
        });
        EventUtil.addEvent(span1, 'click', function(e) {
            e = EventUtil.getEvent(e);
            console.log(1);
            EventUtil.stopPropagation(e);
        });
     */

    /**
        //获取相对视口坐标
        EventUtil.addEvent(span3.parentNode, 'click', function(e) {
            e = EventUtil.getEvent(e);
            console.log('X: ' + e.clientX + ',' + 'Y: ' +e.clientY);
        });
     */

    /**
        //获取相对页面文档坐标
        EventUtil.addEvent(span3.parentNode, 'click', function(e) {
            e = EventUtil.getEvent(e);
            console.log('X: ' + EventUtil.getPage(e).X + ',' +
                        'Y: ' + EventUtil.getPage(e).Y);
        });
     */

    /**
        //判断是否按下键盘按键
        EventUtil.addEvent(loop0, 'click', function (e) {
            e = EventUtil.getEvent(e);
            var arrKey = [e.type];
            if (e.shiftKey) {
                arrKey.push('Shift');
            }
            if (e.ctrlKey) {
                arrKey.push('Ctrl');
            }
            if (e.altKey) {
                arrKey.push('Alt');
            }
            if (e.metaKey) {
                arrKey.push('Meta');
            }
            console.log(arrKey.join(' + '));
            EventUtil.stopPropagation(e);
        });
     */

    /**
        //获取滚轮滚动方向(负值为向下，正值为向上)
        (function() {
            'use strict';

            var getDetail = function(e) {
                e = EventUtil.getEvent(e);
                console.log(EventUtil.getWheelDelta(e));
            };

            EventUtil.addEvent(document, 'mousewheel', getDetail);
            EventUtil.addEvent(window, 'DOMMouseScroll', getDetail);

        })();
     */

    /**
        //获字符取键码
        //使用String.fromCharCode(keyCode)转为字符
        EventUtil.addEvent(document, 'keypress', function(e) {
            e = EventUtil.getEvent(e);
            console.log(String.fromCharCode(EventUtil.getKeyCode(e)));
        });
     */

    /**
        //自定义事件(创建事件对象，模拟事件)
        var menuLi = document.getElementById("rightMenu").children[0];
        //创建事件对象
        var event = document.createEvent("Events");
        //初始化事件对象
        event.initEvent('xx', true, true);
        event.view = document.defaultView;
        //为元素绑定自定义事件对象
        EventUtil.addEvent(menuLi, 'xx', function(){
            alert(1);
        });
        //触发事件
        menuLi.dispatchEvent(event);
     */

};
