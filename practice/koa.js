/**
 * 洋葱模型koa
 */

class TaskPro {
  _taskList = [];
  _isRunning = false;
  _runIndex = 0;

  addTask(task) {
    this._taskList.push(task);
  }

  async run() {
    if (this._isRunning) {
      return;
    }
    this._isRunning = true;
    await this._runTask();
  }
  //取出一个任务执行
  async _runTask() {
    if (this._runIndex >= this._taskList.length) {
      this._isRunning = false;
      this._runIndex = 0;
      this._taskList = [];
      return;
    }
    const task = this._taskList[this._runIndex];
    const i = this._runIndex;
    await task(this._next.bind(this));
    const j = this._runIndex;
    //是否手动调用next
    if (i === j) {
      this._runIndex++;
      await this._runTask();
    }
  }

  async _next() {
    this._runIndex++;
    await this._runTask();
  }
}

const t = new TaskPro();
t.addTask(async (next) => {
  console.log(1, "start");
  await next();
  console.log(1, "end");
});
t.addTask(() => {
  console.log(2);
});
t.addTask(async (next) => {
  console.log(3);
  await next();
  console.log(5);
});

t.run(); // 1 start , 2, 3 ,1 end
