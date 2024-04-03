Promise.resolve()
  .then(() => {
    console.log("0");
    /** Promise.resolve(4) 在V8引擎下实现的是相当于 Promise.resolve().then(() => 4)
     * 先把完成promise这个回调放入微任务队列，记作p4;
     * p4.then(()=>完成p0)
     * 然后在微任务队列里面执行()=>完成p0
     * 至此p0的状态变成fulfilled,总共两步
     */
    return Promise.resolve(4);
    // return Promise.resolve().then(() => 4);
    // return await 4;
  })
  .then((res) => {
    console.log(res);
  });
/**
 * .then(callback)是吧callback放入微任务队列(micro task)
 *
 * await 是把后面的代码放入微任务队列
 * 例如下面的代码: 相当于fetch("http://localhost:3000").then(()=>{
 *  const num = Math.random();
    console.log(res, num);
 * })
 * 就是把 const num = Math.random();console.log(res, num);放入微任务队列
 * async function runMicroTask() {
    const res = await fetch("http://localhost:3000");
    const num = Math.random();
    console.log(res, num);
  }
 * */

Promise.resolve()
  .then(() => {
    console.log("1");
  })
  .then(() => {
    console.log("2");
  })
  .then(() => {
    console.log("3");
  })
  .then(() => {
    console.log("5");
  })
  .then(() => {
    console.log("6");
  });

/**
 * 不能使用async/await ,请使用Promise的方式实现顺序执行
 */

const timeout = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });

executePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data);
});

function myExcutePromise(arr) {
  let result = [];
  return new Promise((resolve) => {
    let promise = Promise.resolve();
    for (let i = 0; i < arr.length; i++) {
      item = arr[i];
      promise = promise.then(item).then((res) => {
        result.push(res);
      });
    }
    promise.then(() => {
      resolve(result);
    });
  });
}

function myExecutePromise(arr) {
  return arr
    .reduce((promise, item) => {
      return promise.then(item).then((res) => [...result, res]);
    }, Promise.resolve())
    .then((result) => {
      console.log(result);
      return result;
    });
}

// 要求分别输出
// 1
// 2
// 3
// done
// [1,2,3]

const executePromise = (ajaxArray) => {
  // 不能使用async/await ,请使用Promise的方式实现
  return new Promise((resolve) => {
    let promise = Promise.resolve();
    let result = [];
    for (let i = 0; i < ajaxArray.length; i++) {
      promise = promise.then(ajaxArray[i]).then((res) => {
        result.push(res);
      });
    }
    promise.then(() => {
      resolve(result);
    });
  });
};

/**一个面试题 */
const tasks = [];
for (let i = 0; i < 5; i++) {
  tasks.push(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(i);
      }, 2000);
    });
  });
}
const processor = processTasks(...tasks);
begin.onclick = async () => {
  console.log("点击开始");
  const res = await processor.start();
  console.log("任务执行完成", res);
};
//暂停按钮点击事件
pause.onclick = () => {
  console.log("点击暂停");
  processor.pause();
};
/**
 * 依次顺序执行一系列任务
 * 所有任务全部完成后可以得到每个任务的执行结果
 * 需要返回两个方法,start用于启动任务,pause用于暂停任务
 * 每个任务具有原子性,即不可中断,只能在两个任务之间中断
 * @param{...Function} tasks 任务列表,每个任务无参、异步
 *
 */
function processTasks(...tasks) {
  let isRuning = false;
  const result = [];
  let i = 0; //当前任务的索引
  return {
    start() {
      return new Promise(async (resolve, reject) => {
        if (isRuning) {
          return;
        }
        isRuning = true;
        //依次执行任务
        while (i < tasks.length) {
          console.log("任务开始:", i);
          result.push(await tasks[i]());
          console.log("任务结束:", i);
          i++;
          if (!isRuning) {
            return;
          }
        }
        //所有任务执行完毕
        isRuning = false;
        resolve(result);
      });
    },
    pause() {
      console.log("任务暂停:", i);
      isRuning = false;
    },
  };
}
