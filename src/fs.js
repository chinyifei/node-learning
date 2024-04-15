const fs = require('fs');
const promisify = require('util').promisify;


// fs.stat('./fs.js', (err, stats) => {
//   if(!err) {
//     console.log(stats);
//     console.log(stats.isFile());
//     console.log(stats.size);
//   }
// });
// fs.readFile('./fs.js', { encoding: 'utf8', flag: 'r' }, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });


const open = promisify(fs.open);
const read = promisify(fs.read);
const close = promisify(fs.close);

async function test() {
  const fd = await open('./test.txt');
  console.log('fd',fd)
  const readOptions = {
    // buffer: Buffer.alloc(26), 异步调用默认可以不设置，如果希望读取的字节写入指定的缓冲区可以指定
    position: 11, // 从第 11 个字节开始读取，读取后文件位置被重置
    length: 26, // 读取 26 个字节
  };

  const { bytesRead: bytesRead1, buffer: buf1  } = await read(fd, readOptions);

  console.log(`第一次读取字节数: ${bytesRead1}`);
  console.log(`第一次读取数据内容: ${buf1.toString()}`);

  // 不指定 position，文件位置每次读取后会保持
  const { bytesRead: bytesRead2, buffer: buf2 } = await read(fd, { length: 1 });
  console.log(`第二次从文件重置后位置读取 ${bytesRead2} 字节内容: ${buf2.toString()}`);

  const { bytesRead: bytesRead3, buffer: buf3 } = await read(fd, { length: 1 });
  console.log(`第三次从文件当前位置读取 ${bytesRead3} 字节内容: ${buf3.toString()}`);

  await close(fd);
  console.log(`文件描述符 ${fd} 已关闭`);
}

test();

const rs = fs.createReadStream('./test.txt', { start: 11, end: 36 });

rs.on('open', fd => {
  console.log(`文件描述符 ${fd} 已分配`);
});

rs.on('ready', () => {
  console.log('文件已准备好');
});

rs.on('data', chunk => {
  console.log('读取文件数据:', chunk.toString());
});

rs.on('end', () => {
  console.log('文件读取完成');
});

rs.on('close', () => {
  console.log('文件已关闭');
});

rs.on('error', (err) => {
  console.log('文件读取发生发生异常:', err.stack);
});