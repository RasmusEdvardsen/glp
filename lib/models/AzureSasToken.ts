import { IAzure } from "./IAzure";
import { LogLevel } from '../logLevel';
import { createSasTokenService, log } from "../azure/service";

export class AzureSasToken implements IAzure {
    origin: string;
    keyToken: string = "";
    container: string;

    getSasToken: () => Promise<string>;

    constructor(getSasToken: () => Promise<string>, origin: string, container: string = "log") {
        this.origin = origin;
        this.container = container;
        this.getSasToken = getSasToken;
    }
    
    async refreshToken(): Promise<void> {
        try {
            let sas: string = await this.getSasToken();
            this.keyToken = sas;
        } catch (error) {
            console.error(error);
        }
        return;
    }

    async log(logLevel: LogLevel, ...text: string[]): Promise<boolean> {
        if (this.keyToken.length === 0) await this.refreshToken();
        let service = createSasTokenService(this);
        let success = await log(service, this, logLevel, ...text)
        return success;
    }
};