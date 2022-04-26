const df = require("durable-functions");

//module.exports = async function (context, req) {
module.exports = async function (context, req) {
    const client = df.getClient(context);

    //
    //req.bodyを渡してオーケストレーター関数を開始
    const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};