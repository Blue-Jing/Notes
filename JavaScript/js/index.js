/**
 * Array数组 ES5 原生方法
 */
(function () {
    'use strict';
    window.test = {
        doEvery: everyFn,
        doSome: someFn,
        doFilter: filterFn,
        doMap: mapFn,
        doForEach: forEachFn,
        doReduce: reduceFn,
        doReduceRight: reduceRightFn
    };

    function everyFn(arr) {
        return arr.every(function (item, index, array) {
            return item > 2;
        });
    }

    function someFn(arr) {
        return arr.some(function (item, index, array) {
            return item > 2;
        });
    }

    function filterFn(arr) {
        return arr.filter(function (item, index, array) {
            return item > 2;
        });
    }

    function mapFn(arr) {
        return arr.map(function (item, index, array) {
            return item * 2;
        });
    }

    function forEachFn(arr) {
        return arr.forEach(function (item, index, array) {
            console.log(index);
        });
    }

    //正序归并
    function reduceFn(arr) {
        return arr.reduce(function (prev, cur, index, array) {
            return prev;
        });
    }

    //倒序归并
    function reduceRightFn(arr) {
        return arr.reduceRight(function (prev, cur, index, array) {
            return prev;
        });
    }

})();


(function () {

    'use strict';

    /**
     * @var {Object}
     * @desc 练习小功能块
     * @property {Function} htmlEscape - 属性htmlEscapeFn
     */
    window.Demo = {
        htmlEscape: htmlEscapeFn,
        fator: fatorFn,
        selectFrom: selectFromFn,
        quickSort: quickSortFn,
        arrKeySort: arrKeySortFn,
        hasProtoProperty: hasProtoPropertyFn,
        screen: screenFn,
        timeoutCount: timeoutCountFn,
        getURLParameter: getURLParameterFn,
        addSign: addSignFn,
        convertToArray: convertToArrayFn,
        reNullText: reNullTextFn,
        loadScript: loadScriptFn,
        loadStyleFn: loadStyleFn,
        removeClass: removeClassFn,
        getInnerText: getInnerTextFn,
        setInnerText: setInnerTextFn,
        getDocSize: getDocSizeFn,
        getElementLeft: getElementLeftFn,
        getElementTop: getElementTopFn

    };

    /**
     * @func
     * @desc html字符串转义
     * @method htmlEscape();
     * @for Dome
     * @param {String} text 一个html标签字符串
     */
    function htmlEscapeFn(text) {
        return text.replace(/[<>"&]/g, function (match, pos, oldStr) {
            switch (match) {
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '&':
                    return '&amp;';
                case '\"':
                    return '&quot;';
            }
        });
    }

    /**
     * @func
     * @desc 一个正整数的阶乘
     * @method fator();
     * @for Dome
     * @param {Number} num 一个正整数
     */
    function fatorFn(num) {
        if (num <= 1) {
            return num;
        } else {
            return num * fatorFn(num - 1);
        }
    }

    /**
     * @func
     * @desc 取2个数之间的随机整数
     * @method selectFrom();
     * @for Dome
     * @param {Number, Number} (minValue,maxValue) 两个数区间
     */
    function selectFromFn(minValue, maxValue) {
        var choices = maxValue - minValue + 1;
        return Math.floor(Math.random() * choices + minValue);
    }

    /**
     * @func
     * @desc 数组快速排序法
     * @method quickSort();
     * @for Dome
     * @param {Array} (arr) 一个数字数组
     */
    function quickSortFn(arr) {
        if (arr.length <= 1) { //结束递归循环的条件（重要）
            return arr;
        }
        var leftArr = [],
            rightArr = [];
        for (var i = 0, length = arr.length; i < length; i++) {
            if (arr[i] <= arr[0] && i !== 0) {
                leftArr.push(arr[i]);
            } else if (arr[i] > arr[0]) {
                rightArr.push(arr[i]);
            }
        }
        return quickSortFn(leftArr).concat(arr[0], quickSortFn(rightArr));
    }

    /**
     * @func
     * @desc 数组基于对象属性排序法
     * @method arrKeySort();
     * @for Dome
     * @param {Array，String} (arr,key) 一个数组,键(属性)名
     */
    function arrKeySortFn(arr, key) {
        if (arguments.length === 1) {
            return arr.sort(function (obj1, obj2) {
                if (obj1 < obj2) {
                    return -1;
                } else if (obj1 > obj2) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (arguments.length === 2) {
            return arr.sort(function (obj1, obj2) {
                if (obj1[key] < obj2[key]) {
                    return -1;
                } else if (obj1[key] > obj2[key]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    /**
     * @func
     * @desc 判断属性是否在原型对象中
     * @method hasProtoProperty();
     * @for Dome
     * @param {Object，String} (obj, name) 一个对象,键(属性)名
     */
    function hasProtoPropertyFn(obj, name) {
        return !obj.hasOwnProperty(name) && (name in obj);
    }

    /**
     * @func
     * @desc 屏幕左边和上边到浏览器 (window)对象的距离
     * @method screen();
     * @for Dome
     * @param {String} (value) 一个方位名词('x','y','left','top')
     */
    function screenFn(value) {
        var re = function () {
            var x = /^(x|left)?$/ig,
                y = /^(y|top)?$/ig;
            if (x.test(value)) {
                return 'x';
            } else if (y.test(value)) {
                return 'y';
            }
        }();
        if (re === 'x') {
            return (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
        } else if (re === 'y') {
            return (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
        }
    }

    /**
     * @func
     * @desc 累加器（累加到指定数值区间）
     * @method timeoutCount();
     * @for Dome
     * @param {Number,Number,Function} (onNum, offNum, fn) 开始数值，结束数值(计数区间)
     */
    function timeoutCountFn(onNum, offNum, fn, time) {
        var countNum = function () {
            if (onNum <= offNum) {
                fn(onNum++); //回调函数的第一个参数表示累计值（先处理后累计）
                setTimeout(countNum, time);
            }
        };
        return setTimeout(countNum, time);
    }

    /**
     * @func
     * @desc 获取URL中的字符串参数 (location.search)
     * @method getURLParameter();
     * @for Dome
     */
    function getURLParameterFn() {
        var str = location.search.length > 0 ? location.search.substring(1) : '';
        if (!str) {
            return;
        }

        var items = str.length ? str.split('&') : [], //将字符串根据'&'符号 分割成一个数组
            item = '',
            name = null,
            value = null,
            endNum = 0,
            parameter = {};
        for (var i = 0, length = items.length; i < length; i++) {
            item = items[i];
            if (item.indexOf('=') !== -1) {
                endNum = item.indexOf('=');
            } else {
                endNum = item.length;
            }
            //将截取的字符串解码，赋值
            name = decodeURIComponent(item.substring(0, endNum));
            value = decodeURIComponent(item.substring(endNum + 1, item.length));
            if (name.length) {
                parameter[name] = value;
            }
        }

        return parameter;
    }

    /**
     * @func
     * @desc 数字分位符号
     * @method addSign();
     * @for Dome
     * @param {String,String} (val, sign) 一个数值，分隔符号
     */
    function addSignFn(val, sign) {
        //return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sign);
        if (!val) {
            return 0;
        }
        var valArr = val.toString().split('.');
        var intNum = valArr[0].length > 0 ? valArr[0] : 0,
            smallNum = valArr.length > 1 ? valArr[1] : '',
            re = /(\d+)(\d{3})/g;
        if (re.test(intNum)) {
            intNum = intNum.replace(re, '$1' + sign + '$2');
        }
        if (smallNum && smallNum.length >= 4) {
            smallNum = smallNum.replace(/(\d{3})/g, '$1 ');
        }
        return intNum + '.' + smallNum;
    }

    /**
     * @func
     * @desc 将伪数组对象转为数组
     * @param nodes
     * @returns {Array}
     */
    function convertToArrayFn(nodes) {
        var arr = [];
        try {
            arr = [].slice.call(nodes);
        } catch (ex) {
            for (var i = 0, length = nodes.length; i < length; i++) {
                arr.push(nodes[i]);
            }
        }
        return arr;
    }

    /**
     * @func
     * @desc 筛选出元素节点
     * @param nodes
     * @returns {Array}
     */
    function reNullTextFn(nodes) {
        var arr = [];
        for (var i = 0, length = nodes.length; i < length; i++) {
            if (nodes[i].nodeType === 1) {
                arr.push(nodes[i]);
            }
        }
        return arr;
    }

    /**
     * 动态加载外部引用script
     * @param srcFile
     */
    function loadScriptFn(srcFile) {
        var script = document.createElement('script');
        script.src = srcFile;
        document.body.appendChild(script);
    }

    /**
     * 动态加载外部引用css样式
     * @param hrefFile
     * @returns {Element}
     */
    function loadStyleFn(hrefFile) {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = hrefFile;
        document.querySelector('head').appendChild(link);
    }

    /**
     * 删除指定的class值
     * @param element
     * @param classValue
     * @returns {string}
     * 正则配合字符串替换法：
     * var re = new RegExp('\s*(' + classValue + ')\s*', 'ig');
     * return element.className.replace(re, ' ');
     */
    function removeClassFn(element, classValue) {
        var classList    = element.className.split(/\s+/g),
            newClassList = [];
        for (var i = 0, length = classList.length; i < length; i++) {
            if(classList[i] !== classValue) {
                newClassList.push(classList[i]);
            }
        }
        return newClassList.join(' ');
    }

    /**
     * 跨浏览器兼容 获取文本节点
     * @param element
     * @returns {*}
     */
    function getInnerTextFn(element) {
        return (typeof element.textContent === 'string') ?
                element.textContent : element.innerText;
    }

    /**
     * 跨浏览器兼容 设置文本节点
     * @param element
     * @param text
     */
    function setInnerTextFn(element, text) {
        if (typeof element.textContent === 'string') {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    }

    /**
     * 获取元素相对页面文档的左偏移量
     * @param element
     * @returns {number|Number}
     */
    function getElementLeftFn(element) {
        var actualLeft = element.offsetLeft;
        var current = actualLeft.offsetParent;
        while(!!current) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }

    /**
     * 获取元素相对页面文档的上偏移量
     * @param element
     * @returns {number|Number}
     */
    function getElementTopFn(element) {
        var actualTop = element.offsetTop;
        var current = actualTop.offsetParent;
        while(!!current) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }

    /**
     * 获取页面文档大小(兼容)
     * @returns {{docWidth: number, docHeight: number}}
     */
    function getDocSizeFn() {
        return {
            docWidth:  Math.max(document.documentElement.clientWidth,
                                document.documentElement.scrollWidth),
            docHeight: Math.max(document.documentElement.clientHeight,
                                document.documentElement.scrollHeight)
        };
    }
})();

/**
 * Event事件处理对象（兼容）
 */
(function () {
    'use strict';

    /**
     * 过渡型置顶
     * @returns {number}
     */
    function goTopFn() {
        function topMove() {
            if (!document.documentElement.scrollTop && !document.body.scrollTop) {
                return clearTimeout(topMove);
            }
            window.scrollBy(0, -100);
            setTimeout(topMove, 20);
        }

        return setTimeout(topMove, 20);
    }

    //EventUtil 处理事件对象的兼容
    /**
     * 获得当前事件对象(兼容)
     * @param e
     * @returns {Event|*}
     */
    function getEventFn(e) {
        return window.event || e;
    }

    /**
     * 获取当前触发事件的对象(兼容)
     * @param e
     * @returns {Node|string|EventTarget|*|Object}
     */
    function getTargetFn(e) {
        return e.target || e.srcElement;
    }

    /**
     * 获取触发事件的相关元素(兼容)
     * @param e
     * @returns {EventTarget|Object}
     */
    function getRelatedTargetFn(e) {
        return e.relatedTarget ||
            e.fromElement   ||
            e.toElement;
    }

    /**
     * 获取鼠标按下的键码(兼容, 0左键，1中间键，2右键)
     * @param e
     * @returns {*}
     */
    function getButtonFn(e) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return e.button;
        } else {
            switch(e.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 4:
                    return 1;
                case 2:
                case 6:
                    return 2;
            }
        }
    }

    /**
     * 获取相对文档的坐标(兼容)
     * @param e
     * @returns {{X: Number, Y: Number}}
     */
    function getPageFn(e) {
        var pageX = e.pageX,
            pageY = e.pageY;
        if (pageX === undefined) {
            pageX = e.clientX + (document.body.scrollLeft ||
                document.documentElement.scrollLeft);
        }
        if (pageY === undefined) {
            pageY = e.clientY + (document.body.scrollTop ||
                document.documentElement.scrollTop);
        }
        return {
            X: pageX,
            Y: pageY
        };
    }

    /**
     * 获取键盘键码(兼容)
     * @param e
     * @returns {*}
     */
    function getKeyCodeFn(e) {
        if(typeof e.charCode === 'number') {
            return e.charCode;
        } else {
            return e.keyCode;
        }
    }

    /**
     * 滚轮滚动方向(兼容，负值向下，正值向上)
     * @param e
     * @returns {number}
     */
    function getWheelDeltaFn(e) {
        // if (event.wheelDelta){  //兼容opera，需要调用检测浏览器信息兼容库client
        //     return (client.engine.opera && client.engine.opera < 9.5 ?
        //             - event.wheelDelta / 120 : event.wheelDelta / 120);
        // }
        return e.wheelDelta / 120 || - parseInt(e.detail / 3);
    }

    /**
     * 阻止事件默认行为(兼容)
     * @param e
     */
    function preventDefaultFn(e) {
        if(e.preventDefault) {
            e.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    /**
     * 阻止事件捕获/冒泡(兼容)
     * @param e
     */
    function stopPropagationFn(e) {
        if(e.stopPropagation) {
            e.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

    /**
     * 添加事件监听(兼容)
     * @param ele
     * @param event
     * @param fn
     * @param boole
     */
    function addEventFn(ele, event, fn, boole) {
        boole = (!!boole && true) || false;
        if (ele.addEventListener) {
            ele.addEventListener(event, fn, boole);
        } else if(ele.attachEvent) {
            ele.attachEvent('on' + event, fn);
        } else {
            ele['on' + event] = fn;
        }
    }

    /**
     * 删除事件监听(兼容)
     * @param ele
     * @param event
     * @param fn
     * @param boole
     */
    function removeEventFn(ele, event, fn, boole) {
        boole = (!!boole && true) || false;
        if (ele.removeEventListener) {
            ele.removeEventListener(event, fn, boole);
        } else if(ele. detachEvent) {
            ele.detachEvent('on' + event, fn);
        } else {
            ele['on' + event] = null;
        }
    }

    /**
     * 声明到全局
     */
    window.goTop = goTopFn;
    window.EventUtil = {
        getEvent: getEventFn,
        getTarget: getTargetFn,
        getRelatedTarget: getRelatedTargetFn,
        getButton: getButtonFn,
        getPage: getPageFn,
        getKeyCode: getKeyCodeFn,
        getWheelDelta: getWheelDeltaFn,
        addEvent: addEventFn,
        removeEvent: removeEventFn,
        preventDefault: preventDefaultFn,
        stopPropagation: stopPropagationFn
    };

})();
