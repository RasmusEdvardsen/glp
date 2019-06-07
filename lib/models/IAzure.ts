import { LogLevel } from "../logLevel";

export interface IAzure {
    origin: string;
    container: string;
    keyToken: string;
    log: (logLevel: LogLevel, ...text: string[]) => Promise<boolean>;
}