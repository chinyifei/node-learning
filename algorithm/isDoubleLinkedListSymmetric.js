class ListNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

function isDoubleLinkedListSymmetric(head) {
  if (head == null || head.next == null) {
    return true; // 空链表或只有一个节点的链表是对称的
  }

  let left = head;
  let right = getTail(head);

  while (left != right) {
    if (left.val !== right.val) {
      return false; // 左右节点值不相等，不是对称的
    }
    left = left.next;
    right = right.prev;
  }

  return true; // 链表是对称的
}

function getTail(head) {
  while (head.next != null) {
    head = head.next;
  }
  return head;
}

// 创建一个对称的双向链表
const head1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(3);
const node5 = new ListNode(2);
const node6 = new ListNode(1);

head1.next = node2;
node2.prev = head1;
node2.next = node3;
node3.prev = node2;
node3.next = node4;
node4.prev = node3;
node4.next = node5;
node5.prev = node4;
node5.next = node6;
node6.prev = node5;

console.log(isDoubleLinkedListSymmetric(head1)); // 输出: true，链表是对称的
// 创建一个非对称的双向链表
const head2 = new ListNode(1);
const node7 = new ListNode(2);
const node8 = new ListNode(3);
const node9 = new ListNode(4);

head2.next = node7;
node7.prev = head2;
node7.next = node8;
node8.prev = node7;
node8.next = node9;
node9.prev = node8;

console.log(isDoubleLinkedListSymmetric(head2));
