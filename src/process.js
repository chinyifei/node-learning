// process.stdin.pipe(process.stdout)

// console.log(process.execPath);
// console.log(process.argv);
// console.log('-----------------------------------');
// console.log(process.execArgv);
// process.memoryUsage()
// process.exit()
console.log(process.env.NODE_ENV === 'production' ? '生产环境' : '开发环境');


const {spawn} = require('child_process')

spawn(require('electron'), ['text.js','要传的参数'], )

/**
 * test.js 接受进程传过来的参数
 * process.argv[2]
 */


//另一种进程传参
const {fork} = require('child_process')

const testProcess = fork('./test.js')

testProcess.send('我是主进程')

testProcess.on("message",(data)=>{
    console.log('我是主进程接受消息111：',data)
})

//test.js 接受进程传过来的参数
process.on('message',(data)=>{

  console.log('子进程接受消息：',data)
})

process.send('我是子进程')