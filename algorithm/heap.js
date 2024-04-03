/**
 * 构建小顶堆排序
 * @param {Array} arr - 待排序的数组
 * @returns {Array} - 排序后的数组
 */
function heapSort(arr) {
  // 构建大顶堆
  for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
    heapify(arr, arr.length, i);
  }

  // 排序过程
  for (let i = arr.length - 1; i > 0; i--) {
    // 将堆顶元素和堆的末尾元素交换位置
    swap(arr, 0, i);

    // 对更新后的堆进行调整
    heapify(arr, i, 0);
  }

  return arr;
}

/**
 * 堆调整函数
 * @param {Array} arr - 待调整的堆
 * @param {number} n - 堆的大小
 * @param {number} i - 需要调整的元素的索引
 */
function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // 找到最大的元素的索引
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // 如果最大元素不是堆顶元素，交换它们的位置
  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, n, largest);
  }
}

/**
 * 交换数组中两个元素的位置
 * @param {Array} arr - 待交换元素所在的数组
 * @param {number} i - 第一个元素的索引
 * @param {number} j - 第二个元素的索引
 */
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 示例用法
const arr = [12, 11, 1, 13, 5, 6, 7];
const sortedArr = heapSort(arr);
console.log(sortedArr); // 输出 [1, 5, 6, 7, 11, 12, 13]
