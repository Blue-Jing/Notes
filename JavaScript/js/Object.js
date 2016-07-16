/**
 * Object静态方法：(ES5新增，IE9+及以上版本兼容)
 * Object.defineProperty(obj,属性名,{属性特性对象列表}); //添加修改属性特性
 * Object.defineProperties(obj,{属性名 : {属性特性对象列表}}); //给对象定义多个属性
 * Object.keys(obj); //获得对象所有可枚举属性名的数组
 * Object.getOwnPropertyNames(obj); //获得对象所有属性名的数组
 * Object.getOwnPropertyDescriptor(obj,name); //获得一个对象的一个属性的特性列表对象
 **Object.getPrototypeOf(obj) || obj.__proto__ //获得实例的原型对象
 * Object.create(obj,{额外属性的对象}); //ES5 规范化了原型式继承
 *
 * 对象、属性位置的判断：
 * obj instanceof Obj || Obj.prototype.isPrototypeOf(obj); //判断一个实例对象是否在原型链条中
 * obj.hasOwnProperty('name'); //判断属性是否在实例中，忽略原型
 * !obj.hasOwnProperty('name') && ('name' in obj) //判断属性是否在原型中
 *
 * 对象的所有属性名：
 * console.log(Object.getOwnPropertyNames(window)); //兼容IE9+
 * console.log(Object.getOwnPropertyNames(window.prototype)); //兼容IE9+
 *
 */
var book = {
    _name: '',
    _year: 2004,
    edition: 1
};
/**
 * 数据属性(当创建一个对象时，就存在的属性特性)
 * (默认)configurable : true, 可配置
 * (默认)enumerable : true,  可枚举
 * (默认)writable : true,   可写(修改)
 * (默认)value : undefined 属性值
 */
Object.defineProperty(book, '_name', { //修改可配置属性'_name'的属性特性
    enumerable: true,
    value: 'JavaScript高级程序设计'
});

/**
 * 访问器属性(给对象配置属性时的属性特性)
 * (默认)configurable : false, 不可配置
 * (默认)enumerable : false,  不可枚举
 * (默认)get : undefined,    获取方式
 * (默认)set : undefined    设置方式
 */
Object.defineProperty(book, 'year', { //为book添加一个year属性，并设置读写功能（默认：不可枚举，不可配置）
    get: function() {
        return this._year;
    },
    set: function(newValue) {
        if (newValue >= 2004) {
            this._year = newValue;
            this.edition = newValue - 2004 + 1;
        }
    }
});
Object.defineProperty(book, 'name', { //为book添加一个name属性，并设置可枚举，设置读写功能
    enumerable: false,
    get: function() {
        return this._name + '第' + this.edition + '版';
    },
    set: function(newValue) {
        this._name = newValue;
    }
});
//noinspection JSDuplicatedDeclaration
for (var i in book) {
    console.log(i);
    console.log(book);
}



/**
 * 定义多个属性 : Object.defineProperties()
 * (默认)configurable : false,   不可配置
 * (默认)enumerable : false,    不可枚举
 * (默认)writable : false,     不可写(修改)
 * (默认)value : undefined    属性值
 * (默认)get : undefined,    获取方式
 * (默认)set : undefined    设置方式
 */

/*-----------------------------------------------------------*/
var books = {};
Object.defineProperties(books, {
    _name: {
        writable: true,
        value: 'JavaScript高级程序设计'
    },
    _year: {
        writable: true,
        value: 2004
    },
    edition: {
        writable: true,
        enumerable: true,
        value: 1
    },
    name: {
        enumerable: true,
        get: function() {
            return this._name + '(第' + this.edition + '版)';
        },
        set: function(newValue) {
            this._name = newValue;
        }
    },
    year: {
        enumerable: true,
        get: function() {
            return this._year;
        },
        set: function(newValue) {
            if (newValue >= 2004) {
                this._year = newValue;
                this.edition = newValue - 2004 + 1;
            }
        }
    }
});
books.year = 2010;
//noinspection JSDuplicatedDeclaration
for (var i in books) {
    console.log(i);
}
/**
 * Object.getOwnPropertyDescriptor()
 * 显示一个对象，对应属性的特性情况
 * 返回一个对象
 */
console.log(Object.getOwnPropertyDescriptor(books, '_year'));
console.log(Object.getOwnPropertyDescriptor(books, 'year'));

/*------------------------使用场景较多（常用）----------------------*/
/*构造函数+原型链创建引用类型对象*/
//noinspection JSDuplicatedDeclaration
function Person(name, age) { //构造函数 Constructor
    this.name = name;
    this.age = age;
}

Person.prototype = {
    constructor: Person,
    count: 0,
    job: function() {
        //this.__proto__.count++; //只在Firefox、 Safari 和 Chrome下有效
        Object.getPrototypeOf(this).count++;
        return this.count;
    }
};
// Object.defineProperty(Person.prototype, 'constructor', { //兼容IE9+
//   enumerable : false,
//   value : Person
// });

//noinspection JSDuplicatedDeclaration
var person1 = new Person('Jing', 23),
    person2 = new Person('Qing', 19);
console.log(Person.prototype.isPrototypeOf(person1)); //判断person1是否在Person的原型链中

console.log('name在实例中：' + person1.hasOwnProperty('name')); //判断属性是否在实例对象中
console.log('count在实例中：' + person1.hasOwnProperty('count'));
console.log(Object.getOwnPropertyDescriptor(Person.prototype, '__proto__'));
console.log(person2);

