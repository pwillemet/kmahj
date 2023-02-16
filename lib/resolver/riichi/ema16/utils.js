import { GroupType, MahjongGroupState, MahjongTileModificator } from '../../../core';
import { ResolverError } from '../../error';
export function simpleParsedGroupToMahjongGroup({ tiles }) {
    const modificators = tiles.map(t => t.modificators).flat();
    const state = modificators.includes(MahjongTileModificator.INCLINED) ? MahjongGroupState.OPEN : MahjongGroupState.HIDDEN;
    if (isQuad(tiles))
        return {
            tiles,
            state,
            isolated: true,
            type: GroupType.QUAD,
        };
    if (isTriple(tiles))
        return {
            tiles,
            state,
            isolated: true,
            type: GroupType.TRIPLE
        };
    if (isDouble(tiles))
        return {
            tiles,
            state,
            isolated: true,
            type: GroupType.DOUBLE,
        };
    const sorted = tiles.slice().sort((t1, t2) => t1.tile.code - t2.tile.code);
    if (isSequence(sorted))
        return {
            tiles,
            state,
            isolated: true,
            type: GroupType.SEQUENCE
        };
    throw new ResolverError("Unrecognized simple group");
}
export function isQuad(tiles) {
    return tiles.length === 4 &&
        tiles.every(t => t.tile.code === tiles[0].tile.code);
}
export function isTriple(tiles) {
    return tiles.length === 3 && tiles.every(t => t.tile.code === tiles[0].tile.code);
}
export function isDouble(tiles) {
    return tiles.length === 2 && tiles[0].tile.code === tiles[1].tile.code;
}
export function isSequence(tiles) {
    return tiles.length === 3 && tiles.every((t, i) => t.tile.code - i === tiles[0].tile.code);
}
