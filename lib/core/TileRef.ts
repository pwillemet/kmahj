import { TileCode } from './TileCode'
import { TILE_FAMILY, TileFamilyRef } from './TileFamilyRef'

export type TileRef = {
  code: TileCode;
  family: TileFamilyRef
}

export function getTileRef(tileCode: TileCode): TileRef {
  return TILE[tileCode];
}

export const TILE: Record<TileCode, TileRef> = {
  1: {
    code: TileCode.PIN_1,
    family: TILE_FAMILY.pin
  },
  2: {
    code: TileCode.PIN_2,
    family: TILE_FAMILY.pin
  },
  3: {
    code: TileCode.PIN_3,
    family: TILE_FAMILY.pin
  },
  4: {
    code: TileCode.PIN_4,
    family: TILE_FAMILY.pin
  },
  5: {
    code: TileCode.PIN_5,
    family: TILE_FAMILY.pin
  },
  6: {
    code: TileCode.PIN_6,
    family: TILE_FAMILY.pin
  },
  7: {
    code: TileCode.PIN_7,
    family: TILE_FAMILY.pin
  },
  8: {
    code: TileCode.PIN_8,
    family: TILE_FAMILY.pin
  },
  9: {
    code: TileCode.PIN_9,
    family: TILE_FAMILY.pin
  },
  11: {
    code: TileCode.SEN_1,
    family: TILE_FAMILY.sen
  },
  12: {
    code: TileCode.SEN_2,
    family: TILE_FAMILY.sen
  },
  13: {
    code: TileCode.SEN_3,
    family: TILE_FAMILY.sen
  },
  14: {
    code: TileCode.SEN_4,
    family: TILE_FAMILY.sen
  },
  15: {
    code: TileCode.SEN_5,
    family: TILE_FAMILY.sen
  },
  16: {
    code: TileCode.SEN_6,
    family: TILE_FAMILY.sen
  },
  17: {
    code: TileCode.SEN_7,
    family: TILE_FAMILY.sen
  },
  18: {
    code: TileCode.SEN_8,
    family: TILE_FAMILY.sen
  },
  19: {
    code: TileCode.SEN_9,
    family: TILE_FAMILY.sen
  },
  21: {
    code: TileCode.MAN_1,
    family: TILE_FAMILY.man
  },
  22: {
    code: TileCode.MAN_2,
    family: TILE_FAMILY.man
  },
  23: {
    code: TileCode.MAN_3,
    family: TILE_FAMILY.man
  },
  24: {
    code: TileCode.MAN_4,
    family: TILE_FAMILY.man
  },
  25: {
    code: TileCode.MAN_5,
    family: TILE_FAMILY.man
  },
  26: {
    code: TileCode.MAN_6,
    family: TILE_FAMILY.man
  },
  27: {
    code: TileCode.MAN_7,
    family: TILE_FAMILY.man
  },
  28: {
    code: TileCode.MAN_8,
    family: TILE_FAMILY.man
  },
  29: {
    code: TileCode.MAN_9,
    family: TILE_FAMILY.man
  },
  31: {
    code: TileCode.EAST,
    family: TILE_FAMILY.wind
  },
  32: {
    code: TileCode.SOUTH,
    family: TILE_FAMILY.wind
  },
  33: {
    code: TileCode.WEST,
    family: TILE_FAMILY.wind
  },
  34: {
    code: TileCode.NORTH,
    family: TILE_FAMILY.wind
  },
  35: {
    code: TileCode.RED,
    family: TILE_FAMILY.dragon
  },
  36: {
    code: TileCode.GREEN,
    family: TILE_FAMILY.dragon
  },
  37: {
    code: TileCode.WHITE,
    family: TILE_FAMILY.dragon
  },
  38: {
    code: TileCode.SPRING,
    family: TILE_FAMILY.season
  },
  39: {
    code: TileCode.SUMMER,
    family: TILE_FAMILY.season
  },
  40: {
    code: TileCode.AUTUMN,
    family: TILE_FAMILY.season
  },
  41: {
    code: TileCode.WINTER,
    family: TILE_FAMILY.season
  },
  42: {
    code: TileCode.PLUM,
    family: TILE_FAMILY.flower
  },
  43: {
    code: TileCode.ORCHID,
    family: TILE_FAMILY.flower
  },
  44: {
    code: TileCode.CHRYSANTHEMUM,
    family: TILE_FAMILY.flower
  },
  45: {
    code: TileCode.BAMBOO,
    family: TILE_FAMILY.flower
  },
  46: {
    code: TileCode.GUQIN,
    family: TILE_FAMILY.art
  },
  47: {
    code: TileCode.GO,
    family: TILE_FAMILY.art
  },
  48: {
    code: TileCode.CALLIGRAPHY,
    family: TILE_FAMILY.art
  },
  49: {
    code: TileCode.PAINTING,
    family: TILE_FAMILY.art
  },
  50: {
    code: TileCode.FISHER,
    family: TILE_FAMILY.noble_profession
  },
  51: {
    code: TileCode.WOODCUTTER,
    family: TILE_FAMILY.noble_profession
  },
  52: {
    code: TileCode.FARMER,
    family: TILE_FAMILY.noble_profession
  },
  53: {
    code: TileCode.SCHOLAR,
    family: TILE_FAMILY.noble_profession
  },
  54: {
    code: TileCode.CAT,
    family: TILE_FAMILY.animal
  },
  55: {
    code: TileCode.MOUSE,
    family: TILE_FAMILY.animal
  },
  56: {
    code: TileCode.ROOSTER,
    family: TILE_FAMILY.animal
  },
  57: {
    code: TileCode.CENTIPEDE,
    family: TILE_FAMILY.animal
  },
  58: {
    code: TileCode.CLOWN,
    family: TILE_FAMILY.clown
  },
  59: {
    code: TileCode.JOKER,
    family: TILE_FAMILY.general_purpose_joker
  },
  60: {
    code: TileCode.PIN_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  61: {
    code: TileCode.SEN_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  62: {
    code: TileCode.MAN_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  63: {
    code: TileCode.UNIVERSAL_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  64: {
    code: TileCode.SUIT_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  65: {
    code: TileCode.DRAGON_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  66: {
    code: TileCode.WIND_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  67: {
    code: TileCode.FLOWER_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  68: {
    code: TileCode.HONOR_JOKER,
    family: TILE_FAMILY.suit_restricted_joker
  },
  69: {
    code: TileCode.JOKER_19,
    family: TILE_FAMILY.rank_restricted_joker
  },
  70: {
    code: TileCode.JOKER_147,
    family: TILE_FAMILY.rank_restricted_joker
  },
  71: {
    code: TileCode.JOKER_258,
    family: TILE_FAMILY.rank_restricted_joker
  },
  72: {
    code: TileCode.JOKER_369,
    family: TILE_FAMILY.rank_restricted_joker
  },
}
