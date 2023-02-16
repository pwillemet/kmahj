import { TileFamilyCode } from './TileFamilyCode';
import { TileFamilyCategoryRef } from './TileFamilyCategoryRef';
export type TileFamilyRef = {
    code: TileFamilyCode;
    category: TileFamilyCategoryRef;
};
export declare const TILE_FAMILY: Record<TileFamilyCode, TileFamilyRef>;
