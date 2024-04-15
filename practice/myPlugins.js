/**
 * 函数柯里化
 */
function currying(fn, ...args) {
  // console.log(args);
  return function (...params) {
    const curArgs = params;
    // console.log(curArgs);
    const totalArgs = [...args, ...curArgs];
    // console.log(totalArgs, "fn:", fn.length);
    if (totalArgs.length >= fn.length) {
      // 参数数量够了
      return fn(...totalArgs);
    } else {
      // 参数数量不够,继续返回一个函数
      return function (...arg) {
        return currying(fn, ...totalArgs, ...arg);
      };
    }
  };
}
const f = (x, y, z) => {
  return (x + y) * z;
};

const g = currying(f, 1, 2);
g(3);
console.log(g(3));
