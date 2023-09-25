// test.js

const { dir,log } = require('console');
const path = require('path')

function multiply(a, b) {
  // debugger; // 在这里设置断点
  return a * b;
}

const result = multiply(2, 3);
console.log(result);

log(path.basename('C:\\temp\\myfile.html'))
console.dir(path.parse('/home/user/dir/file.txt'))
dir(path.normalize('/foo/bar//baz/asdf/quux/..'))
dir(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..','../'))
dir(path.resolve(__dirname, './baz'))