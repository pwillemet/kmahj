import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { isHonor, TILE_FAMILY_CATEGORY, TileFamilyRef } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Honitsu: MixedYaku = {
  name: "Honitsu",
  checker: (groups) => {
    const tiles = groups.map((g) => g.tiles).flat();
    let family: TileFamilyRef | null = null;
    for (let i = 0; i < tiles.length; i++) {
      family = tiles[i].tile.family;
      if (family.category === TILE_FAMILY_CATEGORY.suit) break;
    }
    return tiles.every(tile => isHonor(tile) || tile.tile.family.code === family!.code)
      && tiles.some(tile => isHonor(tile))
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Honitsu", () => {
    const input = "123p 345p 567p 999p 77z"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Honitsu.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Honitsu", () => {
    const input = "123p 345p 567p 999p 77p"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Honitsu.checker(groups as ClassicHandPattern);expect(result).toBeFalsy();
  })
}
