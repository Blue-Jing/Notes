/**
 * CSS --- hack (区块IE置顶处理):
 * .nav { _top: expression(documentElement.scrollTop + "px"); }
 *
 **HTMLCollection/NodeList对象:
 * (特性:集合中的项会随着当前文档内容的更新而更新)
 * 避免怪癖行为，不同标签的name属性值和ID属性值最好不相同
 * element元素1, attribute特性2, #text文本3, #comment注释8, #document文档9
 * .parentNode      获取父元素节点
 * .childNodes      获取所有子节点
 * .children        获取所有元素子节点
 * .previousSibling 获取上一个兄弟节点元素
 * .nextSibling     获取下一个兄弟节点元素
 * .nodeType        节点类型(1,2,3,8,9)
 * .nodeName        获取节点元素标签名
 * .nodeValue       获取文本节点元素的值(非文本节点元素返回null)
 * 插入: (当插入节点在插入位置已存在时，会删除原来的节点再插入)
 * .appendChild(要插入的子节点)        默认插入到子节点列表最后的位置(参照节点==null)
 * .insertBefore(插入节点, 参照节点)   插入到参照节点后的位置
 * 删除: (删除结束后，文档中将不在有删除节点的位置)返回删除节点
 * .removeChild(删除的节点)
 * 替换: (替换结束后，文档中将不在有原节点的位置)返回原节点-被替换掉的节点
 * .replaceChild(替换节点, 原节点)
 * 克隆: ele.onclick = null;
 * (无论深浅都不会复制事件处理，IE下有怪异行为BUG，会复制事件处理；
 * 所有复制前最好先删除事件处理)
 * .cloneChild(true);    参数为true时,对节点进行深度复制(包含子节点)
 *                       参数为false时,对节点进行浅复制(不包含子节点)
 * 查询: 除了根据ID获取节点，其它返回的都是HTMLCollection/NodeList对象
 * .getElementsByName('name的值'); 获取对应name的值的元素节点列表NodeList
 * HTMLCollection对象.namedItem('name的值') 只会取得第一项
 * HTMLCollection对象['1'];  获取第一个指定name="1"的元素节点
 * document.getElementsByTagName('ul'); 获取document后代标签为ul的所有元素节点
 * element.getElementsByTagName('li');  方法支持元素节点对象调用
 * ele.contains(node);   检查node是否是ele后代元素，返回布尔值
 */

/**
 *  文档输出(写入): open(); write(); writeln(); close();
 *  通常用下列方式取代文档输出(写入)流;
 *  注意：使用以下方法时，一定要删除不必要的事件(避免内存负荷)
 * .innerHTML              获取设置元素节点(推荐)
 * .innerText              获取设置文本节点 ---不兼容Firefox44
 * .textContent            获取设置文本节点 ---不兼容IE8
 * div.outerHTML(p)        相当于用p元素替换掉整个div元素
 *
 *
 * ele.insertAdjacentHTML('', HTML字符串); 在特定的位置插入 HTML 文本
 * .insertAdjacentHTML第一个参数可选值：
 * 'beforebegin'         当前元素之前插入HTML文本字符串
 * 'beforeend'           当前元素之下子元素之后插入HTML文本字符串
 * 'afterbegin'          当前元素之下子元素之前插入HTML文本字符串
 * 'afterend'            当前元素之后插入HTML文本字符串
 */

/**
 * Element元素节点  .createElement(nodeName);
 * element.tagName 获取元素节点的标签名(获取后最好转义为统一大小写，再使用)
 * element.tagName.toLowerCase() === "div";
 * HTML元素(HTMLElement对象) id, className, title, lang, 标签对象
 * document.createElement('p');    创建元素节点p
 * var f = document.createDocumentFragment(); 创建一个文档片段，无参数
 * 可以以 f 为父容器，往里头插入节点 (推荐使用.innerHTML)
 * 使用appendChild(p)、insertBefore(p)、replaceChild(p)添加元素节点p
 *
 * element.focus();        表示元素获得焦点
 * document.hasFocus();    判断是否获得焦点，返回布尔值
 * document.activeElement  获得tag切换，获得焦点的元素节点对象
 */

