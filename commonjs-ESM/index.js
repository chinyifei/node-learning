let { num, add,a } = require("./a.js")
console.log(num,a) // 0
add()
console.log(num) // 0
num = 10
console.log(num++) // 10
console.log(num) // 11