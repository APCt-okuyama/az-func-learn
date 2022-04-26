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
const fs = require("fs");
const path = require("path");
const storage = require("azure-storage");

const blobService = storage.createBlobService(process.env['AzureWebJobsStorage']);

//module.exports = async function (context, filePath) {
module.exports = function (context, filePath) {    
    context.log('ActivityCopyFile2Blob start...');

    const container = "backups2";
    const root = path.parse(filePath).root;
    const blobPath = filePath
    .substring(root.length)
    .replace("\\", "/");

    const outputLocation = `backups/${blobPath}`;

    blobService.createContainerIfNotExists(container, (error) => {
        if (error) {
            throw error;
        }

        fs.stat(filePath, function (error, stats) {
            if (error) {
                throw error;
            }
            context.log(`Copying '${filePath}' to '${outputLocation}'. Total bytes = ${stats.size}.`);

            const readStream = fs.createReadStream(filePath);

            blobService.createBlockBlobFromStream(container, blobPath, readStream, stats.size, function (error) {
                if (error) {
                    throw error;
                }

                context.done(null, stats.size);
            });
        });
    });

};