/**
 * 表单元素 HTMLFormElement
 * 表单脚本
 * 文本框验证与交互
 * 表单控制
 * 自带属性: method请求方式、 action特性、 acceptCharset字符集、、enctype编码、 target窗口名称
 *
 * 取得表单元素： ---form.elements['color']
 * var firstForm = document.forms[0]; //取得页面中的第一个表单
 * var myForm = document.forms["form2"]; //取得name="form2"的表单
 *
 * 提交表单： form.submit(); //不会触发 onsubmit 事件
 * 重置表单： form.reset(); //会触发 onreset 事件 (极少使用)
 * 注意处理：
 * 1、在第一次提交表单后就 disabled=true 禁用提交按钮
 * 2、利用 onsubmit 事件处理程序取消后续的表单提交操作
 *
 * 获取表单中的字段元素 form.elements[0];
 * 注意：.elements['color'] 存在重复的话 将返回NodeList
 * 公有表单字段方法:
 * input.focus();         设置元素获得焦点
 * input.blur();          设置元素失去焦点
 * input.select();        设置元素选择所有字段
 * input.disabled = true; 禁用元素
 * 公有表单字段事件: （都能支持鼠标、键盘、更改、HTML事件）
 * change                 表单字段失去焦点且 value 值改变时事件(触发)
 * focus                  表单字段获得焦点时事件(触发)
 * blur                   表单字段失去焦点时事件(触发)
 * select                 表单字段选择字符时事件(触发)
 * 利用str.substring();可以获取select选中文本的内容:
 * .selectionStart        获取选择字段的开头位置(HTML5提供的select事件属性)
 * .selectionEnd          获取选择字段的末尾位置(HTML5提供的select事件属性)
 *
 * HTML5 表单字段元素自动验证属性
 * <input pattern="正则表达式"> 这里不用使用^$,也能很好的表示开头与结束
 * <form novalidate>      告诉表单不需要进行验证
 * <input formnovalidate> 指定某个提交按钮提交时无需验证
 * <input required>       IE10+
 * input.required         表单提交时不能为空
 * input.validity         validity属性对象，用于检测内容的有效性
 *
 * 选择文本框 HTMLSelectElement
 * 添加：add(HTMLOption, relOption); HTMLOption要添加的选择，在relOption选项之前添加
 * 删除：remove(index);              index删除项的索引
 * .selectedIndex                   第一个选中项的索引，为选择则返回-1
 * .options[0]                      所有的选项
 * .multiple                        是否允许多选,多选框(布尔)
 * 选项框 HTMLOptionElement
 * .selected                        是否被选中(布尔)
 * .index                           当前选项的索引
 * .value                           当前选项值
 * .text                            当前选项文本
 * .label                           当前选项标签
 * Option('text', 'value');         option的构造函数，创建option元素
 * select.add(option,undefined);    选项最后插入新选项
 * select.remove(index);            删除指定索引的选项
 * 移动选项 到另一个选择框：
 * select2.appendChild(select.options[index]);
 * 重排选项
 * select.insertBefore(select.options[index],
 *                     select.options[index-1]);
 *
 * 创建富文本框：DesignMode
 * 1、设置contenteditable特性(布尔)创建
 * <div name='addText' contenteditable></div>
 * 2、结合iframe + JS创建：(.document.designMode)需在服务器下生效
 * frames['addText'].document.designMode = 'on';
 * 3、操作富文本：
 * .document.execCommand('样式', false, null/具体样式属性值);
 *
 */