/**
 * DocumentFragment类型11 .createDocumentFragment();
 * --- 文档片段
 * #document-fragment
 * 继承 Node 所有方法
 */

/**
 * Attr特性节点            .createAttribute(nodeName);
 * .specified属性                   元素是否指定了某属性，布尔值
 * .getAttributeNode('id');        获得Attr对象
 * .getAttribute('class');         获取class的特性值
 * .setAttribute('class', 'item'); 设置class的特性值
 * .removeAttribute('class');      删除class特性
 */

/**
 * Text文本节点       .createTextNode(nodeValue);
 * (添加-文本节点随着当前文本内容的更新而更新)
 * .appendData(text)                 将文本添加到末尾
 * (插入-文本节点随着当前文本内容的更新而更新)
 * .insertData(offset, text)         在offset处插入text文本
 * (删除-文本节点随着当前文本内容的更新而更新)
 * .deleteData(offset, count)        从offset开始删除count个字符
 * (替换-文本节点随着当前文本内容的更新而更新)
 * .replaceData(offset, count, text) 从offset开始用text替换count个字符
 * ---------------------------------
 * .substringData(offset, count)     提取offset开始count个字符的字符串
 * .splitText(offset)                在offset处分割成2个文本节点;
 *                                   原文本(前半部分)文本节点对象
 *                                   返回值(后半部分)文本节点对象
 * 父节点.normalize(); 无参数，移除空的文本节点，并连接相邻的文本节点
 */

/**
 * Comment注释节点        .createComment(nodeValue);
 * 与Text文本节点继承同一个基类；
 * 拥有除了splitText()方法之外所有字符串操作方法
 */

/**
 * Selector 选择器
 * document/Element.querySelector(选择器名称);
 * document/Element.querySelectorAll(选择器名称)[i];
 * Element.matchesSelector(选择器名称); 查询选择器是否匹配，返回布尔值(还处于实验阶段)
 *
 * 元素遍历(元素版)：(不包含注释与文本节点) IE9+
 * .childElementCount      返回子元素不包含注释文本的元素节点的个数
 * .firstElementChild      指向第一个子元素节点
 * .lastElementChild       指向最后一个子元素节点
 * .previousElementSibling 指向前一个兄弟元素节点
 * .nextElementSibling     指向后一个兄弟元素节点
 * .getElementByClassName(); 获取class对应的NodeList
 *                           参数可以多个以空格分开，与先后顺序无关
 * 属性：IE9+
 * element.classList       获得当前元素节点的class值数组(DOMTokenList对象)
 *
 * HTML5---DOMTokenList对象(element.classList其中之一)
 * element.classList.add(value) 添加指定的class
 * .remove(value)               删除指定的class
 * .contains(value)             判断列表中是否包含指定的class，返回布尔值
 * .toggle(value)               列表中存在指定class时删除它，否则添加它
 *
 * HTML5---readyState属性
 * document.readyState === 'loading';    正在加载文档
 * document.readyState === 'complete';   文档加载完毕
 * document.compatMode === 'BackCompat'; 混杂模式
 * document.compatMode === 'CSS1Compat'; 标准模式
 * document.charset;                     获得字符编码
 * document.body.dataset.name;           获得data-name自定义属性
 *
 * 表示当前this对象的视口(默认：浏览器视口)
 * 与element对像的对齐情况：
 * element.scrollIntoView(Boolean)   true:  表示与element对象顶部对齐
 *                                   false: 表示与element对象底部对齐(有偏差)
 */

