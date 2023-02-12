import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { isTerminal } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Junchan: ClassicYaku = {
  name: "Junchan",
  checker: (groups) =>
    groups.every((group) =>
      group.tiles.some(tile => isTerminal(tile)))
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Junchan", () => {
    const input = "123p 789s 99s 789m 11m"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Junchan.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Junchan", () => {
    const input = "123p 789s 99s 789m 11z"
    const parsed = MpszParser(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Junchan.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
