import { TileFamilyCategoryCode } from './TileFamilyCategoryCode'

export type TileFamilyCategoryRef = {
  code: TileFamilyCategoryCode;
  //families: Partial<Record<TileFamilyCode, TileFamilyRef>>;
};

export const TILE_FAMILY_CATEGORY: Record<TileFamilyCategoryCode, TileFamilyCategoryRef> = {
  bonus: {
    code: TileFamilyCategoryCode.BONUS,
    //families: {
      //season: TILE_FAMILY.season,
      //flower: TILE_FAMILY.flower,
      //art: TILE_FAMILY.art,
      //noble_profession: TILE_FAMILY.noble_profession,
      //animal: TILE_FAMILY.animal,
      //clown: TILE_FAMILY.clown,
    //}
  },
  honor: {
    code: TileFamilyCategoryCode.HONOR,
    //families: {
      //wind: TILE_FAMILY.wind,
      //dragon: TILE_FAMILY.dragon
    //}
  },
  joker: {
    code: TileFamilyCategoryCode.JOKER,
    //families: {
      //general_purpose_joker: TILE_FAMILY.general_purpose_joker,
      //suit_restricted_joker: TILE_FAMILY.suit_restricted_joker,
      //rank_restricted_joker: TILE_FAMILY.rank_restricted_joker
    //},
  },
  suit: {
    code: TileFamilyCategoryCode.SUIT,
    //families: {
      //pin: TILE_FAMILY.pin,
      //sen: TILE_FAMILY.sen,
      //man: TILE_FAMILY.man
    //}
  }
}
