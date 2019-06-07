import { IAzure } from './models/IAzure';
import { LogLevel } from './logLevel';

let azure: IAzure;

export function init(obj: IAzure) {
    azure = obj;
}

export async function info(...text: string[]): Promise<boolean> {
    return await azure.log(LogLevel.INFO, ...text);
}

export async function warn(...text: string[]): Promise<boolean> {
    return await azure.log(LogLevel.WARN, ...text);
}

export async function error(...text: string[]): Promise<boolean> {
    return await azure.log(LogLevel.ERROR, ...text);
}