
//并发请求,用户可自定义最大 并发请求数
function concurRequest(urls, maxNum) {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([])
    }
    let index = 0 //下一次请求对应的url地址下标
    let count = 0 //请求完成次数
    const result = []
    async function request() {
      // const i = index
      const url = urls[index]
      try {
        const resp = await fetch(url)
        result[index] = resp
        // await fetch(url).then(res => {
        //   result[i] = res
        //   index++
        //   request()
        // })
      } catch (err) {
        result[index] = err
      } finally {
        count++
        index++
        if (count === urls.length) {
          resolve(result)
        }
        if (index < urls.length) {
          request()
        }
      }
    }
    for (let i = 0; i < Math.min(urls.length, maxNum); i++) {
      request()
    }
  })
}


/**
 * params:
 * arr1 = [1,3,5]
 * arr2 = [2,4,6,7]
 * return: [1,2,3,4,5,6,7]
 */
let arr1 = [1, 3, 5, 7, 10], arr2 = [2, 4, 6, 9];
function merge(arr1, arr2) {

  const r = []
  while (arr1.length || arr2.length) {
    let a = arr1[0]
    let b = arr2[0]
    if (!a) {
      r.push(b)
      arr2.shift()
      continue
    }
    if (!b) {
      r.push(a)
      arr1.shift()
      continue
    }
    if (a < b) {
      r.push(a)
      arr1.shift()
    } else {
      r.push(b)
      arr2.shift()
    }
  }
  return r
}
// const rr = merge(arr1, arr2)
// console.log(rr)

// (
//   function(){
//     var a = b =3
//   }
// )()

//归并排序
function mergeSort(arr) {
  const len = arr.length
  // 处理边界情况
  if (len <= 1) {
    return arr
  }
  // 计算分割点
  const mid = Math.floor(len / 2)
  // 递归分割左子数组，然后合并为有序数组
  const leftArr = mergeSort(arr.slice(0, mid))
  // 递归分割右子数组，然后合并为有序数组
  const rightArr = mergeSort(arr.slice(mid, len))
  // 合并左右两个有序数组
  arr = mergeArr(leftArr, rightArr)
  // 返回合并后的结果
  return arr
}
function mergeArr(arr1, arr2) {
  // 初始化两个指针，分别指向 arr1 和 arr2
  let i = 0, j = 0
  // 初始化结果数组
  const res = []
  // 缓存arr1的长度
  const len1 = arr1.length
  // 缓存arr2的长度
  const len2 = arr2.length
  // 合并两个子数组
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }
  // 若其中一个子数组首先被合并完全，则直接拼接另一个子数组的剩余部分
  if (i < len1) {
    return res.concat(arr1.slice(i))
  } else {
    return res.concat(arr2.slice(j))
  }
}

/**快速排序 */
function quickSort(arr) {
  // 如果数组长度小于等于1，直接返回
  if (arr.length <= 1) {
    return arr;
  }
  // 选择一个基准元素
  const pivot = arr[0];
  const left = [];
  const right = [];
  // 将数组分成两个子数组
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 递归地对两个子数组进行排序，并将它们合并起来
  return quickSort(left).concat(pivot, quickSort(right));
}

//选择排序
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    /**缓存最小值索引 */
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    /**交换位置 */
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]]
    }
  }
  return arr
}

/**冒泡排序 */
function betterBubbleSort(arr) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    // 区别在这里，我们加了一个标志位
    let flag = false
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        // 只要发生了一次交换，就修改标志位
        flag = true
      }
    }
    // 若一次交换也没发生，则说明数组有序，直接放过
    if (flag == false) return arr;
  }
  return arr
}

/**插入排序 */
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    //开始索引为i的元素与前面的元素比较
    for (let j = i - 1; j >= 0; j--) {
      /**因为前面都是有序的只需要比较当前元素与前面的元素的大小,
       * 如果 前面的元素比当前元素小,前面的所有元素都没必要再比了*/
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      } else {
        break;
      }
    }
  }
  return arr
}

/**LRU缓存算法 */
class LRUCache {
  #cache
  #maxSize
  constructor(maxSize) {
    this.#maxSize = maxSize
    this.#cache = new Map()
  }
  get(key) {
    if (!this.#cache.has(key)) return
    const value = this.#cache.get(key)
    this.#cache.delete(key)
    this.#cache.set(key, value)
    return value
  }
  set(key, value) {
    if (this.#cache.has(key)) {
      this.#cache.delete(key)
    } else if (this.#cache.size >= this.#maxSize) {
      this.#cache.delete(this.#cache.keys().next().value)
    }
    this.#cache.set(key, value)
  }
}
// const r = new LRUCache(3)
// r.set(1, 1)
// console.log(r)


/**
 * 不使用 async/await 实现顺序执行
 */

const timeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

let promiseArr = [() => timeout(1000).then(() => {
  console.log('1')
  return 1
}), () => timeout(2000).then(() => {
  console.log('2')
  return 2
})]


function executePromise(promiseArr) {
  return new Promise((resolve) => {
    let result = []
    let promise = Promise.resolve()
    for (let i = 0; i < promiseArr.length; i++) {
      promise = promise.then(promiseArr[i]).then(res => {
        result.push(res)
      })
    }
    promise.then(() => {
      resolve(result)
    })
  });
}

function executePromisesInOrder(promises) {
  return promises.reduce((prevPromise, nextPromise) => {
    return prevPromise.then(() => {
      return nextPromise();
    });
  }, Promise.resolve());
}

const promises = [
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Promise 1');
        resolve();
      }, 1000);
    });
  },
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Promise 2');
        resolve();
      }, 5000);
    });
  },
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Promise 3');
        resolve();
      }, 3000);
    });
  }
];

executePromisesInOrder(promises)
  .then(() => {
    console.log('All promises executed');
  })
  .catch((error) => {
    console.error('Error executing promises:', error);
  });

// 数组转成树形结构
function arrayToTree(arr, parentId = 0) {
  /*
   * 使用递归将给定的数组转换为树形结构
   * @param arr {Array} - 待转换的数组
   * @param parentId {number} - 当前节点的父节点ID，默认为0
   * @returns {Array} - 转换后的树形结构数组
   */
  const tree = [];
  for (const node of arr) {
    if (node.parentId === parentId) {
      const children = arrayToTree(arr, node.id);
      if (children.length > 0) {
        node.children = children;
      }
      tree.push(node);
    }
  }
  return tree;
}

// 示例用法
const arr = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
];

// const tree = arrayToTree(arr);
// console.log(tree);

/**产生随机颜色 */
function randomColor() {
  return '#' + Math.random().toString(16).substring(2, 8).padEnd(6, '0');
}
console.log(randomColor())