"use strict";
const { Logger } = require("../logger");
const { spfxArgs } = require("../args");
const { file } = require("../content");

/**
 * Returns a Promise for the addBuildTasks.
 * @param {Object[]} replaceTokenArray - Array of token object to replace.
 * @param {string} replaceTokenArray[].paramName - Name of the gulp command parameter.
 * @param {string} [replaceTokenArray[].paramDescription] - Description of the gulp command parameter.
 * @param {string} replaceTokenArray[].token - Token to replace.
 * @param {string[]} replaceTokenArray[].files - Files to be updated.
 * @param {string} [taskName] - Name for gulp sub-task .
 */
module.exports = (paramName, taskName) => {
    const taskNameStr = (taskName || "detokenize-files");
    return {
        execute: (config) => {
            return new Promise((resolve, reject) => {
                const cdnPath = await spfxArgs.GetArgumentValue(paramName, args);
                let json = require('./config/write-manifests.json');
                json.cdnBasePath = cdnPath;
                fs.writeFileSync('./config/write-manifests.json', JSON.stringify(json));
                resolve();
            });
        },
        name: taskNameStr
    };
}