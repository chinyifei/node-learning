const { dir } = require('console');
const EventEmitter = require('events');
// const myEmitter = new EventEmitter();

// // 第一个监听器。
// myEmitter.on('event', function firstListener() {
//   console.log('第一个监听器');
// });
// // 第二个监听器。
// myEmitter.on('event', function secondListener(arg1, arg2) {
//   console.log(`第二个监听器中的事件有参数 ${arg1}、${arg2}`);
// });
// // 第三个监听器
// myEmitter.on('event', function thirdListener(...args) {
//   const parameters = args.join(', ');
//   console.log(`第三个监听器中的事件有参数 ${parameters}`);
// });

// console.log(myEmitter.listeners('event'));

// myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// 第一个监听器
// 第二个监听器中的事件有参数 1、2
// 第三个监听器中的事件有参数 1, 2, 3, 4, 5

const myEmitters = new EventEmitter();
myEmitters.on('event', (a, b) => {
  setImmediate(() => {
    console.log('异步地发生');
  });
});
const fooListener = () => {};
const barListener = () => {};
myEmitters.on('foo', fooListener)
myEmitters.on('bar', barListener)
myEmitters.emit('event', 'a', 'b');
dir(myEmitters.eventNames())
process.nextTick(() => {
  console.log('Inside nextTick callback');
});

  myEmitters.off('bar',barListener)

dir(myEmitters.eventNames())