if (!Array.prototype.extractFirst) {
    Array.prototype.extractFirst = function (predicate) {
        const newArray = [];
        let extracted = null;
        for (let i = 0; i < this.length; i++) {
            const elem = this[i];
            if (extracted == null && predicate(elem))
                extracted = elem;
            else
                newArray.push(elem);
        }
        return [extracted, newArray];
    };
}
if (!Array.prototype.extractAll) {
    Array.prototype.extractAll = function (predicate) {
        const newArray = [];
        const extracted = [];
        for (let i = 0; i < this.length; i++) {
            const elem = this[i];
            if (predicate(elem))
                extracted.push(elem);
            else
                newArray.push(elem);
        }
        return [extracted, newArray];
    };
}
if (!Array.prototype.extractRange) {
    Array.prototype.extractRange = function (start, rangeSize) {
        const newArray = [];
        const extracted = [];
        for (let i = 0; i < this.length; i++) {
            if (i >= start && i < start + rangeSize)
                extracted.push(this[i]);
            else
                newArray.push(this[i]);
        }
        return [extracted, newArray];
    };
}
export {};
