export class AzureConfig {
    origin: string = "";
    sasToken: string = "";
    container: string = "log";
    constructor(o: string, sT: string, c?: string) {
        this.origin = o;
        this.sasToken = sT;
        this.container = c || "log";
    }
};