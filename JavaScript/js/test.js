(function() {

    'use strict';

    window.Test = {
        object: objectFn,
        inheritPrototype: inheritPrototypeFn
    };

    function objectFn(o) {
        function Obj() {}
        Obj.prototype = o;
        return new Obj();
    }

    function inheritPrototypeFn(Parent, Child) {
        Child.prototype = objectFn(Parent.prototype);
        Child.prototype.constructor = Child;
    }
    
})();
(function() {
    'use strict';

    function Parent(name) {
        this.colors = ['red', 'blue', 'green'];
        this.name = name;
    }
    Parent.prototype.sayName = function() {
        return this.name;
    };

    function Child(name, age) {
        //继承父类属性（实例不共享）
        Parent.call(this, name);
        this.age = age;
    }

    Test.inheritPrototype(Parent, Child);
    Child.prototype.sayAge = function() {
        return this.age;
    };

    window.Parent = Parent;
    window.Child = Child;
        alert('test测试');

})();
