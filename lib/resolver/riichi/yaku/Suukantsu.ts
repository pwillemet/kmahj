import { ClassicHandPattern, ClassicYaku } from './yaku.model'
import { GroupType } from '../../../core'
import { MpszParser } from '../../../parser'
import { simpleParsedGroupToMahjongGroup } from '../ema16/utils'

export const Suukantsu: ClassicYaku = {
  name: "Suukantsu",
  checker: groups => {
    const quads = groups.filter(g => g.type === GroupType.QUAD)
    return quads.length === 4;
  }
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("Suukantsu", () => {
    const input = "2222s 3333s 6666s 8888s 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Suukantsu.checker(groups as ClassicHandPattern);
    expect(result).toBeTruthy();
  })

  test("Not Suukantsu", () => {
    const input = "2222s 3333s 6666s 999s 66z"
    const parsed = MpszParser.parse(input);
    const groups = parsed.groups.map(g => simpleParsedGroupToMahjongGroup(g));
    const result = Suukantsu.checker(groups as ClassicHandPattern);
    expect(result).toBeFalsy();
  })
}
