import { IAzure } from "./IAzure";
import { LogLevel } from '../logLevel';
import { createSharedKeyService, log } from "../azure/service";

export class AzureSharedKey implements IAzure {
    origin: string;
    keyToken: string;
    container: string;
    storageName: string;

    constructor(storageName: string, keyToken: string, origin: string, container: string = "log") {
        this.origin = origin;
        this.container = container;
        this.storageName = storageName;
        this.keyToken = keyToken;
    }

    async log(logLevel: LogLevel, ...text: string[]): Promise<boolean> {
        let service = createSharedKeyService(this);
        let success = await log(service, this, logLevel, ...text)
        return success;
    }
};