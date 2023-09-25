const fs = require('fs');

const data = Buffer.from('Hello, Node.js');
fs.writeFile('./text.txt', data, err => {
  if (err) throw err;
  console.log('文件已被保存');
});


/**fs.write */
const data1 = Buffer.from('Hello, Node.js');
const data2 = 'Hello, Node.js!';

const fd = fs.openSync('./text.txt', 'w');
console.log(fd)

fs.write(fd, data1, err => {
  if (err) throw err;
  console.log('data1 已被写入');
});

fs.write(fd, data2, err => {
  if (err) throw err;
  console.log('data2 已被写入');
});

setTimeout(() => {
  fs.close(fd, console.log);
}, 100);



/**----可读流内容写到可写流非常简单 */

fs.createReadStream('./test.txt')
  .pipe(fs.createWriteStream('./copy.txt'));