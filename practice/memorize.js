class MemoizeMap {
  constructor() {
    this._normalMap = new Map();
    this._objectMap = new WeakMap();
  }
  _isObject(key) {
    return key !== null && typeof key === "object";
  }
  get(key) {
    if (this._isObject(key)) {
      return this._objectMap.get(key);
    } else {
      return this._normalMap.get(key);
    }
  }
  set(key, value) {
    if (this._isObject(key)) {
      this._objectMap.set(key, value);
    } else {
      this._normalMap.set(key, value);
    }
  }

  has(key) {
    if (this._isObject(key)) {
      return this._objectMap.has(key);
    } else {
      return this._normalMap.has(key);
    }
  }
}

//实现memoize 实现缓存
/**
 *
 * @param {*} func
 * @param {*} resolve 自己决定已什么参数作为:key
 * @returns
 */
function memoize(func, resolve) {
  function memoized(...arg) {
    const key = resolve ? resolve(...arg) : arg[0];
    if (memoized.cache.has(key)) {
      return memoized.cache.get(key);
    }
    const result = func.apply(this, arg);
    memoized.cache.set(key, result);
    return result;
  }
  //  map键影响垃圾回收
  memoized.cache = new MemoizeMap();
  return memoized;
}
var object = { a: 1, b: 2 };
var other = { c: 3, d: 4 };

var values = memoize((obj) => Object.values(obj));
console.log(values(object)); // =>[1, 2]

console.log(values(other)); // =>[3, 4]

object.a = 2;
console.log(values(object)); // =>[1, 2]

// Modify the result cache.
values.cache.set(object, ["a", "b"]);
console.log(values(object)); // =>['a', 'b']
