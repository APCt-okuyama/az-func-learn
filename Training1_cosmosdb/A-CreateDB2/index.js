﻿/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

module.exports = async function (context, myparam) {

    context.log('start CreateDB2... myparam:' + JSON.stringify(myparam));

    //throw Error('create db 2 err');

    const data = {
        "id": myparam.myuuid,
        "myid": myparam.myuuid,
        "myvalue": myparam               
    };

    context.bindings.db1Document = JSON.stringify(data);

    return true;
};