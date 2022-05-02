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
    context.log("SmsPhoneVerification start...");

    const phoneNumber = context.df.getInput();

    //validation
    if (!phoneNumber) {
        throw "A phone number is required.";
    }

    //1. send challenge code
    const challengeCode = yield context.df.callActivity("SendSmsChallenge", phoneNumber);

    //2. 永続timerを開始する
    const waitTimeSec = 600;
    context.log("waitTimeSec : " + waitTimeSec);
    const expiration = DateTime.fromJSDate(context.df.currentUtcDateTime, { zone: 'utc'}).plus({ seconds: waitTimeSec});
    const timeoutTask = context.df.createTimer(expiration.toJSDate());

    //
    let authorized = false;
    for (let i = 0; i <= 3; i++) { //challenge codeの受付は３回まで
        const challengeResponseTask = context.df.waitForExternalEvent("SmsChallengeResponse");

        //timerと並行して、ユーザーからのSmsChallengeResponseイベントを待つ
        const winner = yield context.df.Task.any([challengeResponseTask, timeoutTask]);

        if (winner === challengeResponseTask) {
            if (challengeResponseTask.result === challengeCode) {
                context.log("challengeCode matched.");

                authorized = true;
                break;
            }
            context.log("challengeCode NOT match.");
        } else {
            context.log("challengeCode fail...");
            break;
        }
    }

    if (!timeoutTask.isCompleted) {
        // All pending timers must be complete or canceled before the function exits.
        timeoutTask.cancel();
    }

    return authorized;
});
