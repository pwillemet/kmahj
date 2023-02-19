import { FullHandYaku } from './yaku.model'
import { MINIMUM_FULL_HAND_SIZE } from '../const'
import { isTerminal, MahjongTileModificator, TILE_FAMILY_CATEGORY } from '../../../core'
import { MpszParser } from '../../../parser'

export const KokushiMusou: FullHandYaku = {
  name: "Kokushi musou",
  checker: (tiles) => {
    if (tiles.length !== MINIMUM_FULL_HAND_SIZE) return false;
    if (tiles.some(t => t.modificators.some(m => m !== MahjongTileModificator.WINNING))) return false;
    if (!tiles.every(t => t.tile.family.category === TILE_FAMILY_CATEGORY.honor || isTerminal(t))) return false;
    const codes = new Set(tiles.map(t => t.tile.code));
    return codes.size === MINIMUM_FULL_HAND_SIZE - 1;
  }
}


if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Kokushi Musou", () => {
    const input = "19s19p19m12345677z";
    const parsed = MpszParser.parse(input);
    const result = KokushiMusou.checker(parsed.groups[0].tiles);
    expect(result).toBeTruthy();
  })

  test("Not Kokushi Musou", () => {
    const input = "29s19p19m12345677z"
    const parsed = MpszParser.parse(input);
    const result = KokushiMusou.checker(parsed.groups[0].tiles);
    expect(result).toBeFalsy();
  })
}
