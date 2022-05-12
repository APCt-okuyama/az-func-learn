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

const { v4: uuidv4 } = require('uuid');

module.exports = async function (context) {
    const myUUID = uuidv4();
    context.log('myUUID :' + myUUID);
    return myUUID;
};