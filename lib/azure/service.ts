import {
    SharedKeyCredential,
    AnonymousCredential,
    StorageURL,
    Credential,
    ServiceURL,
    ContainerURL,
    Aborter,
    AppendBlobURL
} from '@azure/storage-blob';

import { LogLevel } from '../LogLevel';

import { IAzure } from '../models/IAzure';
import { AzureSasToken } from '../models/AzureSasToken';
import { AzureSharedKey } from '../models/AzureSharedKey';

import { formatDate } from '../util/date';
import { getTextFormatted } from '../util/formatting';

//#region service url
function createServiceUrl(credential: Credential, url: string): ServiceURL {
    const pipeline = StorageURL.newPipeline(credential);
    return new ServiceURL(url, pipeline);
}

export function createSharedKeyService(caller: AzureSharedKey): ServiceURL {
    const sharedKeyCredential = new SharedKeyCredential(caller.storageName, caller.keyToken);
    return createServiceUrl(sharedKeyCredential, caller.origin);
}

export function createSasTokenService(caller: AzureSasToken): ServiceURL {
    const anonymousCredential = new AnonymousCredential();
    return createServiceUrl(anonymousCredential, caller.origin + caller.keyToken);
}
//#endregion service url

//#region log
function getBlobUrl(serviceUrl: ServiceURL, container: string, date: Date) {
    const containerURL = ContainerURL.fromServiceURL(serviceUrl, container);
    const blobURL = AppendBlobURL.fromContainerURL(containerURL, formatDate(date) + ".txt");
    return AppendBlobURL.fromBlobURL(blobURL);
}

export async function log(service: ServiceURL, caller: IAzure, logLevel: LogLevel, ...rest: string[]): Promise<boolean> {
    let date = new Date();
    let text = getTextFormatted(date, logLevel, ...rest);
    const blobUrl = getBlobUrl(service, caller.container, date);
    try {
        return (await blobUrl.appendBlock(Aborter.none, text, text.length))._response.status === 201;
    } catch (error) {
        if (error.statusCode !== 404) return false;
        
        const appendBlobCreateResponse = await blobUrl.create(Aborter.none);
        if (appendBlobCreateResponse._response.status !== 201) return false;
        
        return (await blobUrl.appendBlock(Aborter.none, text, text.length))._response.status === 201;
    }
}
//#endregion log