/*------------------------使用场景较少----------------------*/
/*动态原型模式创建对象*/
function DyPerson(name, age) {
    this.name = name;
    this.age = age;

    if (typeof this.job != 'function') { //只需初始化一次，之后新建的对象都拥有原型对象中的方法与属性
        DyPerson.prototype.count = 0;
        DyPerson.prototype.job = function() {
            return this.name;
        };
    }
}

/*------------------------使用场景较少----------------------*/
/* 寄生类似工厂模式，定义一个方法返回一个对象 */
/*寄生型构造函数创建对象  instanceof 操作符对这种对象没有意义*/
function SpecialArray() {
    //创建数组
    var values = [];
    //添加值
    values.push.apply(values, arguments);
    //添加方法
    values.toPipedString = function() {
        return this.join("|");
    };
    //返回数组
    return values;
}
var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"

/*------------------------使用场景较少----------------------*/
/*稳妥构造函数创建对象  instanceof 操作符对这种对象没有意义*/
function Person(name, age, job) {
    //创建要返回的对象
    var o = {};
    //可以在这里定义私有变量和函数

    //添加方法
    o.sayName = function() {
        return name;
    };
    //返回对象
    return o;
}
var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas"

/*------------------------原型链 继承----------------------*/
/* 少单独使用 */
function Parent() {
    this.value = Parent.name;
}
Parent.prototype = {
    constructor: Parent,
    input: function() {
        return this.value;
    }
};

function Child(name) {
    this.valie = Child.name;
    this.name = name;
}

Child.prototype = new Parent(); //继承父类原型(是父类原型的一个实例) constructor 指向Parent

//必须先继承（除非保证今后不继承） 再定义以下方法（且不能使用字面量方式定义原型）
Child.prototype.getName = function() { //新增方法
    return this.name;
};
Child.prototype.input = function() { //重写父类方法
    return this.value + ':' + this.name;
};
var child1 = new Child('Jing');

/*--------------------借调构造函数 继承--------------------*/
/* 少单独使用 */
/* 确保每次新建子类对象时，继承父类的属性是独立的 */
function Parent(name, sorec) {
    this.colors = ['red', 'blue', 'green'];
    this.name = name;
    this.sorec = sorec;
}

function Child(age) {
    //继承Parent
    Parent.call(this, arguments[1], arguments[2]);
    //子类实例属性
    this.age = age;
}
var child1 = new Child(),
    child2 = new Child(99, 'Jing', 25);
child1.colors.push('black');
console.log(child2.sorec);
console.log(child1.colors);
console.log(child2.colors);

/*-----------------------组合继承（常用）------------------------*/
/* 常用继承方式 */
/* 原型链 + 借用构造函数 组合方式实现继承 */
function Parent(name) {
    this.colors = ['red', 'blue', 'green'];
    this.name = name;
}
Parent.prototype = {
    constructor: Parent,
    sayName: function() {
        return this.name;
    }
};
/* 组合继承 */
function Child(name, age) {
    //借用父类构造函数 继承属性, 写在Child内部可以防止多个子类实例对象共享父类属性
    Parent.call(this, name);
    //子类实例属性
    this.age = age;
}

/* 可使用寄生组合封装以下语句，提高效率 */
//原型指向父类实例对象 继承方法
Child.prototype = new Parent();
//子类构造函数指向自身
Child.prototype.constructor = Child;
//子类拓展新方法
Child.prototype.sayAge = function() {
    return this.age;
};

var child1 = new Child('Jing', 24),
    child2 = new Child('Zing', 18);

child1.colors.push('black');
console.log(child1.colors);
console.log(child2.colors);
console.log(child1 instanceof Parent);

/*------------------------原型式继承----------------------*/
/* ES5 有 Object.create(obj,{额外属性的对象});静态方法规范化 object(o)方法*/
function object(o) { //创建对象副本的作用
    function Obj() {}
    Obj.prototype = o;
    return new Obj();
}
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
//创建实例对象
var person1 = object(person);
//添加实例属性
person1.name = 'Jing';

/*------------------------寄生组合式继承（高效）----------------------*/
/**
 * 实现基于类型继承的最有效方式：
 * 1、创建超类型原型的一个副本。
 * 2、为创建的副本添加 constructor 属性，弥补重写原型失去的默认 constructor 属性。
 * 3、将新创建的对象（即副本）赋值给子类型的原型。
 */
function object(o) { //创建对象副本的作用
    function Obj() {}
    Obj.prototype = o;
    return new Obj();
}

function inheritPrototype(Parent, Child) { //寄生组合式继承方法
    var prototype = object(Parent.prototype); // = Object.create(Parent.prototype); //IE9+
    prototype.constructor = Child;
    Child.prototype = prototype;
}
//父类
function Parent(name) {
    this.colors = ['red', 'blue', 'green'];
    this.name = name;
}
Parent.prototype.sayName = function() {
    return this.name;
};
//子类
function Child(name, age) {
    //构造函数内部的 this.属性名 都是实例对象属性
    //借用父类构造函数 继承属性, 写在Child内部可以防止多个子类实例对象共享父类属性
    Parent.call(this, name);
    this.age = age;
}
inheritPrototype(Parent, Child); //代替组合继承为子类的原型赋值的语句
//子类拓展新方法
Child.prototype.sayAge = function() {
    return this.age;
};

var child1 = new Child('Jing', 28),
    child2 = new Child('Zing', 24);
console.log(child1.name);
console.log(child2.sayName());
//检测colors属性在实例对象中是否独立
child1.colors.push('black');
console.log(child1.colors);
console.log(child2.colors);

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
