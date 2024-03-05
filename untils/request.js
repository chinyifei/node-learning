/**
 * 并发请求
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
        const res = await fetch(url);
        result[i] = res;
      } catch (error) {
        result[i] = error;
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

/**
 * 测试用例
 */
const concurRequestTest = () => {
  const urls = [];
  for (let i = 0; i <= 20; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i + 1}`);
  }
  console.log("urls", urls);
  concurRequest(urls, 5).then((res) => {
    console.log(res);
  });
};
concurRequestTest();
