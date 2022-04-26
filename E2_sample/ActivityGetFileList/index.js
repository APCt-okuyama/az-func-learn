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
const readdirp = require("readdirp");

//module.exports = async function (context, rootDir) {
// async から変更
module.exports = function (context, rootDir) {
    context.log("Try to find files in rootDir :" + rootDir);
    const allFilePaths = [];

    readdirp(
        { root: rootDir, entryType: 'all' },
        function (fileInfo) {
            if (!fileInfo.stat.isDirectory()){    
                console.log("fileInfo.fullPath: " + fileInfo.fullPath);            
                allFilePaths.push(fileInfo.fullPath);
            }
        },
        function(err, res){
            if (err) {
                throw err;
            }
            
            console.log(`Found ${allFilePaths.length} files in ${rootDir}`);
            context.done(null, allFilePaths);            
        }
    );
};