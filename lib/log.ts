import { createBlobServiceWithSas } from 'azure-storage';
import { getLogLevelString, LogLevel } from './logLevel';
import { formatDate, formatTime } from './util/date';
import { AzureConfig } from './models/AzureConfig';

/**
 * minimum sas requirements: Blob service, Object resource type, Write permission
 */
const azureConfig: AzureConfig = {
    origin: "",
    sasToken: "",
    container: "log",
};

function errorOrRes(err: any, res: any, logLevel?: LogLevel, text?: string) {
    if (err) {
        console.log(err);
        if (err.statusCode === 404) {
            // todo: has risk of endless recursion.
            // can get aroung by looking at logLevel/text - only passed on first attempt.
            let date = new Date();
            const blobService = createBlobServiceWithSas(azureConfig.origin, azureConfig.sasToken);
            blobService.createAppendBlobFromText(azureConfig.container,
                formatDate(date) + ".txt",
                `${formatTime(date)} ${getLogLevelString(logLevel || LogLevel.INFO)} ${text}` + "\n",
                (err, res) => errorOrRes(err, res));
        }
    }
    if (res) {
        console.log(`Logged succesfully to ${res.name}`);
    }
}

export function init(obj: any) {
    azureConfig.origin = obj.origin;
    azureConfig.sasToken = obj.sasToken;
    if (obj.container) azureConfig.container = obj.container;
}

export function log(logLevel: any, text: string) {
    let date = new Date();
    const blobService = createBlobServiceWithSas(azureConfig.origin, azureConfig.sasToken);
    blobService.appendBlockFromText(
        azureConfig.container, formatDate(date) + ".txt",
        `${formatTime(date)} ${getLogLevelString(logLevel)} ${text}` + "\n",
        (err, res) => errorOrRes(err, res, logLevel, text)
    );
}