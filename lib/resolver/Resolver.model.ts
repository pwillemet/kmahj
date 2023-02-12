import { ParsedHand } from '../parser'
import { GroupType, MahjongGroup, MahjongGroupState, MahjongHand, MahjongTile } from '../core'
import "../global/array";
import { isDouble, isSequence, isTriple } from './riichi'

export type Resolver<T extends MahjongHand, P extends Object> = (parsedHand: ParsedHand, roundProps?: P) => T | null;

export class ResolverPossibility {

  possibilities: ResolverPossibility[] | null = null;

  constructor(public tiles: MahjongTile[], public groups: MahjongGroup[]) {}

  compute(): void {
    if (this.possibilities == null) {
      this.possibilities = [
        DoubleExtractor(this),
        TripleExtractor(this),
        SequenceExtractor(this)
      ].filter(p => p != null) as ResolverPossibility[];
      this.possibilities.forEach(p => p.compute());
    }
  }

  result(): ResolverPossibility[] {
    if (this.possibilities == null) return [];
    if (this.possibilities?.length > 0) return this.possibilities.map(p => p.result()).flat();
    return [this];
  }
}

export type NextPossibilitySearcher = (possibility: ResolverPossibility) => ResolverPossibility | null;

export const DoubleExtractor: NextPossibilitySearcher = possibility => {
  const tiles = possibility.tiles;
  if (tiles.length < 2) return null;
  const [firsts, remaining] = tiles.extractRange(0, 2)
  if (isDouble(firsts)) {
    const group: MahjongGroup = {
      tiles: firsts,
      type: GroupType.DOUBLE,
      state: MahjongGroupState.HIDDEN,
      isolated: false
    };
    const groups: MahjongGroup[] = [...possibility.groups, group];
    return new ResolverPossibility(remaining, groups);
  }
  return null;
}

export const TripleExtractor: NextPossibilitySearcher = possibility => {
  const tiles = possibility.tiles;
  if (tiles.length < 3) return null;
  const [firsts, remaining] = tiles.extractRange(0, 3);
  if (isTriple(firsts)) {
    const group: MahjongGroup = {
      tiles: firsts,
      type: GroupType.TRIPLE,
      state: MahjongGroupState.HIDDEN,
      isolated: false
    }
    const groups = [...possibility.groups, group];
    return new ResolverPossibility(remaining, groups);
  }
  return null;
}

export const SequenceExtractor: NextPossibilitySearcher = possibility => {
  const tiles = possibility.tiles.slice();
  if (tiles.length < 3) return null;
  const seq: MahjongTile[] = [];
  let t: MahjongTile | undefined;
  let remaining = tiles.slice();
  while((t = tiles.shift()) != null && seq.length < 3) {
    if (t.tile.code !== seq.at(-1)?.tile.code) {
      seq.push(t);
      const [_, r] = remaining.extractFirst(tile => tile.tile.code === t!.tile.code)
      remaining = r;
    }
  }
  if (isSequence(seq)) {
    const group: MahjongGroup = {
      tiles: seq,
      type: GroupType.SEQUENCE,
      state: MahjongGroupState.HIDDEN,
      isolated: false
    }
    const groups = [...possibility.groups, group];
    return new ResolverPossibility(remaining, groups);
  }
  return null;
}
