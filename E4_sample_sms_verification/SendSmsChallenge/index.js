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

const seedrandom = require("seedrandom");
const uuidv1 = require("uuid/v1");

// Get a random number generator with a random seed (not time-based)
const rand = seedrandom(uuidv1());

module.exports = async function (context, phoneNumber) {
    const challengeCode = Math.floor(rand() * 10000);

    context.log(`Sending verification code ${challengeCode} to ${phoneNumber}.`);

    context.bindings.message = {
        body: `Your verification code is ${challengeCode.toPrecision(4)}`,
        to: phoneNumber
    };

    return challengeCode;
};