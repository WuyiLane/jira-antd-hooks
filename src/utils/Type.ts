// 基本的ts文档记录
// 在下面这个例子中，使用了变量、函数参数以及函数返回值的类型注解：
export const FunType = () => {
  const num: number = 123;
  // :number 返回值
  function identity(num: number): number {
    return num;
  }
  // 不能将类型“string”分配给类型“number”。ts(2322)
  identity(123);
  //类型“number”的参数不能赋给类型“string”的参数。
};

function formatCommandline(command: string[] | string) {
  // 已声明“formatCommandline”，但从未读取其值。
  // function formatCommandline(command: string[] | string): void

  let line = '';
  if (typeof command === 'number') {
    // 类型“never”上不存在属性“trim”。
    // line = command.trim()
  } else {
    // 类型“string | string[]”上不存在属性“join”。
    //   类型“string”上不存在属性“join”
    //  line = command.join('').trim();
  }
}

function extendFunc<T extends object, U extends object>(first: T, second: U): T & U {
  const result = <T & U>{}; // 新对象拥有两个对象的所有功能

  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }
  return result;
}

const x = extendFunc({ a: 'hello' }, { b: 45 });

// 现在 x 拥有了a属性与b属性

const a = x.a;
const b = x.b;

// 元组类型

let nameNumber: [string, number];

nameNumber = ['Jenny', 2345678];

// nameNumber = ['Jenny','2345678'] // 不能将类型“string”分配给类型“number”。

// 将其与 TypeScript 中的解构一起使用：

let nameNumbers: [string, number];

nameNumbers = ['Jenny', 32456789];

// 类型别名

/**TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 type SomeName = someValidTypeAnnotation 来创建别名： */

type StrorNum = string | number;

// 使用

let sample: StrorNum; // 赋值的值要符合定义的类型

sample = 123;
sample = '123';
// sample = true; // error 不能将类型“boolean”分配给类型“StrorNum”。

/**
 * 与接口不同，你可以为任意的类型注解提供类型别名
 * （在联合类型和交叉类型中比较实用），
 * 下面是一些能让你熟悉类型别名语法的示例。
 *
 *
 */

// 任意的类型注解提供类型别名（在联合类型和交叉类型中比较实用）
type Text = string | { text: string };

type Coordinates = [number, number];

type Callback = (data: string) => void;

/***
 * 如果你需要使用类型注解的层次结构，请使用接口。
 * 它能使用 implements 和 extends
  为一个简单的对象类型（如上面例子中的 Coordinates）使用类型别名，
  只需要给它一个语义化的名字即可。
  另外，当你想给联合类型和交叉类型提供一个语义化的名称时，
  一个类型别名将会是一个好的选择。
 */
