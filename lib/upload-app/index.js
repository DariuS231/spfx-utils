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
module.exports = (replaceTokenArray, taskName) => {
    return {
        execute: (config) => {
            return new Promise((resolve, reject) => {
                const pkgFile = require('./config/package-solution.json');
                const folderLocation = `./sharepoint/${pkgFile.paths.zippedPackage}`;


                const spUser = config.args['spUser'] || "";
                const spPassword = config.args['spPassword'] || "";
                const appCatalogUrl = config.args['appCatalogUrl'] || "";

                return gulp.src(folderLocation)
                    .pipe(spsync({
                        "username": spUser,
                        "password": spPassword,
                        "site": appCatalogUrl,
                        "libraryPath": "AppCatalog",
                        "publish": true
                    }))
                    .on('finish', resolve);
            });
        },
        name: taskNameStr
    };
}