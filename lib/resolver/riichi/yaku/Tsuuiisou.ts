import { ClassicHandPattern, MixedYaku } from './yaku.model'
import { isHonor } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Tsuuiisou: MixedYaku = {
  name: "Tsuuiisou",
  checker: groups => {
    return groups
      .map(g => g.tiles)
      .flat()
      .every(t => isHonor(t));
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Tsuuiisou", () => {
    const input = "222z 333z 444z 777z 11z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Tsuuiisou.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Tsuuiisou", () => {
    const input = "222z 333z 444z 777z 11m"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Tsuuiisou.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
