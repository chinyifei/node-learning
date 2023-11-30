var reverseList = function(head) {
  let curr = null
  let p1 = head
  while(p1){
      let tmp = p1.next
      p1.next = curr
      curr = p1
      p1 = tmp
  }
  return curr

};

// let head = [1,2,3,4,5]

// console.log(reverseList(head))
const head3 = { val: 1, next: { val: 2, next: { val: 3, next: null } } };
console.log(reverseList(head3)); // 输出：{ val: 3, next: { val: 2, next: { val: 1, next: null } } }