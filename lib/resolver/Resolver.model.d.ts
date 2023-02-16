import { ParsedHand } from '../parser';
import { MahjongGroup, MahjongHand, MahjongTile } from '../core';
import "../global/array";
export type Resolver<T extends MahjongHand, P extends Object> = (parsedHand: ParsedHand, roundProps?: P) => T | null;
export declare class ResolverPossibility {
    tiles: MahjongTile[];
    groups: MahjongGroup[];
    possibilities: ResolverPossibility[] | null;
    constructor(tiles: MahjongTile[], groups: MahjongGroup[]);
    compute(): void;
    result(): ResolverPossibility[];
}
export type NextPossibilitySearcher = (possibility: ResolverPossibility) => ResolverPossibility | null;
export declare const DoubleExtractor: NextPossibilitySearcher;
export declare const TripleExtractor: NextPossibilitySearcher;
export declare const SequenceExtractor: NextPossibilitySearcher;
