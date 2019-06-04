const LOGLEVEL_MAX = 5;

export enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
};

export function getLogLevelString(str: string) {
    str = "[" + str + "]";
    return `${str.padEnd(LOGLEVEL_MAX + 2)}`;
}