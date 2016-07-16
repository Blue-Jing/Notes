(function () {

    'use strict';

    var html = '<p class = "box">safasfasfas!1!</p>',
        arr = [1, 2, 3, 4, 5, 4, 3, 2, 1, 0, -1],
        array = [{
            name: 'Jing',
            age: 28
        }, {
            name: 'Qing',
            age: 18
        }, {
            name: 'Aing',
            age: 22
        }];
    console.log('arr = ' + arr);

    // /*---------------------IE8 不兼容（兼容IE9+）--------------------------*/
    // test.doForEach(arr); //无返回值，只为遍历
    // console.log(test.doEvery(arr)); //返回布尔
    // console.log(test.doSome(arr));
    // console.log(test.doFilter(arr)); //返回满足条件项
    // console.log(test.doMap(arr)); //返回运算集合

    // console.log(test.doReduce(arr)); //正序归并
    // console.log(test.doReduceRight(arr)); //倒序归并

    /*-----------------------------------------------------------*/
    console.log(Demo.htmlEscape(html)); //html字符串转义
    console.log(Demo.fator(2)); //阶乘
    console.log(Demo.selectFrom(1, 2)); //随机整数

    var bTime = new Date();
    console.log(Demo.quickSort(arr)); //快速排序
    console.log(Demo.arrKeySort(array, 'age').reverse()); //数组基于对象属性序法
    var sTime = new Date();
    console.log('花费时间：' + (sTime - bTime) + 'ms');
    console.log(arr);

    /*-----------------------------------------------------------*/
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype = {
        constructor: Person,
        testArr: ['a', 'b'],
        count: 0,
        job: function () {
            Object.getPrototypeOf(this).count++;
            //this.__proto__.count++;
            return this.count;
        }
    };
    // Object.defineProperty(Person.prototype, 'constructor', { //兼容IE9+
    //   enumerable : false,
    //   value : Person
    // });

    var person1 = new Person('Jing', 23),
        person2 = new Person('Qing', 19);
    console.log(Person.prototype.isPrototypeOf(person1));
    console.log('name在实例中：' + person1.hasOwnProperty('name'));
    console.log('count在实例中：' + person1.hasOwnProperty('count'));
    console.log('name在原型中：' + Demo.hasProtoProperty(person1, 'name'));
    console.log('count在原型中：' + Demo.hasProtoProperty(person1, 'count'));
    //console.log(Object.getOwnPropertyNames(String)); //兼容IE9+
    //console.log(Object.getOwnPropertyNames(Map.prototype)); //兼容IE9+
    console.log(person2);
    //IE内存泄漏的解决
    (function () {
        var element = document.getElementsByTagName('body')[0];
        //var id = element.id;
        element.onclick = function (event) {
            //兼容IE8
            var e = event || window.event;
            if (e.target) {
                alert(e.target);
            } else {
                //兼容IE8
                alert(e.srcElement);
            }
        };
        element = null;
    })();

    /* BOM对象 */
    /* window: top 、parent 、self始终指向window(单框架下四者相等)*/
    /* top.Object 并不等于 top.frames[0].Object (独立创建) */
    console.log(window.document);
    console.log(top.document); //顶部最外层框架(最外层frameset下的第一个frames)
    console.log(parent.document); //当前最外层框架(当前frameset下第一个frames)
    console.log(self.document); //始终指向window (为了与top、parent做区分)


    console.log(Demo.screen('x'));
    console.log(Demo.screen('y'));

//设置超时调用
    var timeoutId = setTimeout(function () {
        alert(this);
    }, 1000);
//取消
    clearTimeout(timeoutId);
//计数到 max 停止计数
    var intercalID = function () {
        var count = 0,
            max = 10;
        return setInterval(function f() {
            if (count === max - 1) {
                clearInterval(intercalID);
            }
            console.log(++count);
        }, 600);
    }();
//timeout实现间歇调用
    Demo.timeoutCount(5, 10, function (i) {
        console.log(i);
    }, 500);

//获取URL中的字符串参数 (location.search)
    console.log(Demo.getURLParameter());

    console.log(Demo.addSign(45456.5554, ','));
})();
