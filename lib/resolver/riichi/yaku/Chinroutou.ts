import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { isTerminal } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Chinroutou: ClassicYaku = {
  name: "Chinroutou",
  checker: groups => {
    return groups
      .map(g => g.tiles)
      .flat()
      .every(t => isTerminal(t));
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Chinroutou", () => {
    const input = "111p 999p 111s 999m 11m"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Chinroutou.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Chinroutou", () => {
    const input = "111p 999p 111s 999m 11z"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Chinroutou.checker(groups as ClassicHandPattern);expect(result).toBeFalsy();
  })
}
