import { GroupType, MahjongGroupState } from '../core';
import "../global/array";
import { isDouble, isSequence, isTriple } from './riichi';
export class ResolverPossibility {
    tiles;
    groups;
    possibilities = null;
    constructor(tiles, groups) {
        this.tiles = tiles;
        this.groups = groups;
    }
    compute() {
        if (this.possibilities == null) {
            this.possibilities = [
                DoubleExtractor(this),
                TripleExtractor(this),
                SequenceExtractor(this)
            ].filter(p => p != null);
            this.possibilities.forEach(p => p.compute());
        }
    }
    result() {
        if (this.possibilities == null)
            return [];
        if (this.possibilities?.length > 0)
            return this.possibilities.map(p => p.result()).flat();
        return [this];
    }
}
export const DoubleExtractor = possibility => {
    const tiles = possibility.tiles;
    if (tiles.length < 2)
        return null;
    const [firsts, remaining] = tiles.extractRange(0, 2);
    if (isDouble(firsts)) {
        const group = {
            tiles: firsts,
            type: GroupType.DOUBLE,
            state: MahjongGroupState.HIDDEN,
            isolated: false
        };
        const groups = [...possibility.groups, group];
        return new ResolverPossibility(remaining, groups);
    }
    return null;
};
export const TripleExtractor = possibility => {
    const tiles = possibility.tiles;
    if (tiles.length < 3)
        return null;
    const [firsts, remaining] = tiles.extractRange(0, 3);
    if (isTriple(firsts)) {
        const group = {
            tiles: firsts,
            type: GroupType.TRIPLE,
            state: MahjongGroupState.HIDDEN,
            isolated: false
        };
        const groups = [...possibility.groups, group];
        return new ResolverPossibility(remaining, groups);
    }
    return null;
};
export const SequenceExtractor = possibility => {
    const tiles = possibility.tiles.slice();
    if (tiles.length < 3)
        return null;
    const seq = [];
    let t;
    let remaining = tiles.slice();
    while ((t = tiles.shift()) != null && seq.length < 3) {
        if (t.tile.code !== seq.at(-1)?.tile.code) {
            seq.push(t);
            const [_, r] = remaining.extractFirst(tile => tile.tile.code === t.tile.code);
            remaining = r;
        }
    }
    if (isSequence(seq)) {
        const group = {
            tiles: seq,
            type: GroupType.SEQUENCE,
            state: MahjongGroupState.HIDDEN,
            isolated: false
        };
        const groups = [...possibility.groups, group];
        return new ResolverPossibility(remaining, groups);
    }
    return null;
};
