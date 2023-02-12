import { TileFamilyCode } from './TileFamilyCode'
import { TILE_FAMILY_CATEGORY, TileFamilyCategoryRef } from './TileFamilyCategoryRef'

export type TileFamilyRef = {
  code: TileFamilyCode;
  category: TileFamilyCategoryRef;
}

export const TILE_FAMILY: Record<TileFamilyCode, TileFamilyRef> = {
  animal: {
    code: TileFamilyCode.ANIMAL,
    category: TILE_FAMILY_CATEGORY.bonus,
  },
  art: {
    code: TileFamilyCode.ART,
    category: TILE_FAMILY_CATEGORY.bonus,
  },
  clown: {
    code: TileFamilyCode.CLOWN,
    category: TILE_FAMILY_CATEGORY.bonus,
  },
  dragon: {
    code: TileFamilyCode.DRAGON,
    category: TILE_FAMILY_CATEGORY.honor,
    //tiles: {
      //[TileCode.RED]: TILE[TileCode.RED],
      //[TileCode.GREEN]: TILE[TileCode.GREEN],
      //[TileCode.WHITE]: TILE[TileCode.WHITE],
    //}
  },
  flower: {
    code: TileFamilyCode.FLOWER,
    category: TILE_FAMILY_CATEGORY.bonus,
  },
  general_purpose_joker: {
    code: TileFamilyCode.GENERAL_PURPOSE_JOKER,
    category: TILE_FAMILY_CATEGORY.joker,
  },
  man: {
    code: TileFamilyCode.MAN,
    category: TILE_FAMILY_CATEGORY.suit,
  },
  noble_profession: {
    code: TileFamilyCode.NOBLE_PROFESSION,
    category: TILE_FAMILY_CATEGORY.bonus,
  },
  pin: {
    code: TileFamilyCode.PIN,
    category: TILE_FAMILY_CATEGORY.suit,
  },
  rank_restricted_joker: {
    code: TileFamilyCode.RANK_RESTRICTED_JOKER,
    category: TILE_FAMILY_CATEGORY.joker,
  },
  season: {
    code: TileFamilyCode.SEASON,
    category: TILE_FAMILY_CATEGORY.bonus,
  },
  sen: {
    code: TileFamilyCode.SEN,
    category: TILE_FAMILY_CATEGORY.suit,
  },
  suit_restricted_joker: {
    code: TileFamilyCode.SUIT_RESTRICTED_JOKER,
    category: TILE_FAMILY_CATEGORY.joker,
  },
  wind: {
    code: TileFamilyCode.WIND,
    category: TILE_FAMILY_CATEGORY.honor,
  }
}
