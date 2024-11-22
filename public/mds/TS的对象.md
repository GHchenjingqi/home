## 对象-类Class

万物皆对象，面向对象编程。

### 定义类

对象主要包含 属性和方法。

```
class 类名{
	属性名: 类型;
	constructor(参数:类型){
		this.属性名 = 参数;
	}
	方法名(){
		...
	}
}
```

例如实现一个人的对象。

```
class Person{
	// 实例化属性
	name: string;
	age: number;
	// 静态属性
	static sex：string = '男'
	// 构造函数
	constructor(name: string){
		this.name = name;
	}
	sayHi(){
	
	}
	// 静态方法
	static say(){
	
	}
}
```

静态属性和静态方法必须使用类获取，不能通过实例化方式获取。静态属性不可修改。

```
Person.sex;
Person.say();
```

默认实例化属性和实例化方法需要先实例化，再调用。

```
let per = new Person();
per.name;
per.sayHi();
```

### 构造函数constructor

每个对象都有一个constructor构造函数，用于初始化对象。

### this指向

类里面的this指向当前实例化的对象。

### 类继承

类的继承通过关键字：extends 实现继承。子类继承父类的所有属性和方法。子类方法与父类方法同名，子类方法会重写改方法（子类方法生效）。

```
class 子类 extends 父类{ }

class Male extends Person{ 
	sex:string;
	constructor(sex: string){
		super();
		this.sex = sex;
	}
}
```

子类通过关键字：super 继承父类的所有属性，同事可以在子类构造函数里新增自己的属性。

### 抽象类与抽象方法

抽象类和抽象方法通过关键字：abstract 实现。在类前面就是抽象类，抽象方法必须在抽象类里面。

```
abstract class Person{
	name:string;
	constructor(name: string){
		this.name = name;
	}
	// 抽象方法
	abstract say(){
	
	}
}
```

