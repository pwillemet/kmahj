import { ParsedGroup } from '../../../parser';
import { MahjongGroup, MahjongTile } from '../../../core';
export declare function simpleParsedGroupToMahjongGroup({ tiles }: ParsedGroup): MahjongGroup;
export declare function isQuad(tiles: MahjongTile[]): boolean;
export declare function isTriple(tiles: MahjongTile[]): boolean;
export declare function isDouble(tiles: MahjongTile[]): boolean;
export declare function isSequence(tiles: MahjongTile[]): boolean;
