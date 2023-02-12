export {}

declare global {
  interface Array<T> {
    extractFirst(predicate: (elem: T, index?: number) => boolean): [T | null, Array<T>];
    extractAll(predicate: (elem: T, index?: number) => boolean): [T[], Array<T>];
    extractRange(start: number, rangeSize: number): [T[], Array<T>];
  }
}

if (!Array.prototype.extractFirst) {
  Array.prototype.extractFirst = function<T>(this: T[], predicate: (elem: T, index?: number) => boolean): [T | null, T[]] {
    const newArray: T[] = [];
    let extracted = null
    for (let i = 0; i < this.length; i++) {
      const elem = this[i]
      if (extracted == null && predicate(elem)) extracted = elem;
      else newArray.push(elem);
    }
    return [extracted, newArray];
  }
}

if (!Array.prototype.extractAll) {
  Array.prototype.extractAll = function<T>(this: T[], predicate: (elem: T, index?: number) => boolean): [T[], T[]] {
    const newArray: T[] = [];
    const extracted: T[] = [];
    for (let i = 0; i < this.length; i++) {
      const elem = this[i]
      if (predicate(elem)) extracted.push(elem);
      else newArray.push(elem);
    }
    return [extracted, newArray];
  }
}

if (!Array.prototype.extractRange) {
  Array.prototype.extractRange = function<T>(this: T[], start: number, rangeSize: number): [T[], T[]] {
    const newArray: T[] = [];
    const extracted: T[] = [];
    for (let i = 0; i < this.length; i++) {
      if (i >= start && i < start + rangeSize) extracted.push(this[i]);
      else newArray.push(this[i]);
    }
    return [extracted, newArray];
  }
}
