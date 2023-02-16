import { TileCode } from './TileCode';
import { TileFamilyRef } from './TileFamilyRef';
export type TileRef = {
    code: TileCode;
    family: TileFamilyRef;
};
export declare function getTileRef(tileCode: TileCode): TileRef;
export declare const TILE: Record<TileCode, TileRef>;
