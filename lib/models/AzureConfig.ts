export interface IAzureConfig {
    origin: string;
    container: string;
    keyToken: string;
}

export class AzureConfigSharedKey implements IAzureConfig {
    origin: string = "";
    keyToken: string = "";
    container: string = "log";
    constructor(origin: string, keyToken: string, container?: string) {
        this.origin = origin;
        this.keyToken = keyToken;
        this.container = container || "log";
    }
};

export class AzureConfigSasToken implements IAzureConfig {
    origin: string = "";
    getSasToken: () => Promise<string>;
    keyToken: string = "";
    container: string = "log";

    constructor(origin: string, getSasToken: () => Promise<string>, container?: string) {
        this.origin = origin;
        this.getSasToken = getSasToken;
        this.container = container || "log";
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
};