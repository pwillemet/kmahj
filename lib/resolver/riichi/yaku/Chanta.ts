import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { isHonor, isOrdinary, isTerminal, TILE_FAMILY_CATEGORY } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Chanta: ClassicYaku = {
  name: "Chanta",
  checker: (groups) => {
    const terminalOrHonorEverywhere =
      groups.every((group) =>
        group.tiles.some(tile =>
          tile.tile.family.category === TILE_FAMILY_CATEGORY.honor || isTerminal(tile)));
    if (!terminalOrHonorEverywhere) return false;
    const tiles = groups.map((g) => g.tiles).flat();
    return tiles.some(tile => isOrdinary(tile)) // else Honroutou
      && tiles.some(tile => isHonor(tile)) // else Junchan
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Chanta", () => {
    const input = "123p 789p 111z 22z 999s"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Chanta.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Chanta", () => {
    const input = "123p 789p 111z 22m 999s"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Chanta.checker(groups as ClassicHandPattern);expect(result).toBeFalsy();
  })
}
