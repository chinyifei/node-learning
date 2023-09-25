/**
 * Reflect 
 * 调用对象的"基本方法"
 */
const { dir, log } = require('console');


let obj = {
  a: 3,
  b: 4,
  get c() {
    return this.a + this.b
  }
}

// obj.a = 33
// log(obj)
//和上面是等价的
// Reflect.set(obj, 'a', 3)
// log(obj)

const p = new Proxy(obj, {
  get(target, key, receiver) {
    log('get', target, key)
    // return target[key] //get { a: 3, b: 4, c: [Getter] }
    /**
     * get { a: 3, b: 4, c: [Getter] } c 
       get { a: 3, b: 4, c: [Getter] } a 
       get { a: 3, b: 4, c: [Getter] } b 
     */
    return Reflect.get(target, key, receiver)
  },

})
p.c

const obj2 = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol('d')]:6
}

Object.defineProperty(obj2, 'c', {
  value: 4,
  enumerable: false
})

log(Object.keys(obj2)) //[ 'a', 'b' ]
/**直接调用基本方法获取,不经过其他方法封装的过程 */
log(Reflect.ownKeys(obj2))//[ 'a', 'b', 'c' ]

const oobj = {
  store:['foo','bar','baz'],
  [Symbol.iterator]: function(){
    let index = 0
    const self = this
    return {
      next:function(){
        return {
          value: self.store[index],
          done: index++ > self.store.length
        }
      }
    }
  }
}

for(const item of oobj) {
  console.log('循环体',item)
}

//使用Generator函数实现iterator方法(因为生成器也实现了iterator接口)
const todos = {
  life:['吃饭','睡觉','打豆豆'],
  learn:['学习JavaScript','学习NodeJS'],
  work:['喝茶'],
  [Symbol.iterator]:function * () {
    const all = [...this.learn,...this.life,...this.work]
    for(const item of all ){
      yield item
    }
  }
}

for(const item of todos ){
 console.log(item)
}