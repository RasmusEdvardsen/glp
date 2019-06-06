import { log, init } from './log';
import { LogLevel } from './LogLevel';
import { AzureConfigSasToken, AzureConfigSharedKey, IAzureConfig } from './models/AzureConfig';

export async function credentials(obj: IAzureConfig): Promise<void> {
    await init(obj)
}

export function info(text: string): void {
    log(LogLevel.INFO, text);
}

export function warn(text: string): void {
    log(LogLevel.WARN, text);
}

export function error(text: string): void {
    log(LogLevel.ERROR, text);
}

export * from './models/AzureConfig';