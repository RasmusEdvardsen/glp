import { IAzure } from './models/IAzure';
import { LogLevel } from './logLevel';

let azure: IAzure;

// use for config stuff.
const configDef = {}

export function init(obj: IAzure) {
    azure = obj;
}

export const MedLog = {
    install(Vue: any, options: any) {
        Vue.prototype.MedLog = azure;
        Vue.prototype.info = info;
        Vue.prototype.warn = warn;
        Vue.prototype.error = error;
    }
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