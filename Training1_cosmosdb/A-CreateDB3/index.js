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

    var operationIdOverride = {"ai.operation.id":myparam.myuuid};
    context.log("operationIdOverride:" + JSON.stringify(operationIdOverride));
    client.trackTrace({message: "my trace message3", tagOverrides:operationIdOverride});
    client.trackEvent({name: "my custom event3", tagOverrides:operationIdOverride, properties: {customProperty2: "custom property value"}});

    context.log('start CreateDB3... myparam:' + JSON.stringify(myparam));

    const data = {
        "id": myparam.myuuid,
        "myid": myparam.myuuid,
        "myvalue": myparam               
    };

    context.bindings.db1Document = JSON.stringify(data);
    
    //throw Error('create db 3 err');

    return true;
};