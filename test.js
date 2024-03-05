/**
 * 不使用 async/await 实现顺序执行
 */

const timeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

let promiseArr = [
  () =>
    timeout(1000).then(() => {
      console.log("1");
      return 1;
    }),
  () =>
    timeout(2000).then(() => {
      console.log("2");
      return 2;
    }),
];

function executePromise(promiseArr) {
  return new Promise((resolve) => {
    let result = [];
    let promise = Promise.resolve();
    for (let i = 0; i < promiseArr.length; i++) {
      promise = promise.then(promiseArr[i]).then((res) => {
        result.push(res);
      });
    }
    //这里会等for循环结束之后才执行吗?
    promise.then(() => {
      resolve(result);
    });
  });
}

executePromise(promiseArr)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
