setImmediate(console.log, 1);
setTimeout(console.log, 1, 2);
Promise.resolve(3).then(console.log);
process.nextTick(console.log, 4);
console.log(51);