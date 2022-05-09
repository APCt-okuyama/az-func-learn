/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

const appInsights = require("applicationinsights");
appInsights.setup();
const client = appInsights.defaultClient;

module.exports = async function (context, myparam) {

    // Use this with 'tagOverrides' to correlate custom telemetry to the parent function invocation.
    //var operationIdOverride = {"ai.operation.id":context.traceContext.traceparent};
    var operationIdOverride = {"ai.operation.id":myparam.myuuid};
    context.log("operationIdOverride:" + JSON.stringify(operationIdOverride));

    client.trackEvent({name: "my custom event", tagOverrides:operationIdOverride, properties: {customProperty2: "custom property value"}});
    // client.trackException({exception: new Error("handled exceptions can be logged with this method"), tagOverrides:operationIdOverride});
    // client.trackMetric({name: "custom metric", value: 3, tagOverrides:operationIdOverride});
    client.trackTrace({message: "my trace message", tagOverrides:operationIdOverride});
    // client.trackDependency({target:"http://dbname", name:"select customers proc", data:"SELECT * FROM Customers", duration:231, resultCode:0, success: true, dependencyTypeName: "ZSQL", tagOverrides:operationIdOverride});
    // client.trackRequest({name:"GET /customers", url:"http://myserver/customers", duration:309, resultCode:200, success:true, tagOverrides:operationIdOverride});

    context.log('start CreateDB1... myparam:' + JSON.stringify(myparam));

    const data = {
        "id": myparam.myuuid,
        "myid": myparam.myuuid,
        "myvalue": myparam               
    };

    context.bindings.db1Document = JSON.stringify(data);

    //sleep
    context.log('A-CreateDB1 sleep...');
    await new Promise(resolve => setTimeout(resolve, 500));
    //throw Error('create db 1 err');

    return true;
};