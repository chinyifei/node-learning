// /**
//  * 给定数组arr，arr中所有的值都为正整数且不重复。每个值代表一种面值的货币，每种面值的货币可以使用任意张，
//  * 再给定一个aim，代表要找的钱数，求组成aim的最少货币数。 如果无解，请返回-1.
//  */
// function minCoins(coins, amount) {
//   // base case
//   if (amount == 0) return 0;
//   if (amount < 0) return -1;

//   var res = Number.MAX_SAFE_INTEGER;
//   for (var coin of coins) {
//     var subProblem = minCoins(coins, amount - coin);
//     // 子问题无解则跳过
//     if (subProblem == -1) continue;
//     // 在子问题中选择最优解，然后加一
//     res = Math.min(res, subProblem + 1);
//   }
//   return res == Number.MAX_SAFE_INTEGER ? -1 : res;
// }

// // 示例用法
// const arr = [1, 2, 5];
// const aim = 21;
// console.log(minCoins(arr, aim)); // 输出 3（需要 3 张面值为 5 的货币）

// /**
//  * 给定一个整数数组nums，按升序排序，数组中的元素各不相同。 nums数组在传递给search函数之前，
//  * 会在预先未知的某个下标 t（0 <= t <= nums.length-1）上进行旋转，让数组变为[nums[t], nums[t+1], ...,
//  * nums[nums.length-1], nums[0], nums[1], ..., nums[t-1]]。
//  * 比如，数组[0,2,4,6,8,10]在下标2处旋转之后变为[6,8,10,0,2,4] 现在给定一个旋转后的数组nums和一个整数target，
//  * 请你查找这个数组是不是存在这个target，如果存在，那么返回它的下标，如果不存在，返回-1
//  */

// function search(nums, target) {
//   let left = 0; // 左边界
//   let right = nums.length - 1; // 右边界

//   while (left <= right) {
//     let mid = Math.floor((left + right) / 2); // 中间位置的索引

//     if (nums[mid] === target) {
//       // 如果中间元素等于目标值，直接返回中间索引
//       return mid;
//     }

//     if (nums[left] <= nums[mid]) {
//       // 如果左半段是有序的

//       if (nums[left] <= target && target < nums[mid]) {
//         // 如果目标值在左半段的有序范围内
//         right = mid - 1; // 缩小右边界到mid的左边一位
//       } else {
//         left = mid + 1; // 缩小左边界到mid的右边一位
//       }
//     } else {
//       // 如果右半段是有序的

//       if (nums[mid] < target && target <= nums[right]) {
//         // 如果目标值在右半段的有序范围内
//         left = mid + 1; // 缩小左边界到mid的右边一位
//       } else {
//         right = mid - 1; // 缩小右边界到mid的左边一位
//       }
//     }
//   }

//   return -1; // 目标值不存在
// }

// // 示例用法
// const nums = [6, 8, 10, 0, 2, 4];
// const target = 0;
// console.log(search(nums, target)); // 输出 3（目标元素 0 在索引 3 处）
// // [3, 2, 0, -4, 5];
// function hasCycle(head) {
//   if (head == null || head.next == null) {
//     return false; // 空链表或只有一个节点的链表肯定没有环
//   }

//   let slow = head;
//   let fast = head.next;

//   while (slow != fast) {
//     if (fast == null || fast.next == null) {
//       return false; // 快指针到达链表尾部，说明链表无环
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }

//   return true; // 快指针追上慢指针，说明链表有环
// }
// class ListNode {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

// // 创建一个有环的链表
// const head = new ListNode(3);
// const node2 = new ListNode(2);
// const node3 = new ListNode(0);
// const node4 = new ListNode(-4);
// const node5 = new ListNode(5);

// head.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node5;
// node5.next = node2; // 这里形成了环，node5 指向 node2

// console.log(hasCycle(head));

/**
 * 和为 K 的子数组
 * */

var subarraySum = function (nums, k) {
  let count = 0; // 记录满足条件的连续子数组的个数
  let sum = 0; // 当前位置的前缀和
  const map = new Map(); // 哈希表，用于记录前缀和出现的次数
  map.set(0, 1); // 初始化，前缀和为0的出现次数为1

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]; // 计算当前位置的前缀和

    if (map.has(sum - k)) {
      // 如果在哈希表中存在前缀和为 sum - k，说明存在一个连续子数组的和为 k
      count += map.get(sum - k); // 将其出现的次数加到 count 中
    }

    if (map.has(sum)) {
      // 如果当前前缀和 sum 在哈希表中已经存在，则将其出现次数加一
      map.set(sum, map.get(sum) + 1);
    } else {
      // 如果当前前缀和 sum 在哈希表中不存在，则将其加入哈希表，并设置出现次数为 1
      map.set(sum, 1);
    }
  }

  return count; // 返回满足条件的连续子数组的个数
};

// 示例用法
const nums = [1, 2, 3]; // 数组
const k = 3; // 目标和
console.log(subarraySum(nums, k)); // 输出 2，存在两个连续子数组的和为 2：[1, 1] 和 [1, 1]

//实现call方法

// 相当于在obj上调用fn方法，this指向obj
// var obj = {fn: function(){console.log(this)}}
// obj.fn() fn内部的this指向obj
// call就是模拟了这个过程
// context 相当于obj
Function.prototype.myCall = function (context = window, ...args) {
  // if (typeof context !== "object") context = new Object(context); // 值类型，变为对象
  //  参数归一化
  context =
    context === null || context === undefined ? globalThis : Object(context);
  // args 传递过来的参数
  // this 表示调用call的函数fn
  // context 是call传入的this
  const fn = this;
  // 在context上加一个唯一值，不会出现属性名称的覆盖
  let fnKey = Symbol();
  // 相等于 obj[fnKey] = fn
  // context[fnKey] = this; // this 就是当前的函数
  context[fnKey] = fn;
  //使新增的字段，不可枚举
  Object.defineProperties(context, fnKey, { enumerable: false, value: fn });
  // 绑定了this
  let result = context[fnKey](...args); // 相当于 obj.fn()执行 fn内部this指向context(obj)

  // 清理掉 fn ，防止污染（即清掉obj上的fnKey属性）
  delete context[fnKey];

  // 返回结果
  return result;
};

//用法：f.call(this,arg1)

function f(a, b) {
  console.log(a + b);
  console.log(this.name);
}
let obj = {
  name: 1,
};
f.myCall(obj, 1, 2); // 不传obj，this指向window

//实现new方法
/**
 * 创建一个全新的对象obj，继承构造函数的原型：这个对象的__proto__要指向构造函数的原型prototype
执行构造函数，使用 call/apply 改变 this 的指向（将obj作为this）
返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象obj} params 
 */
function myNew(constructor, ...arg) {
  const obj = Object.create(constructor.prototype);

  const result = constructor.apply(obj, arg);
  return typeof result === "object" ? result : obj;
}

//实现bind方法
Function.prototype.MyBind = function (ctx) {
  const arg = Array.slice(arguments, 1);
  const fn = this;
  return function A() {
    const restArg = Array.slice(arguments);
    //判断是否使用new方式调用这个函数
    //  if (Object.getPrototypeOf(this) === A.prototype)
    if (this instanceof A) {
      // return new fn(...arg, ...restArg);
      const obj = Object.create({}.prototype);
      fn.apply(obj, arg.concat(restArg));
    } else {
      return fn.apply(ctx, arg.concat(restArg));
    }
  };
};

function fn(a, b, c, d) {
  console.log(a, b, c, d);
}

const newFn = fn.MyBind("ctx", 1, 2);
newFn(3, 4);
