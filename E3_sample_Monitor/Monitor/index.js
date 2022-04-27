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
const { DateTime } = require("luxon");

module.exports = df.orchestrator(function* (context) {
    //bodyを取得
    const input = context.df.getInput();
    context.log("request body :" + input);
    context.log("request location :" + input.location);
    context.log("request phone :" + input.phone);

    verifyRequest(input);

    const endTime = DateTime.fromJSDate(context.df.currentUtcDateTime, { zone: 'utc' }).plus({ hours: 6 });//6時間監視する
    context.log("Instantiating monitor for " + input.location.city + ", " + input.location.state
        + ". Expires: " + (endTime) + ".");

    while (DateTime.fromJSDate(context.df.currentUtcDateTime, { zone: 'utc' }) < endTime) {
        // Check the weather
        context.log("Checking current weather conditions for " + input.location.city + ", "
            + input.location.state + " at " + context.df.currentUtcDateTime + ".");
        const isClear = yield context.df.callActivity("GetIsClear", input.location);

        if (isClear) {
            // It's not raining! Or snowing. Or misting. Tell our user to take advantage of it.
            context.log("Detected clear weather for " + input.location.city + ", "
                + input.location.state + ". Notifying " + input.phone + ".");

            yield context.df.callActivity("SendGoodWeatherAlert", input.phone);
            
            //通知したら終了
            break;
        } else {
            // Wait for the next checkpoint
            var nextCheckpoint = DateTime.fromJSDate(context.df.currentUtcDateTime, { zone: 'utc' }).plus({ seconds: 30 });
            context.log("Next check for " + input.location.city + ", " + input.location.state
                + " at " + nextCheckpoint.toString());

            const myDate = new Date();
            // yield context.df.createTimer(nextCheckpoint.toDate());   // accomodate cancellation tokens
            context.log("nextCheckpoint.toJSDate() :" + nextCheckpoint.toJSDate());
            yield context.df.createTimer(nextCheckpoint.toJSDate());   // accomodate cancellation tokens
        }
    }

    context.log("Monitor expiring.");
});

function verifyRequest(request) {

    console.log("verifyRequest start. " + request);

    if (!request) {
        throw new Error("An input object is required.");
    }
    if (!request.location) {
        throw new Error("A location input is required.");
    }
    if (!request.phone) {
        throw new Error("A phone number input is required.");
    }

    console.log("verifyRequest passed.");    
}
