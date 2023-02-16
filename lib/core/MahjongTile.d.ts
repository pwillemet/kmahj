import { TileRef } from './TileRef';
export type MahjongTileModificator = "aka" | "reverted" | "inclined" | "superposed" | "winning";
export declare const MahjongTileModificator: {
    AKA: MahjongTileModificator;
    INCLINED: MahjongTileModificator;
    REVERTED: MahjongTileModificator;
    SUPERPOSED: MahjongTileModificator;
    WINNING: MahjongTileModificator;
};
export type MahjongTile = {
    tile: TileRef;
    modificators: MahjongTileModificator[];
};
