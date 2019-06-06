import { createBlobServiceWithSas } from 'azure-storage';
import { getLogLevelString, LogLevel } from './logLevel';
import { formatDate, formatTime } from './util/date';
import { AzureConfigSasToken, AzureConfigSharedKey, IAzureConfig } from './models/AzureConfig';

/**
 * minimum sas requirements: Blob service, Object resource type, Write permission
 */
let azureConfig: AzureConfigSasToken | AzureConfigSharedKey = {
    origin: "",
    keyToken: "",
    container: "log",
};

function errorOrRes(err: any, res: any, logLevel?: LogLevel, text?: string) {
    if (err) {
        console.log(err);
        if (err.statusCode === 404) {
            // todo has risk of endless recursion.
            // can get aroung by looking at logLevel/text - only passed on first attempt.
            let date = new Date();
            const blobService = createBlobServiceWithSas(azureConfig.origin, azureConfig.keyToken);
            blobService.createAppendBlobFromText(
                azureConfig.container,
                formatDate(date) + ".txt",
                `${formatTime(date)} ${getLogLevelString(logLevel || LogLevel.INFO)} ${text}` + "\n",
                (err, res) => errorOrRes(err, res));
        }
    }
    if (res) {
        console.log(`Logged succesfully to ${res.name}`);
    }
}

export async function init(obj: IAzureConfig) {
    if (obj instanceof AzureConfigSasToken) 
        await obj.refreshToken();
    azureConfig = obj;
}

export function log(logLevel: LogLevel, text: string) {
    let date = new Date();
    const blobService = createBlobServiceWithSas(azureConfig.origin, azureConfig.keyToken);
    blobService.appendBlockFromText(
        azureConfig.container,
        formatDate(date) + ".txt",
        `${formatTime(date)} ${getLogLevelString(logLevel)} ${text}` + "\n",
        (err, res) => errorOrRes(err, res, logLevel, text)
    );
}

// todo handle sastoken being expired