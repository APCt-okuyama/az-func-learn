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
    const outputs = [];

    // Run multiple O-Senario1 as sub orchestrator  in parallel
    const Senario1Tasks = [];
    for (let i = 0; i < 3; i++ ) {
        const senarioTask = context.df.callSubOrchestrator("O-Senario1");
        Senario1Tasks.push(senarioTask);
    }
    yield context.df.Task.all(Senario1Tasks);

    const Senario2Tasks = [];
    for (let i = 0; i < 3; i++ ) {
        const senarioTask = context.df.callSubOrchestrator("O-Senario2");
        Senario2Tasks.push(senarioTask);
    }

    yield context.df.Task.all(Senario2Tasks);

    return "okay";
});