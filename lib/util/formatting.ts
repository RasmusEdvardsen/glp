import { LogLevel, getLogLevelString } from "../logLevel";
import { formatTime } from "./date";

export function getTextFormatted(date: Date, logLevel: LogLevel, ...rest: string[]) {
    return `${formatTime(date)} ${getLogLevelString(logLevel || LogLevel.INFO)} ${rest.join(" ")}` + "\n"
}