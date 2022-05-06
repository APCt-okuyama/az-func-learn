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


const CosmosClient = require('@azure/cosmos').CosmosClient
const client = new CosmosClient(process.env.AzureCosmosDBConnection);
const database = client.database("training1db");
const container1 = database.container("my-container1");
const container2 = database.container("my-container2");
const container3 = database.container("my-container3");

module.exports = async function (context, myparam) {
    context.log('A-DeleteDB start...' + JSON.stringify(myparam));

    try{
        context.log("container1.item delete.");    
        await container1.item(myparam.myuuid, myparam.myuuid).delete();
    
        context.log("container2.item delete.");    
        await container2.item(myparam.myuuid, myparam.myuuid).delete();
    
        context.log("container3.item delete.");    
        await container3.item(myparam.myuuid, myparam.myuuid).delete();
    }catch(error){
        context.log("delete fail... " + error);
    }

    context.log('A-DeleteDB finished...' + JSON.stringify(myparam));
    return;
};