// 16 进制显示值

const buf1 = Buffer.from('test', 'utf-8'); // <Buffer 74 65 73 74>
console.log('buf1:',buf1)
const buf2 = Buffer.from(buf1); // <Buffer 74 65 73 74>，buf1 副本，修改 buf2 不会影响 buf1
console.log(buf2)
const buf3 = Buffer.from([256, 2, 3]); // <Buffer 00 02 03>，超过 255 会取模
console.log(buf3)
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
// 和 arr 共享内存
const buf4 = Buffer.from(arr.buffer);
console.log(buf4); // <Buffer 88 13 a0 0f>

// 修改 arr
arr[1] = 6000;
console.log(buf4); // <Buffer 88 13 70 17> buf4 也受到影响

const buf = Buffer.from(new String('this is a test'));
// <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>
console.log('------------------------------------------');
const bufill = Buffer.alloc(5,'string');
console.log(bufill); // <Buffer 00 00 00 00 00>