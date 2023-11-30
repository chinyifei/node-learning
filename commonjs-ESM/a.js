let num = 0;

module.exports.a='a'
//会覆盖默认导出对象
module.exports = {
    num,
    add() {
       ++ num 
       console.log('anum:',num)
    }
}