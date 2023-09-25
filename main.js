const a = require('./a')
const b = require('./b')

console.log('node 入口文件')
/**
 * 
 * 为什么说CommonJs中exports 本质上就是 module.exports
在CommonJS模块系统中，exports对象和module.exports对象都是用于导出模块内容的。它们本质上指向同一个对象，但是有一些微妙的差别。

当一个模块被加载时，模块系统会创建一个名为module的对象，它代表当前模块。module对象有一个exports属性，它是一个指向module.exports的引用。初始情况下，module.exports和exports都指向同一个空对象{}。

当我们使用exports对象导出内容时，实际上是在向module.exports对象添加属性或方法。例如，exports.foo = 'bar'会将'bar'赋值给module.exports.foo。这样，module.exports对象的内容就会被导出为模块的公共接口。

然而，当我们直接将exports对象赋值为一个新的对象时，exports对象和module.exports对象就会断开联系，它们不再指向同一个对象。这意味着，后续对exports对象的修改不会影响到module.exports对象。

因此，为了避免导出异常，通常推荐使用module.exports来导出模块的内容，而不是直接修改exports对象。这样可以确保module.exports始终是模块的导出内容。

综上所述，尽管exports和module.exports在语法上有一些差别，但它们本质上指向同一个对象，都用于导出模块的内容。推荐使用module.exports来导出模块的内容，以确保一致性和避免潜在的问题。
 */