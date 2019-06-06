import { log, init } from './log';
import { LogLevel } from './LogLevel';
import { AzureConfigSasToken, AzureConfigSharedKey, IAzureConfig } from './models/AzureConfig';

export async function credentials(obj: IAzureConfig) {
    init(obj)
}

export function info(text: string) {
    log(LogLevel.INFO, text);
}

export function warn(text: string) {
    log(LogLevel.WARN, text);
}

export function error(text: string) {
    log(LogLevel.ERROR, text);
}

export * from './models/AzureConfig';