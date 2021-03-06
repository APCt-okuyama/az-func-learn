const df = require("durable-functions");

module.exports = async function (context, req) {

    context.log("req: " + JSON.stringify(req));
    context.log("context: " + JSON.stringify(context)); //cookies

    //認証・認可



    const client = df.getClient(context);
    const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};