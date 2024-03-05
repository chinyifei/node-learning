function thrott(fn, delay) {
  let timer = null;
  return function (...arg) {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...arg);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

function debounce(fn, delay) {
  let timer = null;
  return function (...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...arg);
      timer = null;
      //结束之后也要清楚定时器,不然会有内存泄露
      clearTimeout(timer);
    }, delay);
  };
}

//节流函数
function throttle(fn, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}
//防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

const _getUniqueNums = (start, end, n) => {
  // 补全代码
  const res = [];
  while (n > 0) {
    const Rnumber = getRandomNumber(start, end);
    res.push(Rnumber);
    n--;
  }
  // 重复的数字去掉
  result = Array.from(new Set(res));
  return result;
};
function getRandomNumber(min, max) {
  // 使用 Math.random() 生成一个位于 [0, 1) 范围内的随机数
  // 将其缩放到 [min, max] 范围内
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const res = _getUniqueNums(2, 9, 3)
// console.log(res)
//数字转罗马数字
var intToRoman = function (num) {
  const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const arr = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  let res = "",
    index = 0;
  while (num) {
    while (num >= vals[index]) {
      res += arr[index];
      num -= vals[index];
    }
    index++;
  }
  return res;
};

console.log(intToRoman(3999));
