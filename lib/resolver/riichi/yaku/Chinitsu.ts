import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { TILE_FAMILY_CATEGORY } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Chinitsu: MixedYaku = {
  name: "Chinitsu",
  checker: groups => {
    const tiles = groups
      .map(g => g.tiles)
      .flat();
    const firstTileFamily = tiles[0].tile.family;
    if (firstTileFamily.category !== TILE_FAMILY_CATEGORY.suit) return false;
    return tiles
      .every(t => t.tile.family === firstTileFamily);
  }
}


if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Chinitsu", () => {
    const input = "123p 345p 567p 999p 88p"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Chinitsu.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Chinitsu", () => {
    const input = "123p 345p 567p 999p 77z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Chinitsu.checker(groups as ClassicHandPattern);expect(result).toBeFalsy();
  })
}