(function () {
    'use strict';
    
    window.FormUtil = {
        serialize : serializeFn
    };

    /**
     * 表单序列号
     * @param formElement
     * @returns {string}
     */
    function serializeFn(formElement) {
        var elements = formElement.elements,
            element = {},
            option = {},
            arr = [],
            value = '';

        for (var i = 0, length = elements.length; i < length; i++) {
            element = elements[i];
            switch (element.type) {
                case 'select-one':
                case 'select-multiple':
                    if(element.name.length) {
                        for (var j = 0, len = element.options.length; j < len; j++) {
                            option = element.options[j];
                            if(option.selected) {
                                if(option.hasAttribute) {
                                    value = option.hasAttribute('value') ?
                                            option.value : option.text;
                                } else {
                                    value = option.attributes['value'].specified ?
                                            option.value : option.text;
                                }
                                arr.push(encodeURIComponent(element.name) + '='
                                        + encodeURIComponent(value));
                            }
                        }
                    }
                    break;
                case undefined:  //字段集
                case 'file':     //文件输入
                case 'submit':   //提交按钮
                case 'reset':    //重置按钮
                case 'button':   //自定义按钮
                    break;
                case 'radio':    //单选按钮
                case 'checkbox': //复选框
                    if (!element.checked) { break; }
                default:
                    if(element.name.length) {
                        arr.push(encodeURIComponent(element.name) + '='
                            + encodeURIComponent(element.value));
                    }
            }
        }
        return arr.join('&');
    }
    
})();

/* 运行区域 */
window.onload = function () {
    'use strict';

    var formText = document.getElementById('test');
    var input = formText.getElementsByTagName('input');
    var select = formText.elements[7],
        text = formText.elements['text001'];

    //防重复提交
    EventUtil.addEvent(formText, 'submit', function(e){
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        var butSubmit = target.elements['but'];
        butSubmit.disabled = true;
        butSubmit.value = '提交中...';
    });

    //表单字段事件(change字段value值改变，失去焦点)
    EventUtil.addEvent(select, 'change', function(e) {
        e =EventUtil.getEvent(e);
        console.log('option:', EventUtil.getTarget(e).value);
    });

    /**
     * 检验输入内容是否为数字
     * @param e
     */
    var changeFn = function(e) {
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        if (/\D/g.test(target.value)) {
            target.style.backgroundColor = '#E74C3C';
        } else {
            target.style.backgroundColor = '';
        }
    };

    EventUtil.addEvent(text, 'focus', function(e) {
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        //text.value = '';
        text.select();
        target.style.backgroundColor = '#3498DB';
    });
    EventUtil.addEvent(text, 'change', changeFn);
    EventUtil.addEvent(text, 'blur', changeFn);

    /**
        //当按下非数字键时，禁止输入
        //(code > 9   用于解决火狐下‘必要按键’被禁用问题)
        //(!e.keyCtrl 用于解决‘快捷按键’被禁用问题)
        EventUtil.addEvent(text, 'keypress', function(e) {
            e = EventUtil.getEvent(e);
            var code = EventUtil.getKeyCode(e);
            if (/\D/g.test(String.fromCharCode(code)) && code > 9 && !e.keyCtrl){
                EventUtil.preventDefault(e);
            }
        });
     */

    /**
     * 选项 option 属性 与操作
     * @type {HTMLOptionsCollection}
     */
    var options = select.options;
    for (var i = 0, length = options.length; i < length; i++) {
        console.log(options[i].selected, options[i].value, options[i].text,
                    options[i].length);
    }
    var select2 = formText.elements[8];
    select2.appendChild(select.options[2]); //一个选择框中的选项，插入到另一个选择框

    /**
     * 表单序列化 serialize()
     */
    console.log(FormUtil.serialize(formText));

    //富文本，需要在服务器下才有效
    frames['addText'].document.designMode = 'on'; 
    /**
     *  富文本输入框，还未实现(有待解决。。。)
     *  开启富文本框(利用iframe的特性，定制富文本输入框)
     *  也可在区块标签中设置 contenteditable 特性为 true
     var edi = document.getElementById('edi'),
     but = document.getElementById('but'),
     count = 0;
     var contentEdi = function() {
            document.execCommand('bold', false, null);
     };
     EventUtil.addEvent(but, 'click', function(e) {
            e = EventUtil.getEvent(e);
            var target = EventUtil.getTarget(e);
            if(count === 0) {
                count = 1;
                target.style.color = '#785';
                EventUtil.addEvent(edi, 'dblclick', contentEdi);
            } else {
                count = 0;
                target.style.color = '';
                EventUtil.removeEvent(edi, 'dblclick', contentEdi);
            }
        });
     */
};

