let num = 0;
// commonjs不支持导入ESM
// const b = require("./b.mjs");
// console.log(b);
module.exports.a = "a";
//会覆盖默认导出对象
module.exports = {
  num,
  add() {
    ++num;
    console.log("anum:", num);
  },
};
