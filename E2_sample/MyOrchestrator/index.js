/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    console.log('start my orchestrator... ');

    //パラメーターチェック body部分
    const rootDir = context.df.getInput();
    if ( !rootDir ) {
        throw new Error("A dir should be.");        
    }
    console.log("rootDir: " + rootDir);

    //activityの呼び出し
    //rootDir配下のファイルの一覧
    const files = yield context.df.callActivity("ActivityGetFileList", rootDir);
    console.log("MyOrchestrator.files :" + files);

    //Promiseの配列を作成
    const tasks = [];
    for (const file of files){
        console.log(file);
        tasks.push(context.df.callActivity("ActivityCopyFile2Blob",file));
    }
    //console.log(tasks);

    const results = yield context.df.Task.all(tasks);
    console.log('Task.all done.');

    const totalBytes = results.reduce((prev, curr) => { return prev + curr }, 0);

    console.log("totalBytes :" + totalBytes);
    return totalBytes;
});