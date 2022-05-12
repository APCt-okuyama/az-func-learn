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

    // Run multiple O-Scenario1 as sub orchestrator  in parallel
    const Scenario1Tasks = [];
    for (let i = 0; i < 100; i++ ) {
        const scenarioTask = context.df.callSubOrchestrator("O-Scenario1");
        Scenario1Tasks.push(scenarioTask);
    }
    yield context.df.Task.all(Scenario1Tasks);

    const Scenario2Tasks = [];
    for (let i = 0; i < 3; i++ ) {
        const scenarioTask = context.df.callSubOrchestrator("O-Scenario2");
        Scenario2Tasks.push(scenarioTask);
    }

    yield context.df.Task.all(Scenario2Tasks);

    return "okay";
});