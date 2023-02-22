import { TileFamilyCategoryCode } from './TileFamilyCategoryCode'

export type TileFamilyCategoryRef = {
  code: TileFamilyCategoryCode;
};

export const TILE_FAMILY_CATEGORY: Record<TileFamilyCategoryCode, TileFamilyCategoryRef> = {
  bonus: {
    code: TileFamilyCategoryCode.BONUS,
  },
  honor: {
    code: TileFamilyCategoryCode.HONOR,
  },
  joker: {
    code: TileFamilyCategoryCode.JOKER,
  },
  suit: {
    code: TileFamilyCategoryCode.SUIT,
  }
}
