import { ChiiToitsuHandPattern, MixedYaku } from './yaku.model'
import { isHonor, isTerminal } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Honroutou: MixedYaku = {
  name: "Honroutou",
  checker: groups => {
    return groups
      .map(g => g.tiles)
      .flat()
      .every(t => isTerminal(t) || isHonor(t));
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Honroutou", () => {
    const input = "11p 99p 99m 11s 11z 22z 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Honroutou.checker(groups as ChiiToitsuHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Honroutou", () => {
    const input = "11p 99p 99m 11s 11z 22z 22s"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Honroutou.checker(groups as ChiiToitsuHandPattern);
    expect(result).toBeFalsy();
  })
}
