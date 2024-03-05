function jumpFloor(n) {
  if (n <= 2) {
    return n;
  }

  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// 示例用法
const n = 3;
console.log(jumpFloor(n)); // 输出 8

// 创建链表节点
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// 创建链表
var head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

/* 递归遍历单链表，倒序打印链表元素 */
var traverse = function (head) {
  if (head === null) {
    console.log("-------------");
    return;
  }
  // 前序位置
  console.log(head.val);
  traverse(head.next);
  // 后序位置
  console.log(head.val);
};

// 调用 traverse 函数
traverse(head);