/* ------------------------------------------------------------------------- */
/**
 * DOM2和DOM3
 * 获取、设置Style样式
 * (行内版)
 * element.style.backgroundColor = '#542';   设置背景颜色
 * element.style.backgroundColor; //#542     获取element的背景颜色
 *
 * StyleSheets外链CSS样式列表:
 * 获取文档中第一个样式link的URL路径:
 * var linkNode = document.styleSheets[0].href;
 * linkNode.styleSheet; //IE支持，其它不支持   获取元素节点的Sheet对象
 * linkNode.sheet;      //IE不支持，其它支持   获取元素节点的Sheet对象
 * 兼容：var sheet = linkNode.sheet || linkNode.styleSheet;
 *
 * 元素大小：(偏移)
 * .offsetParent    获得元素的参考容器(祖先元素中进行过定位的元素)
 * .offsetHeight    元素除外边距的高度
 * .offsetWidth     元素处外边距的宽带
 * .offsetLeft      相对于.offsetParent容器的左偏移量 (不一定是父容器) IE8+
 * .offsetTop       相对于.offsetParent容器的上偏移量 (不一定是父容器) IE8+
 * 视口：(元素可见内容区域大小，不包含滚动条，不包含边框)
 * .clientWidth     获取元素客户区宽度
 * .clientHeight    获取元素客户区高度
 * 滚动大小：(元素实际内容区域大小，不包含滚动条，不包含边框)
 * .scrollWidth     获得元素实际内容宽度
 * .scrollHeight    获得元素实际内容高度
 * .scrollLeft      元素左边缘与视图之间的距离
 * .scrollTop       元素上边缘与视图之间的距离
 *
 * 获取文档大小(兼容浏览器)
 * var docWidth  = Math.max(document.documentElement.clientWidth,
 *                          document.documentElement.scrollWidth);
 * var docHeight = Math.max(document.documentElement.clientHeight,
 *                          document.documentElement.scrollHeight);
 *
 * DOM遍历与范围
 * 遍历(root元素节点, 要变量的节点类型, 筛选函数返回NodeFilter对象, false)：
 * document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, filter, false);
 *
 * 范围：
 * 创建整个范围对象：
 * var range = document.createRange();
 * range.selectNode(element);      获取整个element节点包含自身与后代节点
 * range.selectContents(element);  获取所有element的后代节点
 * 设置部分范围内容选选区：
 * range.setStart(node, 2);        从node中获得第3个字符以及之后的所有内容
 * range.setEnd(node, 3);          从node中获得第4个字符前的所有内容
 * 删除整个范围内容：
 * range.deleteContents();            删除范围
 * 删除部分范围内容：在设置过 部分选区后，才生效(返回被删除部分内容)
 * range.extractContents();           删除部分选区
 * 向范围插入内容：
 * range.insertNode(node);            在范围开头插入内容
 * range.surroundContents(element);   用插入节点包裹范围内容
 * 折叠范围：
 * range.collapse(true);              true折叠到开头;false折叠到末尾
 * 复杂范围副本：
 * var newRange = range.cloneRange(); 复杂范围
 * range.detach();                    性释放范围range对象(减轻内存压力):
 */

