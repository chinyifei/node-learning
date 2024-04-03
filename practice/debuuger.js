let arr1 = [1, 3, 5, 7, 10, 20],
  arr2 = [2, 4, 6, 9];
function merge(arr1, arr2) {
  let r = [];
  while (arr1.length || arr2.length) {
    let a = arr1[0];
    let b = arr2[0];
    if (!a) {
      r = r.concat(arr2);
      break;
    }
    if (!b) {
      r = r.concat(arr1);
      break;
    }
    if (a < b) {
      r.push(a);
      arr1.shift();
    } else {
      r.push(b);
      arr2.shift();
    }
  }
  return r;
}
const rr = merge(arr1, arr2);
console.log(rr);
