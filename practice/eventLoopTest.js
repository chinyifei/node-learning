console.log(1);
setTimeout(() => {
  console.log(2);
}, 1000);

new Promise((resolve, reject) => {
  console.log(3);
  Promise.resolve().then(() => {
    console.log(6);
  });
  resolve();
}).then((res) => {
  console.log(4);
});

console.log(5);
