/**
 * Prepends a 0 to n if n is less than 10, and returns that as a string.
 */
export function prependZero(n: number, u?: number): string {
    return n.toString().padStart(u || 2, "0");
}

export function formatDate(date: Date) {
    const formatted =
        date.getFullYear().toString()
        + "_" + prependZero(date.getMonth())
        + "_" + prependZero(date.getDate());
    return formatted;
}

export function formatTime(date: Date) {
    const formatted = prependZero(date.getHours())
        + ":" + prependZero(date.getMinutes())
        + ":" + prependZero(date.getSeconds())
        + "m" + prependZero(date.getMilliseconds(), 4);
    return formatted;
}