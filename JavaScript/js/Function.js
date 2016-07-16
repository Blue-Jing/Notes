/**
 * 递归
 * 严格模式下 不推荐使用 arguments.callee 获取当前函数对象 （会报错）
 * 使用命名函数表达式来代替 arguments.callee
 */
function factorial(num) { //严格模式下 不支持
    if (num <= 1) {
        return num;
    } else {
        return num * arguments.callee(num - 1);
    }
}
//修正版---递归
var factorial = function f(num) {
    if (num <= 1) {
        return num;
    } else {
        return num * f(num - 1);
    }
};

/**
 * 闭包的使用
 * 慎重使用闭包（内存易爆炸）
 * 1.在函数内部定义了其他函数时，就创建了闭包；
 * 2.使用闭包可以在 JavaScript 中模仿块级作用域；
 * 3.闭包还可以用于在对象中创建私有变量(用闭包来实现公有方法,调用作用域中的var私有属性和方法---特权方法)
 */
function createComps(name) {
    return function(obj1, obj2) {
        var value1 = obj1[name],
            value2 = obj2[name];
        if (value1 > value2) {
            return 1;
        } else if (value1 < value2) {
            return -1;
        } else {
            return 0;
        }
    };
}
//作用域链有2层 （全局对象，createComps活动对象）
var comps = createComps('age'); //createComps执行环境销毁后，createComps活动对象还在，'age'任然在内存中
//作用域链有3层（全局对象，createComps活动对象，闭包的活动对象(返回的匿名函数)）
var result = comps({
    age: 21
}, {
    age: 25
}); //
console.log(result);
//解除对匿名函数的引用（以便释放内存）
comps = null;

/* 使用闭包 创建 createFn 活动对象中 i属性的 副本num，使for循环声明定义函数时，返回的索引值不同*/
var arr = (function createFn() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = function(num) {
            return function() {
                return num;
            };
        }(i);
    }
    return arr;
})();

/* 构造函数中的 特权方法 (存在缺陷，每次新建实例都会重复新建内存中已有属性) */
function MyObject() {
    //私有变量和函数（实例 独立 属性与方法）
    var privateProperty = 10;

    function privateFun() {
        return privateProperty;
    }

    // 公有/特权方法
    this.publicFun = function() {
        privateProperty++;
        return privateFun();
    };
}
var test = new MyObject();

/*---------------模仿块级作用域--------------*/
/* 私有作用域中的构造函数 特权方法 (使用私有作用域避免构造函数的缺陷) */
(function() {
    'use strict';
    //私有变量和函数（实例 共享 属性与方法）
    var privateProperty = 10,
        count = 0;
    var privateFun = function() {
        return privateProperty;
    };
    /*----------------------------------------------------------------------*/
    //构造函数
    window.MyObject = function(name) {
            //静态私有变量
            count++;
            //count = count + 1;
            //公有属性(实例变量)
            this.name = name;
        };
        // 公有/特权方法
    MyObject.prototype.publicFun = function() {
        privateProperty++;
        return 'count : ' + count + '  privateProperty : ' + privateFun();
    };
})();

/* 单例模块模式 */
var test = function varCount() {
    var array = [];
    array.push();
    return {
        count: function() {
            return array.length;
        },
        setCount: function(obj) {
            if (typeof obj == 'object') {
                array.push(obj);
            }
        }
    };
}();
test.count();
test.setCount({});
test.count();

/* 增强的模块模式 */
function BaseComponent(name, value) {
    this.name = name;
    this.value = value;
}

var application = function() {
    //私有变量和函数
    var components = [];
    //初始化（在数组中初始化组件）
    components.push(new BaseComponent());
    //创建 application 的一个局部副本
    var app = new BaseComponent();
    //公共接口
    app.getComponentCount = function() {
        return components.length;
    };
    //（在数组中登记新添加的组件）
    app.registerComponent = function(component) {
        if (typeof component == "object") {
            components.push(component);
        }
    };
    //返回这个副本
    return app;
}();
