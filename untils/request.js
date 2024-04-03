/**
 * 并发请求 （错误重试）
 * @param {string[]} urls 请求的url数组
 * @param {number} maxNum
 */
function concurRequest(urls, maxNum) {
  if (urls.length === 0) return Promise.resolve([]);
  return new Promise((resolve) => {
    let count = 0; //当前完成的数量
    let index = 0; //下一次请求对应的url地址下标
    const result = []; //存储请求结果
    /**定义请求函数 */
    async function _request() {
      //保存一下index,不然会改变,这是当前请求的索引而不是公共的index
      const i = index;
      const url = urls[index];
      index++;
      try {
        /** 这里fetch在404URL时并不会抛出错误，而是response.ok = false */
        const res = await fetchSomething(url);
        result[i] = res;
      } catch (error) {
        console.log("-------------", error);
        const finallyRes = await retryRequest(url, 3)
          .then((res) => {
            result[i] = res;
          })
          .catch((err) => {
            result[i] = err;
          });
        /**
         * 这里finallyRes是拿不到值的，因为await拿不到reject的值,
         * 只能在try catch中的err回调中拿
         */
        console.log("finallyRes:", finallyRes);
        //result[i] = finallyRes
      } finally {
        count++;
        if (count === urls.length) {
          resolve(result);
        }
        if (index < urls.length) {
          _request();
        }
      }
    }
    for (let i = 0; i < Math.min(maxNum, urls.length); i++) {
      _request();
    }
  });
}

//错误重试
function retryRequest(url, maxRetries) {
  return new Promise((resolve, reject) => {
    let retries = 0;

    function attempt() {
      fetchSomething(url)
        .then((data) => resolve(data))
        .catch((error) => {
          retries++;
          if (retries <= maxRetries) {
            console.log("fail:", error);
            console.log(`请求失败，第${retries}次重试...`);
            attempt();
          } else {
            reject(error);
          }
        });
    }

    attempt();
  });
}

/***
这里fetch在404URL时并不会抛出错误，而是response.ok = false ,所以为了测试方便，
我们来改造一下
*/
// class FetchError extends Error {
//   constructor(response) {
//     super(`HTTP error ${response}`);
//     this.response = response;
//   }
// }

function fetchSomething(...args) {
  return fetch(...args).then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  });
}

/**
 * 测试用例
 */
const concurRequestTest = () => {
  const urls = [];
  for (let i = 0; i <= 20; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
  }
  concurRequest(urls, 5).then((res) => {
    console.log(res);
  });
};
concurRequestTest();
