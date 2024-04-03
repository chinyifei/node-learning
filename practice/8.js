var a;
var b = new Promise((resolve, reject) => {
  console.log("promise");
  setTimeout(() => {
    resolve();
  }, 1000);
})
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  })
  .then(() => {
    console.log("promise4");
  });

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log("after1");
  await a;
  resolve(true);
  console.log("after2");
});

setTimeout(() => {
  Promise.resolve().then(() => {
    console.log("promise5");
  });
}, 3000);

console.log("end~");