var Test = (function () {
    'use strict';
    /**
     * @func
     * @desc 将类数组对象转为数组
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

    return {
        convertToArray: convertToArrayFn,
        reNullText: reNullTextFn
    };
})();
/* ------------------------------------------------------------------------- */
window.onload = function () {
    'use strict';
    var items = document.querySelector('.items');
    var itemArr = Test.reNullText(items.childNodes);
    console.log('-------节点类型-------');
    console.log(items.childNodes[0].nodeType);
    //轮播Nodes
    function itemsRun(nodes, nodeArr) {
        var count = function () {
            if (!!nodeArr.length) {
                console.log(nodeArr.length);
                nodes.removeChild(nodeArr[0]);
                nodeArr.shift();
                setTimeout(count, 1000);
            }
        };
        setTimeout(count, 1000);
    }

    itemsRun(items, itemArr);
    
    console.log('-----------获取元素节点----------');
    var elements = document.querySelectorAll('.item');
    console.log(elements['1']);

    console.log('--------获取、添加文本节点--------');
    var mainElement = document.querySelector('.main');
    var pElement = mainElement.getElementsByTagName('p')[0];
    var text = pElement.childNodes[0];
    var a = text.appendData('2');
    console.log(text);
    console.log(a);

    var body = document.querySelector('body');
    var ele = document.createElement('div');
    ele.className = 'box';
    var txt1 = document.createTextNode('001testBOX');
    ele.appendChild(txt1);
    body.appendChild(ele);

    console.log('--------分割文本' + txt1.nodeValue + '--------');
    var backNode = ele.childNodes[0].splitText(3);
    console.log(ele.childNodes[0].nodeValue); //'001'
    console.log(ele.childNodes.length); //2  textNode
    console.log(backNode.nodeValue); //'testBOX'

    console.log(items.childNodes[1].nodeValue);

    //文档片段
    var fragment = document.createDocumentFragment(),
        ul = document.createElement('ul'),
        li = '';
    ul.setAttribute('name', 'items');
    for (var i = 1; i < 11; i++) {
        li += '<li class="item">item' + i + '</li>';
    }
    ul.innerHTML = li;
    fragment.appendChild(ul);
    document.body.appendChild(fragment);
    //动态加载
    Demo.loadScript('111.js');
    Demo.loadStyleFn('111.css');

    console.log('--------删除class--------');
    var pox = document.body.querySelector('.pox');
    console.log(pox.getAttributeNode('class'));
    //删除class
    function removeClass(element, classValue) {
        var classList = element.className.split(/\s+/g),
            newClassList = [];
        for (var i = 0, length = classList.length; i < length; i++) {
            if (classList[i] !== classValue) {
                newClassList.push(classList[i]);
            }
        }
        return newClassList.join(' ');
    }
    pox.className = removeClass(pox, 'hr');
    //切换class
    //pox.classList.toggle('hr');
    console.log(pox.getAttributeNode('class'));

    console.log('--------显示当前获得焦点元素对象--------');
    console.log(document.activeElement);
    //获得 data-type 自定义属性
    //console.log(document.body.dataset.type);

    var s = '../js/test.js';
    var script = '<script src="' + s + '"></script>';
    document.body.insertAdjacentHTML('beforeend', script);

    console.log('-------------获得元素子节点------------');
    var fixed = document.querySelector('.fixed');
    for (var j in fixed.children) {
        console.log(fixed.children[j]);
    }

    console.log('-----------检测是否为后代节点-----------');
    console.log(document.body.contains(fixed));

    console.log('-----第一个 link 元素引入的样式表------');
    function getSheet(element) {
        return  element.styleSheet || element.sheet;
    }
    var linkNode = document.getElementsByTagName('link')[0];
    console.log(getSheet(linkNode));

    console.log('-----元素相对页面文档的坐标------');
    var x = Demo.getElementLeft(fixed),
        y = Demo.getElementTop(fixed);
    console.log('fixed(X: ' + x + ',' + 'Y: ' + y + ')');

    console.log('-----页面文档大小(兼容)------');
    var docWidth  = Math.max(document.documentElement.clientWidth,
                             document.documentElement.scrollWidth);
    var docHeight = Math.max(document.documentElement.clientHeight,
                             document.documentElement.scrollHeight);
    console.log('doc(W: ' + docWidth + ',' + 'H: ' + docHeight + ')');

    console.log('-----浏览器视口大小------');
    var browserW = document.documentElement.clientWidth,
        browserH = document.documentElement.clientHeight;
    console.log('Browser(W: ' + browserW + ',' + 'H: ' + browserH + ')');

    console.log('-----元素内容大小------');
    var t_box = document.querySelector('.t-box');
    var eleW = t_box.scrollWidth,
        eleH = t_box.scrollHeight;
    console.log('t_box(W: ' + eleW + ',' + 'H: ' + eleH + ')');

};

/**
 * 检测浏览器对DOM支持级别
   var supportsDOM2Core = document.implementation.hasFeature("Core","2.0");
   var supportsDOM3Core = document.implementation.hasFeature("Core","3.0");
   var supportsDOM2HTML = document.implementation.hasFeature("HTML","2.0");
   var supportsDOM2Views = document.implementation.hasFeature("Views","2.0");
   var supportsDOM2XML = document.implementation.hasFeature("XML","2.0");

   alert("是否支持DOM2级核心："+supportsDOM2Core);
   alert("是否支持DOM3级核心："+supportsDOM3Core);
   alert("是否支持DOM2级HTML："+supportsDOM2HTML);
   alert("是否支持DOM2级视图："+supportsDOM2Views);
   alert("是否支持DOM2级XML："+supportsDOM2XML);
 */
