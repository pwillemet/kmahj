export {};
declare global {
    interface Array<T> {
        extractFirst(predicate: (elem: T, index?: number) => boolean): [T | null, Array<T>];
        extractAll(predicate: (elem: T, index?: number) => boolean): [T[], Array<T>];
        extractRange(start: number, rangeSize: number): [T[], Array<T>];
    }
}
