function foo() {
  Promise.resolve().then(foo)
  //setTimeout()
}
foo()