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

    const myuuid = yield context.df.callActivity("A-CreateUUID");
    context.log('generated uuid: ' + myuuid);

    // ３つのActivityを並列に呼び出す
    const tasks = [];
    tasks.push(context.df.callActivity("A-CreateDB1", {name:"tx-201", myuuid:myuuid}));
    tasks.push(context.df.callActivity("A-CreateDB2", {name:"tx-202", myuuid:myuuid}));
    tasks.push(context.df.callActivity("A-CreateDB3", {name:"tx-203", myuuid:myuuid}));

    let results = null
    try{
        results = yield context.df.Task.all(tasks);
    }
    catch (error){
        // Error handling or compensation goes here.
        yield context.df.callActivity("A-DeleteDB", {myuuid:myuuid})
    }


    // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]
    return results;
});