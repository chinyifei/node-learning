//区间合并算法
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var mergeIntervals = function (intervals) {
  // 先进行排序 （区间第一个元素）从小到大
  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < intervals.length; i++) {
    intervals[i].sort((a, b) => a - b);
  }
  console.log('sortedIntervals:',sortedIntervals)
  const result = [];
  // 取出第一个区间
  let current = sortedIntervals[0];
  for (let i = 1; i < sortedIntervals.length; i++) {
    // 循环比较后面的区间
    const interval = sortedIntervals[i];
    // 如果下一个区间的最小值 存在于当前比较的区间（小于当前区间的最大值） 则合并
    if (interval[0] <= current[1]) {
      // 合并取两个区间最大值的最大者
      current[1] = Math.max(current[1], interval[1]); // case 1
    } else {
      // 如果不在前一个区间内 说明当前区间与下一个区间不连续 则把当前区间添加到结果集
      result.push(current);
      // 更新比较的当前区间为下一个区间
      current = interval; // case 2
    }
  }
  // 遍历结束之后两种情况 
  // case 1 最后一个区间被合并，则需要将current添加到结果集
  // case 2 最后一个区间没有被合并，也需要将current添加到结果集
  result.push(current);
  return result;
};


let intervals = [[1, 3], [6, 2], [2, 4], [8,10],[15,18]];
const mergedIntervals = mergeIntervals(intervals);
console.log(mergedIntervals);

// arr.sort((a, b) => a[0] - b[0]);



function mergeInterval2(intervals) {
  // 先进行排序 （区间第一个元素）从小到大
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < intervals.length; i++) {
    intervals[i].sort((a, b) => a - b);
  }
  let res = intervals.reduce((acc, cur) => {
    if (acc.length === 0) {
      acc.push(cur);
    } else {
      let prev = acc[acc.length - 1];
      if (prev[1] >= cur[0]) { // 有重合
        prev[1] = Math.max(cur[1], prev[1]);
      } else {      // 不重合，cur推入acc数组
        acc.push(cur);
      }
    }
    return acc;
  }, []);
  return res
}

console.log(mergeInterval2(intervals))

